# Research Notes: Remove Tailwind CSS

This document contains research findings and decisions made during Phase 0 of the planning process for the "Remove Tailwind CSS" feature.

## Unresolved Clarifications

Based on the feature specification, there are no explicit "NEEDS CLARIFICATION" markers that require external research at this stage. The task is straightforward: remove Tailwind CSS and replace it with custom CSS.

## Best Practices / Patterns for CSS Migration

*   **Audit Existing Styles**: Before removal, thoroughly identify all places where Tailwind CSS classes are used and document their visual effects.
*   **Component-Driven Styling**: When migrating, consider organizing custom CSS using a component-driven approach (e.g., CSS Modules, Styled Components, or simple class-based stylesheets per component) for better maintainability and encapsulation.
*   **CSS Variables**: Utilize CSS custom properties (variables) for consistent theming (colors, fonts, spacing) to simplify future design changes.
*   **Responsive Design**: Translate Tailwind's responsive utility classes into explicit CSS media queries to maintain responsiveness across devices.
*   **Accessibility**: Ensure the custom CSS maintains or improves accessibility aspects such as color contrast, focus states, and semantic HTML.
*   **Gradual Migration (if applicable)**: For very large codebases, a full, immediate migration might be risky. A phased approach, where components are migrated incrementally, could be considered, though for this project, a direct replacement is planned.
*   **Tooling**: Use build tools (e.g., PostCSS, Sass) if complex CSS transformations or pre-processing are needed, but prioritize standard CSS where possible.
