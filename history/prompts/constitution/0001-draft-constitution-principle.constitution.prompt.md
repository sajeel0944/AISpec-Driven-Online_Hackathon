---
id: 0001
title: Draft Constitution Principle
stage: constitution
date: 2025-11-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: User
command: read this Physical AI & Humanoid Robotics Interactive Book with Integrated AI Chatbot Interactive Book with Integrated AI Chatbot
labels: ["constitution", "initial-setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:
null
---

## Prompt

read this Physical AI & Humanoid Robotics
Interactive Book with Integrated AI Chatbot
1. Fundamental Purpose

This project creates an AI-powered educational book based on:

Physical AI

Humanoid Robotics

Human-Robot Interaction

Robotics Engineering

Inside the book, there will be a built-in RAG-based AI chatbot that provides answers strictly based on the book’s content.

2. Scope
✔️ In-Scope

Frontend documentation book on Docusaurus

Authentication using Better-Auth

Urdu translation feature

Personalized chapter rewriting

RAG chatbot integrated into book pages

Qdrant vector search

FastAPI backend with OpenAI Agents SDK

Neon Postgres for user/account data

Book-specific contextual answering

Chapter-specific answering (user-selected text RAG)

❌ Out-of-Scope

General-purpose AI assistant (book-only allowed)

Full humanoid robot simulation

Robotics hardware control system

Real-time sensor data processing

Offline version of the book

3. Primary Rules (The Laws of the System)

The AI chatbot must ONLY answer using book content (strict RAG).

No hallucination.

No external knowledge unless explicitly allowed.

User must be authenticated to access AI features.

Chapter translation & personalization only work for logged-in users.

Personalized content must be stored per user in Postgres.

Every chapter must be chunked + embedded into Qdrant for RAG.

The system must log every question and AI response (analytics).

4. Environmental Constraints
⚙️ Technical Constraints

Frontend: Docusaurus + Tailwind + TypeScript

Backend: FastAPI + Python 3.12

Vector DB: Qdrant Cloud Free Tier

Relational DB: Neon Serverless Postgres

AI: OpenAI Agents + RAG

Documentation must be statically generated.

💡 Performance Constraints

Embedding search < 500ms

Chatbot response < 3s

Vector size = 1536 (OpenAI embeddings)

5. UX Rules

Clean, professional UI theme

Consistent typography across all chapters

Clear “Translate to Urdu” button at the top of each chapter

Clear “Personalize Chapter” button beside it

Chatbot should appear as a floating widget or sidebar

6. Content Rules

Book content must be stable, versioned, and immutable.

Only admins can update book content.

All embeddings must update automatically after content changes.

7. AI Behavior Rules
The chatbot must:

Remain factual

Avoid assumptions

Provide citations from the book

Ask clarifying questions when needed

Use retrieved context only

The chatbot must NOT:

Produce harmful robotics content

Explain how to build weapons

Use external internet knowledge

Mention internal system architecture

8. Security Rules

No access to user data without explicit permission

Rate limit: 5–10 messages/min per user

JWT-based authentication via Better-Auth

All embeddings and personalizations stored securely

## Response snapshot

Identified key project requirements and rules to draft the initial project constitution. The constitution was created by mapping project details into core principles, technical standards, UX/content management, and governance rules. The file `.specify/memory/constitution.md` was updated.

## Outcome

- ✅ Impact: Initial constitution drafted based on project requirements.
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md with initial principles and guidelines.
- 🔁 Next prompts: null
- 🧠 Reflection: Successfully translated project description into a structured constitution.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
