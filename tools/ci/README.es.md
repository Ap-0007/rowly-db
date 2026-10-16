# CI

[English](README.md)

Cada pull request y cada push a `develop` o `main` pasa por `.github/workflows/ci.yml`. Un planner decide qué tiene que correr según los archivos que cambiaron, corren los workflows elegidos y unos jobs de compuerta informan el resultado con nombres fijos.

## El plan

`tools/ci/select.mjs` lee `tools/ci/areas.json`:

- **Áreas**: rutas y los checks que eligen: `node` (check, Vitest y build del frontend), `rust` (paquetes extra), `terminal` (el PTY en macOS y Windows), `e2e` (recorridos en la app real), `resources` (ids de escenario), `sql` (motores), `site` y `release` (un build de release sin publicar). Un archivo suma los checks de cada área que lo cubre.
- **Paquetes de Rust**: salen de `cargo metadata`. El paquete de cada archivo cambiado y todos los del workspace que dependen de él (dependencia normal, de build, de dev o de plataforma). El manifiesto de un paquete elige todo el workspace. Lo que Cargo no ve (JSON incrustado con `include_str!`, corpus leído en tiempo de ejecución, tests que inspeccionan código de otro lenguaje) está en el mapa.
- **Todo** corre si cambia una ruta de `fullOn` (manifiestos raíz, lockfiles, workflows, este directorio), si una ruta no cae en ningún área o si el rango no se conoce (sin historia, base inválida). El resumen del job `Plan` dice los motivos y las rutas sin área.

`node tools/ci/select.test.mjs` compara el mapa con el repositorio: cada archivo versionado tiene que estar en un área, y los escenarios, motores y paquetes que nombra tienen que existir.

Para probarlo en local:

```bash
node tools/ci/select.mjs --diff origin/develop          # lo que correría esta rama
node tools/ci/select.mjs --files crates/drivers/postgres/src/lib.rs
```

## Compuertas

Los checks requeridos son jobs de compuerta que corren siempre: `Rust (fmt, clippy, test)`, `Node (check, test, build)`, `E2E (Linux, WebKitGTK)`, `Recursos (Linux, WebKitGTK)`, `SQL engine`, `Web` y `Release build`, más `CI gate`, que exige todos. Una compuerta falla si el plan falló, si algo elegido no terminó bien o si algo no elegido no se saltó. Nunca pasa por defecto.

Las comprobaciones del repositorio (inventario de tests, cobertura, dependencias, el grafo de arquitectura, el estado generado, la ventana de soporte y los tests de las herramientas) son baratas y leen los documentos, así que corren con cualquier cambio.

## Corridas completas

- **Release** (`release.yml`) llama a cada workflow completo sobre el commit del tag, con las semillas de fuzz de la release, y solo publica con la evidencia completa.
- **Nocturna** (`nightly.yml`) pide a `ci.yml` una corrida completa sobre `develop` con las semillas de la release.
- **A mano**: el workflow `CI` con `full`.

## Selección de Vitest

El plan calcula qué archivos de Vitest se relacionan con un cambio, más los tests de contrato que corren siempre (`vitest.always`). Mientras `vitest.selection` sea `shadow`, la selección solo aparece en el resumen y `npm test` corre completo. Con `active`, los PRs de frontend corren los tests relacionados y los contratos; `npm run check`, `npm run build` y los recorridos E2E siguen corriendo, y la nocturna y la release siguen corriendo todo. Antes de activarla hay que comparar la selección en sombra con corridas completas.

## Agregar un módulo

Un módulo, motor o extensión nuevo agrega una entrada a `areas.json` con sus rutas y checks. Mientras no la tenga, sus rutas no caen en ningún área y eligen todo.
