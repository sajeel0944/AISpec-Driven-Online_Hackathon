## Plan for Physical AI & Humanoid Robotics Interactive Book

### 1. Scope and Dependencies:
   - **In Scope:**
     - Interactive book display via Docusaurus (v3+) with TailwindCSS + TypeScript.
     - RAG Chatbot integrated within the book, providing answers strictly from book content (global, chapter-specific, selected text queries).
     - User authentication (sign-in/up) using Better-Auth client SDK.
     - Chapter translation to Urdu for logged-in users.
     - Chapter content personalization (tone, reading level, technical depth) for logged-in users.
     - Reproducible content ingestion pipeline (chunking, embeddings, vector indexing).
     - Observability and analytics for user questions and AI responses.
     - Secure storage of user data, personalization settings, chapter metadata, and correction data in a relational database.
     - Dockerization of backend for deployment.
     - CI for build & test.
     - Deployment to container platform (backend) and Vercel Serverless (frontend).
     - Qdrant Cloud for vector store, Neon Serverless Postgres for relational DB.
     - Secure management of secrets (Gemini keys, QDRANT keys, NEON connection string).
   - **Out of Scope:**
     - External information retrieval for the RAG chatbot beyond the book content.
     - Real-time updates for chat (unless implied by "interactive" but not explicitly stated for chat).
     - Complex user roles beyond authenticated/unauthenticated.
     - Support for languages other than Urdu for translation in the initial phase.
     - Local storage of session tokens (explicitly using secure httpOnly cookie or in-memory short cookie).
   - **External Dependencies:**
     - **Docusaurus (v3+):** Frontend framework.
     - **TailwindCSS:** Styling framework for frontend.
     - **TypeScript:** Language for frontend.
     - **React:** UI library for frontend components.
     - **Better-Auth (client SDK):** User authentication.
     - **Python FastAPI:** Backend framework.
     - **OpenAI Agents SDK:** AI agent orchestration and tool access.
     - **Qdrant Cloud (Free tier):** Vector database.
     - **OpenAI embeddings (or alternative):** Embedding generation.
     - **Neon Serverless Postgres:** Relational database.
     - **Docker:** Containerization.
     - **CI/CD Platform:** For build, test, and deployment.
     - **Container Platform (e.g., Fly/Render):** For backend deployment.
     - **Vercel Serverless:** For frontend deployment.
     - **Secret Manager:** For storing API keys and connection strings.

### 2. Key Decisions and Rationale:
   - **Options Considered, Trade-offs, Rationale:**
     - **Frontend UI Framework:** Docusaurus + TailwindCSS + TypeScript + React components provides a good balance of documentation generation, modern styling, type safety, and component reusability. `shadcn/ui` is an optional consideration for pre-built, accessible components.
     - **Authentication:** Better-Auth (custom implementation) for JWT-based auth offers control and flexibility, with secure storage of session tokens in httpOnly or in-memory short cookies to mitigate XSS risks.
     - **Backend Framework:** Python FastAPI is chosen for its high performance, ease of use, and strong typing, making it well-suited for AI orchestration with the OpenAI Agents SDK.
     - **Vector Database:** Qdrant Cloud (Free tier) is selected for its efficiency in vector search and cloud-based offering, simplifying infrastructure management for embeddings.
     - **Embeddings Provider:** OpenAI embeddings are the default, with configurability to other Agents SDK-supported providers for flexibility and potential cost/performance optimization.
     - **Relational Database:** Neon Serverless Postgres offers scalability, cost-effectiveness for variable workloads, and strong relational data capabilities for user and content metadata.
     - **Chatbot Scope:** Strictly adhering to book content prevents hallucinations and ensures the chatbot acts as a specialized knowledge retrieval system. Agent's ability to call a small retriever tool for follow-up enhances query refinement within the book's context.
     - **Deployment Strategy:** Docker for backend containers provides portability and consistent environments. CI for builds and tests ensures quality. Deploying frontend to Vercel Serverless and backend to a container platform leverages managed services for scalability and reduced operational overhead.
     - **Secrets Management:** Storing secrets in environment variables/secret managers (and never committing them) is a fundamental security best practice.

### 3. Interfaces and API Contracts:
   - **Public APIs:**
     - **Auth:**
       - `POST /api/auth/sign-in`
       - `POST /api/auth/sign-up`
       - Returns JWT token, stored in secure httpOnly cookie or in-memory short cookie.
     - **Chat:**
       - `POST /api/chat/ask` `{ question: string, scope: "book" | "chapter" | "selection", chapter_id?: string, selected_text?: string }`
       - Returns `{ response: string, sources: Array<{ chapter_id: string, chunk_id: string, page_number: number, text_snippet: string }> }`
     - **Translate:**
       - `POST /api/translate-chapter` `{ chapter_id: string, target_lang: "ur" }`
       - Returns `{ translated_content_html: string }`
     - **Personalize:**
       - `POST /api/personalize-chapter` `{ chapter_id: string, user_prefs: { tone: string, reading_level: string, technical_depth: string } }`
       - Returns `{ personalized_content_html: string }`
   - **Versioning Strategy:**
     - API versioning will be managed via URL prefixes (e.g., `/api/v1/`).
   - **Idempotency, Timeouts, Retries:**
     - Idempotency will be considered for write operations where appropriate (e.g., content ingestion).
     - Timeouts will be implemented for external API calls (e.g., Gemini, Qdrant).
     - Retries with exponential backoff will be used for transient errors in external service calls.
   - **Error Taxonomy with status codes:**
     - Standard HTTP status codes will be used (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
     - Custom error messages will provide more context where necessary.

### 4. Non-Functional Requirements (NFRs) and Budgets:
   - **Performance:**
     - **p95 latency:** Chatbot responses < 5 seconds. API calls < 1 second.
     - **Throughput:** Backend APIs should handle at least 100 requests/second.
     - **Resource caps:** To be determined based on Qdrant/Neon free tier limits and deployed container resources.
   - **Reliability:**
     - **SLOs:** 99.9% uptime for core services.
     - **Error budgets:** Defined for critical paths (e.g., chat, auth).
     - **Degradation strategy:** Graceful degradation if external services (OpenAI, Qdrant) are slow or unavailable (e.g., fallback to static content, informative error messages).
   - **Security:**
     - **AuthN/AuthZ:** JWT-based authentication via Better-Auth. Role-based authorization for personalized features.
     - **Data handling:** PII stored securely and encrypted in Neon.
     - **Secrets:** Environment variables/secret manager, never committed to source control.
     - **Auditing:** All user questions and AI responses logged for review.
   - **Cost:**
     - Utilize free tiers for Qdrant Cloud and Neon Serverless Postgres.
     - Monitor Gemini API usage to stay within budget.

### 5. Data Management and Migration:
   - **Source of Truth:**
     - Book content: Original Markdown files.
     - User data, personalization, translation, corrections, prompt history: Neon Serverless Postgres.
     - Vector embeddings: Qdrant Cloud.
   - **Schema Evolution:**
     - Database schema changes will be managed via migrations.
   - **Migration and Rollback:**
     - Migration scripts for Neon Postgres.
     - Rollback procedures to be defined for database and application deployments.
   - **Data Retention:**
     - Policies for prompt history and analytics data retention will be defined.

### 6. Operational Readiness:
   - **Observability:**
     - **Logs:** Structured logging for all backend services (FastAPI, agents).
     - **Metrics:** Key performance indicators (latency, error rates, throughput) for APIs, chatbot, and external service calls.
     - **Traces:** Distributed tracing will be considered for complex request flows involving multiple services/agents.
   - **Alerting:**
     - Thresholds for error rates, latency, and resource utilization will trigger alerts to relevant teams.
   - **Runbooks for common tasks:**
     - Procedures for deployment, rollback, troubleshooting common issues (e.g., API failures, chatbot errors).
   - **Deployment and Rollback strategies:**
     - CI/CD pipeline for automated deployments.
     - Ability to roll back to previous stable versions.
   - **Feature Flags and compatibility:**
     - Feature flags may be used for new or experimental features to enable/disable them independently.

### 7. Risk Analysis and Mitigation:
   - **Top 3 Risks:**
     1. **Chatbot hallucination/deviation from book content:**
        - **Mitigation:** Strict system instructions for the OpenAI Agent to answer only from provided context. Robust retrieval mechanism (top-k vectors from Qdrant). Continuous monitoring of AI responses.
     2. **External API (Gemini, Qdrant) dependency issues (latency, downtime, cost spikes):**
        - **Mitigation:** Implement timeouts, retries with backoff. Monitor usage and costs. Graceful degradation strategy. Consider alternative embedding providers for configurability.
     3. **Security vulnerabilities (Auth, data exposure):**
        - **Mitigation:** Secure JWT handling (httpOnly cookie). Input validation. Secure secrets management. Regular security audits.
   - **Blast radius:** Limited by service isolation (Docker containers), network segmentation, and strict access controls.
   - **Kill switches/guardrails:** Ability to disable chatbot, translation, or personalization features independently if issues arise.
   - **Rate limiting on API endpoints.**

### 8. Evaluation and Validation:
   - **Definition of Done (tests, scans):**
     - Unit tests for all critical components (frontend React components, backend API endpoints, AI agent tools).
     - Integration tests for chatflow, authentication, translation, personalization.
     - End-to-end tests for critical user journeys.
     - Code linting and formatting checks.
     - Security scans (SAST/DAST) if applicable.
   - **Output Validation for format/requirements/safety:**
     - Frontend: UI renders correctly, interactive elements function.
     - Backend: API responses conform to contracts.
     - Chatbot: Responses are factually correct based on book content, no hallucinations.
     - Translation/Personalization: Output is valid and meets requirements.

### 9. Architectural Decision Record (ADR):
   - Significant decisions made here (e.g., choice of FastAPI, Qdrant, Better-Auth as custom impl) should ideally have an associated ADR to document reasoning and tradeoffs.

