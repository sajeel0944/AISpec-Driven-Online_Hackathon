---
id: 20251129-007
title: Architectural plan created for project
stage: plan
date: 2025-11-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: 1-physical-ai-robotics-book
branch: 1-physical-ai-robotics-book
user: user
command: @.claude\commands\sp.plan.md let started planing Tech Stack & Architecture: ...
labels: [architecture, planning, tech-stack]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-physical-ai-robotics-book/plan.md
tests:

---

## Prompt

@.claude\commands\sp.plan.md let started planing Tech Stack & Architecture:
 - Frontend: Docusaurus (v3+) with TailwindCSS + TypeScript. Use React components for chat UI and chapter action buttons. Build theme with polished color palette; use shadcn/ui for components optionally.
 - Auth: Better-Auth (client SDK) for sign-in/up. Store Better-Auth session tokens in secure httpOnly cookie or in-memory short cookie.
 - Backend: Python FastAPI + OpenAI Agents SDK for agent orchestration and tool access (Qdrant, DB).
 - Vector store: Qdrant Cloud (Free tier) for vectors (store embeddings + metadata: chapter_id, chunk_id, text, page number).
 - Embeddings: OpenAI embeddings (or another provider supported by Agents SDK). Keep embedding model configurable.
 - Relational DB: Neon Serverless Postgres for users, personalization preferences, translation history, corrections, and prompt history.
 - Ingestion pipeline: chunk book by chapter → clean → create embeddings → store in Qdrant with metadata and in Neon store mapping (vector_id ↔ chapter_id, offsets).
 - Chatflow:
     1) User asks question (book/global/chapter/selection).
     2) Backend retrieves top-k vectors from Qdrant relevant to scope.
     3) Agent (OpenAI Agents SDK) given the retrieved documents as tools/context + system instructions to answer strictly from the given retrievals. Agent can call a small retriever tool for followup.
 - Translate / Personalize buttons: frontend calls backend endpoints:
     POST /api/translate-chapter { chapter_id, target_lang: "ur" }  (checks auth)
     POST /api/personalize-chapter { chapter_id, user_prefs } → returns personalized HTML or patch.
 - Deployment: Dockerize backend, use CI to build & run tests, deploy backend to a container platform (Fly/Render/Vercel Serverless for frontend). Qdrant Cloud host, Neon for DB.
 - Secrets: store Gemini keys, QDRANT keys, NEON connection string in env/secret manager; never commit.

## Response snapshot

Created the `plan.md` file at `specs/1-physical-ai-robotics-book/plan.md` with the detailed architectural plan provided by the user, structured according to the Architect Guidelines.

## Outcome

- ✅ Impact: Architectural plan successfully documented.
- 🧪 Tests: N/A
- 📁 Files: `specs/1-physical-ai-robotics-book/plan.md` created.
- 🔁 Next prompts: Ready to proceed with implementation or further planning.
- 🧠 Reflection: Successfully handled detailed architectural input and documented it in the appropriate project artifact, bypassing the PowerShell script dependency.

## Evaluation notes (flywheel)

- Failure modes observed: None (successfully bypassed PowerShell dependency).
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
