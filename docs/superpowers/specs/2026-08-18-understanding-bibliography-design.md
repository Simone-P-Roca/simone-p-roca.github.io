# Understanding: An Annotated Bibliography — Design

Date: 2026-08-18
Status: approved design, ready to plan

## Purpose

Build the resource the subfield lacks: a curated, opinionated reading path
through the epistemology of understanding as it bears on mathematics and on
machines.

Two comprehensive listings already exist and neither does this job.
PhilPapers' *Understanding* browse is general epistemology; its *Mathematical
Practice* browse is general philosophy of mathematical practice. The
intersection has no home, and neither offers annotation, ordering, or reliable
links to free copies.

Secondary purpose: give the site a body of indexable prose. The site currently
has roughly 250 indexable words, which is the binding constraint on it being
found at all.

## Scope

Wide, as decided: understanding in mathematics, the general epistemology it
presupposes, and machine understanding.

Comprehensive on mathematics. **Explicitly selective on AI** — see Maintenance.

## Placement and URLs

- The bibliography lives permanently at `/understanding/`. This URL is the
  citable object and must not move.
- Nav gains a fifth item labelled **Resources**, pointing directly at
  `/understanding/`.
- A `/resources/` hub page is **deferred** until a second resource exists. At
  that point it is built and one `href` changes. The label is chosen now
  precisely so the rename never has to happen.
- Page added to `sitemap.xml`.

## Page structure

Ten sections, ordered as a reading path rather than alphabetically. The
ordering is itself the contribution.

1. Starting points — the surveys, marked "read these first"
2. What understanding is — objectual / explanatory / propositional; Kvanvig,
   Elgin, Zagzebski
3. Grasping and cognitive control — Hills, Grimm & Woodward, Chudnoff,
   Boghossian
4. Factivity and idealization — the trichotomy, Mizrahi, de Regt, D'Alessandro
5. Models and understanding — Weisberg, Tahko, Frigg & Nguyen
6. Understanding in mathematics — Avigad, Hamami & Morris, Thurston, Hunt
7. Proof: rigor, ineffability, know-how — Burgess & De Toffoli, Shankar, the
   non-propositional literature
8. Testimony and the social — the transmission debate, shareability
9. Machine understanding — Grimm et al. 2026, Chen et al. 2026, Ha &
   Schmidhuber, Johansson, Buzzard/Lean
10. Understanding and inquiry — zetetic norms, El Shazly 2026

Target roughly nine entries per section at maturity (~90 total).

Section 9 carries a dated line — "reviewed <month year>, selective by design" —
so completeness is never implied.

## Entry format

Every entry carries:

- **Citation** — author, year, title.
- **Two links**: the DOI, and a free copy (PhilArchive, preprint, author PDF)
  wherever one exists. The free-copy link is the concrete service PhilPapers
  does not reliably provide.
- A stable `id` so individual entries are linkable, following the existing
  `#update-` anchor pattern.

Entries come in two states at launch:

- **Annotated** — two to three sentences drawn from the existing vault notes.
  Not a summary: what the paper is *for*, and where it is weak. Neutral
  paraphrase adds nothing over the abstract and is the main way this fails.
- **Stub** — marked `In progress | suggestions?` with an email button, so
  readers can contribute. Citation and links are still present.

### Editorial rule on unpublished positioning

Vault notes mix summary with the author's own in-progress claims (the
`==highlighted==` passages). Annotations are drawn from the descriptive and
critical material. Whether the author's own positioning appears publicly
before the corresponding papers are out is a per-entry decision, made by the
author. Default: leave it out.

## Technical form

No build step. Hand-written HTML in the same idiom as `index.html`.

- Reuse the existing `<details>` accordion (`.cv-section`) for the ten
  sections. Already styled; needs only a `.bib-entry` variant.
- One filter `<input>` plus roughly fifteen lines of JS filtering on
  `textContent`. Worth it at ninety entries. No library.
- The HTML is the single source of truth. No data file, no pipeline. Revisit
  only if the page passes ~150 entries.

## Launch criteria

Launch at **25 entries with all ten sections present**, stubs marked
`In progress | suggestions?` with an email button.

A resource that is obviously growing attracts return visits and corrections
from strangers; a thin static one gets one visit.

### Seeding: honest count

The vault yields **18–20 entries** that are both on-topic and substantive
enough to annotate. Of 32 source-style notes: six are effectively empty
(Grimm 2011 is template-only at 121 bytes; Tahko, Johansson, Goldberg,
Baumberger, Chudnoff are stubs) and about six are substantive but off-topic
here (Armstrong, Warren, Steinhart, Beckman, Staffel, arguably Rupert).

So roughly **five to seven annotations must be written fresh** to reach 25.

Section coverage from the vault:

- Strong: 6 (Avigad, Hamami & Morris, Hunt, Shapiro), 9 (Chen et al., Grimm
  et al., Ha & Schmidhuber, `Mathematics and AI.md`)
- Adequate: 1, 3, 5, 7
- Seeded from `Overview of the literature about Understanding.md` rather than
  per-paper notes: 2 (Kvanvig, Elgin, Zagzebski), 4 (Mizrahi, Elgin)
- Thin, needs fresh work: 8, 10

## Citable identity

Mint a Zenodo DOI once the page is live, re-minted per major version.

This is done by the author — it requires their account and publishes under
their identity. Steps: log in with ORCID `0009-0004-7748-6771`; new upload,
type "Other"; upload a PDF print of the live page (`print.css` already handles
this); fill title, author, ORCID, description; publish.

The **concept** DOI (stable across versions) goes on the page as a suggested
citation.

## Maintenance

Section 9 will rot fastest; wide scope was chosen with that understood.

The mitigation is scope declaration, not discipline — see the dated line under
Page structure. Comprehensive on mathematics, selective on AI, and never owing
anyone the chase of every arXiv release.

## Out of scope

- **Downloadable `.bib` export.** Rejected: entries should be transcribed
  manually. This also removes the one-off generation script.
- **`/resources/` hub page.** Deferred until a second resource exists.
- **Per-entry Schema.org `ScholarlyArticle` markup.** Large markup burden,
  unclear benefit. Revisit only if there is evidence it helps.
