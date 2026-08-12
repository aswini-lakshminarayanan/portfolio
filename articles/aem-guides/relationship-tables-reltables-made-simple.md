---
title: "Relationship tables (reltables) made simple"
date: 2025-12-02
excerpt: "Manage related links centrally with DITA relationship tables: how reltables work, linking concept-task-reference, keeping topics portable, and common pitfalls."
tags: ["AEM Guides", "DITA", "Tutorial"]
solution: AEM Guides
draft: false
---

Hard-coding "related links" into every topic is a maintenance trap: links rot,
duplicate, and make topics less reusable. DITA's **relationship table (reltable)**
lets you define links between topics **in the map**, keeping topics clean and
links centrally managed. This guide makes the concept concrete.

## The problem reltables solve

A topic that hard-codes links to five related topics is coupled to them. Move or
reuse it elsewhere and those links may not make sense. A reltable moves that
knowledge into the map, where it belongs.

## How a reltable is structured

A reltable lives in a map and links topics by role, classically
concept-to-task-to-reference:

```xml
<reltable>
  <relheader>
    <relcolspec type="concept"/>
    <relcolspec type="task"/>
    <relcolspec type="reference"/>
  </relheader>
  <relrow>
    <relcell><topicref href="about-sso.dita"/></relcell>
    <relcell><topicref href="configure-sso.dita"/></relcell>
    <relcell><topicref href="sso-parameters.dita"/></relcell>
  </relcell></relrow>
</reltable>
```

Topics in the same **row** become related; the output engine generates the
"related links" automatically.

```mermaid
flowchart LR
  C[Concept: About SSO] --- T[Task: Configure SSO]
  T --- R[Reference: SSO parameters]
  C --- R
```

## Why authors love them

| Without reltables | With reltables |
| --- | --- |
| Links hard-coded in each topic | Links defined once in the map |
| Topics coupled to specific links | Topics stay portable |
| Inconsistent related-links sections | Consistent, generated automatically |
| Painful to update | Change the row, done |

<div class="note"><strong>Mental model:</strong> A reltable row says "these topics are related." The publisher turns that into cross-links so you never write related-links sections by hand.</div>

<div class="shot">The Map Editor showing a relationship table with concept, task, and reference columns.</div>

## Best practices

- **One row per relationship cluster** (a concept with its task and reference).
- Combine with **keyref** so links survive file moves.
- Keep reltables in the deliverable map (or a dedicated relationships submap) so
  they are easy to find and own.

## Troubleshooting

- **Related links not appearing.** Confirm your output type generates links from
  reltables and that the topics are actually referenced by the map.
- **Links point the wrong way.** Check column roles; linking is driven by the
  row/column structure.
- **Duplicate links.** You likely have both hard-coded links in topics and a
  reltable. Remove the hard-coded ones.
- **Broken link after a move.** Prefer keyref inside relcells over direct href.

## Takeaway

Reltables move related-link management out of your topics and into the map, keeping
topics portable and cross-links consistent. Define relationships once per row, lean
on keyref for durability, and let the publisher generate the links for you.
