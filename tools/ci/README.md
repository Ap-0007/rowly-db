# CI

[Español](README.es.md)

Every pull request and every push to `develop` or `main` goes through `.github/workflows/ci.yml`. A planner decides what has to run from the files that changed, the selected workflows run, and a few gate jobs report the result under fixed names.

## The plan

`tools/ci/select.mjs` reads `tools/ci/areas.json`:

- **Areas** map paths to checks: `node` (frontend check, Vitest and build), `rust` (extra packages), `terminal` (the PTY on macOS and Windows), `e2e` (walks in the real app), `resources` (scenario ids), `sql` (engines), `site` and `release` (a release build without publishing). A file adds the checks of every area that covers it.
- **Rust packages** come from `cargo metadata`: the package that owns each changed file, plus every workspace package that depends on it (normal, build, dev or platform dependency). A package manifest selects the whole workspace. What Cargo cannot see (JSON embedded with `include_str!`, corpus files read at runtime, tests that inspect other languages' sources) is listed in the map.
- **Everything** runs when a path in `fullOn` changes (root manifests, lockfiles, workflows, this directory), when a path matches no area, or when the range is unknown (no history, invalid base). The summary of the `Plan` job lists the reasons and the unmatched paths.

`node tools/ci/select.test.mjs` checks the map against the repository: every tracked file must be covered by an area, and the resource ids, engines and packages it names must exist.

To try it locally:

```bash
node tools/ci/select.mjs --diff origin/develop          # what this branch would run
node tools/ci/select.mjs --files crates/drivers/postgres/src/lib.rs
```

## Gates

The required checks are gate jobs that always run: `Rust (fmt, clippy, test)`, `Node (check, test, build)`, `E2E (Linux, WebKitGTK)`, `Recursos (Linux, WebKitGTK)`, `SQL engine`, `Web` and `Release build`, plus `CI gate`, which requires all of them. A gate fails when the plan failed, when selected work did not succeed, or when unselected work was not skipped. A gate never passes by default.

The repository checks (test inventory, coverage, dependencies, the architecture graph, generated state, the support window and the tools' own tests) are cheap and read the docs, so they run on every change.

## Full runs

- **Release** (`release.yml`) calls every workflow in full on the tagged commit, with the release fuzz seeds, and publishes only with complete evidence.
- **Nightly** (`nightly.yml`) asks `ci.yml` for a full run on `develop` with the release fuzz seeds.
- **By hand**: run the `CI` workflow with `full`.

## Vitest selection

The plan computes which Vitest files a change relates to, plus the contract tests that always run (`vitest.always`). While `vitest.selection` is `shadow`, the selection only appears in the summary and `npm test` runs in full. Setting it to `active` makes frontend PRs run the related tests and the contracts; `npm run check`, `npm run build` and the E2E walks still run, and nightly and release still run everything. Compare the shadow selection against full runs before turning it on.

## Adding a module

A new module, engine or extension adds an entry to `areas.json` with its paths and checks. Until it does, its paths match no area: the run selects everything and the repository check (`select.test.mjs`) fails, naming the files that need an area.
