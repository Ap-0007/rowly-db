# Capturas de la web

Las capturas de `site/assets/img/shots` salen de la app real, no de maquetas. `shots.sh` las vuelve a hacer: abre la app en una pantalla virtual, la conecta a un PostgreSQL de demostración, prepara cada escena por el inspector de WebKit y recorta el resultado.

Cada escena existe en claro y oscuro (tema Rowly) y en inglés y español, con los mismos datos, consulta y encuadre. La web muestra la variante de su propio tema e idioma.

```bash
cd app && npx tauri build --debug --no-bundle && cd ..
tools/site-shots/shots.sh            # o: tools/site-shots/shots.sh ruta/a/rowly-db
```

Necesita Docker, Xvfb, `dbus-run-session`, ImageMagick, git y node. Tarda unos minutos.

## Qué hace

- Levanta PostgreSQL 18.6 en `127.0.0.1:55499` y carga `seed/shop.sql`: una tienda ficticia con nombres inventados y correos `@example.com`. El contenedor se borra al terminar.
- Copia `seed/queries` a un home temporal como carpeta SQL de la conexión, con un historial corto de git, para que la escena de la terminal tenga algo que mostrar.
- Ejecuta la app con `HOME`, `XDG_*` y el almacenamiento de WebKit en esa carpeta temporal: nunca usa tu perfil, tus conexiones ni tu llavero. El prompt de la terminal es neutro (sin usuario ni nombre de equipo).
- Lleva la ventana a 1440×900 píxeles lógicos a escala 2 (en Xvfb no hay gestor de ventanas, así que la app no puede maximizarse sola).
- Escribe 40 archivos WebP en `site/assets/img/shots`, con el nombre `<escena>-<tema>-<idioma>.webp`; los `-m` son los recortes estrechos para móviles.

## Escenas

| Escena | Archivos |
|---|---|
| Consulta y resultado | `hero`, `hero-m` |
| Grilla editada y cambios pendientes | `edit`, `review` |
| Autocompletado y diagnóstico | `autocomplete`, `diagnostics` |
| Terminal en la carpeta SQL | `terminal`, `terminal-m` |
| Consolas y resultados lado a lado | `mosaic`, `mosaic-m` |

`app.mjs` contiene cada escena. Si cambia la interfaz de la app (clases, etiquetas, atajos), la escena que se rompe falla con un timeout que nombra el elemento que esperaba.
