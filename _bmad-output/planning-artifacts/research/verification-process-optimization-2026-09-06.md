# CS Museum verification: diagnosis and revised workflow

Date: 2026-09-06. Analyst: Mary (BMAD analyst skill).

## Decision

Use the existing web tool and Firecrawl selectively. First reduce repeated research, oversized source output, and duplicate writing. Adding a different MCP server alone has not demonstrated a speed improvement. No service installation, corpus changes, research scripts, or agent delegation were performed for this analysis.

Plan for approximately **2–3 times the previous throughput** from source reuse, bounded extraction, and evidence-first writing. This is an estimate, with medium confidence (roughly 70% subjective confidence in reaching at least 2 times throughput on a mixed batch). There is no timed baseline of accepted claims, so this is not a measured performance claim. Difficult historical and negative claims may improve much less.

## What is slowing the work

Observed in the research process and current project:

- The same documentation and lectures were revisited for adjacent concepts instead of serving a shared group of claims.
- Whole pages, navigation, and long PDFs occupied context when only a section or a few pages were needed.
- Failed URLs and difficult historical questions repeatedly interrupted ordinary mechanism verification.
- Content was written before a fixed list of claims and completion questions was established. Explanations expanded the research scope during writing.
- Canonical content and delivery copies required repeated edits. Current app loading uses `/data/tower.json` and `/data/programming_tower.json`; older project documentation describes another delivery location. The correct delivery path must be established before copying content.
- Record status was confused with exhaustive verification. Two references on an entry do not establish that both support every sentence.

These are observed bottlenecks, not a measured percentage breakdown of elapsed time.

## Retrieval pilot: actual observations

These were selected known URLs, not a representative random sample. Cache conditions differed. Times cover tool calls, not discovery, reasoning, writing, or verification.

| Request | Elapsed | Result |
|---|---:|---|
| Firecrawl MIT lecture, Markdown | 2.506 s | 54,052 characters; cache miss; mathematical expressions were lost |
| Firecrawl Go FAQ, Markdown | 2.547 s | 98,647 characters; cache hit; relevant allocation section was 1,130 characters |
| Firecrawl TI datasheet, first two PDF pages | 7.234 s | Retrieved introductory material; later timing tables were outside the requested pages |
| Firecrawl MIT targeted direct-quote query | 1.321 s | Empty answer; cache hit; unusable as supporting evidence |
| Existing web tool, three URLs in one request | 2.837 s | Returned source views; MIT mathematical expression was preserved |

The four Firecrawl requests reported 9 credits altogether. The web comparison was not a controlled cold-cache benchmark. There is **no demonstrated Firecrawl latency advantage** in this sample.

Selecting the Go allocation section reduced source text by **98.85%**, about 87 times fewer characters. That is a measured context reduction, not an 87-times improvement in verification speed.

The MIT Markdown rendered the number of truth-table rows as a blank. A successful HTTP response therefore cannot be used as the extraction quality gate. The empty targeted answer reinforces this limitation. Preserve equations, code, tables, conditions, and surrounding context; use another view when extraction loses them.

Sources used in the pilot:

- [MIT 6.004, combinational logic](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c4/c4s1/)
- [Go FAQ, stack and heap allocation](https://go.dev/doc/faq#stack_or_heap)
- [TI SN74HC74 datasheet](https://www.ti.com/lit/ds/symlink/sn74hc74.pdf)

## Revised operating procedure

1. **Inventory before research.** For each existing entry list its required questions and atomic factual claims. Record version, implementation, historical period, and conditions. Keep mechanism, origin, dependency chain, applications, limitations, and further learning as explicit completion requirements.
2. **Research a related batch.** Start with approximately 20 claims sharing a topic or source family. Reuse already checked passages across destinations only when their scope matches. Fetch each source once per relevant version; record retrieval date and whether content was cached.
3. **Build evidence before prose.** For each claim retain two authoritative sources that actually support it, exact section/page locators, short supporting passages, and source independence. Two tools retrieving one document, two model answers, or two pages copying one source are not independent corroboration. Primary authority is claim-specific: an implementation document can establish its own behavior, but not universal behavior.
4. **Check support explicitly.** Compare both passages with the complete claim, including qualifiers and exceptions. Use `supported`, `contradicted`, or `insufficient`. Check extraction quality first. Correct contradicted claims and recheck the revised wording. Keep unsupported claims unresolved. A second AI review can detect errors but does not constitute a second source or expert approval.
5. **Write and deliver once.** Draft explanations from supported claims only. Label deductions and teaching examples separately. Update canonical content, then its actual delivery copy. Structural validation can catch broken references and schema errors; it does not establish factual accuracy. Any future automation should handle bookkeeping and copying, not promote factual status by itself.

Use a separate queue for historical priority, contested claims, and lecture discovery so these do not interrupt every mechanism claim. They still count as unfinished requirements. A lecture counts as evidence only after its relevant content is inspected, not merely because its title matches.

### Evidence record

For each atomic claim keep: claim ID; destination entries/fields; precise claim text; scope/version; required question; source A URL and locator; source A supporting passage; source B equivalent fields; independence rationale; support decision; contradiction/limitations; retrieval date; reviewer status.

### Suggested AI extraction instruction

> Using only the supplied passages, evaluate each numbered claim. Preserve version, conditions, exceptions, equations, and code. Return the exact supporting locator from each source. Mark insufficient if either source does not establish the complete claim, if extraction is missing material, or if the sources are not independent. Do not repair missing evidence from model memory. Propose narrower wording when appropriate, but evaluate that wording separately. Do not mark an entire entry complete unless every required question and its claims pass.

## Tool choice

- **Existing web tool:** retain for discovery and source views; it preserved MIT mathematics in this pilot.
- **Firecrawl, already available:** use for readable HTML, selected PDF pages, and reusable source extraction. Inspect output quality; an AI query can return nothing and cost more than a normal scrape. [Official MCP documentation](https://docs.firecrawl.dev/mcp-server), [scrape API](https://docs.firecrawl.dev/api-reference/endpoint/scrape).
- **Context7, optional and not installed:** potentially useful for library/version documentation, a subset of this corpus. It does not independently corroborate the documentation it retrieves. [Official repository](https://github.com/upstash/context7).
- **Exa, optional and not installed:** consider only if finding suitable sources remains the measured bottleneck. No throughput benefit was tested here. [Official MCP documentation](https://exa.ai/docs/reference/exa-mcp).

Do not introduce an additional server until a measured bottleneck justifies it.

## Confidence and performance expectations

| Change | Expected overall speedup | Confidence / limit |
|---|---|---|
| Group claims, reuse passages, trim context, write once | 2–3 times | Medium; roughly 70% subjective confidence in at least 2 times; unmeasured end to end |
| Add bounded parallel researchers with one final reviewer | Possibly 3–5 times versus the earlier workflow | Low to medium; roughly 50% subjective confidence in at least 3 times; optional, not run, review can bottleneck |
| Replace the web tool with another MCP alone | Unknown | Pilot does not support a speed claim |

These confidence numbers express planning judgment, not calibrated statistical probabilities. They do not describe factual accuracy. The parallel option requires changing the current solo operating approach and was not activated.

Benchmark next using matched groups of claims under the old and revised workflow, balanced across straightforward mechanisms, language-specific behavior, historical claims, and negative claims. Use identical acceptance requirements and record active elapsed time, accepted unique claims, corrections after review, tool cost, and unresolved claims. Report accepted claims per hour and errors separately. Do not count cached retrieval latency or entry updates as complete verification throughput.

## Coverage correction

At inspection, tower contained 107 non-layer concepts: 21 marked verified, 2 partial, 84 untouched. **19.6% is a label-based, bounded-scope figure, not proof that 19.6% of all tower facts and questions are fully verified.** The allocation atlas entry had four of 26 language cells filled and unresolved historical material; calling that entry substantively complete was too strong.

The atlas currently contains 200 concepts and 5,200 language cells, of which 5,112 carry `unknown`. The remaining support statuses do not establish two-source verification. Current totals differ from older project notes, another reason to derive progress from the actual claim ledger.

There is no defensible percentage for all unique facts personally inspected and fully verified until the denominator and evidence ledger exist. Future reporting must separate entries inspected, claims with two-source support, required questions completed, and changes delivered.
