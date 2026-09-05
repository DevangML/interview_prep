# Language coverage boundary

## Decision

The claim “all programming languages of all time” is not closable as a universal yes. HOPL is a high-quality historical source, but it deliberately selects languages that meet historical-age, influence or widespread-use criteria; it is not a census of every language, dialect, implementation, private DSL or unpublished experiment. HOPL’s own call describes those eligibility criteria and its papers as historical investigations. [HOPL IV papers](https://hopl4.sigplan.org/track/hopl-4-papers) and [HOPL IV home](https://hopl4.sigplan.org/)

The atlas therefore makes a defensible bounded claim: the release covers the 26 named language/family columns in `scope.json`, with version-scoped support evidence and explicit unknown states. The corpus is concept-first and uses HOPL/ACM history as a high-quality origin spine, not as evidence that unlisted languages do not exist. The ACM Computing Classification System is an ontology for computing topics, not a complete language census. [ACM CCECC guidance](https://ccecc.acm.org/guidance)

## Registry needed for any future expansion

Maintain a separate registry row for every candidate language: canonical name, aliases, language family, first-publication date, designer/project, implementation evidence, standard/specification, status (research/production/obsolete), source URLs and review date. Keep language identity separate from dialects, versions, compilers and libraries. A registry row can be “known but outside release”; that is more truthful than forcing every name into a concept comparison column.

## Release gate

Do not write “all languages” in product copy. Write “the declared 26-column corpus, expandable through the evidence-backed registry.” Promote a language into the canonical matrix only after a source-backed identity and mechanism mapping exist. HOPL’s selection criteria make it suitable for historical origin claims but insufficient as the sole census source.

