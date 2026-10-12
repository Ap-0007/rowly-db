# Website screenshots

The screenshots in `site/assets/img/shots` come from the real app, not from mockups. `shots.sh` builds them again: it starts the app in a virtual display, connects it to a demo PostgreSQL, sets up each scene through the WebKit inspector and crops the result.

Every scene exists in light and dark (Rowly theme) and in English and Spanish, with the same data, query and framing. The website shows the variant that matches its own theme and language.

```bash
cd app && npx tauri build --debug --no-bundle && cd ..
tools/site-shots/shots.sh            # or: tools/site-shots/shots.sh path/to/rowly-db
```

It needs Docker, Xvfb, `dbus-run-session`, ImageMagick, git and node. It takes a few minutes.

## What it does

- Starts PostgreSQL 18.6 on `127.0.0.1:55499` and loads `seed/shop.sql`: a fictional shop with invented names and `@example.com` addresses. The container is removed at the end.
- Copies `seed/queries` into a temporary home as the connection's SQL folder, with a short git history, so the terminal scene has something to show.
- Runs the app with `HOME`, `XDG_*` and WebKit storage in that temporary folder: your profile, connections and keyring are never used. The terminal prompt is neutral (no user or host name).
- Resizes the window to 1440×900 logical pixels at scale 2 (there is no window manager in Xvfb, so the app cannot maximize itself).
- Writes 40 WebP files into `site/assets/img/shots`, named `<scene>-<theme>-<language>.webp`; `-m` files are the narrower crops for phones.

## Scenes

| Scene | Files |
|---|---|
| Query and results | `hero`, `hero-m` |
| Edited grid and pending changes | `edit`, `review` |
| Autocomplete and diagnostics | `autocomplete`, `diagnostics` |
| Terminal in the SQL folder | `terminal`, `terminal-m` |
| Consoles and results side by side | `mosaic`, `mosaic-m` |

`app.mjs` holds each scene. When the app's interface changes (class names, labels, shortcuts), the scene that breaks fails with a timeout naming the element it waited for.
