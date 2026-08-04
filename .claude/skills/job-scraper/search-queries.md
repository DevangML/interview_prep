# Search Queries for Job Scraper

Tuned for Devang's target (see `JOB_TARGET_SPEC.md`): AI-native "spec-first" SDE roles,
India (Pune / Bengaluru / Hyderabad) + Remote, 0–3 YOE flexible, portfolio-over-DSA hiring.

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*-search/SKILL.md` and runs its CLI
first. Installed here: `linkedin-search`. (The Danish/Canadian demo portals ship in
`custom-mcps/ai-job-search/.agents/skills/` — copy one in if you ever need it.)

The `site:` templates below are the **WebSearch fallback** — for portals without a CLI, company
career pages, or when a CLI fails. In this project the MCP layer is the stronger fallback:
prefer `jobspy` (`search_jobs`) and `job-search` (`find_jobs`) over raw WebSearch — see the
"Job Hunting Stack" section of `CLAUDE.md`.

**Language scope:** English only. Hindi/Marathi are conversational and are never a job condition
for these roles, so all queries are written in English.

## Search Sites

Primary:
- **linkedin.com/jobs** — also covered by the `linkedin-search` CLI
- **naukri.com** — India's largest general board (also a `jobspy` site name)
- **wellfound.com** — startup/AI-native roles (also reachable via the `wellfound-jobs` MCP)
- **instahyre.com**, **cutshort.io** — India tech-startup boards
- **weworkremotely.com**, **remoteok.com** — remote-first
- **ycombinator.com/jobs** — YC startups (highest spec-first density)

Secondary: Google `site:` searches against known target company career pages
(Persistent, KPIT, Frappe, and AI-native startups).

## Query Categories

### Priority 1: AI Product / Agentic Engineering (core target)

```
site:linkedin.com/jobs "AI Engineer" India remote
site:linkedin.com/jobs "AI Product Engineer" OR "AI Product Builder" India
site:linkedin.com/jobs "Agentic" engineer India
site:wellfound.com "AI engineer" India remote
site:ycombinator.com/jobs "AI engineer" remote
site:naukri.com "Generative AI" engineer Pune OR Bengaluru
```

### Priority 2: Context / Prompt / LLM Application Engineering

```
site:linkedin.com/jobs "Prompt Engineer" OR "LLM Engineer" India
site:linkedin.com/jobs "RAG" OR "retrieval augmented generation" engineer India
site:linkedin.com/jobs "Forward Deployed Engineer" India OR remote
site:instahyre.com LLM OR "GenAI" engineer Pune
site:cutshort.io "AI automation" engineer India
```

### Priority 3: Adjacent — Automation / Integration / Low-Code

```
site:linkedin.com/jobs "AI Automation" specialist India
site:linkedin.com/jobs "Solutions Engineer" AI India
site:naukri.com "n8n" OR "Zapier" OR "low-code" automation engineer India
site:linkedin.com/jobs Frappe OR ERPNext developer India
```

### Priority 4: Broader Technical (wider net, resume-anchored)

```
site:naukri.com "Python developer" Pune 0-3 years
site:linkedin.com/jobs Flutter developer India
site:linkedin.com/jobs "Software Engineer" Python Pune OR Bengaluru
site:linkedin.com/jobs "Backend Engineer" Python India remote
```

## `jobspy` parameter defaults for this profile

When falling back to the `jobspy` MCP instead of a portal CLI, use:

- `siteNames`: `linkedin,indeed,naukri,google` (add `glassdoor` for salary signal)
- `location`: `Pune, India` / `Bengaluru, India` / `India` (plus `isRemote: true` pass)
- `countryIndeed`: `india`
- `hoursOld`: `336` (14 days — matches the Date Filter below)
- `resultsWanted`: `25` per site
- `linkedinFetchDescription`: `true` (needed for scoring; slower — keep `resultsWanted` modest)

## Location Filter

Acceptable:
- **Remote (India)** — highest priority
- **Pune** and surrounding (Hinjewadi, Kharadi, Magarpatta, Baner)
- **Bengaluru**, **Hyderabad** — acceptable with relocation
- **Mumbai**, **NCR** — borderline, only for strong-fit roles
- US/EU-only onsite or roles requiring existing work authorisation abroad — excluded

## Language Filter

English is the working language for every target role. Apply `04-job-evaluation.md`'s Language
Gate only if a posting requires a language not declared in `01-candidate-profile.md`.

## Date Filter

Only include jobs posted within the last 14 days, or with a deadline that has not yet passed.
If a posting date can't be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and generate 2–3
custom focus-specific queries. Example: `/scrape rag` -> Priority 2 queries + RAG-specific ones
anchored on the PermRAG project.
