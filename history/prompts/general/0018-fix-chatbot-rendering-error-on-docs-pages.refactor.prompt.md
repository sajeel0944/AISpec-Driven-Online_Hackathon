---
phr_id: 0018
title: Fix Chatbot Rendering Error on Docs Pages
stage: refactor
date: 2025-12-06
model: claude
feature: general
branch: main
user:
command: Hook useDoc is called outside the <DocProvider>.
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
Hook useDoc is called outside the <DocProvider>.
```

### Response

The error "Hook useDoc is called outside the <DocProvider>" has been addressed by correctly passing `children` to the `OriginalDocItemLayout` within `frontend/book/src/theme/Layout/index.tsx`.

**Root Cause:**
The `DocItemLayout` component, when swizzled, was rendering the `Chatbot` component *alongside* `OriginalDocItemLayout` but was not explicitly passing the original `children` (which contain the actual documentation content and components that rely on `DocProvider`) *into* `OriginalDocItemLayout`. This resulted in `useDoc` being called outside its intended context.

**Fix:**
Modified `frontend/book/src/theme/Layout/index.tsx` to destructure `children` from `props` and then explicitly pass `children` as a child of `OriginalDocItemLayout`. This ensures that all components requiring `DocProvider` context are correctly wrapped by it.

The `Chatbot` component should now render correctly on `/docs` and its sub-routes.
