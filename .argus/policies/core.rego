package argus.policy

default allow = false

allow {
  input.change_requires_contract_review == false
  input.change_requires_migration == false
  input.change_requires_tests == false
}

