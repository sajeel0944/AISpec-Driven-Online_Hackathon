---
phr_id: 0017
title: Chatbot Visibility Restricted to Docs Pages
stage: refactor
date: 2025-12-06
model: claude
feature: general
branch: main
user:
command: In my chat, the chatbot component in the frontend should not appear on the landing page. It should only appear on the /docs and /docs/ child routes.
labels:
  - frontend
  - chatbot
  - rendering
  - docusaurus
links: []
files_yaml:
  - frontend/book/src/pages/index.tsx
  - frontend/book/src/theme/Layout/index.tsx
tests_yaml: []
---

### Prompt

```text
In my chat, the chatbot component in the frontend should not appear on the landing page. It should only appear on the /docs and /docs/ child routes.
```

### Response

The chatbot component's visibility has been updated according to your request.

**Changes Made:**

1.  **Removed Chatbot from Landing Page:** The `Chatbot` component import and rendering were removed from `frontend/book/src/pages/index.tsx`. This ensures the chatbot no longer appears on the site's landing page.
2.  **Configured Chatbot for Docs Pages Only:** The `frontend/book/src/theme/Layout/index.tsx` (which functions as `DocItemLayout` for Docusaurus documentation pages) was updated. The `OriginalDocItemLayout` was uncommented to ensure proper documentation content rendering, and the `Chatbot` component is now rendered alongside it. This configuration ensures the chatbot appears exclusively on `/docs` and its child routes.
