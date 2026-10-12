#!/usr/bin/env bash
# Capturas de la app real para la web (site/assets/img/shots): cada escena en
# tema claro y oscuro, en inglés y en español, con los mismos datos.
#
#   tools/site-shots/shots.sh [binario]     (por defecto target/debug/rowly-db)
#
# Necesita: el binario (npx tauri build --debug --no-bundle, en app/), Docker,
# Xvfb, dbus-run-session, ImageMagick (import, magick), git y node. No toca
# el perfil del usuario: HOME, XDG_* y el almacenamiento de WebKit viven en una
# carpeta temporal, y la shell de la terminal tiene un prompt neutro.

set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../.." && pwd)
APP=$(realpath "${1:-$ROOT/target/debug/rowly-db}")
OUT="$ROOT/site/assets/img/shots"
export SHOTS_WORK=$(mktemp -d)
export SHOTS_DISPLAY=:97 SHOTS_INSPECTOR=127.0.0.1:9399 SHOTS_DB_PORT=55499
DB=rowly-site-shots
PG_IMAGE=public.ecr.aws/docker/library/postgres:18.6

[ -x "$APP" ] || { echo "no existe el binario $APP" >&2; exit 1; }

cleanup() {
  pkill -f "^$APP" || true
  pkill -f "^Xvfb $SHOTS_DISPLAY" || true
  docker rm -f "$DB" >/dev/null 2>&1 || true
  rm -rf "$SHOTS_WORK"
}
trap cleanup EXIT

# --- Base de demostración ------------------------------------------------------
docker rm -f "$DB" >/dev/null 2>&1 || true
docker run -d --name "$DB" -p "127.0.0.1:$SHOTS_DB_PORT:5432" \
  -e POSTGRES_USER=demo -e POSTGRES_PASSWORD=demo -e POSTGRES_DB=shop "$PG_IMAGE" >/dev/null
for _ in $(seq 60); do
  docker exec "$DB" pg_isready -U demo -d shop >/dev/null 2>&1 && break
  sleep 1
done
sleep 2
docker exec -i "$DB" psql -q -v ON_ERROR_STOP=1 -U demo -d shop < "$HERE/seed/shop.sql"

# --- Carpeta de consultas con historial de git ----------------------------------
HOME_DIR="$SHOTS_WORK/home"
mkdir -p "$HOME_DIR"
cp -r "$HERE/seed/queries" "$HOME_DIR/shop-queries"
printf '[ -f ~/.bashrc ] && . ~/.bashrc\n' > "$HOME_DIR/.bash_profile"
cat > "$HOME_DIR/.bashrc" <<'EOF'
PS1='\[\e[36m\]shop-queries\[\e[0m\] \[\e[2m\]main\[\e[0m\] $ '
alias ls='ls --color=auto'
EOF
(
  cd "$HOME_DIR/shop-queries"
  git init -q -b main
  commit() { GIT_AUTHOR_DATE="$1" GIT_COMMITTER_DATE="$1" git -c user.name=demo -c user.email=demo@example.com commit -qm "$2"; }
  git add customers.sql orders-by-city.sql && commit "2026-09-02T10:00" "Customer and city queries"
  git add maintenance && commit "2026-09-18T16:20" "Add maintenance queries"
  git add reports && commit "2026-10-05T09:12" "Monthly revenue report"
)

cat > "$SHOTS_WORK/bus.conf" <<'EOF'
<!DOCTYPE busconfig PUBLIC "-//freedesktop//DTD D-Bus Bus Configuration 1.0//EN" "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
<busconfig><type>session</type><listen>unix:tmpdir=/tmp</listen><policy context="default"><allow send_destination="*" eavesdrop="true"/><allow eavesdrop="true"/><allow own="*"/></policy></busconfig>
EOF

# Cada arranque parte de cero: sin el almacenamiento anterior la app no
# restaura consolas, mosaicos ni el historial de la terminal.
launch() {
  pkill -f "^$APP" || true
  pkill -f "^Xvfb $SHOTS_DISPLAY" || true
  sleep 1
  rm -rf "$SHOTS_WORK/profile" "$HOME_DIR/.local" "$HOME_DIR/.cache" "$HOME_DIR/.config" "$HOME_DIR/.bash_history"
  mkdir -p "$SHOTS_WORK/profile"/{config,data,cache}
  Xvfb "$SHOTS_DISPLAY" -screen 0 2880x1800x24 -nolisten tcp >/dev/null 2>&1 &
  sleep 1
  env -i PATH=/usr/bin:/bin HOME="$HOME_DIR" SHELL=/bin/bash TERM=xterm-256color USER=demo LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
    DISPLAY="$SHOTS_DISPLAY" GDK_BACKEND=x11 GDK_SCALE=2 WEBKIT_DISABLE_COMPOSITING_MODE=1 \
    XDG_CONFIG_HOME="$SHOTS_WORK/profile/config" XDG_DATA_HOME="$SHOTS_WORK/profile/data" XDG_CACHE_HOME="$SHOTS_WORK/profile/cache" \
    WEBKIT_INSPECTOR_HTTP_SERVER="$SHOTS_INSPECTOR" \
    setsid dbus-run-session --config-file="$SHOTS_WORK/bus.conf" "$APP" > "$SHOTS_WORK/app.log" 2>&1 < /dev/null &
  sleep 9
}

app() { node "$HERE/app.mjs" "$@"; }

for theme in light dark; do
  for lang in en es; do
    suffix="$theme-$lang"
    launch
    app setup "$theme" "$lang"
    app split 42
    app scene hero "$suffix"
    app scene editor "$suffix"
    app scene review "$suffix"
    launch
    app setup "$theme" "$lang"
    app split 50
    app scene terminal "$suffix"
    app scene mosaic "$suffix"
    echo "capturas $suffix"
  done
done

# --- Recortes para la web --------------------------------------------------------
# Coordenadas en píxeles de la captura (2x). Cada recorte sale igual en las
# cuatro variantes: solo cambia el tema o el idioma.
RAW="$SHOTS_WORK/raw"
mkdir -p "$OUT"
crop() { # nombre-captura salida geometría [ancho-final]
  for theme in light dark; do
    for lang in en es; do
      args=("$RAW/$1-$theme-$lang.png" -crop "$3" +repage)
      [ -n "${4:-}" ] && args+=(-resize "$4x")
      magick "${args[@]}" -strip -quality 82 -define webp:method=6 "$OUT/$2-$theme-$lang.webp"
    done
  done
}
crop hero hero 2880x1800+0+0 2400
crop hero hero-m 1360x1640+440+80 760
crop mosaic mosaic 2880x1800+0+0 2400
crop mosaic mosaic-m 1620x1716+444+84 760
crop review review 1640x1230+640+360
crop edit edit 1280x960+440+840
crop autocomplete autocomplete 1120x400+440+80
crop diagnostics diagnostics 1280x440+440+80
crop terminal terminal 1760x400+440+924
crop terminal terminal-m 1100x400+440+924

echo "listo: $(ls "$OUT" | wc -l) imágenes en $OUT"
