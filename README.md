# Repair Engineering Starter Hub

A static, document-based reference tool for new Repair Engineering personnel (TVE-5).
No build step, no backend, no npm. Open `index.html` and it runs.

## Principle

**Document evidence > model assumption.** Every technical value shown on the site is
transcribed from one of the source documents. Nothing is inferred, completed or guessed.
Where a source is incomplete, the site says so instead of filling the gap.

## Evidence classification

| Badge | Meaning |
|---|---|
| `documented` | stated explicitly in a source document |
| `historical record` | a past rectification as recorded — not an approved disposition |
| `calculated` | derived from a P/N using the identification rules in Repair Handbook 101 |
| `dimensional` | a dimensional similarity only — never interchangeability |

## Structure

```
repair-engineering-starter-hub/
├── index.html                    page shell and navigation
├── styles.css                    all styling (light + dark, responsive)
├── app.js                        UI logic only — contains no technical data
├── data/
│   ├── rectification-data.js     Rectification History Database.xlsx
│   ├── repair-note-data.js       Repair Note Dema.xlsx
│   ├── handbook-data.js          Repair Handbook 101.docx (text)
│   └── handbook-images.js        image manifest for the handbook illustrations
├── assets/handbook-images/       19 illustrations extracted from the handbook
├── README.md
└── DEPLOYMENT_GUIDE.md
```

UI code and source data are deliberately separate. A new document revision normally only
requires regenerating the matching file in `data/`.

## Features

- **Home** — record counts, quick search across every tool, shortcuts, pre-read WI-TV-001,
  link penting, engine shop visit list.
- **Rectification Search** — 399 historical records, live search over Operational Task,
  Solution, ESN, Order and Engine Type, with engine filter chips and the Excel row on
  every result.
- **Alternate Finder** — 29 plate nut / key-locked insert / rivet entries with documented
  alternates and dimensions, plus family / shank diameter / grip classification.
- **Repair Notes** — Module 22x, Module 23x, exhaust sleeve and cone, seal spring, CMM,
  flowpath assembly and repair limits, spinner cone paint references.
- **T-Code Finder** — 57 T-Codes by group, function and kegunaan.
- **Finding Dictionary** — 41 defect definitions, kept distinct from one another.
- **Fastener Reference** — GD&T, plate nut identification and 17 fastener illustrations.
- **Sources** — feature-to-document map, loaded document versions, known source limitations.

All search is live: results update on every keystroke, with no Search button. Search is
case-insensitive, accepts partial words and partial P/Ns, supports multiple keywords
(every keyword must match somewhere), and ranks exact matches above prefix above partial.
Strings are normalised once at query time and the datasets are small enough for this to
feel instant.

## Rivet diameter and grip

Repair Handbook 101 identifies rivet shank diameter in 1/32 inch increments and grip in
1/16 inch increments. For any P/N of the form `FAMILY-d-g` the site shows that reading
under a `calculated` badge. It is never presented as a documented dimension and never as
an approval. `CR2662-3-4` and `CR2662-3-6` are shown as the same family and the same shank
diameter but a **different grip** — a thicker stack may require a different grip length.

## Updating the data

Send the current project folder plus the new document to Claude and ask for the matching
file in `data/` to be regenerated. Replace that one file and commit. `app.js` normally
does not change.

## Caution

This is internal engineering reference material. A private GitHub repository does not make
a Vercel deployment private — see `DEPLOYMENT_GUIDE.md`.
