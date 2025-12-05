# Implementation Plan: Remove Tailwind CSS

**Branch**: `002-remove-tailwind-css` | **Date**: 2025-12-06 | **Spec**: specs/002-remove-tailwind-css/spec.md
**Input**: Feature specification from `/specs/002-remove-tailwind-css/spec.md`

## Summary

This plan outlines the implementation for removing Tailwind CSS from the frontend Docusaurus application and replacing its styling with custom CSS. The primary goal is to ensure the visual appearance and responsiveness of the frontend remain unchanged after the migration, managing styling explicitly via stylesheets.

## Technical Context

**Language/Version**: TypeScript, JavaScript (with React), CSS  
**Primary Dependencies**: Docusaurus, React  
**Storage**: Not applicable; this feature is purely a styling migration.  
**Testing**: Unit testing for React components (e.g., Jest, React Testing Library) to ensure component functionality, visual regression testing for UI changes to confirm visual consistency, and browser-based end-to-end tests for responsiveness.  
**Target Platform**: Web (Modern desktop and mobile browsers)  
**Project Type**: Web application (Docusaurus-based frontend)  
**Performance Goals**:
- Lighthouse performance scores (specifically for styling and layout stability) MUST not degrade by more than 5% after the migration (SC-003).
- The frontend application MUST build and run without any errors related to missing CSS classes or styling issues (SC-002).
**Constraints**:
- All Tailwind CSS utility classes MUST be removed from the frontend codebase (SC-001).
- The visual appearance and responsiveness of the frontend must remain identical to the pre-migration state (SC-004).
- Existing Docusaurus components and plugins that rely on Tailwind CSS will need careful handling or workarounds.
**Scale/Scope**: The removal and replacement of styling will apply across the entire Docusaurus-based frontend, affecting all user-facing components and pages.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] UI Theme: Clean, professional. (This change supports aligning with a custom, controlled aesthetic as per constitution.)
- [x] Typography: Consistent across all chapters. (Maintaining consistency is a core requirement of this migration.)
- [x] Frontend: Docusaurus + CSS + TypeScript. (This feature directly aligns with and reinforces this technical standard by explicitly switching to CSS for styling.)
- [x] Documentation MUST be statically generated. (Styling changes do not affect Docusaurus's static generation capability.)
- [x] Any increase in system complexity MUST be thoroughly justified. (Removing a large framework like Tailwind CSS, while involving initial work, is intended to *reduce* long-term complexity and dependency, aligning with this principle.)

## Project Structure

### Documentation (this feature)

```text
specs/002-remove-tailwind-css/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── book/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── theme/
│   │   └── css/ (where custom CSS will be centralized)
│   └── tests/
```

**Structure Decision**: The project is structured as a web application with a Docusaurus-based `frontend/book/`. This plan will leverage the existing `frontend/book/src/css/custom.css` and potentially new component-specific CSS modules for styling. Tailwind CSS configuration files will be removed or modified within `frontend/book/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
