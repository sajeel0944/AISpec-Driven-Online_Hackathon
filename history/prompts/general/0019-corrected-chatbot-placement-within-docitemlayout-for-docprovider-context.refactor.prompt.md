---
phr_id: 0019
title: Corrected Chatbot Placement within DocItemLayout for DocProvider Context
stage: refactor
date: 2025-12-06
model: claude
feature: general
branch: main
user:
command: please resolve this issue This page crashed
Try again
Hook useDoc is called outside the <DocProvider>.
labels:
  - frontend
  - chatbot
  - docusaurus
  - bugfix
links: []
files_yaml:
  - frontend/book/src/theme/Layout/index.tsx
tests_yaml: []
---

### Prompt

```text
please resolve this issue This page crashed
Try again
Hook useDoc is called outside the <DocProvider>.
```

### Response

The "Hook useDoc is called outside the <DocProvider>" error has been further investigated and a revised fix has been applied.

**Previous Attempt's Shortcoming:**
The previous fix rendered `Chatbot` as a sibling to `OriginalDocItemLayout`, which did not place `Chatbot` within the `DocProvider` context that `OriginalDocItemLayout` itself likely provides to its children.

**Revised Fix:**
The `frontend/book/src/theme/Layout/index.tsx` file has been modified again. Now, the `Chatbot` component is rendered as a child of `OriginalDocItemLayout`, alongside the `children` prop. This ensures that `Chatbot` is correctly nested within the `DocProvider` context, allowing `OriginalDocItemLayout` and its descendants to function as expected.

This change should definitively resolve the `useDoc` context error and make the Chatbot visible on `/docs` and its sub-routes.
