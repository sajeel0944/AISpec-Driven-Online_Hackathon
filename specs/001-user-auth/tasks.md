---

description: "Task list for Add User Authentication feature"
---

# Tasks: Add User Authentication

**Input**: Design documents from `/specs/001-user-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Test tasks are not explicitly generated as TDD approach was not requested in the feature specification. However, unit and integration tests are implied as part of the "Definition of Done" in the plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/src/`, `frontend/book/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

-   [ ] T001 Create backend project structure for FastAPI in `backend/`
-   [ ] T002 Install Python dependencies for authentication (`passlib`, `PyJWT`, `SQLAlchemy`, `psycopg2-binary`) in `backend/pyproject.toml`
-   [x] T003 Configure Docusaurus for new authentication pages in `frontend/book/docusaurus.config.ts`
-   [x] T004 Create base frontend routing for `/signup` and `/signin` pages in `frontend/book/src/pages/`
-   [ ] T005 Setup basic database connection configuration in `backend/` (e.g., `backend/database.py`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

-   [ ] T006 [P] Define User database model (using SQLAlchemy) with fields: `id`, `username`, `email`, `education`, `hashed_password` in `backend/models.py`
-   [ ] T007 [P] Implement password hashing utility using `passlib` in `backend/utils/auth.py`
-   [ ] T008 [P] Implement JWT token creation and validation utility using `PyJWT` in `backend/utils/auth.py`
-   [ ] T009 Implement database migration setup (e.g., Alembic) in `backend/`
-   [ ] T010 Create initial database migration for the User model in `backend/migrations/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - New User Registration (Priority: P1) 🎯 MVP

**Goal**: Allow new users to create an account with username, email, education, and password, and automatically log them in.

**Independent Test**: Successfully register a new user via the frontend UI, verify user creation in the database, and confirm automatic login and redirection.

### Implementation for User Story 1

-   [x] T011 [US1] Create frontend Sign Up page component in `frontend/book/src/pages/signup.tsx`
-   [x] T012 [US1] Implement registration form within `signup.tsx` using React Hook Form, including fields for username, email, education, password.
-   [x] T013 [US1] Implement frontend form validation for registration fields (including password strength) in `frontend/book/src/pages/signup.tsx`
-   [ ] T014 [US1] Create Pydantic schemas for user registration request and response in `backend/schemas.py`
-   [ ] T015 [US1] Implement backend API endpoint `POST /auth/register` in `backend/routers/auth.py` to handle user registration, password hashing, and token generation.
-   [ ] T016 [US1] Integrate frontend registration form submission with `POST /auth/register` API endpoint in `frontend/book/src/pages/signup.tsx`
-   [ ] T017 [US1] Handle successful registration response (store token, redirect) in `frontend/book/src/pages/signup.tsx`
-   [ ] T018 [US1] Implement error display for registration failures (e.g., email already registered, validation errors) in `frontend/book/src/pages/signup.tsx`

---

## Phase 4: User Story 2 - Existing User Sign In (Priority: P1)

**Goal**: Allow existing users to log in with their username/email and password.

**Independent Test**: Successfully log in an existing user via the frontend UI and confirm automatic login and redirection.

### Implementation for User Story 2

-   [x] T019 [US2] Create frontend Sign In page component in `frontend/book/src/pages/signin.tsx`
-   [x] T020 [US2] Implement login form within `signin.tsx` using React Hook Form, including fields for username/email and password.
-   [x] T021 [US2] Implement frontend form validation for login fields in `frontend/book/src/pages/signin.tsx`
-   [ ] T022 [US2] Create Pydantic schemas for user login request and response in `backend/schemas.py`
-   [ ] T023 [US2] Implement backend API endpoint `POST /auth/login` in `backend/routers/auth.py` to handle user authentication and token generation.
-   [ ] T024 [US2] Integrate frontend login form submission with `POST /auth/login` API endpoint in `frontend/book/src/pages/signin.tsx`
-   [ ] T025 [US2] Handle successful login response (store token, redirect) in `frontend/book/src/pages/signin.tsx`
-   [ ] T026 [US2] Implement error display for login failures (e.g., invalid credentials) in `frontend/book/src/pages/signin.tsx`

---

## Phase 5: User Story 3 - Navigating Authentication Flows (Priority: P2)

**Goal**: Ensure proper redirection and access control based on user authentication status.

**Independent Test**: Verify redirection to/from authentication pages and access to protected content when logged in/out.

### Implementation for User Story 3

-   [x] T027 [US3] Implement client-side authentication context/provider to manage user login state in `frontend/book/src/contexts/AuthContext.tsx`
-   [x] T028 [US3] Wrap Docusaurus Root component with AuthContext provider in `frontend/book/src/theme/Root.tsx`
-   [x] T029 [US3] Implement frontend routing guards for protected routes (e.g., for `/docs` pages requiring authentication) in `frontend/book/src/components/ProtectedRoute.tsx`
-   [x] T030 [US3] Implement redirection logic for authenticated users trying to access `/signup` or `/signin` in `frontend/book/src/pages/signup.tsx` and `frontend/book/src/pages/signin.tsx`
-   [x] T031 [US3] Implement redirection logic for unauthenticated users trying to access protected content in `frontend/book/src/components/ProtectedRoute.tsx`
-   [x] T032 [US3] Update main website navigation to conditionally show "Sign Up" / "Sign In" or "Logout" links based on authentication status in `frontend/book/docusaurus.config.ts` and `frontend/book/src/theme/Navbar/Content/index.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

-   [ ] T033 Implement comprehensive error handling middleware/decorators in `backend/middlewares/error_handler.py` and `frontend/book/src/utils/api.ts`
-   [ ] T034 Add structured logging for authentication events (successful logins, failed attempts, new registrations) in `backend/loggers/auth_logger.py`
-   [ ] T035 Implement basic rate limiting for `POST /auth/register` and `POST /auth/login` endpoints in `backend/` (e.g., using `fastapi-limiter`).
-   [ ] T036 Secure JWT storage in HTTP-only cookies from backend.
-   [ ] T037 Update documentation on authentication setup and usage.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3+)**: All depend on Foundational phase completion
    *   User stories can then proceed in parallel (if staffed)
    *   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No direct dependencies on US1 for core login, but will use common auth utilities.
-   **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 and US2 being functional for testing redirection logic.

### Within Each User Story

-   Models/Schemas before API Endpoints.
-   API Endpoints before Frontend Integration.
-   Frontend components before routing/redirection logic.

### Parallel Opportunities

-   All tasks marked [P] can run in parallel within their phase.
-   Once Foundational phase completes, User Story 1 and User Story 2 can be worked on largely in parallel (e.g., by different developers), though testing US3 will require both to be functional.
-   Frontend and Backend API development for a given user story can be parallelized (with clear API contracts).

---

## Parallel Example: User Story 1 (Registration)

```bash
# Frontend parallel tasks:
Task: "T011 [US1] Create frontend Sign Up page component in frontend/book/src/pages/signup.tsx"
Task: "T012 [US1] Implement registration form within signup.tsx using React Hook Form..."
Task: "T013 [US1] Implement frontend form validation for registration fields..."

# Backend parallel tasks:
Task: "T014 [US1] Create Pydantic schemas for user registration request and response in backend/schemas.py"
Task: "T015 [US1] Implement backend API endpoint POST /auth/register in backend/routers/auth.py..."
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1 (Registration)
4.  Complete Phase 4: User Story 2 (Login)
5.  **STOP and VALIDATE**: Test US1 and US2 independently.
6.  Deploy/demo if ready (basic authentication available).

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (Basic Registration!)
3.  Add User Story 2 → Test independently → Deploy/Demo (Basic Login!)
4.  Add User Story 3 → Test independently → Deploy/Demo (Full Auth Flow!)
5.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    *   Developer A: User Story 1 (Frontend & Backend)
    *   Developer B: User Story 2 (Frontend & Backend)
    *   Developer C: User Story 3 (Frontend Routing & Guards, Navigation updates)
3.  Stories complete and integrate independently.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing (TDD approach - *if tests were explicitly requested*)
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
