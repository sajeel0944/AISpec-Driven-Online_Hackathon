---
sidebar_position: 1
---

# Managing Physical AI Projects

Developing Physical AI and humanoid robotics projects often involves complex pipelines, numerous software components, and various hardware iterations. Effective project management and versioning are crucial for success. This document outlines strategies for managing your Physical AI documentation and project assets.

## Version Control for Robotics Software

Just like any software project, your robotics code, configurations, and models should be under strict version control (e.g., Git). This allows for:
-   **Tracking Changes**: Keep a history of all modifications to your code, robot descriptions (URDF/SDF), and simulation environments.
-   **Collaboration**: Enable multiple developers to work on the same project concurrently without conflicts.
-   **Rollbacks**: Easily revert to previous working states if issues arise.

## Managing Documentation Versions with Docusaurus

For projects with long development cycles or multiple product releases, managing different versions of your documentation is essential. Docusaurus provides built-in support for document versioning.

### Creating a New Docs Version

When you reach a significant milestone or release a new hardware/software iteration (e.g., version 1.0 of your robot's operating system), you can create a snapshot of your current documentation:

```bash
npm run docusaurus docs:version 1.0
```

This command will copy your `docs` folder content into `versioned_docs/version-1.0` and update `versions.json`. Your documentation site will then serve two versions:
-   `1.0` (e.g., at `http://localhost:3000/docs/`) for the released version.
-   `current` (e.g., at `http://localhost:3000/docs/next/`) for ongoing development.

### Updating Existing Versions

You can make small updates or fixes to a specific version by directly editing files in its `versioned_docs/version-X.X/` folder. For instance, to fix a typo in your 1.0 docs:
-   Edit `versioned_docs/version-1.0/your-doc.md`
-   Your deployed site will then reflect this change for the 1.0 version.

## Managing Robot Models and CAD Files

Beyond software, Physical AI projects involve managing 3D models (CAD, URDF, SDF), sensor configurations, and simulation assets.
-   **Dedicated Repositories**: Consider separate version-controlled repositories for large binary assets or frequently updated models.
-   **Semantic Versioning**: Apply semantic versioning to your robot designs and software releases to clearly communicate changes and compatibility.

## Continuous Integration/Continuous Deployment (CI/CD)

Automate the testing, building, and deployment of your robotics software and documentation.
-   **Automated Tests**: Run unit, integration, and simulation tests on every code push.
-   **Automated Builds**: Build your robot's firmware, software packages, and Docusaurus site automatically.
-   **Automated Deployment**: Deploy updated software to robots (for testing) and documentation to your hosting platform.

By adopting robust project management and versioning practices, you can streamline the development of complex Physical AI systems and ensure your documentation remains accurate and accessible.