# Graph Report - khipu  (2026-10-16)

## Corpus Check
- 542 files · ~920,799 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 36 file(s) not represented in the graph (top: .css 12, (none) 10, .sig 8)

## Summary
- 5133 nodes · 12027 edges · 232 communities (203 shown, 29 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 476 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `650d0d75`
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
- CONTRIBUTING.md
- mysql/src/introspect.rs
- @codemirror/state
- tauri.conf.json
- mysql/src/lib.rs
- behavior.ts
- configuration.ts
- KhipuLanguageServer
- Product
- connection.ts
- Adding a database engine
- dependencies
- engine_context.rs
- postgres/src/version.rs
- compilerOptions
- outputCopy.ts
- release_highlight.rs
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
- package.json
- MySqlConnector
- server-tests/src/lib.rs
- support.rs
- lib/types.ts
- parameterTypes.ts
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
- get
- Dialect
- QueryCancel
- results.rs
- safety.rs
- resultTabs.ts
- theme.ts
- tests.mjs
- render-site.py
- ResultTabActions
- connectionTest.ts
- reorder.ts
- parser.rs
- check-site.py
- Conn
- graph.mjs
- formatLayout.ts
- main.js
- formatter.ts
- Release job (multi-platform build & publish)
- serde
- cellTypes.ts
- executionSession.ts
- workspace/commands.ts
- Option
- SQL engine quality contract
- ExportDialog.svelte
- state.rs
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
- .engine
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
- invoke
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
- keybindings.ts
- CI
- unused.mjs
- fetch.sh
- AppState
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
- MessageKey
- gridNavigation.ts
- gridWindow.test.ts
- error_position.rs
- resultEdits.ts
- EditorConfiguration
- Performance measurements
- ExecutionFlow
- waitFor
- gridFind.ts
- sqlStatements.ts
- vitest
- shots.sh
- crates_engine_tests_corpus_mixed_errors
- crates_engine_tests_corpus_mixed_mariadb
- crates_engine_tests_corpus_mixed_mysql
- crates_engine_tests_corpus_mixed_postgres
- ResultPane.svelte
- Test databases
- ConnectionConfig
- createSearchPanel
- docs/ARCHITECTURE.md
- scripts
- connectionIdentity.ts
- focusZones.keys.test.ts
- idleFor
- bundle.py
- svelte
- replace.ts
- completion_calls
- terminalThreadsAtMost
- 6. The matrix
- Bases de datos de prueba
- Terminal.svelte
- Theme bootstrap IIFE (pre-paint CSS var injection)
- ColumnFilterPopover.svelte
- numpadKeys.ts
- Workspace.svelte
- ResultChangesController
- rects
- EditorCommands
- if
- 6. La matriz
- Mediciones de rendimiento
- @codemirror/search
- FindBarActions
- sys
- Capturas de la web
- openTerminal
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

## Communities (232 total, 29 thin omitted)

### Community 0 - "execution_guard.rs"
Cohesion: 0.07
Nodes (49): Cow, a_versioned_comment_is_read_both_ways_and_the_stricter_wins(), accepted(), add_column_insert_create_select_are_not_destructive(), backslashes_in_strings(), begin_and_end_as_names_do_not_open_or_close_blocks(), cte_around_update_without_where_requires_confirmation(), cte_with_where_is_not_destructive() (+41 more)

### Community 1 - "editing.rs"
Cohesion: 0.11
Nodes (33): ast, analyze_editable_query(), build_change_statements(), CellValue, ColumnValue, distingue_columnas_alias_y_expresiones(), EditableQuery, escapa_valores_e_identificadores_por_dialecto() (+25 more)

### Community 2 - "run.mjs"
Cohesion: 0.08
Nodes (24): APP, args, count(), flows, PORT, resetData(), run(), seedProfiles() (+16 more)

### Community 3 - "EngineLines"
Cohesion: 0.16
Nodes (21): Capability, check_line(), compare(), EngineLines, FORMAT, Line, numbers(), PACKAGE_FORMAT (+13 more)

### Community 4 - "queryConsoles.ts"
Cohesion: 0.06
Nodes (42): ColumnFilters, isFilterOperator(), dismissNotice(), notice, notifyError(), notifySuccess(), show(), activateQueryConsole() (+34 more)

### Community 5 - "DestructiveClassification"
Cohesion: 0.15
Nodes (39): AlterTableOperation, after_handler_conditions(), classify(), classify_alter_table(), classify_by_structure(), classify_destructive_sql(), classify_drop(), classify_production() (+31 more)

### Community 6 - "driver-core/src/lib.rs"
Cohesion: 0.08
Nodes (33): CheckInfo, ColumnInfo, ConnectionConfig, DriverError, EventInfo, ForeignKeyInfo, IndexInfo, KeyInfo (+25 more)

### Community 7 - "updates.rs"
Cohesion: 0.08
Nodes (52): command_succeeds(), current_version(), detect_install_kind(), download_base(), DOWNLOAD_BASE_ENV, GithubAsset, GithubRelease, http_client() (+44 more)

### Community 8 - "CONTRIBUTING.md"
Cohesion: 0.16
Nodes (10): app/README.md (Tauri + SvelteKit + TypeScript template note), DbConnector trait (contributor guidance), Dialect enum (crates/engine), Driver contract tests (#[ignore = "requires database"] pattern), Driver factory branch in app/src-tauri/src/drivers.rs, README.md (English), SQL corpus, Scenes (+2 more)

### Community 9 - "mysql/src/introspect.rs"
Cohesion: 0.07
Nodes (56): COLUMNS_SQL, event_row(), EVENTS_SQL, fetch(), foreign_key_row(), FOREIGN_KEYS_SQL, format_parameter(), format_schedule() (+48 more)

### Community 10 - "@codemirror/state"
Cohesion: 0.06
Nodes (28): BackendMessage, AnalysisRunner, merge(), Region, analysisCacheFor(), AnalysisContext, AnalysisDiagnostic, analysisDiagnostics() (+20 more)

### Community 11 - "tauri.conf.json"
Cohesion: 0.06
Nodes (30): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+22 more)

### Community 12 - "mysql/src/lib.rs"
Cohesion: 0.08
Nodes (39): async_trait, TransactionStatement, cancelled_before_start(), CONNECT_TIMEOUT, ER_UNSUPPORTED_PS, execute_on_connection(), ExecutionOutcome, hex_encode() (+31 more)

### Community 13 - "behavior.ts"
Cohesion: 0.33
Nodes (7): activeStatementHighlight, autoUppercaseSqlKeywords, lineColumns(), measureStatementLines(), statementDecorations(), editFor(), uppercaseKeywordEdit

### Community 14 - "configuration.ts"
Cohesion: 0.06
Nodes (47): buildRoutineIndex(), CallArgument, callHints(), CatalogRoutine, findCalls(), isName(), labelsFor(), Name (+39 more)

### Community 15 - "KhipuLanguageServer"
Cohesion: 0.15
Nodes (11): CompletionParams, CompletionResponse, KhipuLanguageServer, Client, Option, Result, InitializeParams, InitializeResult (+3 more)

### Community 16 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 17 - "connection.ts"
Cohesion: 0.08
Nodes (36): indexOf(), select(), getDriver(), loadConnectionPassword(), activeEngine, activeProfile, catalogTables, completeConnection() (+28 more)

### Community 18 - "Adding a database engine"
Cohesion: 0.11
Nodes (18): ConnectionErrorKind, 12. Harness, corpus and test servers, 13. Coverage, 14. Matrix, evidence and CI, 15. Documentation, 3. Parser, 4. Driver and protocol, 5. Exact release: `ServerIdentity` (+10 more)

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

### Community 24 - "release_highlight.rs"
Cohesion: 0.13
Nodes (33): a_broken_or_unexpected_highlight_is_refused(), a_missing_file_or_image_falls_back_to_the_classic_prompt(), a_valid_highlight_is_read(), data_url(), fetch(), FORMAT, Highlight, HIGHLIGHT_FILE (+25 more)

### Community 25 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, happy-dom, svelte, svelte-check, @sveltejs/adapter-static, @sveltejs/kit, @sveltejs/vite-plugin-svelte, @tauri-apps/cli (+3 more)

### Community 26 - "credentials.rs"
Cohesion: 0.29
Nodes (12): delete(), entry(), existing_entry(), load(), nothing_stored(), Error, Option, Result (+4 more)

### Community 27 - "completionSource.ts"
Cohesion: 0.05
Nodes (70): catalogPosition, schemas, afterCompleteCondition(), buildCompletionSource(), buildFkIndex(), buildKeywordCompletion(), catalogTable(), COLUMN_TYPES (+62 more)

### Community 28 - "default.json"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 29 - "khipu-desktop"
Cohesion: 0.62
Nodes (7): khipu-desktop, khipu-driver-core, khipu-driver-mysql, khipu-driver-postgres, khipu-engine, khipu-lsp, rowly-server-tests

### Community 30 - "postgres/src/introspect.rs"
Cohesion: 0.11
Nodes (26): build_parameters, balanced(), build_parameters(), check_expression(), COLUMNS_SQL, CONSTRAINT_COLUMNS_SQL, ConstraintColumnRow, FOREIGN_KEYS_SQL (+18 more)

### Community 32 - "ref_node_fs"
Cohesion: 0.11
Nodes (19): ENGINE_SOURCES, ref_node_assert, ref_node_child_process, ref_node_fs, ref_node_os, ref_node_path, ref_node_test, ref_node_url (+11 more)

### Community 37 - "mysql/src/version.rs"
Cohesion: 0.11
Nodes (14): Capabilities, check_constraints_depend_on_flavor_and_version(), CheckConstraints, COMPATIBILITY_FLOOR_MARIADB, COMPATIBILITY_FLOOR_MYSQL, Flavor, Capabilities, Self (+6 more)

### Community 41 - "connectionProfiles.ts"
Cohesion: 0.16
Nodes (16): PasswordPolicy, CONNECTION_ENVIRONMENTS, ConnectionEnvironment, ConnectionProfile, connectionProfiles, isDriver(), isHexColor(), isPasswordPolicy() (+8 more)

### Community 42 - "stores/updates.ts"
Cohesion: 0.06
Nodes (31): CachedCheck, checkForUpdates(), checking, checkOnStartup(), DEFAULT_PREFS, errorCode(), InstallKind, installRelease() (+23 more)

### Community 43 - "export.rs"
Cohesion: 0.13
Nodes (24): ALLOWED_EXTENSIONS, columns(), csv_field(), export(), export_as(), ExportFormat, FileSink, is_json() (+16 more)

### Community 44 - "String"
Cohesion: 0.15
Nodes (17): Checker<'a, '_>, output_columns(), Repaired, Expr, Ident, ObjectName, Query, SetExpr (+9 more)

### Community 45 - "FindBar"
Cohesion: 0.17
Nodes (3): MatchStatus, FindBar, ReplaceBar

### Community 46 - "sql_files.rs"
Cohesion: 0.16
Nodes (29): absolute_dir(), create(), encoding_label(), io_failure(), is_sql_file_name(), list_dir(), read(), rename() (+21 more)

### Community 47 - "SchemaTree.svelte"
Cohesion: 0.27
Nodes (5): destroy(), child(), tabScroll(), reveal(), update()

### Community 48 - "resources.mjs"
Cohesion: 0.07
Nodes (24): shown(), alive(), APP, args, CONSOLE_CYCLES, cycles, IDLE_SECONDS, KEYSTROKES (+16 more)

### Community 49 - "Design System: Rowly DB website"
Cohesion: 0.07
Nodes (28): Buttons, Cards / Containers (bordered panels), Colors, Components, Design System: Rowly DB website, Do:, Do's and Don'ts, Don't: (+20 more)

### Community 50 - "pagination.rs"
Cohesion: 0.11
Nodes (40): GuardOptions, column_values_sql(), ColumnFilter, con_no_backslash_escapes_y_barras_no_se_reescribe(), count_sql(), el_filtrado_se_ordena_pagina_y_cuenta(), filter(), filter_condition() (+32 more)

### Community 51 - "diagnostics.ts"
Cohesion: 0.04
Nodes (60): AnalysisRunnerOptions, subtract(), create(), runner(), typed(), ranges(), createDiagnosticPopup(), applyFix() (+52 more)

### Community 52 - "resultEditing.ts"
Cohesion: 0.12
Nodes (25): addRow(), applyChanges(), buildChanges(), ColumnValue, deleteRows(), EditTarget, fetchEditInfo(), fillCells() (+17 more)

### Community 53 - "diagnostics.rs"
Cohesion: 0.06
Nodes (53): a_missing_comma_between_values(), a_misspelled_clause_taken_as_an_alias(), a_misspelled_keyword_at_the_start(), a_misspelled_verb_or_a_wrong_end_inside_a_routine_is_reported_where_it_is(), a_trailing_comma_points_at_the_comma(), a_view_without_described_columns_flags_none(), AFTER_LIST_KEYWORDS, AFTER_MISSING_TABLE (+45 more)

### Community 54 - "Añadir un motor de base de datos"
Cohesion: 0.11
Nodes (20): reservedWords(), 10. Generated SQL, 6. Version lines, 10. SQL generado, 12. Harness, corpus y servidores de prueba, 13. Cobertura, 14. Matriz, evidencia y CI, 15. Documentación (+12 more)

### Community 55 - "package.json"
Cohesion: 0.06
Nodes (36): description, license, name, type, version, blockClosingAt(), commentEditing, ENCLOSING (+28 more)

### Community 56 - "MySqlConnector"
Cohesion: 0.15
Nodes (17): MySqlConnector, open_pool(), Capabilities, ConnectionConfig, DriverError, MySqlConnectOptions, MySqlPool, MySqlRow (+9 more)

### Community 57 - "server-tests/src/lib.rs"
Cohesion: 0.16
Nodes (16): Capability, Declared, declared_servers(), declared_version(), entries(), evidence(), fuzz_evidence(), lines_json() (+8 more)

### Community 58 - "support.rs"
Cohesion: 0.07
Nodes (89): a_a_signed_index_and_its_packages_are_accepted(), a_closed_port_says_the_server_does_not_respond_not_what_reqwest_says(), a_server_that_never_answers_is_a_timeout(), activate_installed(), ACTIVATION, an_http_error_says_its_status(), an_index_with_two_entries_for_a_line_a_path_or_an_unknown_field_is_rejected(), an_unresolvable_host_says_there_is_no_network() (+81 more)

### Community 59 - "lib/types.ts"
Cohesion: 0.08
Nodes (31): buildWhere(), conditionSql(), FILTER_OPERATORS, FilterCondition, FilterJoin, FilterOperator, listValues(), newCondition() (+23 more)

### Community 60 - "parameterTypes.ts"
Cohesion: 0.10
Nodes (33): BETWEEN_FIRST, BETWEEN_SECOND, COLUMN, columnNextTo(), LEFT, NAME, NOT_COLUMNS, OPERATOR (+25 more)

### Community 61 - "sqlFiles.ts"
Cohesion: 0.13
Nodes (26): confirmTrash(), finishEdit(), onEditKeydown(), createSqlFile(), listSqlDir(), openSqlFileAtPath(), openSqlFileWithDialog(), renameConsoleFile() (+18 more)

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
Cohesion: 0.17
Nodes (31): declared_tls(), IntoIterator, selected(), a_result_set_keeps_values_and_nulls(), a_server_error_keeps_its_code_and_position(), connector(), connects_and_lists_schemas_and_tables(), ddl_returns_a_command() (+23 more)

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
Cohesion: 0.07
Nodes (22): applyCustom(), changePageSize(), goLast(), lastOffsetFor(), navButton(), forgetPinnedTables(), isPinned(), PinnedTable (+14 more)

### Community 72 - "connection_error.rs"
Cohesion: 0.13
Nodes (16): ConnectionErrorKind, DriverError, io_error_kind(), is_lookup_failure(), probe_reports_a_closed_port_at_once(), probe_tcp(), Duration, ErrorKind (+8 more)

### Community 73 - "createExecutionFlow"
Cohesion: 0.12
Nodes (26): appendLog(), beginQueryExecution(), cancelQueryConfirmation(), clearQueryResult(), executionForConsole(), finishQueryExecution(), requireQueryConfirmation(), setQueryColumnFilters() (+18 more)

### Community 74 - "TilePicker.svelte"
Cohesion: 0.09
Nodes (14): active, danger, submit, active, byId, filtered, move(), onKeydown() (+6 more)

### Community 75 - "drivers.rs"
Cohesion: 0.17
Nodes (18): connect(), ConnectedDatabase, DatabaseKind, open(), report(), Arc, C, ConnectionConfig (+10 more)

### Community 76 - "super"
Cohesion: 0.11
Nodes (20): DEFINITION, UNPARSED, DoBlocks, EngineDefinition, ExactText, InsertDefaults, RoutineBodies, Option (+12 more)

### Community 77 - "queryHistory.ts"
Cohesion: 0.18
Nodes (16): filterHistory(), flushQueryHistory(), groupHistoryByDay(), HistoryDay, HistoryEntry, HistoryOutcome, isEntry(), load() (+8 more)

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
Cohesion: 0.25
Nodes (9): ApplicationShell abstract component architecture, Command palette / Open Anything, TablePlus UX & Architecture Analysis (design reference for Khipu), Domain-oriented sidebar navigation, Explore -> Inspect -> Modify -> Review -> Commit flow, Inline editing, Pending changes / Preview / Commit / Safe Mode pattern, Preview tabs (+1 more)

### Community 85 - "get"
Cohesion: 0.26
Nodes (20): constraint_column_row(), decode_trigger_type(), fetch(), foreign_key_row(), get(), index_rows(), map_rows(), query_error() (+12 more)

### Community 86 - "Dialect"
Cohesion: 0.09
Nodes (22): MYSQL, same_single_statement(), ACTIVE_LINES, ALL, cada_motor_tiene_su_identidad(), coincide_con_el_contrato_compartido_con_el_frontend(), Dialect, .ALL (+14 more)

### Community 87 - "QueryCancel"
Cohesion: 0.23
Nodes (5): a_late_cancel_never_touches_the_connection_again(), CancelState, QueryCancel, Mutex, Option

### Community 88 - "results.rs"
Cohesion: 0.13
Nodes (25): apply_result_changes(), export_query_to_file(), ExportRequest, ExportSummary, preview_result_changes(), production_write_allowed(), result_edit_info(), Message (+17 more)

### Community 89 - "safety.rs"
Cohesion: 0.13
Nodes (24): routines_corpus(), attacks_corpus(), FRAGMENTS_MYSQL, FRAGMENTS_PG, fresh(), fresh_scratch(), fuzzing_the_guard_against_the_real_servers_finds_no_second_statement(), INJECTIONS (+16 more)

### Community 90 - "resultTabs.ts"
Cohesion: 0.14
Nodes (26): addPinnedTab(), addResultTab(), consoleOfKey(), forgetPinnedResults(), pinnedResults, PinnedTab, removePinnedTab(), resultKey() (+18 more)

### Community 91 - "theme.ts"
Cohesion: 0.06
Nodes (45): buildCmTheme(), BUILTIN_FUNCTIONS, builtinCallMark, createCmTheme(), themes, TOKEN_CHROME, WORD_OPERATORS, wordClassHighlight (+37 more)

### Community 92 - "tests.mjs"
Cohesion: 0.08
Nodes (24): args, byPath, cargo, cargoBinary(), check, DECISIONS, e2eEntry(), GATES (+16 more)

### Community 93 - "render-site.py"
Cohesion: 0.13
Nodes (19): datetime, app_version(), comments_block(), engine_rows(), esc(), fill(), main(), Path (+11 more)

### Community 95 - "connectionTest.ts"
Cohesion: 0.14
Nodes (19): ConnectionTarget, explainConnectionFailure(), ExplainedFailure, KNOWN_KINDS, target, toConnectionFailure(), describeTls(), summarizeError() (+11 more)

### Community 96 - "reorder.ts"
Cohesion: 0.13
Nodes (9): beginDragging(), Ghost, liftGhost(), Point, pointer(), tabs(), reorderable(), ReorderParams (+1 more)

### Community 97 - "parser.rs"
Cohesion: 0.25
Nodes (3): ParserError, Result, validate()

### Community 98 - "check-site.py"
Cohesion: 0.15
Nodes (16): check_giscus(), check_output(), resolve(), local_file(), main(), Page, page_url_of(), Path (+8 more)

### Community 99 - "Conn"
Cohesion: 0.17
Nodes (10): classification_with(), Conn, dotted(), Entry, parse(), Option, QueryExecutionResult, Result (+2 more)

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

### Community 105 - "serde"
Cohesion: 0.13
Nodes (15): app_text_travels_as_key_and_params(), Message, raw_text_travels_as_a_plain_string(), BTreeMap, Formatter, From, Into, Option (+7 more)

### Community 106 - "cellTypes.ts"
Cohesion: 0.18
Nodes (16): BOOLEAN, enumValues(), impossibleClock(), impossibleIsoDate(), INTEGER_ALIASES, INTEGER_RANGES, InvalidCell, modifiers() (+8 more)

### Community 107 - "executionSession.ts"
Cohesion: 0.09
Nodes (28): cancelQuery(), classifyStatements(), columnValues(), countQueryRows(), executeQuery(), PageRequest, StatementCheck, ColumnFilterRequest (+20 more)

### Community 108 - "workspace/commands.ts"
Cohesion: 0.21
Nodes (16): commandDefinitions, CommandGroup, CommandHandler, commandsCollide(), CommandZone, handlerKey(), handlers, registerCommand() (+8 more)

### Community 109 - "Option"
Cohesion: 0.14
Nodes (24): analyze_statement_with(), closest_keyword(), closest_names(), DiagnosticMessage, distance(), expected_found(), friendly_syntax(), is_simple_token() (+16 more)

### Community 110 - "SQL engine quality contract"
Cohesion: 0.09
Nodes (22): 10.1 Layout, 10.2 Rules, 10.3 Simulations, 10. Tests, fixtures and simulations, 12.1 New engine, 12.2 New line of an existing engine, 12.3 New exact release within a line, 12. Adding an engine, a line or a release (+14 more)

### Community 111 - "ExportDialog.svelte"
Cohesion: 0.16
Nodes (11): format(), highlightSql(), KEYWORDS, detectJsonColumns(), escapeHtml(), highlightJson(), HTML_ESCAPES, isJsonColumnType() (+3 more)

### Community 112 - "state.rs"
Cohesion: 0.09
Nodes (33): SessionMode, the_analysis_uses_the_line_only_when_it_is_of_the_profiles_engine(), preserves_column_metadata(), preserves_foreign_keys(), IntoIterator, tables_to_catalog(), a_new_mode_is_a_new_generation_and_a_new_connection_is_a_reset(), ActiveConnection (+25 more)

### Community 113 - "Contrato de calidad de los motores SQL"
Cohesion: 0.09
Nodes (22): 10.1 Estructura, 10.2 Reglas, 10.3 Simulaciones, 10. Tests, fixtures y simulaciones, 12.1 Motor nuevo, 12.2 Línea nueva de un motor existente, 12.3 Versión exacta nueva dentro de una línea, 12. Agregar un motor, una línea o una versión (+14 more)

### Community 114 - "Arquitectura"
Cohesion: 0.14
Nodes (14): disconnect(), Arquitectura, Capas y dependencias, Cinco cosas que no son lo mismo, Cómo fluye el SQL, Frontend (`app/src/lib`), Fronteras que se comprueban solas, `khipu-lsp` (+6 more)

### Community 115 - "connection.rs"
Cohesion: 0.15
Nodes (21): a_connection_failure_keeps_its_shape(), connect(), ConnectFailure, delete_connection_password(), disconnect(), load_connection_password(), ConnectionConfig, ConnectionErrorKind (+13 more)

### Community 116 - "Atajos de teclado: modo escritorio y modo vim"
Cohesion: 0.07
Nodes (26): t(), CatalogTableRef, definitionLinkExtension(), DefinitionLinkOptions, DefinitionLinkPlugin, isModifierHeld(), linkRangeField, setLinkRange (+18 more)

### Community 117 - "postgres/src/tls.rs"
Cohesion: 0.12
Nodes (17): apply(), connection_error(), io_error(), is_tls_failure(), kind_of(), read_status(), ConnectionErrorKind, DriverError (+9 more)

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
Cohesion: 0.12
Nodes (20): writeClipboard(), writeClipboardText(), entry(), shortcutKeyParts(), ensureElement(), hide(), hideTooltipFor(), place() (+12 more)

### Community 124 - "ChangesPreview.svelte"
Cohesion: 0.14
Nodes (16): close(), onKeydown(), onKeydownCapture(), $t(), blocksHeldEnter(), confirmsOnEnter(), moveDialogActionFocus(), Box (+8 more)

### Community 125 - "editorSettings.ts"
Cohesion: 0.17
Nodes (14): DEFAULT_FORMATTER_LINE_WIDTH, defaultEditorSettings(), loadEditorSettings(), MAX_FORMATTER_LINE_WIDTH, MIN_FORMATTER_LINE_WIDTH, normalizeIndentSize(), normalizeIndentStyle(), normalizeLineWidth() (+6 more)

### Community 126 - "Diagnostic"
Cohesion: 0.23
Nodes (30): at_token(), byte_offset(), check(), Diagnostic, handler_action(), inspect_routine_chunk(), is_plain_name(), keyword_of() (+22 more)

### Community 127 - "publish.mjs"
Cohesion: 0.14
Nodes (21): ref_node_crypto, base, env, mysql, out, r2, ten, valid (+13 more)

### Community 128 - "TerminalSession.svelte"
Cohesion: 0.12
Nodes (11): openInNewWindow(), focus(), openConnectionWindow(), closeTerminal(), createTerminal(), TerminalCallbacks, TerminalInfo, writeTerminal() (+3 more)

### Community 129 - ".engine"
Cohesion: 0.12
Nodes (12): EditorCommandsOptions, 11. Version support packs, 5.1 The rule, 5.3 Lines today, 5.4 Line data, 5. Version lines, 11. Paquetes de soporte de versión, 5.1 La regla (+4 more)

### Community 130 - "+layout.svelte"
Cohesion: 0.07
Nodes (30): initLocaleEffects(), onePerFrame(), frames, clampSidebarWidth(), DEFAULT_SIDEBAR_WIDTH, loadSidebarWidth(), MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH (+22 more)

### Community 131 - "Extensiones opcionales y futura tienda — límites antes del runtime"
Cohesion: 0.17
Nodes (12): 1. Tres cosas que no se mezclan, 2. Superficies de extensión, 3. Paquete y confianza, 4. Ciclo de vida y fallos, 5. Presupuesto de ligereza, 6. Orden de trabajo y compuertas, Código ejecutable: propuesta sujeta a prototipo, Dos ejemplos que prueban límites distintos (+4 more)

### Community 132 - "webkit_env.rs"
Cohesion: 0.25
Nodes (6): apply(), DMABUF_VAR, SET_BY_ROWLY, should_disable_dmabuf(), AtomicBool, should_disable_dmabuf

### Community 133 - "PostgresConnector"
Cohesion: 0.09
Nodes (33): QueryExecutionOptions, cancelled_before_start(), CONNECT_TIMEOUT, execute_on_connection(), ExecutionOutcome, MAX_ROWS_TO_DRAIN, open_pool(), postgres_error_to_result() (+25 more)

### Community 134 - "explorerTree.ts"
Cohesion: 0.11
Nodes (22): buildExplorerTree(), columnList(), expandableKeys(), ExplorerIcon, ExplorerNode, folder(), matches(), pinKey() (+14 more)

### Community 136 - "corpus.rs"
Cohesion: 0.26
Nodes (15): catalog(), check(), consolas_mezcladas_no_dan_falsos_positivos(), created(), errores_ordinarios_siguen_detectandose(), lo_comun_no_da_falsos_positivos_en_ningun_motor(), lo_de_mysql_y_mariadb_no_da_falsos_positivos(), lo_de_postgres_no_da_falsos_positivos() (+7 more)

### Community 137 - "installFocusZones"
Cohesion: 0.20
Nodes (21): clearMark(), flash(), focusZone(), holding(), installFocusZones(), cancelMarkTimer(), markCurrent(), modifierOf() (+13 more)

### Community 138 - "columnFilters.ts"
Cohesion: 0.27
Nodes (13): canFilterOnServer(), collator, columnValueCounts(), filterRequests(), NULL_KEY, rowsHiddenByFilters(), serverValueCounts(), sortValueCounts() (+5 more)

### Community 139 - "new.mjs"
Cohesion: 0.15
Nodes (13): args, base, contract, contractPath, corpus, dialects, fail(), file (+5 more)

### Community 140 - "invoke"
Cohesion: 0.13
Nodes (22): backendText(), invoke(), isKeyed(), OWNERS, rustFiles, sources, translatedRejection(), forgetConnectionPassword() (+14 more)

### Community 141 - ".new"
Cohesion: 0.22
Nodes (8): offset_at(), Position, quoted_routine_definition(), Repaired<'a>, From, Self, Suggestion, Location

### Community 142 - "search.ts"
Cohesion: 0.13
Nodes (21): __test, exclusionMarks, newlineMarkers, createSession(), addExclusion, clearExclusions, exclusionField, filteredQuery() (+13 more)

### Community 143 - "analysis.rs"
Cohesion: 0.16
Nodes (26): classification(), is_error(), call_and_show_create_return_their_rows(), char_offset(), common_valid_ddl_and_dml_is_never_objected_to(), everyday_queries(), is_syntax_error(), mixed_statements() (+18 more)

### Community 144 - "commentStyle.ts"
Cohesion: 0.19
Nodes (12): blockText(), commentDecorations(), commentMarks(), commentStyle, commentStylePlugin, commentStyleTheme, styled(), views (+4 more)

### Community 145 - "svelte"
Cohesion: 0.07
Nodes (12): neutral, Icon, icons, shortcutText(), $t(), colorLabel(), CONNECTION_COLORS, NEUTRAL_IDENTITY_COLOR (+4 more)

### Community 146 - "FileTree.svelte"
Cohesion: 0.10
Nodes (19): active, fileMenuItems(), folderMenuItems(), requestTrash(), startCreate(), startRename(), pickSqlFolder(), closeSqlFolder() (+11 more)

### Community 147 - "i18n/index.ts"
Cohesion: 0.18
Nodes (17): interpolate(), loadPreference(), locale, localePreference, lookup(), numberFormat, systemLocale(), translator() (+9 more)

### Community 148 - "files.rs"
Cohesion: 0.27
Nodes (18): create_sql_file(), list_sql_dir(), prune_console_texts(), read_console_text(), read_sql_file(), rename_sql_file(), AppHandle, Message (+10 more)

### Community 149 - "tests/lines.rs"
Cohesion: 0.14
Nodes (18): every_registered_engine_declares_its_own_lines_and_the_test_servers_use_them(), every_reserved_word_of_a_line_is_one_its_fixtures_prove(), every_test_server_and_every_verified_version_selects_the_line_it_proves(), fixture(), no_known_consumer_declares_versioned_behavior_by_itself_again(), registry(), removed_in(), removed_syntax_is_marked_from_its_line_on_and_never_before() (+10 more)

### Community 150 - "focusZones.ts"
Cohesion: 0.13
Nodes (13): Direction, DIRECTION_COMMANDS, flashTimers, lastFocused, navigators, neighborZone(), SAME_COLUMN, setSidebarRevealer() (+5 more)

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
Nodes (13): a_request_from_another_generation_or_epoch_is_no_longer_current(), ConnectionEngineContext, line_support(), Arc, Option, Self, SupportStatus, status() (+5 more)

### Community 156 - "keybindings.ts"
Cohesion: 0.23
Nodes (12): activeZone, installKeybindings(), onKeydown(), onKeyup(), track(), withHeld(), Modifier, modifierOfCode() (+4 more)

### Community 157 - "CI"
Cohesion: 0.14
Nodes (12): Adding a module, CI, Agregar un módulo, CI, Compuertas, Corridas completas, El plan, Selección de Vitest (+4 more)

### Community 158 - "unused.mjs"
Cohesion: 0.11
Nodes (16): commands, configText, dependencies, escape(), exportsWithoutConsumer, frontFiles, handler, lib (+8 more)

### Community 159 - "fetch.sh"
Cohesion: 0.33
Nodes (6): dataset(), matches(), fetch.sh script, pg(), selected(), up.sh script

### Community 160 - "AppState"
Cohesion: 0.15
Nodes (21): database_explorer(), list_tables(), BTreeMap, CatalogTable, DatabaseExplorer, Message, Option, Result (+13 more)

### Community 161 - "Contribuir"
Cohesion: 0.22
Nodes (9): Agregar un motor de base de datos, Contribuir, Estilo, Flujo de trabajo, Nombres, Novedad de la versión, Primeros pasos, Publicar una versión (+1 more)

### Community 162 - "gridSelectionSummary.ts"
Cohesion: 0.19
Nodes (14): PasteBlock, DecimalSum, formatDecimal(), isNumericType(), NUMERIC_TYPES, SelectionSummary, summarizeSelection(), SummaryInput (+6 more)

### Community 163 - "stores/shortcuts.ts"
Cohesion: 0.15
Nodes (10): handleRecordKeydown(), KEY_SYMBOLS, MODIFIER_KEYS, ResolvedShortcut, setShortcutKeys(), ShortcutDefinition, shortcutDefinitions, ShortcutEventLike (+2 more)

### Community 165 - "status.mjs"
Cohesion: 0.18
Nodes (16): compare(), connections, coverage, coverageBlock(), DOCS, engines, enginesBlock(), json() (+8 more)

### Community 166 - "search.dom.test.ts"
Cohesion: 0.18
Nodes (10): click(), findArea(), findRow(), flush(), replaceAll(), replaceArea(), replaceRow(), select() (+2 more)

### Community 167 - "engines/index.ts"
Cohesion: 0.09
Nodes (41): ConnectionDriver, byAnalyzerLocation(), byQuotedName(), byServerPosition(), findWord(), firstLocated(), tokenAt(), ansiString() (+33 more)

### Community 168 - "coverage.mjs"
Cohesion: 0.14
Nodes (12): cited, contract, coverage, ENGINES, lines, matrix, problems, rows (+4 more)

### Community 169 - "Engine"
Cohesion: 0.09
Nodes (24): analyze_statement, classify_sql, corpus(), drop_large(), large_schema_sql(), LARGE_TABLES, main(), ms() (+16 more)

### Community 170 - "DbConnector"
Cohesion: 0.35
Nodes (7): DbConnector, RowSink, Future, Output, Pin, Send, Sync

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
Cohesion: 0.08
Nodes (18): executionLog, forgetLog(), LogKind, MAX_LOG_ENTRIES, MAX_LOG_TEXT, closeQueryConsole(), QueryConsole, renameQueryConsole() (+10 more)

### Community 177 - "treeKeys.ts"
Cohesion: 0.27
Nodes (6): mountTree(), focusRow(), itemOf(), treeKeys(), onClick(), onKeydown()

### Community 178 - "MessageKey"
Cohesion: 0.13
Nodes (15): MessageParams, MessageKey, invalidCells(), CLAUSE_BREAKS, collapseWhitespace(), formatPreviewSql(), isWordChar(), scan() (+7 more)

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
Cohesion: 0.21
Nodes (17): EMPTY_EDITS, PendingEdits, clearResultPendingEdits(), commitResultEdits(), editStateFor(), EditStep, EMPTY_STATE, patch() (+9 more)

### Community 185 - "Performance measurements"
Cohesion: 0.29
Nodes (6): Budget, Keystroke-to-paint and grid frames, Performance measurements, References, Resource cycles, Running

### Community 187 - "waitFor"
Cohesion: 0.19
Nodes (14): addSession(), backToConnections(), card(), closeConsoles(), closeSession(), evaluateAsync(), keyToPaint(), open() (+6 more)

### Community 188 - "gridFind.ts"
Cohesion: 0.22
Nodes (11): buildMatcher(), cellText(), escapeRegex(), findInPage(), FindMatch, FindOptions, FindResult, MAX_MATCHES (+3 more)

### Community 189 - "sqlStatements.ts"
Cohesion: 0.04
Nodes (101): LEXICALS, ONE_QUERY, scanInChunks(), SEVERAL, texts(), createEditorCommands(), currentSqlRange(), mounted() (+93 more)

### Community 190 - "vitest"
Cohesion: 0.05
Nodes (46): analyzedWords(), context(), highlightedKeywords(), highlightedStrings(), Request, editor(), views, painted() (+38 more)

### Community 191 - "shots.sh"
Cohesion: 0.25
Nodes (9): app(), commit(), crop(), launch(), shots.sh script, SHOTS_DB_PORT, SHOTS_DISPLAY, SHOTS_INSPECTOR (+1 more)

### Community 198 - "ResultPane.svelte"
Cohesion: 0.09
Nodes (15): onMove(), onUp(), selectCell(), toggleInSelection(), addNewRow(), closeFind(), commitCell(), deleteSelectedRows() (+7 more)

### Community 200 - "Test databases"
Cohesion: 0.40
Nodes (4): Server tests, Test databases, Use, Version lines

### Community 201 - "ConnectionConfig"
Cohesion: 0.27
Nodes (10): ConnectionConfig, TlsMode, TlsStatus, Límites conocidos, Limitaciones conocidas, SSL/TLS por conexión, Embedded engines, Motores embebidos (+2 more)

### Community 202 - "createSearchPanel"
Cohesion: 0.26
Nodes (10): closeAndFocusEditor(), createSearchPanel(), renderMode(), mount(), dropSelectionPrefill(), editorSearch(), openInMode(), openReplacePanel() (+2 more)

### Community 203 - "docs/ARCHITECTURE.md"
Cohesion: 0.36
Nodes (10): Cómo sumar un motor de base de datos nuevo (procedure), app/src-tauri shell layer, DbConnector trait (crates/driver-core), Dialect enum (MySql/Postgres, crates/engine/src/lib.rs), crates/driver-core layer (DbConnector contract), crates/drivers/* layer (khipu-driver-mysql, khipu-driver-postgres, ... over sqlx), crates/engine layer (dialect-agnostic core), crates/engine-lsp layer (tower-lsp server, khipu-lsp) (+2 more)

### Community 204 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, check, check:watch, dev, prepare, preview, tauri (+1 more)

### Community 205 - "connectionIdentity.ts"
Cohesion: 0.70
Nodes (3): initials(), luminance(), readableTextColor()

### Community 206 - "focusZones.keys.test.ts"
Cohesion: 0.33
Nodes (7): FakeKey, g, hold(), KeyInit, letGo(), press(), release()

### Community 207 - "idleFor"
Cohesion: 0.28
Nodes (9): appHeapMb(), appObjects(), assertStable(), classGrowth(), codeBytes(), format(), idleFor(), pss() (+1 more)

### Community 208 - "bundle.py"
Cohesion: 0.28
Nodes (8): argparse, gzip, re, closure(), main(), Path, Tamano del frontend compilado (app/build): JS que se carga al abrir la app y…, sizes()

### Community 209 - "svelte"
Cohesion: 0.23
Nodes (11): GRID_ROW_STYLES, GridRowStyle, gridSettings, loadGridSettings(), normalizeRowStyle(), setGridRowStyle(), createMemoryStorage(), freshQueryConsoles() (+3 more)

### Community 210 - "replace.ts"
Cohesion: 0.36
Nodes (7): preserveCase(), replaceCurrent(), replaceEverything(), replacementFor(), excludeCurrent(), currentMatch(), matchesIn()

### Community 211 - "completion_calls"
Cohesion: 0.36
Nodes (8): call_arguments(), completion_calls(), completion_calls_run_on_the_real_servers(), completion_fixtures(), Option, SchemaObjects, String, Vec

### Community 213 - "6. The matrix"
Cohesion: 0.33
Nodes (6): 6.1 Safety, 6.2 Analysis and diagnostics, 6.3 Generated SQL and autocomplete, 6.4 Drivers and introspection, 6.5 Capabilities (current state), 6. The matrix

### Community 214 - "Bases de datos de prueba"
Cohesion: 0.40
Nodes (4): Bases de datos de prueba, Líneas de versión, Pruebas contra servidor, Uso

### Community 215 - "Terminal.svelte"
Cohesion: 0.26
Nodes (5): prefersReducedMotion(), softSwap(), tabEnter(), tabExit(), sessionMount()

### Community 216 - "Theme bootstrap IIFE (pre-paint CSS var injection)"
Cohesion: 0.25
Nodes (8): CSS_VAR_NAMES field-to-CSS-variable mapping, app/src/app.html (SvelteKit shell HTML), SHELL_PALETTES literal (datagrip/vscode x dark/light), palettes.ts palette definitions (external reference, file not read in this chunk), theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk), Theme bootstrap IIFE (pre-paint CSS var injection), Rationale: palette literals duplicated inline to avoid flash-of-unstyled-theme before SvelteKit ES modules load, app/src frontend layer (Svelte + CodeMirror 6)

### Community 218 - "numpadKeys.ts"
Cohesion: 0.36
Nodes (5): installNumpadFix(), onKeydown(), isTextTarget(), NUMPAD_TEXT, numpadText()

### Community 219 - "Workspace.svelte"
Cohesion: 0.11
Nodes (6): $t(), tabExists(), ContextMenuItem, app_src_lib_sqleditoricons, setEditorGroups(), app_src_lib_styles_editorsearch

### Community 221 - "rects"
Cohesion: 0.33
Nodes (7): fits(), setZoneNavigator(), eventKey(), neighbor(), rects(), Grupos de pestañas en mosaico: consolas y resultado, code()

### Community 223 - "if"
Cohesion: 0.33
Nodes (6): if(), Dónde puede vivir el código de un motor, 2. `EngineDefinition`, 2. `EngineDefinition`, ⚠ Campos que cambian la superficie de seguridad del guard, ⚠ Fields that change the guard's security surface

### Community 224 - "6. La matriz"
Cohesion: 0.33
Nodes (6): 6.1 Seguridad, 6.2 Análisis y diagnósticos, 6.3 SQL generado y autocompletado, 6.4 Drivers e introspección, 6.5 Capacidades (estado actual), 6. La matriz

### Community 225 - "Mediciones de rendimiento"
Cohesion: 0.33
Nodes (6): Ciclos de recursos, Cómo se ejecuta, Mediciones de rendimiento, Presupuesto, Referencias, Tecla a pintado y cuadros del grid

### Community 226 - "@codemirror/search"
Cohesion: 0.40
Nodes (3): createMatchCounter(), MAX_COUNTED, @codemirror/search

### Community 228 - "sys"
Cohesion: 0.50
Nodes (3): ctypes, sys, XWindowAttributes

### Community 229 - "Capturas de la web"
Cohesion: 0.50
Nodes (3): Capturas de la web, Escenas, Qué hace

### Community 230 - "openTerminal"
Cohesion: 0.67
Nodes (3): openTerminal(), press(), toggleTerminal()

## Ambiguous Edges - Review These
- `CSS_VAR_NAMES field-to-CSS-variable mapping` → `theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk)`  [AMBIGUOUS]
  app/src/app.html · relation: references
- `SHELL_PALETTES literal (datagrip/vscode x dark/light)` → `palettes.ts palette definitions (external reference, file not read in this chunk)`  [AMBIGUOUS]
  app/src/app.html · relation: references

## Knowledge Gaps
- **888 isolated node(s):** `name`, `version`, `description`, `license`, `type` (+883 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1693 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CSS_VAR_NAMES field-to-CSS-variable mapping` and `theme.ts SHELL_PALETTE_CSS_VARS (external reference, file not read in this chunk)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `SHELL_PALETTES literal (datagrip/vscode x dark/light)` and `palettes.ts palette definitions (external reference, file not read in this chunk)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `vitest` connect `vitest` to `+layout.svelte`, `explorerTree.ts`, `@codemirror/state`, `columnFilters.ts`, `invoke`, `behavior.ts`, `configuration.ts`, `search.ts`, `commentStyle.ts`, `connection.ts`, `i18n/index.ts`, `focusZones.ts`, `outputCopy.ts`, `completionSource.ts`, `ref_node_fs`, `gridSelectionSummary.ts`, `search.dom.test.ts`, `engines/index.ts`, `connectionProfiles.ts`, `stores/updates.ts`, `SchemaTree.svelte`, `consoleFiles.ts`, `treeKeys.ts`, `MessageKey`, `diagnostics.ts`, `gridNavigation.ts`, `gridWindow.test.ts`, `resultEditing.ts`, `package.json`, `resultEdits.ts`, `lib/types.ts`, `parameterTypes.ts`, `sqlStatements.ts`, `executionMarker.ts`, `gridFind.ts`, `gridClipboard.ts`, `tabGroups.ts`, `ResultPager.svelte`, `connectionIdentity.ts`, `focusZones.keys.test.ts`, `queryHistory.ts`, `svelte`, `workspace/mosaic.ts`, `Terminal.svelte`, `numpadKeys.ts`, `resultTabs.ts`, `theme.ts`, `connectionTest.ts`, `reorder.ts`, `formatter.ts`, `cellTypes.ts`, `executionSession.ts`, `workspace/commands.ts`, `ExportDialog.svelte`, `ChangesPreview.svelte`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `svelte` connect `svelte` to `+layout.svelte`, `queryConsoles.ts`, `invoke`, `configuration.ts`, `connection.ts`, `FileTree.svelte`, `i18n/index.ts`, `focusZones.ts`, `keybindings.ts`, `stores/shortcuts.ts`, `connectionProfiles.ts`, `stores/updates.ts`, `consoleFiles.ts`, `diagnostics.ts`, `resultEditing.ts`, `package.json`, `resultEdits.ts`, `sqlFiles.ts`, `gridClipboard.ts`, `tabGroups.ts`, `ResultPager.svelte`, `TilePicker.svelte`, `queryHistory.ts`, `findBar.ts`, `resultTabs.ts`, `theme.ts`, `reorder.ts`, `executionSession.ts`, `tooltip.ts`, `editorSettings.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Dialect` connect `Dialect` to `execution_guard.rs`, `editing.rs`, `DestructiveClassification`, `corpus.rs`, `.new`, `engine_context.rs`, `tests/lines.rs`, `ConnectionEngineContext`, `export.rs`, `pagination.rs`, `diagnostics.rs`, `server-tests/src/lib.rs`, `support.rs`, `query.rs`, `drivers.rs`, `super`, `result_editing.rs`, `parser.rs`, `Conn`, `Option`, `state.rs`, `Diagnostic`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _888 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `execution_guard.rs` be split into smaller, more focused modules?**
  _Cohesion score 0.0677555958862674 - nodes in this community are weakly interconnected._