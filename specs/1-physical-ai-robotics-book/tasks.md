# Tasks for Physical AI & Humanoid Robotics Interactive Book

## Phase 1: Setup

### Story Goal: Project Initialization and Structure

#### Independent Test Criteria:
- Monorepo structure with `/frontend`, `/backend`, `/infra` directories is created.
- Spec Kit artifacts (`docs/`, `history/`, `ADRs/`, `prompts/`) are set up.

#### Implementation Tasks:
- [X] T001 Create monorepo structure with /frontend, /backend, /infra directories at project root
- [X] T002 Set up Spec Kit artifacts (docs/, history/, ADRs/, prompts/) at project root

## Phase 2: Foundational

### Story Goal: Core Frontend and Backend Skeletons

#### Independent Test Criteria:
- Docusaurus frontend skeleton is functional with TailwindCSS and TypeScript.
- FastAPI backend skeleton is functional with dependency injection setup.
- Basic theme and color palette implemented in frontend.

#### Implementation Tasks:
- [X] T003 [P] Setup Docusaurus (v3+), TailwindCSS, TypeScript skeleton in frontend/
- [X] T004 [P] Build theme with polished color palette in frontend/src/theme/
- [X] T005 [P] Setup FastAPI skeleton with dependency injection for OpenAI, Qdrant, Neon in backend/
- [X] T006 [P] Add global layout components in frontend/src/components/Layout/

## Phase 3: User Story 1 - Read Book Content (P1)

### Story Goal: Display Interactive Book Content

#### Independent Test Criteria:
- Book content renders correctly on the Docusaurus frontend.
- Table of contents and chapters are displayed.
- Content scrolls clearly with consistent typography.

#### Implementation Tasks:
- [X] T007 [US1] Create Docusaurus pages for book chapters in frontend/src/pages/book/
- [X] T008 [US1] Implement markdown rendering for book content in frontend/src/components/BookContent/
- [X] T009 [US1] Ensure consistent typography and styling for book content in frontend/src/css/custom.css

## Phase 4: User Story 2 - Translate Chapter to Urdu (P1)

### Story Goal: Translate Book Chapters to Urdu

#### Independent Test Criteria:
- "Translate to Urdu" button is visible only to logged-in users.
- Clicking the button translates the chapter content to Urdu.

#### Implementation Tasks:
- [X] T010 [P] [US2] Implement chapter action buttons UI component in frontend/src/components/ChapterActions/
- [X] T011 [P] [US2] Add TypeScript types for chapter translation in frontend/src/types/chapter.ts
- [X] T012 [P] [US2] Create backend endpoint POST /api/translate-chapter in backend/app/api/endpoints/translation.py
- [X] T013 [P] [US2] Implement authentication check for /api/translate-chapter in backend/app/api/dependencies/auth.py
- [X] T014 [US2] Implement translation logic in backend/app/services/translation_service.py
- [X] T015 [US2] Integrate translation button with backend API in frontend/src/components/ChapterActions/TranslationButton.tsx

## Phase 5: User Story 3 - Personalize Chapter Content (P1)

### Story Goal: Personalize Book Chapter Content

#### Independent Test Criteria:
- "Personalize" button is visible only to logged-in users.
- Clicking the button allows selection of preferences and updates chapter content.
- Personalization settings are saved in Neon Postgres.

#### Implementation Tasks:
- [X] T016 [P] [US3] Add personalization UI component to chapter action buttons in frontend/src/components/ChapterActions/
- [X] T017 [P] [US3] Add TypeScript types for chapter personalization in frontend/src/types/chapter.ts
- [X] T018 [P] [US3] Create backend endpoint POST /api/personalize-chapter in backend/app/api/endpoints/personalization.py
- [X] T019 [P] [US3] Implement authentication check for /api/personalize-chapter in backend/app/api/dependencies/auth.py
- [X] T020 [P] [US3] Implement personalization logic in backend/app/services/personalization_service.py
- [X] T021 [US3] Store personalization settings in Neon Postgres in backend/app/db/models/user_preferences.py
- [X] T022 [US3] Integrate personalization button with backend API in frontend/src/components/ChapterActions/PersonalizationButton.tsx

## Phase 6: User Story 4 - Interact with RAG Chatbot (P1)

### Story Goal: Implement RAG Chatbot

#### Independent Test Criteria:
- Chatbot responds accurately and strictly from book content.
- Supports global, chapter-scoped, and selected-text queries.
- Provides citations for responses.
- Logs all questions and responses.

#### Implementation Tasks:
- [X] T023 [P] [US4] Design and implement chat UI components in frontend/src/components/Chat/
- [X] T024 [P] [US4] Add TypeScript types for chatbot interaction in frontend/src/types/chat.ts
- [X] T025 [P] [US4] Implement content ingestion pipeline script (chapter -> chunks -> embeddings) in infra/scripts/ingestion.py
- [X] T026 [P] [US4] Implement Qdrant client for vector storage in backend/app/core/qdrant_client.py
- [X] T027 [P] [US4] Implement Neon Postgres client for metadata storage in backend/app/core/neon_client.py
- [X] T028 [P] [US4] Create backend RAG endpoint POST /api/chat in backend/app/api/endpoints/chat.py
- [X] T029 [P] [US4] Implement retrieval logic from Qdrant based on query scope in backend/app/services/retrieval_service.py
- [X] T030 [US4] Implement OpenAI Agents SDK orchestration for answering questions from retrieved documents in backend/app/services/chatbot_service.py
- [X] T031 [US4] Integrate chat UI with backend API for global, chapter, and selected-text queries in frontend/src/components/Chat/Chatbot.tsx
- [X] T032 [US4] Implement logging of user questions and AI responses in backend/app/services/analytics_service.py

## Final Phase: Polish & Cross-Cutting Concerns

### Story Goal: Ensure Operational Readiness, Security, and Quality

#### Independent Test Criteria:
- All services are Dockerized and deployable.
- CI/CD pipeline successfully builds, tests, and deploys.
- Secrets are securely managed.
- Observability (logging, metrics) is in place.
- Rate limiting is enforced.

#### Implementation Tasks:
- [ ] T033 [P] Dockerize backend application in backend/Dockerfile
- [ ] T034 [P] Configure CI for building, testing, and deploying backend
- [ ] T035 [P] Configure deployment for frontend (Vercel) and backend (container platform)
- [ ] T036 [P] Implement secure secrets management (env variables, secret manager integration) in backend/app/core/config.py
- [ ] T037 [P] Set up structured logging for backend services in backend/app/core/logging.py
- [ ] T038 [P] Implement API rate limiting in backend/app/api/middlewares/rate_limiter.py
- [ ] T039 Implement basic monitoring and alerting for key metrics
