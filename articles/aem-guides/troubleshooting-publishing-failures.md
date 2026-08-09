---
title: "Troubleshooting publishing failures"
date: 2025-12-23
excerpt: "A calm checklist for when an output job won't generate."
tags: ["AEM Guides", "Quality"]
solution: AEM Guides
draft: false
---

Publishing failures usually trace back to a few common causes.

## Check
- **Broken references** (xref, conref, keyref).
- **Invalid DITA** in a topic.
- **Missing conditions** or DITAVAL issues.
- Preset or template misconfiguration.

## Takeaway
Read the log top-down, fix the first real error, and re-run. Most failures are one bad reference away from success.
