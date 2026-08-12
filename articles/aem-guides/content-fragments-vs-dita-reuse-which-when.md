---
title: "Content fragments vs DITA reuse: which when?"
date: 2025-10-28
excerpt: "AEM Sites content fragments and AEM Guides DITA reuse both promise reuse, but solve different problems. A clear comparison and a decision guide for when to use each."
tags: ["AEM Guides", "Strategy", "Tutorial"]
solution: AEM Guides
draft: false
---

Two teams inside the same AEM ecosystem hear "reuse" and mean very different
things. **AEM Sites content fragments** and **AEM Guides DITA reuse** are both
legitimate, powerful, and easy to confuse. This guide draws the line so you pick
the right tool, or combine them deliberately.

## What each one is

- **Content fragments (AEM Sites)** are channel-agnostic content objects, edited in
  AEM and delivered through APIs (often headless) to websites, apps, and other
  front ends.
- **DITA reuse (AEM Guides)** is structured technical content reused through
  conref, keyref, and maps, and published to formats like PDF and HTML5.

## Side-by-side

| Dimension | Content fragments | DITA reuse |
| --- | --- | --- |
| Primary use | Marketing/experience content, headless delivery | Technical documentation at scale |
| Structure | Model-based fields | DITA topics, maps, elements |
| Reuse unit | Fragment / fragment element | Topic, element (conref), key (keyref) |
| Delivery | APIs / rendered pages | PDF, HTML5, and more via presets |
| Versioning/translation | AEM features | Built for modular docs; only changed topics re-translate |
| Audience | Web/app teams | Documentation teams |

## A decision guide

```mermaid
flowchart TD
  Q{What are you producing?} -->|Docs, guides, help| D[DITA reuse in AEM Guides]
  Q -->|Web/app experience content| F[Content fragments in AEM Sites]
  D --> D1[conref, keyref, maps, presets]
  F --> F1[Models, GraphQL/REST delivery]
  Q -->|Both| B[Use each for its strength]
```

<div class="note"><strong>Short version:</strong> If the deliverable is documentation published to PDF/HTML5, reach for DITA reuse. If it's structured content served to web/app front ends via API, reach for content fragments.</div>

## When they meet

They are not mutually exclusive. Common combinations:

- Publish **DITA output to AEM Sites** so documentation lives inside your web
  experience with shared branding and navigation.
- Surface small, shared snippets as content fragments for marketing while keeping
  the authoritative technical content in DITA.

## Anti-patterns to avoid

- **Rebuilding a CCMS with content fragments.** Fragments lack DITA's topic typing,
  conditional publishing, and print-grade output. Don't force documentation into
  them.
- **Using DITA to hand marketing raw web copy.** If the need is headless delivery
  of flexible content, fragments fit better.

## Troubleshooting the decision

- **"We need print/PDF."** That's DITA. Content fragments are not built for
  print-grade output.
- **"We need GraphQL delivery to a mobile app."** That's content fragments.
- **"We need audience/product conditional variants of a manual."** That's DITA
  conditional publishing.

## Takeaway

Content fragments and DITA reuse are complementary, not competing. Choose DITA
reuse for structured documentation and multi-format publishing; choose content
fragments for headless, experience-driven delivery. When it helps, let DITA output
flow into Sites so both worlds share one front door.
