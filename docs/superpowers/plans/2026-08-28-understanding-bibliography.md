# Understanding: An Annotated Bibliography — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a curated, annotated reading path on the epistemology of understanding (mathematics + machines) as a standalone page at `/understanding/`, launched at 25 entries across all ten sections.

**Architecture:** One hand-written `understanding/index.html` in the same idiom as `index.html` — shared `<head>`, `.nav`, `.footer`, and `assets/` links. Ten `<details class="cv-section">` accordions (reused, already styled and print-handled) hold `.bib-entry` blocks. A single filter `<input>` plus ~15 lines of vanilla JS in `assets/js/main.js` filter entries on `textContent`. No build step, no data file, no dependency.

**Tech Stack:** Static HTML, CSS custom properties (`assets/css/style.css`), vanilla JS IIFE (`assets/js/main.js`). GitHub Pages, `.nojekyll`.

**Spec:** [docs/superpowers/specs/2026-08-18-understanding-bibliography-design.md](../specs/2026-08-18-understanding-bibliography-design.md)

## Global Constraints

- No build step. Hand-written HTML matching `index.html` conventions (2-space indent, `&rsquo;`/`&amp;` entities, `.wrap` / `.block` / `.block__grid` layout classes).
- The URL `/understanding/` is the citable object and **must not move**.
- Nav label is **Resources** (not "Understanding", not "Bibliography") — chosen so a future `/resources/` hub rename never happens. It points directly at `/understanding/`.
- No JS library. The filter is ~15 lines of vanilla JS, guarded with an early `return` like every other IIFE in `main.js`.
- Reuse `.cv-section` for the ten accordions — do not create a parallel accordion component. Only new CSS is a `.bib-entry` variant + filter input styling.
- Entry `id`s follow the existing anchor pattern (`#update-2026-09-16` → `#bib-<slug>`), so individual entries are linkable.
- Launch gate: **25 entries, all ten sections present.** Stubs are marked `In progress | suggestions?` with a `mailto:` button. Section 9 carries a dated "reviewed <month year>, selective by design" line.
- Two links per entry where available: DOI + free copy (PhilArchive / preprint / author PDF).

---

## File Structure

| File | Change | Responsibility |
|------|--------|----------------|
| `understanding/index.html` | Create | The bibliography page: head, nav, intro, filter, ten accordions, suggested-citation block, footer. |
| `assets/css/style.css` | Modify (append) | `.bib-entry` layout (citation / links / annotation / stub state) + `.bib-filter` input. |
| `assets/js/main.js` | Modify (append) | One IIFE: filter entries by `textContent`, hide empty sections, live count. |
| `index.html` | Modify (nav) | Add `Resources` link to `.nav__links`. |
| `404.html` | Modify (nav) | Add `Resources` link. |
| `legal-notice.html` | Modify (nav) | Add `Resources` link. |
| `privacy-policy.html` | Modify (nav) | Add `Resources` link. |
| `sitemap.xml` | Modify | Add `<url><loc>https://simone-p-roca.github.io/understanding/</loc></url>`. |

`print.css` needs **no change**: `.cv-section:not([open]) .cv-section__content { display: block !important; }` already expands collapsed accordions for print, and `a[href^="http"]::after` already prints link URLs.

---

## Task 1: Page scaffold + nav wiring

**Files:**
- Create: `understanding/index.html`
- Modify: `index.html` (nav block ~line 107-112), `404.html`, `legal-notice.html`, `privacy-policy.html` (nav block), `sitemap.xml`

**Interfaces:**
- Produces: the page skeleton with an empty `<main>` containing a `#filter` input and ten empty `<details class="cv-section" id="sec-N">` blocks with `<summary><h3>…</h3><span class="cv-toggle"></span></summary>` and a `<div class="cv-section__content">`. Section titles and order are fixed by the spec (Starting points → … → Understanding and inquiry). Later tasks fill `.cv-section__content`.

- [ ] **Step 1: Copy the skeleton**

Create `understanding/index.html` by copying `index.html`'s structure and changing:

- `<title>Understanding: An Annotated Bibliography — Simone P. Roca</title>`
- `<meta name="description" content="A curated, annotated reading path through the epistemology of understanding as it bears on mathematics and on machines." />`
- `<link rel="canonical" href="https://simone-p-roca.github.io/understanding/" />`
- All `assets/` and icon `href`s become root-absolute (`/assets/css/style.css`, `/assets/icons/favicon.ico`, …) so they resolve from the `/understanding/` subpath. Keep the inline `<head>` scroll-restoration + theme `<script>` verbatim.
- Drop the JSON-LD `Person` block (belongs on the homepage only). Optionally add a minimal `CollectionPage`/`Article` block later — out of scope for launch.
- `.nav__links` hrefs point back to the homepage: `href="/#about"`, `href="/#cv"`, `href="/#contact"`, `href="/#updates"`, and the new `href="/understanding/"` labelled `Resources` with `aria-current="page"`.
- `.nav__logo` / `.nav__name` anchors point to `/` (not `#top`).
- Replace `<main>` contents with: an intro `<section class="block">` (one `<h1>` + 2 short paragraphs stating what the list is and what it deliberately excludes), a filter `<input>` (see Step 3), and ten `<details class="cv-section">` blocks — headings and order from spec §"Page structure". Section 9's `.cv-section__content` opens with `<p class="placeholder">Reviewed August 2026 — selective by design.</p>`.
- Add a closing `<section class="block">` with the suggested-citation line (concept DOI is minted post-launch by the author; use a `<p class="placeholder">Citable DOI: minted on publication.</p>` placeholder for now).
- Keep `<footer>` identical but legal links become `/legal-notice.html` / `/privacy-policy.html`.
- Keep `<script src="/assets/js/main.js"></script>`.

- [ ] **Step 2: Add the nav link to the other four pages**

In `index.html`, add as the last item inside `.nav__links`:

```html
<a href="/understanding/">Resources</a>
```

In `404.html`, `legal-notice.html`, `privacy-policy.html`, add the same line (those pages already use absolute-ish `index.html#…` hrefs; `/understanding/` is consistent).

- [ ] **Step 3: Add the filter input to the new page**

Directly before the first `<details class="cv-section">`, inside the same `.block__content` wrapper:

```html
<input
  type="search"
  class="bib-filter"
  id="bib-filter"
  placeholder="Filter entries&hellip;"
  aria-label="Filter bibliography entries"
  autocomplete="off"
/>
<p class="bib-count" id="bib-count" aria-live="polite" hidden></p>
```

- [ ] **Step 4: Add the sitemap entry**

In `sitemap.xml`, add after the homepage `<url>`:

```xml
  <url>
    <loc>https://simone-p-roca.github.io/understanding/</loc>
  </url>
```

- [ ] **Step 5: Verify**

Run:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/understanding/` in the browser preview and confirm: CSS + fonts load (no 404s in the network panel), dark/light toggle works, all ten accordions expand/collapse, the `Resources` nav link is present on all five pages and points to `/understanding/`, nav links from `/understanding/` back to `/#about` etc. land correctly.

- [ ] **Step 6: Commit**

```bash
git add understanding/index.html index.html 404.html legal-notice.html privacy-policy.html sitemap.xml
git commit -m "feat: scaffold /understanding/ bibliography page and wire Resources nav"
```

---

## Task 2: `.bib-entry` styles + filter JS

**Files:**
- Modify: `assets/css/style.css` (append at end, before the reduced-motion block or in a new labelled section), `assets/js/main.js` (append new IIFE at end)

**Interfaces:**
- Consumes: `.cv-section` / `.cv-section__content` from Task 1; `#bib-filter` and `#bib-count` inputs from Task 1.
- Produces: markup contract for Task 3 — each entry is
  `<div class="bib-entry" id="bib-<slug>"> <p class="bib-entry__cite">…</p> <p class="bib-entry__links"><a href>DOI</a> <a href>Free copy</a></p> <p class="bib-entry__note">…</p> </div>`.
  A stub instead carries `<p class="bib-entry__note bib-entry__note--stub">In progress — <a href="mailto:simone.roca@iusspavia.it?subject=Understanding%20bibliography%20suggestion">suggestions?</a></p>` and no `.bib-entry__note` prose.

- [ ] **Step 1: Add CSS**

Append to `assets/css/style.css`:

```css
/* ---------- Bibliography ---------- */
.bib-filter {
  width: 100%;
  max-width: 65ch;
  margin-bottom: 8px;
  padding: 9px 14px;
  font: inherit;
  font-size: 0.95rem;
  color: var(--fg);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 999px;
}
.bib-filter:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.bib-count {
  font-size: 0.85rem;
  color: var(--fg-muted);
  margin-bottom: 4px;
}
.bib-entry { padding-block: 14px; max-width: 70ch; }
.bib-entry + .bib-entry { border-top: 1px solid var(--border); }
.bib-entry[hidden] { display: none; }
.bib-entry__cite { font-size: 1rem; line-height: 1.6; }
.bib-entry__cite cite { font-style: italic; }
.bib-entry__links {
  margin-top: 4px;
  font-size: 0.9rem;
}
.bib-entry__links a {
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-right: 16px;
  transition: opacity 0.15s ease;
}
.bib-entry__links a:hover { opacity: 0.7; }
.bib-entry__note {
  margin-top: 8px;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--fg-muted);
}
.bib-entry__note--stub { font-style: italic; }
.cv-section[hidden] { display: none; }
```

Add `.bib-filter, .bib-entry__links a` to the `prefers-reduced-motion` `transition: none` list.

- [ ] **Step 2: Add the filter IIFE**

Append to `assets/js/main.js`:

```javascript
(function () {
  var input = document.getElementById("bib-filter");
  var count = document.getElementById("bib-count");
  if (!input) return;

  var entries = Array.prototype.slice.call(document.querySelectorAll(".bib-entry"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".cv-section"));
  var total = entries.length;

  function apply() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    entries.forEach(function (el) {
      var match = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      el.hidden = !match;
      if (match) shown++;
    });
    sections.forEach(function (sec) {
      var any = sec.querySelector(".bib-entry:not([hidden])");
      sec.hidden = !!q && !any;
      if (q && any) sec.open = true;
    });
    if (q) {
      count.hidden = false;
      count.textContent = shown + " of " + total + " entries";
    } else {
      count.hidden = true;
    }
  }

  input.addEventListener("input", apply);
})();
```

- [ ] **Step 3: Verify**

With two or three throwaway `.bib-entry` blocks pasted into a couple of sections, reload `/understanding/` and confirm: typing a term present in one entry hides the others and collapses sections with no match; the count line shows "N of M entries"; clearing the box restores everything and re-hides the count; no console errors. Then remove the throwaway blocks.

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css assets/js/main.js
git commit -m "feat: bib-entry styles and textContent filter for /understanding/"
```

---

## Task 3: Seed content — 25 entries across ten sections

**Files:**
- Modify: `understanding/index.html` (fill each `.cv-section__content`)

**Interfaces:**
- Consumes: the `.bib-entry` markup contract from Task 2.
- Produces: the launch-ready page.

This is a content task, not a code task. It is done in section order and can be split across sessions. Distribution target (from spec §"Seeding"):

| Section | Entries at launch | Source |
|---|---|---|
| 1 Starting points | 3 | vault (adequate) |
| 2 What understanding is | 3 | `Overview of the literature…md` — Kvanvig, Elgin, Zagzebski |
| 3 Grasping / cognitive control | 3 | vault (adequate) — Hills, Grimm & Woodward, Boghossian |
| 4 Factivity and idealization | 2 | Mizrahi, Elgin |
| 5 Models and understanding | 2 | vault — Weisberg, Frigg & Nguyen |
| 6 Understanding in mathematics | 3 | vault (strong) — Avigad, Hamami & Morris, Thurston/Hunt |
| 7 Proof: rigor, know-how | 2 | vault — Burgess & De Toffoli, De Toffoli |
| 8 Testimony and the social | 2 | fresh — transmission debate, shareability |
| 9 Machine understanding | 3 | vault (strong) — Grimm et al. 2026, Chen et al. 2026, Ha & Schmidhuber |
| 10 Understanding and inquiry | 2 | fresh — zetetic norms, El Shazly 2026 |

Total: 25. Roughly 18 come annotated from the vault; **~7 must be written fresh** (sections 8 and 10, plus filling 1/3/5). Every other entry is a **stub**: citation + both links + `In progress — suggestions?`.

- [ ] **Step 1: Per section, add entries**

For each of the ten sections, inside its `.cv-section__content`, add `.bib-entry` blocks in reading-path order. For each entry:

1. Write the citation: `<p class="bib-entry__cite">Author (Year). <cite>Title</cite>.</p>`
2. Add `<p class="bib-entry__links">` with the DOI link and, where a free copy exists, a second link labelled `Free copy`. If no DOI, link the publisher/journal page. If neither, omit the links paragraph.
3. Annotation vs stub:
   - **Annotated** (vault-backed): 2-3 sentences from the descriptive/critical material in the vault note — what the paper is *for*, and where it is weak. Not neutral paraphrase. Per spec §"Editorial rule": the author's own in-progress positioning (`==highlighted==` passages) is left out by default.
   - **Stub**: `<p class="bib-entry__note bib-entry__note--stub">In progress — <a href="mailto:simone.roca@iusspavia.it?subject=Understanding%20bibliography%20suggestion">suggestions?</a></p>`
4. Give the entry `id="bib-<lastname><year>"` (e.g. `bib-avigad2008`).

- [ ] **Step 2: Section 9 dated line**

Confirm section 9's content still opens with `<p class="placeholder">Reviewed August 2026 — selective by design.</p>` above its entries.

- [ ] **Step 3: Verify launch gate**

Run the local server, open `/understanding/`, and confirm:

- Exactly ten sections, each with at least one entry, **≥25 entries total** (`document.querySelectorAll('.bib-entry').length` in the console).
- Every entry has an `id`; no two `id`s collide.
- Every non-stub annotation is 2-3 sentences and says something evaluative.
- All DOI / free-copy links open (spot-check ~8 of them, including every "Free copy").
- Filter works against real content: search an author surname, a section collapses when it has no match.
- Print preview (browser "Print to PDF"): all sections expand, link URLs print, no accordion is clipped.
- Dark mode: citation, links, muted note text all legible.
- Mobile width (375px): no horizontal scroll, filter input full-width.

- [ ] **Step 4: Commit**

```bash
git add understanding/index.html
git commit -m "feat: seed /understanding/ with 25 entries across ten sections"
```

---

## Task 4: Launch checks

**Files:**
- Modify: `understanding/index.html` (only if checks turn up fixes)

- [ ] **Step 1: Cross-page + SEO checks**

- `sitemap.xml` includes `/understanding/`; `robots.txt` does not block it.
- The page has a real `<h1>` and the intro prose is genuine indexable text (spec's secondary purpose — the site had ~250 indexable words; this should add well over 1000).
- `feed.xml` — no change needed (it is an updates feed, not a content feed). Optionally add one `<item>` announcing the bibliography; author's call, not a launch blocker.
- Internal link from somewhere on the homepage is already covered by the nav `Resources` link.

- [ ] **Step 2: Accessibility pass**

- Filter `<input>` has a label (`aria-label`), count is `aria-live="polite"`.
- `Resources` nav link carries `aria-current="page"` on `/understanding/` only.
- Accordion summaries are keyboard-operable (native `<details>` — already fine).
- Colour contrast of `.bib-entry__note` (`--fg-muted`) against `--bg` in both themes ≥ 4.5:1 — it is already used sitewide, so this is a confirmation not a change.

- [ ] **Step 3: Final commit / tag**

```bash
git add -A
git commit -m "chore: launch checks for /understanding/ bibliography"
```

Post-launch, by the author (not in this plan): mint the Zenodo concept DOI (ORCID `0009-0004-7748-6771`, upload a `print.css` PDF of the live page), then replace the citation placeholder with the concept DOI.

---

## Self-Review

**Spec coverage:**

- Purpose / secondary indexable-prose purpose → Task 1 intro prose, Task 3 annotations, Task 4 Step 1. ✅
- Placement `/understanding/`, nav "Resources", `/resources/` hub deferred, sitemap → Task 1. ✅
- Ten sections in reading-path order, ~9 entries/section at maturity, section 9 dated line → Task 1 Step 1, Task 3. ✅
- Entry format: citation, two links, stable `id`, annotated vs stub, editorial rule on unpublished positioning → Task 2 interface contract, Task 3 Step 1. ✅
- Technical form: no build step, reuse `.cv-section`, one filter input + ~15 lines JS, HTML is single source of truth → Task 1, Task 2. ✅
- Launch criteria: 25 entries / all ten sections / stubs with email button → Task 3 Step 3 gate. ✅
- Seeding honest count (18-20 vault, 5-7 fresh) → Task 3 distribution table. ✅
- Citable identity (Zenodo, author-run) → noted as post-launch author step, Task 4. ✅
- Out of scope (`.bib` export, `/resources/` hub, Schema.org per-entry) → not built. ✅

**Placeholder scan:** DOI concept-id is a deliberate `placeholder` class element pending author minting — flagged, not a plan gap. No "TBD"/"handle edge cases" left.

**Type consistency:** `.bib-entry`, `.bib-entry__cite`, `.bib-entry__links`, `.bib-entry__note`, `.bib-entry__note--stub`, `#bib-filter`, `#bib-count`, `.bib-count`, `.bib-filter` used identically in Tasks 2 and 3. Filter IIFE reads `#bib-filter`/`#bib-count` created in Task 1 Step 3. ✅
