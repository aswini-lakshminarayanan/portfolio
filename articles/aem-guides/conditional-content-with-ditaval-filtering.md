---
title: "Conditional content with DITAVAL filtering"
date: 2025-03-21
excerpt: "Publish different versions of the same source using conditions and a DITAVAL file."
tags: ["AEM Guides", "Publishing"]
solution: AEM Guides
draft: false
---

Conditional publishing lets one source produce many outputs. A **DITAVAL** file decides what to include or exclude at publish time.

## How it works
1. Tag content with attributes such as `audience` or `product`.
2. Create a DITAVAL that sets each value to include, exclude, or flag.
3. Apply it in your output preset.

## Takeaway
Write once, filter at publish time. DITAVAL is the engine behind audience- and product-specific docs.
