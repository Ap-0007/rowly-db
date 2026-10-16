# Graph Report - khipu  (2026-10-16)

## Corpus Check
- 542 files · ~921,116 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 36 file(s) not represented in the graph (top: .css 12, (none) 10, .sig 8)

## Summary
- 5135 nodes · 12027 edges · 234 communities (206 shown, 28 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 476 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01c02074`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- execution_guard.rs
- editing.rs
- run.mjs
- EngineLines
- queryConsoles.ts
- DestructiveClassification
- driver-core/src/lib.rs
- updates.rs
- docs/ARCHITECTURE.md
- mysql/src/introspect.rs
- analysisSession.ts
- tauri.conf.json
- mysql/src/lib.rs
- postgres/src/lib.rs
- lib/types.ts
- KhipuLanguageServer
- Product
- connection.ts
- Adding a database engine
- dependencies
- engine_context.rs
- postgres/src/version.rs
- compilerOptions
- outputCopy.ts
- mysql/src/tls.rs
- devDependencies
- credentials.rs
- completionSource.ts
- default.json
- khipu-desktop
- postgres/src/introspect.rs
- sql_path
- ref_node_fs
- app-environment.ts
- ssr
- mysql/src/version.rs
- CLAUDE.md
- connectionProfiles.ts
- stores/updates.ts
- export.rs
- String
- FindBar
- sql_files.rs
- SchemaTree.svelte
- resources.mjs
- Design System: Rowly DB website
- pagination.rs
- diagnostics.ts
- resultEditing.ts
- diagnostics.rs
- Añadir un motor de base de datos
- @codemirror/state
- MySqlConnector
- server-tests/src/lib.rs
- support.rs
- filterBuilder.ts
- vitest
- sqlFiles.ts
- executionMarker.ts
- assembly.rs
- terminal.rs
- query.rs
- messages/index.ts
- selected
- select.mjs
- gridClipboard.ts
- tabGroups.ts
- ResultPager.svelte
- connection_error.rs
- createExecutionFlow
- TilePicker.svelte
- drivers.rs
- super
- queryHistory.ts
- desktop.py
- findBar.ts
- console_texts.rs
- version_lines.rs
- result_editing.rs
- workspace/mosaic.ts
- TablePlus UX & Architecture Analysis (design reference for Khipu)
- services/catalog.rs
- Dialect
- QueryCancel
- results.rs
- safety.rs
- svelte
- theme.ts
- tests.mjs
- render-site.py
- commentEditing.dom.test.ts
- connectionTest.ts
- reorder.ts
- parser.rs
- check-site.py
- AnalysisRunner
- graph.mjs
- formatLayout.ts
- main.js
- formatter.ts
- Release job (multi-platform build & publish)
- Message
- cellTypes.ts
- executionSession.ts
- workspace/commands.ts
- Option
- SQL engine quality contract
- ExportDialog.svelte
- AppState
- Contrato de calidad de los motores SQL
- Arquitectura
- connection.rs
- Atajos de teclado: modo escritorio y modo vim
- postgres/src/tls.rs
- compare.py
- MosaicArea.svelte
- evidence.mjs
- text_encoding.rs
- console.rs
- tooltip.ts
- ChangesPreview.svelte
- editorSettings.ts
- Diagnostic
- publish.mjs
- TerminalSession.svelte
- RawStatement<'q>
- +layout.svelte
- Extensiones opcionales y futura tienda — límites antes del runtime
- webkit_env.rs
- PostgresConnector
- explorerTree.ts
- NewlineMarker
- corpus.rs
- installFocusZones
- columnFilters.ts
- new.mjs
- lib/backend.ts
- .new
- search.ts
- analysis.rs
- commentStyle.ts
- svelte
- FileTree.svelte
- i18n/index.ts
- files.rs
- tests/lines.rs
- focusZones.ts
- app.mjs
- filters.rs
- desktop_portal.rs
- onPointerDown
- ConnectionEngineContext
- createAnalysisSession
- CI
- unused.mjs
- fetch.sh
- commands/catalog.rs
- Contribuir
- gridSelectionSummary.ts
- stores/shortcuts.ts
- ARCHITECTURE.es.md
- status.mjs
- search.dom.test.ts
- engines/index.ts
- coverage.mjs
- Engine
- DbConnector
- mysqlconnector
- postgresconnector
- RawStatement<'q>
- window.mjs
- lines.sh
- consoleFiles.ts
- treeKeys.ts
- createResultChanges
- gridNavigation.ts
- gridWindow.test.ts
- error_position.rs
- resultEdits.ts
- EditorConfiguration
- Performance measurements
- ExecutionFlow
- sqlPreviewFormat.ts
- gridFind.ts
- sqlStatements.ts
- contract.test.ts
- shots.sh
- crates_engine_tests_corpus_mixed_errors
- crates_engine_tests_corpus_mixed_mariadb
- crates_engine_tests_corpus_mixed_mysql
- crates_engine_tests_corpus_mixed_postgres
- ResultPane.svelte
- Test databases
- sidebarLayout.ts
- createSearchPanel
- notifications.ts
- scripts
- connectionIdentity.ts
- focusZones.keys.test.ts
- queryParameters.ts
- bundle.py
- gridSettings.ts
- replace.ts
- catalog_bench.rs
- apply
- 6. The matrix
- apply
- Terminal.svelte
- createdTables
- ColumnFilterPopover.svelte
- numpadKeys.ts
- Workspace.svelte
- ResultChangesController
- rects
- EditorCommands
- if
- queryConsoles.test.ts
- Mediciones de rendimiento
- @codemirror/search
- FindBarActions
- sys
- closest_names
- Website screenshots
- Surface brief: rowlydb.com (landing, community)

## God Nodes (most connected - your core abstractions)
1. `Dialect` - 118 edges
2. `vitest` - 102 edges
3. `svelte` - 54 edges
4. `Engine` - 54 edges
5. `@codemirror/state` - 44 edges
6. `analyze_statement()` - 40 edges
7. `SqlProfile` - 35 edges
8. `Diagnostic` - 35 edges
9. `ENGINES` - 34 edges
10. `createExecutionFlow()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Frontend (`app/src/lib`)` --references--> `engineForContext()`  [INFERRED]
  docs/ARCHITECTURE.es.md → app/src/lib/engines/index.ts
- `2. Principles` --references--> `SqlProfile`  [INFERRED]
  SQL_ENGINE.md → app/src/lib/engines/types.ts
- `6.5 Capabilities (current state)` --references--> `SqlProfile`  [INFERRED]
  SQL_ENGINE.md → app/src/lib/engines/types.ts
- `2. Principios` --references--> `SqlProfile`  [INFERRED]
  SQL_ENGINE.es.md → app/src/lib/engines/types.ts
- `6.5 Capacidades (estado actual)` --references--> `SqlProfile`  [INFERRED]
  SQL_ENGINE.es.md → app/src/lib/engines/types.ts

## Import Cycles
- 1-file cycle: `app/src-tauri/src/drivers.rs -> app/src-tauri/src/drivers.rs`

## Hyperedges (group relationships)
- **TablePlus edit-review-commit UX pattern group** — docs_design_tableplus_ux_arquitectura_explore_inspect_modify_review_commit, docs_design_tableplus_ux_arquitectura_pending_changes_commit, docs_design_tableplus_ux_arquitectura_application_shell [INFERRED 0.85]

## Communities (234 total, 28 thin omitted)

### Community 0 - "execution_guard.rs"
Cohesion: 0.07
Nodes (49): Cow, a_versioned_comment_is_read_both_ways_and_the_stricter_wins(), accepted(), add_column_insert_create_select_are_not_destructive(), backslashes_in_strings(), begin_and_end_as_names_do_not_open_or_close_blocks(), classify_selection(), cte_around_update_without_where_requires_confirmation() (+41 more)

### Community 1 - "editing.rs"
Cohesion: 0.11
Nodes (33): ast, analyze_editable_query(), build_change_statements(), CellValue, ColumnValue, distingue_columnas_alias_y_expresiones(), EditableQuery, escapa_valores_e_identificadores_por_dialecto() (+25 more)

### Community 2 - "run.mjs"
Cohesion: 0.08
Nodes (24): APP, args, count(), flows, PORT, resetData(), run(), seedProfiles() (+16 more)

### Community 3 - "EngineLines"
Cohesion: 0.18
Nodes (19): Capability, check_line(), compare(), EngineLines, FORMAT, Line, numbers(), PACKAGE_FORMAT (+11 more)

### Community 4 - "queryConsoles.ts"
Cohesion: 0.07
Nodes (39): ColumnFilters, isFilterOperator(), activateQueryConsole(), appendConsole(), consoleTitle(), createId(), createQueryConsole(), diskTexts (+31 more)

### Community 5 - "DestructiveClassification"
Cohesion: 0.12
Nodes (42): AlterTableOperation, after_handler_conditions(), classify(), classify_alter_table(), classify_by_structure(), classify_destructive_sql(), classify_drop(), classify_production() (+34 more)

### Community 6 - "driver-core/src/lib.rs"
Cohesion: 0.10
Nodes (29): CheckInfo, ColumnInfo, ConnectionConfig, EventInfo, ForeignKeyInfo, IndexInfo, KeyInfo, ParameterMode (+21 more)

### Community 7 - "updates.rs"
Cohesion: 0.05
Nodes (84): a_broken_or_unexpected_highlight_is_refused(), a_missing_file_or_image_falls_back_to_the_classic_prompt(), a_valid_highlight_is_read(), data_url(), fetch(), FORMAT, Highlight, HIGHLIGHT_FILE (+76 more)

### Community 8 - "docs/ARCHITECTURE.md"
Cohesion: 0.17
Nodes (17): app/README.md (Tauri + SvelteKit + TypeScript template note), DbConnector trait (contributor guidance), Dialect enum (crates/engine), Driver contract tests (#[ignore = "requires database"] pattern), Driver factory branch in app/src-tauri/src/drivers.rs, Cómo sumar un motor de base de datos nuevo (procedure), app/src-tauri shell layer, DbConnector trait (crates/driver-core) (+9 more)

### Community 9 - "mysql/src/introspect.rs"
Cohesion: 0.14
Nodes (36): COLUMNS_SQL, event_row(), EVENTS_SQL, fetch(), foreign_key_row(), FOREIGN_KEYS_SQL, format_parameter(), format_schedule() (+28 more)

### Community 10 - "analysisSession.ts"
Cohesion: 0.16
Nodes (14): BackendMessage, analysisCacheFor(), AnalysisContext, AnalysisDiagnostic, analysisDiagnostics(), AnalysisPosition, AnalysisSessionOptions, sameContext() (+6 more)

### Community 11 - "tauri.conf.json"
Cohesion: 0.06
Nodes (30): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+22 more)

### Community 12 - "mysql/src/lib.rs"
Cohesion: 0.13
Nodes (27): cancelled_before_start(), CONNECT_TIMEOUT, ER_UNSUPPORTED_PS, execute_on_connection(), ExecutionOutcome, hex_encode(), is_unsupported_in_prepared_protocol(), MAX_ROWS_TO_DRAIN (+19 more)

### Community 13 - "postgres/src/lib.rs"
Cohesion: 0.14
Nodes (22): async_trait, QueryExecutionOptions, cancelled_before_start(), CONNECT_TIMEOUT, execute_on_connection(), ExecutionOutcome, MAX_ROWS_TO_DRAIN, postgres_error_to_result() (+14 more)

### Community 14 - "lib/types.ts"
Cohesion: 0.06
Nodes (39): buildRoutineIndex(), CallArgument, callHints(), CatalogRoutine, findCalls(), isName(), labelsFor(), Name (+31 more)

### Community 15 - "KhipuLanguageServer"
Cohesion: 0.15
Nodes (11): CompletionParams, CompletionResponse, KhipuLanguageServer, Client, Option, Result, InitializeParams, InitializeResult (+3 more)

### Community 16 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 17 - "connection.ts"
Cohesion: 0.08
Nodes (40): toConnectionFailure(), getDriver(), forgetConnectionPassword(), loadConnectionPassword(), runtimePasswords, saveConnectionPassword(), activeEngine, activeProfile (+32 more)

### Community 18 - "Adding a database engine"
Cohesion: 0.09
Nodes (25): ConnectionConfig, ConnectionErrorKind, TlsStatus, Límites conocidos, 12. Harness, corpus and test servers, 13. Coverage, 14. Matrix, evidence and CI, 15. Documentation (+17 more)

### Community 19 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, codemirror, @codemirror/autocomplete, @codemirror/commands, @codemirror/lang-sql, @codemirror/language, @codemirror/search, @codemirror/state (+12 more)

### Community 20 - "engine_context.rs"
Cohesion: 0.15
Nodes (19): civil_date(), dotted(), effective_line(), identity(), LineIdentity, Lines, one_year_after(), Release (+11 more)

### Community 21 - "postgres/src/version.rs"
Cohesion: 0.12
Nodes (11): Capability, Capabilities, capabilities_by_version(), COMPATIBILITY_FLOOR_MAJOR, Capabilities, Self, String, Vec (+3 more)

### Community 22 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 23 - "outputCopy.ts"
Cohesion: 0.21
Nodes (12): COPY_CHOICES, CopyAmount, DEFAULT_COPY_AMOUNT, formatTimestamp(), lastLines(), loadCopyAmount(), MAX_CUSTOM_LINES, outputLines() (+4 more)

### Community 24 - "mysql/src/tls.rs"
Cohesion: 0.14
Nodes (13): connection_error(), io_error(), is_tls_failure(), kind_of(), read_status(), ConnectionErrorKind, DriverError, Error (+5 more)

### Community 25 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, happy-dom, svelte, svelte-check, @sveltejs/adapter-static, @sveltejs/kit, @sveltejs/vite-plugin-svelte, @tauri-apps/cli (+3 more)

### Community 26 - "credentials.rs"
Cohesion: 0.29
Nodes (12): delete(), entry(), existing_entry(), load(), nothing_stored(), Error, Option, Result (+4 more)

### Community 27 - "completionSource.ts"
Cohesion: 0.04
Nodes (86): argumentsSnippet(), buildCatalogCompletions(), catalogPosition, COMMON_FUNCTIONS, Entry, option(), prefixStartForNames(), complete() (+78 more)

### Community 28 - "default.json"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 29 - "khipu-desktop"
Cohesion: 0.62
Nodes (7): khipu-desktop, khipu-driver-core, khipu-driver-mysql, khipu-driver-postgres, khipu-engine, khipu-lsp, rowly-server-tests

### Community 30 - "postgres/src/introspect.rs"
Cohesion: 0.10
Nodes (46): build_parameters, balanced(), build_parameters(), check_expression(), COLUMNS_SQL, constraint_column_row(), CONSTRAINT_COLUMNS_SQL, ConstraintColumnRow (+38 more)

### Community 32 - "ref_node_fs"
Cohesion: 0.11
Nodes (19): ENGINE_SOURCES, ref_node_assert, ref_node_child_process, ref_node_fs, ref_node_os, ref_node_path, ref_node_test, ref_node_url (+11 more)

### Community 37 - "mysql/src/version.rs"
Cohesion: 0.11
Nodes (14): Capabilities, check_constraints_depend_on_flavor_and_version(), CheckConstraints, COMPATIBILITY_FLOOR_MARIADB, COMPATIBILITY_FLOOR_MYSQL, Flavor, Capabilities, Self (+6 more)

### Community 41 - "connectionProfiles.ts"
Cohesion: 0.12
Nodes (20): openInNewWindow(), openConnectionWindow(), PasswordPolicy, CONNECTION_ENVIRONMENTS, ConnectionEnvironment, ConnectionProfile, connectionProfiles, isDriver() (+12 more)

### Community 42 - "stores/updates.ts"
Cohesion: 0.06
Nodes (31): CachedCheck, checkForUpdates(), checking, checkOnStartup(), DEFAULT_PREFS, errorCode(), InstallKind, installRelease() (+23 more)

### Community 43 - "export.rs"
Cohesion: 0.13
Nodes (24): ALLOWED_EXTENSIONS, columns(), csv_field(), export(), export_as(), ExportFormat, FileSink, is_json() (+16 more)

### Community 44 - "String"
Cohesion: 0.16
Nodes (17): Checker<'a, '_>, output_columns(), Repaired, Expr, Ident, ObjectName, Query, SetExpr (+9 more)

### Community 45 - "FindBar"
Cohesion: 0.17
Nodes (3): MatchStatus, FindBar, ReplaceBar

### Community 46 - "sql_files.rs"
Cohesion: 0.25
Nodes (22): absolute_dir(), create(), encoding_label(), io_failure(), is_sql_file_name(), list_dir(), read(), rename() (+14 more)

### Community 47 - "SchemaTree.svelte"
Cohesion: 0.27
Nodes (5): destroy(), child(), tabScroll(), reveal(), update()

### Community 48 - "resources.mjs"
Cohesion: 0.05
Nodes (52): shown(), addSession(), alive(), APP, appHeapMb(), appObjects(), args, assertStable() (+44 more)

### Community 49 - "Design System: Rowly DB website"
Cohesion: 0.07
Nodes (28): Buttons, Cards / Containers (bordered panels), Colors, Components, Design System: Rowly DB website, Do:, Do's and Don'ts, Don't: (+20 more)

### Community 50 - "pagination.rs"
Cohesion: 0.11
Nodes (40): GuardOptions, column_values_sql(), ColumnFilter, con_no_backslash_escapes_y_barras_no_se_reescribe(), count_sql(), el_filtrado_se_ordena_pagina_y_cuenta(), filter(), filter_condition() (+32 more)

### Community 51 - "diagnostics.ts"
Cohesion: 0.04
Nodes (62): AnalysisRunnerOptions, create(), runner(), typed(), at(), found(), ranges(), createDiagnosticPopup() (+54 more)

### Community 52 - "resultEditing.ts"
Cohesion: 0.11
Nodes (26): addNewRow(), commitCell(), fillSelectedCells(), addRow(), applyChanges(), ColumnValue, EditTarget, fetchEditInfo() (+18 more)

### Community 53 - "diagnostics.rs"
Cohesion: 0.06
Nodes (55): a_missing_comma_between_values(), a_misspelled_clause_taken_as_an_alias(), a_misspelled_keyword_at_the_start(), a_misspelled_verb_or_a_wrong_end_inside_a_routine_is_reported_where_it_is(), a_trailing_comma_points_at_the_comma(), a_view_without_described_columns_flags_none(), AFTER_LIST_KEYWORDS, AFTER_MISSING_TABLE (+47 more)

### Community 54 - "Añadir un motor de base de datos"
Cohesion: 0.09
Nodes (24): reservedWords(), 10. Generated SQL, 6. Version lines, 10. SQL generado, 12. Harness, corpus y servidores de prueba, 13. Cobertura, 14. Matriz, evidencia y CI, 15. Documentación (+16 more)

### Community 55 - "@codemirror/state"
Cohesion: 0.05
Nodes (52): description, license, name, type, version, activeStatementHighlight, autoUppercaseSqlKeywords, lineColumns() (+44 more)

### Community 56 - "MySqlConnector"
Cohesion: 0.14
Nodes (18): MySqlConnector, open_pool(), Capabilities, ConnectionConfig, DriverError, MySqlConnectOptions, MySqlPool, MySqlRow (+10 more)

### Community 57 - "server-tests/src/lib.rs"
Cohesion: 0.14
Nodes (19): Capability, Declared, declared_servers(), declared_version(), entries(), Entry, evidence(), fuzz_evidence() (+11 more)

### Community 58 - "support.rs"
Cohesion: 0.07
Nodes (89): a_a_signed_index_and_its_packages_are_accepted(), a_closed_port_says_the_server_does_not_respond_not_what_reqwest_says(), a_server_that_never_answers_is_a_timeout(), activate_installed(), ACTIVATION, an_http_error_says_its_status(), an_index_with_two_entries_for_a_line_a_path_or_an_unknown_field_is_rejected(), an_unresolvable_host_says_there_is_no_network() (+81 more)

### Community 59 - "filterBuilder.ts"
Cohesion: 0.15
Nodes (15): schemaOption(), buildWhere(), conditionSql(), FILTER_OPERATORS, FilterCondition, FilterJoin, FilterOperator, listValues() (+7 more)

### Community 60 - "vitest"
Cohesion: 0.06
Nodes (42): slice(), BETWEEN_FIRST, BETWEEN_SECOND, COLUMN, columnNextTo(), LEFT, NAME, NOT_COLUMNS (+34 more)

### Community 61 - "sqlFiles.ts"
Cohesion: 0.10
Nodes (35): invoke(), confirmTrash(), finishEdit(), onEditKeydown(), createSqlFile(), listSqlDir(), openSqlFileAtPath(), openSqlFileWithDialog() (+27 more)

### Community 62 - "executionMarker.ts"
Cohesion: 0.08
Nodes (24): editedLines(), executionMarker, executionMarkerField, ExecutionMarkerInput, ExecutionMarkerStatus, executionPart, executionTimeDecorations(), executionTimePositions() (+16 more)

### Community 63 - "assembly.rs"
Cohesion: 0.15
Nodes (23): drops_rows_for_unknown_relations(), group(), groups_multi_column_keys_in_column_order(), groups_non_adjacent_rows_of_the_same_constraint(), ignores_duplicate_relation_names(), IndexColumnRow, key_row(), KeyColumnRow (+15 more)

### Community 64 - "terminal.rs"
Cohesion: 0.06
Nodes (80): ack(), ack_terminal(), alive(), bash(), cerrar_con_el_lector_detenido_no_deja_nada(), cien_aperturas_y_cierres_no_dejan_procesos_ni_registros(), close(), close_all() (+72 more)

### Community 65 - "query.rs"
Cohesion: 0.15
Nodes (33): a_script_is_checked_statement_by_statement(), analyze_sql(), cancel_query(), check_statement(), classify_statements(), column_values(), ColumnValue, ColumnValues (+25 more)

### Community 66 - "messages/index.ts"
Cohesion: 0.26
Nodes (3): defineMessages(), OtherLocale, Namespaces

### Community 67 - "selected"
Cohesion: 0.18
Nodes (30): declared_tls(), IntoIterator, selected(), a_result_set_keeps_values_and_nulls(), a_server_error_keeps_its_code_and_position(), connector(), connects_and_lists_schemas_and_tables(), ddl_returns_a_command() (+22 more)

### Community 68 - "select.mjs"
Cohesion: 0.15
Nodes (21): areaMatches(), cargoMetadata(), CHECKS, commitExists(), diff(), git(), githubRange(), globToRegExp() (+13 more)

### Community 69 - "gridClipboard.ts"
Cohesion: 0.13
Nodes (22): COPY_FORMATS, CopyColumn, CopyFormat, CopyOptions, csvField(), externalValue(), jsonValue(), markdownField() (+14 more)

### Community 70 - "tabGroups.ts"
Cohesion: 0.22
Nodes (20): editorGroups, load(), leaves(), Mosaic, parseMosaic(), siblingOf(), choose(), copyGroups() (+12 more)

### Community 71 - "ResultPager.svelte"
Cohesion: 0.09
Nodes (17): applyCustom(), changePageSize(), goLast(), lastOffsetFor(), navButton(), forgetPinnedTables(), isPinned(), PinnedTable (+9 more)

### Community 72 - "connection_error.rs"
Cohesion: 0.13
Nodes (16): ConnectionErrorKind, DriverError, io_error_kind(), is_lookup_failure(), probe_reports_a_closed_port_at_once(), probe_tcp(), Duration, ErrorKind (+8 more)

### Community 73 - "createExecutionFlow"
Cohesion: 0.11
Nodes (27): appendLog(), beginQueryExecution(), cancelQueryConfirmation(), clearQueryResult(), executionForConsole(), finishQueryExecution(), requireQueryConfirmation(), setQueryColumnFilters() (+19 more)

### Community 74 - "TilePicker.svelte"
Cohesion: 0.13
Nodes (11): active, byId, filtered, move(), onKeydown(), pick(), query, OPTICAL_SIZES (+3 more)

### Community 75 - "drivers.rs"
Cohesion: 0.16
Nodes (19): connect(), ConnectedDatabase, DatabaseKind, open(), report(), Arc, C, ConnectionConfig (+11 more)

### Community 76 - "super"
Cohesion: 0.11
Nodes (20): DEFINITION, UNPARSED, DoBlocks, EngineDefinition, ExactText, InsertDefaults, RoutineBodies, Option (+12 more)

### Community 77 - "queryHistory.ts"
Cohesion: 0.20
Nodes (14): filterHistory(), flushQueryHistory(), groupHistoryByDay(), HistoryDay, HistoryEntry, HistoryOutcome, isEntry(), load() (+6 more)

### Community 78 - "desktop.py"
Cohesion: 0.15
Nodes (24): platform, signal, statistics, apps(), children(), clients(), close(), cpu_ticks() (+16 more)

### Community 79 - "findBar.ts"
Cohesion: 0.28
Nodes (15): autosize(), element(), icon(), ICONS, insertNewline(), label(), textField(), toggleButton() (+7 more)

### Community 80 - "console_texts.rs"
Cohesion: 0.14
Nodes (23): frontend_commands(), String, io_failure(), prune(), read(), AppHandle, Message, Option (+15 more)

### Community 81 - "version_lines.rs"
Cohesion: 0.20
Nodes (24): engine_selected(), error_text(), check_version(), engine_named(), entry_since(), every_column_type_a_line_returns_is_read(), every_version_line_is_told_apart_from_the_previous_one(), expected() (+16 more)

### Community 82 - "result_editing.rs"
Cohesion: 0.28
Nodes (19): edit_info(), EditableColumn, EditTarget, find_table(), names(), ResultEditInfo, BTreeMap, Message (+11 more)

### Community 83 - "workspace/mosaic.ts"
Cohesion: 0.21
Nodes (18): contains(), Direction, Divider, dividers(), dropSide(), halves(), leaf(), MIN_RATIO (+10 more)

### Community 84 - "TablePlus UX & Architecture Analysis (design reference for Khipu)"
Cohesion: 0.12
Nodes (17): CSS_VAR_NAMES field-to-CSS-variable mapping, app/src/app.html (SvelteKit shell HTML), SHELL_PALETTES literal (datagrip/vscode x dark/light), palettes.ts palette definitions (external reference, file not read in this chunk), theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk), Theme bootstrap IIFE (pre-paint CSS var injection), Rationale: palette literals duplicated inline to avoid flash-of-unstyled-theme before SvelteKit ES modules load, app/src frontend layer (Svelte + CodeMirror 6) (+9 more)

### Community 85 - "services/catalog.rs"
Cohesion: 0.15
Nodes (15): preserves_column_metadata(), preserves_foreign_keys(), IntoIterator, tables_to_catalog(), catalog, CatalogColumn, CatalogForeignKey, CatalogTable (+7 more)

### Community 86 - "Dialect"
Cohesion: 0.09
Nodes (21): MYSQL, ACTIVE_LINES, ALL, cada_motor_tiene_su_identidad(), coincide_con_el_contrato_compartido_con_el_frontend(), Dialect, .ALL, la_fila_con_valores_por_defecto_es_sql_valido() (+13 more)

### Community 87 - "QueryCancel"
Cohesion: 0.23
Nodes (5): a_late_cancel_never_touches_the_connection_again(), CancelState, QueryCancel, Mutex, Option

### Community 88 - "results.rs"
Cohesion: 0.15
Nodes (23): apply_result_changes(), export_query_to_file(), ExportRequest, ExportSummary, preview_result_changes(), production_write_allowed(), result_edit_info(), Message (+15 more)

### Community 89 - "safety.rs"
Cohesion: 0.14
Nodes (23): attacks_corpus(), FRAGMENTS_MYSQL, FRAGMENTS_PG, fresh(), fresh_scratch(), fuzzing_the_guard_against_the_real_servers_finds_no_second_statement(), INJECTIONS, Lcg (+15 more)

### Community 90 - "svelte"
Cohesion: 0.15
Nodes (25): addPinnedTab(), addResultTab(), consoleOfKey(), forgetPinnedResults(), pinnedResults, PinnedTab, removePinnedTab(), resultKey() (+17 more)

### Community 91 - "theme.ts"
Cohesion: 0.06
Nodes (45): buildCmTheme(), BUILTIN_FUNCTIONS, builtinCallMark, createCmTheme(), themes, TOKEN_CHROME, WORD_OPERATORS, wordClassHighlight (+37 more)

### Community 92 - "tests.mjs"
Cohesion: 0.08
Nodes (24): args, byPath, cargo, cargoBinary(), check, DECISIONS, e2eEntry(), GATES (+16 more)

### Community 93 - "render-site.py"
Cohesion: 0.13
Nodes (19): datetime, app_version(), comments_block(), engine_rows(), esc(), fill(), main(), Path (+11 more)

### Community 94 - "commentEditing.dom.test.ts"
Cohesion: 0.18
Nodes (8): blockClosingAt(), commentEditing, editor(), views, ENCLOSING, reaches(), typing, @lezer/common

### Community 95 - "connectionTest.ts"
Cohesion: 0.14
Nodes (18): ConnectionTarget, explainConnectionFailure(), ExplainedFailure, KNOWN_KINDS, target, describeTls(), summarizeError(), summarizeReport() (+10 more)

### Community 96 - "reorder.ts"
Cohesion: 0.13
Nodes (9): beginDragging(), Ghost, liftGhost(), Point, pointer(), tabs(), reorderable(), ReorderParams (+1 more)

### Community 97 - "parser.rs"
Cohesion: 0.25
Nodes (3): ParserError, Result, validate()

### Community 98 - "check-site.py"
Cohesion: 0.15
Nodes (16): check_giscus(), check_output(), resolve(), local_file(), main(), Page, page_url_of(), Path (+8 more)

### Community 99 - "AnalysisRunner"
Cohesion: 0.21
Nodes (3): AnalysisRunner, merge(), subtract()

### Community 100 - "graph.mjs"
Cohesion: 0.11
Nodes (16): blocks, CLASSES, crates, dataNames, debt, dependencies(), DOCS, edges (+8 more)

### Community 101 - "formatLayout.ts"
Cohesion: 0.34
Nodes (17): alignColumnDefinitions(), alignConditionsPass(), alignJoinsPass(), alignPass(), hasComment(), indentOf(), joinConditionPass(), LayoutOptions (+9 more)

### Community 102 - "main.js"
Cohesion: 0.12
Nodes (13): applyTheme(), barCta, comments, cover, detected, giscusTheme(), giscusThemeUrl(), heroCta (+5 more)

### Community 103 - "formatter.ts"
Cohesion: 0.12
Nodes (24): FormatSettings, format(), upperOperatorWords(), applyIndentation(), CLAUSES_WITH_INLINE_BODY, compactStructuredLayout(), compactStructuredLayoutPass(), FormatFailure (+16 more)

### Community 104 - "Release job (multi-platform build & publish)"
Cohesion: 0.50
Nodes (4): Release job (multi-platform build & publish), tauri-apps/tauri-action, Release CI Workflow, Flujo de ramas y releases (branch protection + release flow)

### Community 105 - "Message"
Cohesion: 0.14
Nodes (14): app_text_travels_as_key_and_params(), Message, raw_text_travels_as_a_plain_string(), BTreeMap, Formatter, From, Into, Option (+6 more)

### Community 106 - "cellTypes.ts"
Cohesion: 0.18
Nodes (15): BOOLEAN, enumValues(), impossibleClock(), impossibleIsoDate(), INTEGER_ALIASES, INTEGER_RANGES, InvalidCell, modifiers() (+7 more)

### Community 107 - "executionSession.ts"
Cohesion: 0.08
Nodes (32): cancelQuery(), classifyStatements(), columnValues(), countQueryRows(), executeQuery(), PageRequest, StatementCheck, ColumnFilterRequest (+24 more)

### Community 108 - "workspace/commands.ts"
Cohesion: 0.20
Nodes (17): Zone, commandDefinitions, CommandGroup, CommandHandler, commandsCollide(), CommandZone, handlerKey(), handlers (+9 more)

### Community 109 - "Option"
Cohesion: 0.17
Nodes (19): analyze_statement_with(), DiagnosticMessage, expected_found(), friendly_syntax(), is_simple_token(), join_constraint(), key(), removed_syntax() (+11 more)

### Community 110 - "SQL engine quality contract"
Cohesion: 0.08
Nodes (26): 10.1 Layout, 10.2 Rules, 10.3 Simulations, 10. Tests, fixtures and simulations, 12.1 New engine, 12.2 New line of an existing engine, 12.3 New exact release within a line, 12. Adding an engine, a line or a release (+18 more)

### Community 111 - "ExportDialog.svelte"
Cohesion: 0.16
Nodes (12): format(), highlightSql(), KEYWORDS, detectJsonColumns(), escapeHtml(), highlightJson(), HTML_ESCAPES, isJsonColumnType() (+4 more)

### Community 112 - "AppState"
Cohesion: 0.10
Nodes (30): the_analysis_uses_the_line_only_when_it_is_of_the_profiles_engine(), a_new_mode_is_a_new_generation_and_a_new_connection_is_a_reset(), ActiveConnection, AppState, build_catalog(), ConsoleChange, context(), DatabaseExplorer (+22 more)

### Community 113 - "Contrato de calidad de los motores SQL"
Cohesion: 0.07
Nodes (28): 10.1 Estructura, 10.2 Reglas, 10.3 Simulaciones, 10. Tests, fixtures y simulaciones, 12.1 Motor nuevo, 12.2 Línea nueva de un motor existente, 12.3 Versión exacta nueva dentro de una línea, 12. Agregar un motor, una línea o una versión (+20 more)

### Community 114 - "Arquitectura"
Cohesion: 0.14
Nodes (14): disconnect(), Arquitectura, Capas y dependencias, Cinco cosas que no son lo mismo, Cómo fluye el SQL, Frontend (`app/src/lib`), Fronteras que se comprueban solas, `khipu-lsp` (+6 more)

### Community 115 - "connection.rs"
Cohesion: 0.13
Nodes (23): a_connection_failure_keeps_its_shape(), connect(), ConnectFailure, delete_connection_password(), disconnect(), load_connection_password(), ConnectionConfig, ConnectionErrorKind (+15 more)

### Community 116 - "Atajos de teclado: modo escritorio y modo vim"
Cohesion: 0.07
Nodes (26): t(), CatalogTableRef, definitionLinkExtension(), DefinitionLinkOptions, DefinitionLinkPlugin, isModifierHeld(), linkRangeField, setLinkRange (+18 more)

### Community 117 - "postgres/src/tls.rs"
Cohesion: 0.15
Nodes (11): connection_error(), io_error(), is_tls_failure(), kind_of(), read_status(), ConnectionErrorKind, DriverError, Error (+3 more)

### Community 118 - "compare.py"
Cohesion: 0.21
Nodes (10): json, pathlib, dispersion(), leaves(), main(), Compara una medicion con la referencia (tools/bench/baseline/<etiqueta>/).…, Rutas a numeros comparables: medianas, p50/p95/p99 y totales., dispersion_pct del resumen al que pertenece la ruta, si existe. (+2 more)

### Community 119 - "MosaicArea.svelte"
Cohesion: 0.24
Nodes (12): clampRatio(), dropTarget(), finish(), onDividerKeydown(), onKey(), onMove(), startResize(), onMove() (+4 more)

### Community 120 - "evidence.mjs"
Cohesion: 0.11
Nodes (24): query(), Pruebas contra una base real, Backend (`app/src-tauri/src`), 5.2 Support policy, 5.2 Política de soporte, ENGINE, LINE_SUITES, origin() (+16 more)

### Community 121 - "text_encoding.rs"
Cohesion: 0.16
Nodes (13): cada_encoding_va_y_vuelve_igual(), decode(), decode_utf16(), encode(), Result, String, Vec, SAMPLE (+5 more)

### Community 122 - "console.rs"
Cohesion: 0.12
Nodes (18): atomic, a_connection_that_does_not_open_leaves_the_slot_empty(), ConsoleConnection, ConsoleConnection<C>, ConsoleGuard, ConsoleGuard<'_, C>, opening_the_first_connection_loses_no_session_and_closing_one_does(), AtomicU64 (+10 more)

### Community 123 - "tooltip.ts"
Cohesion: 0.19
Nodes (16): shortcutKeyParts(), ensureElement(), hide(), hideTooltipFor(), place(), prettyShortcut(), resolve(), Resolved (+8 more)

### Community 124 - "ChangesPreview.svelte"
Cohesion: 0.15
Nodes (14): onKeydown(), onKeydownCapture(), blocksHeldEnter(), confirmsOnEnter(), moveDialogActionFocus(), Box, installDialogMotion(), isBackdropClick() (+6 more)

### Community 125 - "editorSettings.ts"
Cohesion: 0.17
Nodes (14): DEFAULT_FORMATTER_LINE_WIDTH, defaultEditorSettings(), loadEditorSettings(), MAX_FORMATTER_LINE_WIDTH, MIN_FORMATTER_LINE_WIDTH, normalizeIndentSize(), normalizeIndentStyle(), normalizeLineWidth() (+6 more)

### Community 126 - "Diagnostic"
Cohesion: 0.23
Nodes (28): at_token(), byte_offset(), check(), Diagnostic, handler_action(), inspect_routine_chunk(), keyword_text(), mysql_routine_errors() (+20 more)

### Community 127 - "publish.mjs"
Cohesion: 0.14
Nodes (21): ref_node_crypto, base, env, mysql, out, r2, ten, valid (+13 more)

### Community 128 - "TerminalSession.svelte"
Cohesion: 0.15
Nodes (9): focus(), closeTerminal(), createTerminal(), TerminalCallbacks, TerminalInfo, writeTerminal(), take(), @tauri-apps/api (+1 more)

### Community 129 - "RawStatement<'q>"
Cohesion: 0.18
Nodes (8): RawStatement<'q>, Arguments, BoxDynError, Execute, Option, Statement, vector_text(), MySql

### Community 130 - "+layout.svelte"
Cohesion: 0.09
Nodes (23): setSidebarRevealer(), initLocaleEffects(), onePerFrame(), frames, setFilePanelHeight(), app_src_lib_styles_alert_dialog, app_src_lib_styles_buttons, app_src_lib_styles_controls (+15 more)

### Community 131 - "Extensiones opcionales y futura tienda — límites antes del runtime"
Cohesion: 0.17
Nodes (12): 1. Tres cosas que no se mezclan, 2. Superficies de extensión, 3. Paquete y confianza, 4. Ciclo de vida y fallos, 5. Presupuesto de ligereza, 6. Orden de trabajo y compuertas, Código ejecutable: propuesta sujeta a prototipo, Dos ejemplos que prueban límites distintos (+4 more)

### Community 132 - "webkit_env.rs"
Cohesion: 0.25
Nodes (6): apply(), DMABUF_VAR, SET_BY_ROWLY, should_disable_dmabuf(), AtomicBool, should_disable_dmabuf

### Community 133 - "PostgresConnector"
Cohesion: 0.14
Nodes (16): open_pool(), PostgresConnector, Capabilities, ConnectionConfig, DriverError, Error, PgPool, Result (+8 more)

### Community 134 - "explorerTree.ts"
Cohesion: 0.11
Nodes (22): buildExplorerTree(), columnList(), expandableKeys(), ExplorerIcon, ExplorerNode, folder(), matches(), pinKey() (+14 more)

### Community 136 - "corpus.rs"
Cohesion: 0.26
Nodes (15): catalog(), check(), consolas_mezcladas_no_dan_falsos_positivos(), created(), errores_ordinarios_siguen_detectandose(), lo_comun_no_da_falsos_positivos_en_ningun_motor(), lo_de_mysql_y_mariadb_no_da_falsos_positivos(), lo_de_postgres_no_da_falsos_positivos() (+7 more)

### Community 137 - "installFocusZones"
Cohesion: 0.19
Nodes (22): clearMark(), flash(), focusZone(), holding(), installFocusZones(), cancelMarkTimer(), markCurrent(), modifierOf() (+14 more)

### Community 138 - "columnFilters.ts"
Cohesion: 0.27
Nodes (13): canFilterOnServer(), collator, columnValueCounts(), filterRequests(), NULL_KEY, rowsHiddenByFilters(), serverValueCounts(), sortValueCounts() (+5 more)

### Community 139 - "new.mjs"
Cohesion: 0.10
Nodes (17): EditorCommandsOptions, 11. Version support packs, 11. Paquetes de soporte de versión, args, base, contract, contractPath, corpus (+9 more)

### Community 140 - "lib/backend.ts"
Cohesion: 0.25
Nodes (7): backendText(), isKeyed(), OWNERS, rustFiles, sources, translatedRejection(), command()

### Community 141 - ".new"
Cohesion: 0.22
Nodes (8): offset_at(), Position, quoted_routine_definition(), Repaired<'a>, From, Self, Suggestion, Location

### Community 142 - "search.ts"
Cohesion: 0.13
Nodes (21): __test, exclusionMarks, newlineMarkers, createSession(), addExclusion, clearExclusions, exclusionField, filteredQuery() (+13 more)

### Community 143 - "analysis.rs"
Cohesion: 0.14
Nodes (28): classification(), is_error(), routines_corpus(), QueryExecutionResult, call_and_show_create_return_their_rows(), char_offset(), common_valid_ddl_and_dml_is_never_objected_to(), everyday_queries() (+20 more)

### Community 144 - "commentStyle.ts"
Cohesion: 0.18
Nodes (13): blockText(), commentDecorations(), commentMarks(), commentStyle, commentStylePlugin, commentStyleTheme, styled(), views (+5 more)

### Community 145 - "svelte"
Cohesion: 0.07
Nodes (13): neutral, indexOf(), Icon, icons, shortcutText(), $t(), colorLabel(), CONNECTION_COLORS (+5 more)

### Community 146 - "FileTree.svelte"
Cohesion: 0.11
Nodes (16): active, fileMenuItems(), folderMenuItems(), requestTrash(), startCreate(), startRename(), entry(), DEFAULT_FILE_PANEL_HEIGHT (+8 more)

### Community 147 - "i18n/index.ts"
Cohesion: 0.15
Nodes (19): interpolate(), loadPreference(), locale, localePreference, lookup(), MessageParams, numberFormat, systemLocale() (+11 more)

### Community 148 - "files.rs"
Cohesion: 0.27
Nodes (18): create_sql_file(), list_sql_dir(), prune_console_texts(), read_console_text(), read_sql_file(), rename_sql_file(), AppHandle, Message (+10 more)

### Community 149 - "tests/lines.rs"
Cohesion: 0.13
Nodes (19): a_version_selects_the_closest_line_below_it(), every_registered_engine_declares_its_own_lines_and_the_test_servers_use_them(), every_reserved_word_of_a_line_is_one_its_fixtures_prove(), every_test_server_and_every_verified_version_selects_the_line_it_proves(), fixture(), no_known_consumer_declares_versioned_behavior_by_itself_again(), registry(), removed_in() (+11 more)

### Community 150 - "focusZones.ts"
Cohesion: 0.14
Nodes (14): activeZone, Direction, DIRECTION_COMMANDS, flashTimers, lastFocused, navigators, neighborZone(), SAME_COLUMN (+6 more)

### Community 151 - "app.mjs"
Cohesion: 0.22
Nodes (12): connectInspector(), liveHeap(), pageSocket(), sleep(), startApp(), [command, ...args], DB_PORT, run() (+4 more)

### Community 152 - "filters.rs"
Cohesion: 0.20
Nodes (13): btreemap, Grid, HOSTILE, ids(), Option, Result, String, Vec (+5 more)

### Community 153 - "desktop_portal.rs"
Cohesion: 0.43
Nodes (7): report_slow_start(), Duration, Option, String, SLOW_START, slow_start_hint(), solo_avisa_de_un_arranque_lento()

### Community 154 - "onPointerDown"
Cohesion: 0.33
Nodes (14): prefersReducedMotion(), onPointerDown(), autoScroll(), cleanup(), detach(), onCancel(), onMove(), onUp() (+6 more)

### Community 155 - "ConnectionEngineContext"
Cohesion: 0.17
Nodes (14): a_request_from_another_generation_or_epoch_is_no_longer_current(), ConnectionEngineContext, line_support(), Arc, Option, Self, SupportStatus, SessionMode (+6 more)

### Community 156 - "createAnalysisSession"
Cohesion: 0.24
Nodes (3): Region, AnalysisSession, createAnalysisSession()

### Community 157 - "CI"
Cohesion: 0.14
Nodes (12): Adding a module, CI, Agregar un módulo, CI, Compuertas, Corridas completas, El plan, Selección de Vitest (+4 more)

### Community 158 - "unused.mjs"
Cohesion: 0.11
Nodes (16): commands, configText, dependencies, escape(), exportsWithoutConsumer, frontFiles, handler, lib (+8 more)

### Community 159 - "fetch.sh"
Cohesion: 0.33
Nodes (6): dataset(), matches(), fetch.sh script, pg(), selected(), up.sh script

### Community 160 - "commands/catalog.rs"
Cohesion: 0.20
Nodes (16): database_explorer(), list_tables(), BTreeMap, CatalogTable, DatabaseExplorer, Message, Option, Result (+8 more)

### Community 161 - "Contribuir"
Cohesion: 0.22
Nodes (9): Agregar un motor de base de datos, Contribuir, Estilo, Flujo de trabajo, Nombres, Novedad de la versión, Primeros pasos, Publicar una versión (+1 more)

### Community 162 - "gridSelectionSummary.ts"
Cohesion: 0.20
Nodes (13): PasteBlock, DecimalSum, formatDecimal(), isNumericType(), NUMERIC_TYPES, SelectionSummary, summarizeSelection(), SummaryInput (+5 more)

### Community 163 - "stores/shortcuts.ts"
Cohesion: 0.12
Nodes (18): handleRecordKeydown(), installKeybindings(), onKeydown(), onKeyup(), track(), withHeld(), modifierOfCode(), formatShortcutEvent() (+10 more)

### Community 164 - "ARCHITECTURE.es.md"
Cohesion: 0.19
Nodes (8): README.es.md (Spanish), Capturas de la web, Escenas, Qué hace, Bases de datos de prueba, Líneas de versión, Pruebas contra servidor, Uso

### Community 165 - "status.mjs"
Cohesion: 0.18
Nodes (16): compare(), connections, coverage, coverageBlock(), DOCS, engines, enginesBlock(), json() (+8 more)

### Community 166 - "search.dom.test.ts"
Cohesion: 0.18
Nodes (10): click(), findArea(), findRow(), flush(), replaceAll(), replaceArea(), replaceRow(), select() (+2 more)

### Community 167 - "engines/index.ts"
Cohesion: 0.10
Nodes (40): ConnectionDriver, byAnalyzerLocation(), byNearFragment(), byServerPosition(), firstLocated(), tokenAt(), ansiString(), caseInsensitiveName() (+32 more)

### Community 168 - "coverage.mjs"
Cohesion: 0.14
Nodes (12): cited, contract, coverage, ENGINES, lines, matrix, problems, rows (+4 more)

### Community 169 - "Engine"
Cohesion: 0.12
Nodes (12): Conn, dotted(), Engine, .ALL, NoBackslashEscapes, ConnectionConfig, DriverError, Drop (+4 more)

### Community 170 - "DbConnector"
Cohesion: 0.16
Nodes (12): DbConnector, DriverError, RowSink, ConnectionErrorKind, Formatter, Future, Message, Output (+4 more)

### Community 173 - "RawStatement<'q>"
Cohesion: 0.20
Nodes (7): RawStatement<'q>, Arguments, BoxDynError, Execute, Option, Statement, Postgres

### Community 174 - "window.mjs"
Cohesion: 0.16
Nodes (14): args, compare(), inWindow(), lineOf(), lines, numbers(), prefix(), problems (+6 more)

### Community 175 - "lines.sh"
Cohesion: 0.73
Nodes (5): down(), name(), probes(), lines.sh script, up()

### Community 176 - "consoleFiles.ts"
Cohesion: 0.09
Nodes (18): forgetLog(), closeQueryConsole(), currentQueryConsole(), isQueryConsoleDirty(), QueryConsole, queryConsoles, renameQueryConsole(), withoutExecution() (+10 more)

### Community 177 - "treeKeys.ts"
Cohesion: 0.24
Nodes (7): focused(), mountTree(), focusRow(), itemOf(), treeKeys(), onClick(), onKeydown()

### Community 178 - "createResultChanges"
Cohesion: 0.26
Nodes (7): invalidCells(), buildChanges(), ChangesView, createResultChanges(), blockedByInvalidValues(), currentChanges(), openPreview()

### Community 180 - "gridNavigation.ts"
Cohesion: 0.33
Nodes (6): edgeRow(), GridBounds, GridCell, NAVIGATION_KEYS, navigationTarget(), stepRows()

### Community 181 - "gridWindow.test.ts"
Cohesion: 0.44
Nodes (6): CHUNK_ROWS, chunkWindow, GROUP_COLS, groupCount(), groupWindow(), rowAtVisual()

### Community 182 - "error_position.rs"
Cohesion: 0.24
Nodes (6): is_word_char(), map_error_position(), Option, Vec, word_starts(), WRAPPER_WORDS

### Community 183 - "resultEdits.ts"
Cohesion: 0.17
Nodes (18): EditableColumn, PendingEdits, ResultEditInfo, RowRange, clearResultPendingEdits(), commitResultEdits(), editStateFor(), EditStep (+10 more)

### Community 185 - "Performance measurements"
Cohesion: 0.29
Nodes (6): Budget, Keystroke-to-paint and grid frames, Performance measurements, References, Resource cycles, Running

### Community 187 - "sqlPreviewFormat.ts"
Cohesion: 0.38
Nodes (8): CLAUSE_BREAKS, collapseWhitespace(), formatPreviewSql(), isWordChar(), scan(), Scanned, splitClauses(), wrap()

### Community 188 - "gridFind.ts"
Cohesion: 0.20
Nodes (12): buildMatcher(), cellText(), escapeRegex(), findInPage(), FindMatch, FindOptions, FindResult, MAX_MATCHES (+4 more)

### Community 189 - "sqlStatements.ts"
Cohesion: 0.04
Nodes (100): LEXICALS, ONE_QUERY, scanInChunks(), SEVERAL, texts(), createEditorCommands(), currentSqlRange(), mounted() (+92 more)

### Community 190 - "contract.test.ts"
Cohesion: 0.08
Nodes (32): analyzedWords(), context(), highlightedKeywords(), highlightedStrings(), painted(), completionPolicy, NO_BOOST(), RELATION_TAIL_BASE (+24 more)

### Community 191 - "shots.sh"
Cohesion: 0.25
Nodes (9): app(), commit(), crop(), launch(), shots.sh script, SHOTS_DB_PORT, SHOTS_DISPLAY, SHOTS_INSPECTOR (+1 more)

### Community 198 - "ResultPane.svelte"
Cohesion: 0.08
Nodes (15): onMove(), onUp(), selectCell(), toggleInSelection(), closeFind(), deleteSelectedRows(), openFind(), pasteFromClipboard() (+7 more)

### Community 200 - "Test databases"
Cohesion: 0.40
Nodes (4): Server tests, Test databases, Use, Version lines

### Community 201 - "sidebarLayout.ts"
Cohesion: 0.33
Nodes (8): clampSidebarWidth(), DEFAULT_SIDEBAR_WIDTH, loadSidebarWidth(), MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, releaseSidebarDrag(), sidebarWidth, onSidebarHandleKeydown()

### Community 202 - "createSearchPanel"
Cohesion: 0.26
Nodes (10): closeAndFocusEditor(), createSearchPanel(), renderMode(), mount(), dropSelectionPrefill(), editorSearch(), openInMode(), openReplacePanel() (+2 more)

### Community 203 - "notifications.ts"
Cohesion: 0.31
Nodes (8): pickSqlFolder(), dismissNotice(), notice, notifyError(), notifySuccess(), show(), setSqlFolder(), handleOpenFolder()

### Community 204 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, check, check:watch, dev, prepare, preview, tauri (+1 more)

### Community 205 - "connectionIdentity.ts"
Cohesion: 0.70
Nodes (3): initials(), luminance(), readableTextColor()

### Community 206 - "focusZones.keys.test.ts"
Cohesion: 0.33
Nodes (7): FakeKey, g, hold(), KeyInit, letGo(), press(), release()

### Community 207 - "queryParameters.ts"
Cohesion: 0.36
Nodes (5): load(), parse(), queryParameterValues, RememberedParameter, rememberParameterValues()

### Community 208 - "bundle.py"
Cohesion: 0.28
Nodes (8): argparse, gzip, re, closure(), main(), Path, Tamano del frontend compilado (app/build): JS que se carga al abrir la app y…, sizes()

### Community 209 - "gridSettings.ts"
Cohesion: 0.43
Nodes (6): GRID_ROW_STYLES, GridRowStyle, gridSettings, loadGridSettings(), normalizeRowStyle(), setGridRowStyle()

### Community 210 - "replace.ts"
Cohesion: 0.36
Nodes (7): preserveCase(), replaceCurrent(), replaceEverything(), replacementFor(), excludeCurrent(), currentMatch(), matchesIn()

### Community 211 - "catalog_bench.rs"
Cohesion: 0.11
Nodes (24): analyze_statement, classify_sql, corpus(), drop_large(), large_schema_sql(), LARGE_TABLES, main(), ms() (+16 more)

### Community 212 - "apply"
Cohesion: 0.40
Nodes (6): apply(), MySqlConnectOptions, Option, TlsMode, ssl_mode(), MySqlSslMode

### Community 213 - "6. The matrix"
Cohesion: 0.33
Nodes (6): 6.1 Safety, 6.2 Analysis and diagnostics, 6.3 Generated SQL and autocomplete, 6.4 Drivers and introspection, 6.5 Capabilities (current state), 6. The matrix

### Community 214 - "apply"
Cohesion: 0.40
Nodes (6): apply(), Option, TlsMode, ssl_mode(), PgConnectOptions, PgSslMode

### Community 215 - "Terminal.svelte"
Cohesion: 0.16
Nodes (8): select(), close(), $t(), prefersReducedMotion(), softSwap(), tabEnter(), tabExit(), sessionMount()

### Community 216 - "createdTables"
Cohesion: 0.70
Nodes (3): createdTables(), lastPart(), created()

### Community 218 - "numpadKeys.ts"
Cohesion: 0.36
Nodes (5): installNumpadFix(), onKeydown(), isTextTarget(), NUMPAD_TEXT, numpadText()

### Community 219 - "Workspace.svelte"
Cohesion: 0.08
Nodes (10): writeClipboard(), $t(), tabExists(), ContextMenuItem, writeClipboardText(), app_src_lib_sqleditoricons, setEditorGroups(), app_src_lib_styles_editorsearch (+2 more)

### Community 221 - "rects"
Cohesion: 0.33
Nodes (7): fits(), setZoneNavigator(), eventKey(), neighbor(), rects(), Grupos de pestañas en mosaico: consolas y resultado, code()

### Community 223 - "if"
Cohesion: 0.33
Nodes (6): if(), Dónde puede vivir el código de un motor, 2. `EngineDefinition`, 2. `EngineDefinition`, ⚠ Campos que cambian la superficie de seguridad del guard, ⚠ Fields that change the guard's security surface

### Community 224 - "queryConsoles.test.ts"
Cohesion: 0.60
Nodes (4): createMemoryStorage(), freshQueryConsoles(), imported, importQueryConsoles()

### Community 225 - "Mediciones de rendimiento"
Cohesion: 0.33
Nodes (6): Ciclos de recursos, Cómo se ejecuta, Mediciones de rendimiento, Presupuesto, Referencias, Tecla a pintado y cuadros del grid

### Community 226 - "@codemirror/search"
Cohesion: 0.40
Nodes (3): createMatchCounter(), MAX_COUNTED, @codemirror/search

### Community 228 - "sys"
Cohesion: 0.50
Nodes (3): ctypes, sys, XWindowAttributes

### Community 229 - "closest_names"
Cohesion: 0.50
Nodes (5): closest_keyword(), closest_names(), distance(), max_distance(), Iterator

### Community 230 - "Website screenshots"
Cohesion: 0.50
Nodes (3): Scenes, Website screenshots, What it does

## Ambiguous Edges - Review These
- `CSS_VAR_NAMES field-to-CSS-variable mapping` → `theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk)`  [AMBIGUOUS]
  app/src/app.html · relation: references
- `SHELL_PALETTES literal (datagrip/vscode x dark/light)` → `palettes.ts palette definitions (external reference, file not read in this chunk)`  [AMBIGUOUS]
  app/src/app.html · relation: references

## Knowledge Gaps
- **888 isolated node(s):** `name`, `version`, `description`, `license`, `type` (+883 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1695 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CSS_VAR_NAMES field-to-CSS-variable mapping` and `theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `SHELL_PALETTES literal (datagrip/vscode x dark/light)` and `palettes.ts palette definitions (external reference, file not read in this chunk)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `vitest` connect `vitest` to `+layout.svelte`, `explorerTree.ts`, `columnFilters.ts`, `lib/backend.ts`, `lib/types.ts`, `search.ts`, `commentStyle.ts`, `connection.ts`, `i18n/index.ts`, `focusZones.ts`, `outputCopy.ts`, `completionSource.ts`, `ref_node_fs`, `gridSelectionSummary.ts`, `search.dom.test.ts`, `engines/index.ts`, `connectionProfiles.ts`, `stores/updates.ts`, `SchemaTree.svelte`, `consoleFiles.ts`, `treeKeys.ts`, `diagnostics.ts`, `gridNavigation.ts`, `gridWindow.test.ts`, `resultEditing.ts`, `@codemirror/state`, `resultEdits.ts`, `filterBuilder.ts`, `gridFind.ts`, `sqlStatements.ts`, `executionMarker.ts`, `contract.test.ts`, `sqlPreviewFormat.ts`, `gridClipboard.ts`, `tabGroups.ts`, `ResultPager.svelte`, `sidebarLayout.ts`, `connectionIdentity.ts`, `focusZones.keys.test.ts`, `queryHistory.ts`, `queryParameters.ts`, `gridSettings.ts`, `workspace/mosaic.ts`, `Terminal.svelte`, `createdTables`, `numpadKeys.ts`, `svelte`, `theme.ts`, `commentEditing.dom.test.ts`, `connectionTest.ts`, `reorder.ts`, `queryConsoles.test.ts`, `formatter.ts`, `cellTypes.ts`, `executionSession.ts`, `workspace/commands.ts`, `ExportDialog.svelte`, `ChangesPreview.svelte`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `svelte` connect `svelte` to `queryConsoles.ts`, `connection.ts`, `FileTree.svelte`, `i18n/index.ts`, `focusZones.ts`, `completionSource.ts`, `stores/shortcuts.ts`, `connectionProfiles.ts`, `stores/updates.ts`, `consoleFiles.ts`, `diagnostics.ts`, `resultEditing.ts`, `@codemirror/state`, `resultEdits.ts`, `sqlFiles.ts`, `gridClipboard.ts`, `tabGroups.ts`, `ResultPager.svelte`, `sidebarLayout.ts`, `TilePicker.svelte`, `notifications.ts`, `queryHistory.ts`, `findBar.ts`, `queryParameters.ts`, `gridSettings.ts`, `theme.ts`, `reorder.ts`, `queryConsoles.test.ts`, `executionSession.ts`, `tooltip.ts`, `editorSettings.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Dialect` connect `Dialect` to `execution_guard.rs`, `editing.rs`, `DestructiveClassification`, `corpus.rs`, `.new`, `engine_context.rs`, `tests/lines.rs`, `ConnectionEngineContext`, `export.rs`, `pagination.rs`, `diagnostics.rs`, `server-tests/src/lib.rs`, `support.rs`, `query.rs`, `drivers.rs`, `super`, `result_editing.rs`, `parser.rs`, `Option`, `AppState`, `Diagnostic`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _888 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `execution_guard.rs` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._