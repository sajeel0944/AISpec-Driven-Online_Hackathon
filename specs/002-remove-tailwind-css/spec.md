# Feature Specification: Remove Tailwind CSS

**Feature Branch**: `002-remove-tailwind-css`  
**Created**: 2025-12-06  
**Status**: Draft  
**Input**: User description: "Remove Tailwind CSS from the frontend and use CSS instead."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Replace Tailwind CSS with Custom CSS (Priority: P1)

As a developer, I want to remove Tailwind CSS from the frontend and replace its utility classes with custom CSS, so that the styling is managed explicitly via stylesheets.

**Why this priority**: This is the core task of the feature, directly addressing the user's request to switch styling methodologies.

**Independent Test**: Can be fully tested by verifying that all styling previously handled by Tailwind CSS is now managed by custom CSS rules, and the frontend's visual appearance remains consistent.

**Acceptance Scenarios**:

1.  **Given** the frontend application is running, **When** I inspect the rendered elements, **Then** no Tailwind CSS utility classes are present in the HTML.
2.  **Given** the frontend application is running, **When** I navigate through all pages, **Then** the visual design and layout remain consistent with the pre-Tailwind removal state.
3.  **Given** the frontend application is running, **When** I check the `frontend/book/postcss.config.js` and `frontend/book/tailwind.config.js` files, **Then** they are either removed or configured to not process Tailwind directives.
4.  **Given** the frontend application is running, **When** I check the `frontend/book/package.json` file, **Then** Tailwind CSS related dependencies are removed.
5.  **Given** the frontend application is running, **When** I inspect the stylesheet, **Then** all styling is applied via custom CSS rules.

---

### Edge Cases

-   What happens if some components are not fully migrated to custom CSS? (These components will lose styling or display incorrectly, requiring manual intervention).
-   How to handle responsive design previously managed by Tailwind's responsive prefixes? (Custom media queries in CSS will need to be implemented).
-   What happens if a Docusaurus-specific component or plugin relies heavily on Tailwind CSS internally? (Identify such dependencies and implement workarounds or custom overrides).

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST remove all Tailwind CSS dependencies from `frontend/book/package.json`.
-   **FR-002**: The system MUST remove or disable Tailwind CSS configuration files (`postcss.config.js`, `tailwind.config.js`) from `frontend/book/`.
-   **FR-003**: The system MUST replace all Tailwind CSS utility classes in React components and Docusaurus markdown files with equivalent custom CSS classes or inline styles.
-   **FR-004**: The system MUST ensure the visual appearance and responsiveness of the frontend remain unchanged after the migration.
-   **FR-005**: The system MUST centralize custom CSS rules in appropriate stylesheet files (e.g., `frontend/book/src/css/custom.css` or new component-specific CSS modules).

### Key Entities *(include if feature involves data)*

This feature does not involve new data models or entities. It is purely a styling migration.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: 100% of Tailwind CSS utility classes MUST be removed from the frontend codebase.
-   **SC-002**: The frontend application MUST build and run without any errors related to missing CSS classes or styling issues.
-   **SC-003**: Lighthouse performance scores (specifically for styling and layout stability) MUST not degrade by more than 5% after the migration.
-   **SC-004**: Manual visual inspection of all frontend pages MUST confirm identical visual presentation and responsiveness compared to the Tailwind CSS version.
