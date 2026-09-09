# EvidenceOS Inference Engine

**Status:** Specification-led · Implementation incomplete  
**Spec version:** 0.10  
**Owner:** No-Gas-Labs-Official

## What this is

An inference engine for **repository intelligence**: automated analysis of codebases to extract concepts, score evidence quality, and produce auditable judgments about what a repository actually contains versus what it claims.

It implements the EvidenceOS design orientation:

- Prefer primary artifacts over narrative
- Score claims against observable structure
- Separate *what the repo says* from *what the repo proves*
- Emit outputs that can be challenged, not merely summarized

## Why it exists

Most repository “intelligence” tools summarize README language and file trees. That collapses claim and evidence.

EvidenceOS is intended to answer harder questions:

| Question | Not answered by | Target of this engine |
|----------|-----------------|------------------------|
| Does this repo implement what the README describes? | Keyword match | Structure + path + test presence scoring |
| Is a methodology *practiced* or only *named*? | Brand search | Behavioral / artifact co-occurrence |
| Which files are primary evidence vs decoration? | File count | Classification + weight |

## Scope (v0.10)

In scope:

- Concept extraction from repo trees and text artifacts
- Evidence scoring (claim ↔ supporting path)
- Machine-readable report objects

Out of scope (for now):

- Full CI integration as a product
- Guaranteed accuracy on private or adversarial repos
- Political or campaign analysis

## Current state (honest)

This repository currently holds the **design surface and security baseline**. Runnable inference modules, fixtures, and scored example reports are not yet complete in-tree.

If you clone this repo expecting a finished CLI today, you will be disappointed. Treat v0.10 as a **contract for implementation**, not a shipping product.

## Intended interface (target)

```text
evidenceos analyze <repo-path> --out report.json
evidenceos score  <report.json> --claim "implements flash loans"
```

Report objects should include:

- `claims[]` with text + origin
- `evidence[]` with path + weight + note
- `gaps[]` for claims without support
- `method` field naming the scoring version

## Security

See [SECURITY.md](./SECURITY.md). Do not feed this engine secrets. Analysis should run on published or intentionally shared trees.

## Contributing

Priority order for contributions:

1. Fixture repos with known claim/evidence pairs
2. Deterministic scorers with unit tests
3. CLI surface matching the target interface above
4. Documentation of failure modes

Pull requests that only expand mythology without tests will be declined.

## License

See repository license files if present; otherwise treat as proprietary to No-Gas-Labs-Official until explicitly dual-licensed.

---

*Evidence before narrative. Gaps are first-class outputs.*
