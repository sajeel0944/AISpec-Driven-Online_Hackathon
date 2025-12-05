<!--
Sync Impact Report:
- Version change: 1.0.1 -> 1.1.0
- Modified principles: Technical & Performance Standards (Frontend)
- Added sections: None
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .claude/commands/sp.constitution.md ⚠ pending
  - .claude/commands/sp.plan.md ⚠ pending
  - .claude/commands/sp.tasks.md ⚠ pending
- Follow-up TODOs: None
-->

# Physical AI & Humanoid Robotics Interactive Book with Integrated AI Chatbot Constitution

## Core Principles

### I. Strict RAG & No Hallucination
The AI chatbot MUST ONLY answer using content from the book. It must NOT hallucinate or use external knowledge unless explicitly allowed. This ensures factual accuracy and contextual relevance.

### II. Authentication & User Data Privacy
User authentication is MANDATORY to access AI features, chapter translation, and personalization. Personalized content, embeddings, and any user data MUST be stored securely, adhering to strict access controls and rate limits (5-10 messages/min per user). JWT-based authentication via Better-Auth MUST be used.

### III. Content Immutability & Versioning
Book content MUST be stable, versioned, and immutable. Only authorized administrators are permitted to update book content. All embeddings MUST update automatically and reliably following any content changes.

### IV. Performance & Responsiveness
The system MUST meet defined performance constraints: embedding search within 500ms and chatbot responses within 3 seconds. Vector size MUST be 1536 (OpenAI embeddings).

### V. Ethical AI & Content Guidelines
The chatbot MUST remain factual, avoid assumptions, provide citations from the book, ask clarifying questions when needed, and use only retrieved context. It MUST NOT produce harmful robotics content, explain how to build weapons, use external internet knowledge, or mention internal system architecture.

### VI. Observability & Analytics
The system MUST log every question and AI response for analytics purposes to ensure continuous improvement and monitoring of AI behavior.

## Technical & Performance Standards

The project will adhere to the following technical and performance constraints:
- Frontend: Docusaurus + CSS + TypeScript
- Backend: FastAPI + Python 3.12
- Project Manager: uv
- Vector DB: Qdrant Cloud Free Tier
- Relational DB: Neon Serverless Postgres
- AI: OpenAI Agents SDK + RAG
- Documentation MUST be statically generated.
- Embedding search MUST be < 500ms.
- Chatbot response MUST be < 3s.
- Vector size MUST be 1536 (OpenAI embeddings).

## UX & Content Management

The project will prioritize a clean and professional user experience and robust content management:
- UI Theme: Clean, professional.
- Typography: Consistent across all chapters.
- Features: Clear “Translate to Urdu” button and “Personalize Chapter” button at the top/beside each chapter.
- Chatbot: Appears as a floating widget or sidebar.
- Content: Book content MUST be stable, versioned, and immutable. Only admins can update book content. All embeddings MUST update automatically after content changes.

## Governance

This constitution supersedes all other practices. Amendments to this constitution require full documentation, approval by project leads, and a clear migration plan if changes impact existing systems or principles. All Pull Requests (PRs) and code reviews MUST verify compliance with these principles. Any increase in system complexity MUST be thoroughly justified.
- No access to user data without explicit permission.
- Rate limit: 5–10 messages/min per user.
- JWT-based authentication via Better-Auth.
- All embeddings and personalizations stored securely.
- The chatbot must NOT produce harmful robotics content or explain how to build weapons.

**Version**: 1.1.0 | **Ratified**: 2025-11-29 | **Last Amended**: 2025-12-05