from copy import deepcopy

import pytest

from prep import catalog, empty_entry, qualifies, validate


def test_published_scope_has_valid_dependency_graph():
    rows = catalog()
    by_id, order = validate(rows)
    assert len(by_id) == len(order) == len(rows)
    positions = {key: i for i, key in enumerate(order)}
    for row in rows:
        assert all(positions[parent] < positions[row['id']] for parent in row['prerequisites'])


def test_unknown_dependency_rejected():
    rows = deepcopy(catalog())
    rows[0]['prerequisites'].append('NOT-A-TOPIC')
    with pytest.raises(ValueError, match='Unknown prerequisite'):
        validate(rows)


def test_circular_dependency_rejected():
    rows = deepcopy(catalog())
    rows[0]['prerequisites'] = [rows[0]['id']]
    with pytest.raises(ValueError, match='Dependency cycle'):
        validate(rows)


def test_authored_coverage_cannot_claim_mastery():
    rows = deepcopy(catalog())
    rows[0]['evidence_status'] = 'mastered'
    with pytest.raises(ValueError, match='cannot assert learner mastery'):
        validate(rows)


def test_reference_and_self_scores_do_not_qualify():
    entry = empty_entry()
    assert not qualifies(entry)
    entry['facets'] = {k: {'score': 3, 'assessor': 'self', 'evidence': 'reference-log'}
                       for k in entry['facets']}
    assert not qualifies(entry)


def test_weak_facet_cannot_be_averaged_away():
    entry = empty_entry()
    entry['facets'] = {k: {'score': 3, 'assessor': 'coach', 'evidence': 'observed-assessment'}
                       for k in entry['facets']}
    assert qualifies(entry)
    entry['facets']['transfer']['score'] = 2
    assert not qualifies(entry)
