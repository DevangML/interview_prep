package argus.policy

deny[msg] {
  input.change_touches_public_contract
  not input.has_spec_update
  msg := "Public contract changes require a spec or schema update."
}

deny[msg] {
  input.change_touches_schema
  not input.has_migration_plan
  msg := "Schema changes require a migration plan."
}

deny[msg] {
  input.change_touches_tests == false
  input.behavior_change
  msg := "Behavior changes require tests."
}

