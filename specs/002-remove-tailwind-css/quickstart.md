# Quickstart Guide: Remove Tailwind CSS

This guide provides instructions for quickly setting up and running the frontend application to observe the changes after removing Tailwind CSS.

## Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   Git

## Setup

1.  **Clone the repository (if not already done):**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Switch to the feature branch:**
    ```bash
    git checkout 002-remove-tailwind-css
    ```

3.  **Navigate to the frontend directory:**
    ```bash
    cd frontend/book
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

## Running the Application

1.  **Start the Docusaurus development server:**
    ```bash
    npm start
    # OR
    yarn start
    ```

2.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).

## Verifying Changes

*   **Inspect Elements**: Use your browser's developer tools to inspect the rendered HTML elements. Verify that no Tailwind CSS utility classes are present.
*   **Visual Consistency**: Navigate through all pages of the application. Confirm that the visual design, layout, and responsiveness remain consistent with the state before Tailwind CSS removal.
*   **Configuration Files**: Check the `frontend/book/postcss.config.js` and `frontend/book/tailwind.config.js` files (if they still exist) to ensure they are either removed or configured to not process Tailwind directives.
*   **Dependencies**: Review `frontend/book/package.json` to confirm that Tailwind CSS related dependencies have been removed.

This quickstart focuses on the frontend. The backend functionality is not affected by this change.
