# AGENTS.md — BLOG TIN HỌC

## 1. PROJECT CONTEXT & SOURCE OF TRUTH

Blog Tin Học is a personal educational website for lower secondary Computer Science education.

### Mandatory Project Context

The primary project context document is located at:

`project-context/NGUON_NGU_CANH_DU_AN_WEBSITE_TIN_HOC_THCS.md`

**Before planning, implementing, refactoring, or making any significant changes, Codex MUST:**

1. Read this `AGENTS.md`.
2. Read the entire project context document at the path specified above.
3. Inspect the relevant existing source files and project configuration.
4. Distinguish between:
   - Confirmed project requirements.
   - Features already implemented in the repository.
   - Proposed or planned features.
   - Missing or unverified information.
5. Ensure that proposed changes align with the project's goals, scope, technical constraints, and established decisions.

### Source of Truth

- **`AGENTS.md`** defines the operational instructions and development rules for Codex.
- **The project context document** defines product goals, target users, content structure, feature scope, and confirmed product decisions.
- **The actual repository** defines the current technical implementation, dependencies, configuration, and existing functionality.

The project context document MUST be treated as the primary reference for product requirements, but it must not be used to assume that proposed features have already been implemented.

### Missing Context or Conflicting Instructions

- If the project context document is missing or cannot be read, report the issue before proceeding with significant changes.
- Do not invent requirements, features, project status, or implementation details.
- If instructions conflict or a significant product decision is unclear, ask for clarification rather than making assumptions.
- Do not modify the project context document or override confirmed product decisions without explicit user approval.

### Context Maintenance

When a confirmed product decision changes, identify the relevant sections of the project context document that may require updating.

Do not silently modify project requirements or introduce conflicting documentation.

## 2. PROJECT PURPOSE

Blog Tin Học is an educational technology platform focused on:

- Sharing Computer Science learning materials for Grades 6–9.
- Providing teaching resources, lesson plans and assessment materials.
- Sharing PowerPoint teaching games and interactive learning resources.
- Teaching Python programming, algorithms and computational thinking.
- Presenting the creator's verified professional experience, educational products and projects.

Core philosophy: **Learn. Create. Share.**

The website prioritizes educational usefulness, followed by professional presentation and technical development.

AI-assisted coding is part of the website development workflow. It is not automatically a public content category.

Do not create a "Nhật ký Vibe Coding" section.

## 3. TARGET USERS

Primary users:

- Lower secondary Computer Science teachers.
- Students in Grades 6–9.

Secondary users:

- Teachers of other subjects seeking PowerPoint games.
- Beginner Python learners.
- Colleagues and people interested in educational technology.

Prioritize clear navigation, age-appropriate explanations and practical educational resources.

## 4. INFORMATION ARCHITECTURE

The website prioritizes five main sections:

1. Trang chủ — `/`
2. Tài liệu — `/tai-lieu/`
3. PowerPoint — `/powerpoint/`
4. Lập trình — `/lap-trinh/`
5. Giới thiệu / Portfolio — `/gioi-thieu/`

These routes are target routes, not automatically verified existing routes.

The Tài liệu section contains three main categories:

- Tài liệu tham khảo
- Đề kiểm tra
- Bài dạy

Resources should support classification by Grades 6, 7, 8 and 9.

The Lập trình section prioritizes Python learning materials.

Do not add new top-level navigation sections without explicit approval.

Do not introduce a Vibe Coding journal.

Preserve existing URLs whenever possible. Review routing and GitHub Pages compatibility before changing paths.

## 5. PRODUCT PRINCIPLES

Every feature should:

- Improve teaching or learning.
- Provide practical value to teachers or students.
- Make educational content easier to find and use.
- Be accurate, accessible and maintainable.
- Work with real content and functional links.

Prefer simple solutions over unnecessary complexity.

Do not introduce fake download buttons, invented statistics, fabricated achievements or nonfunctional interactions.

## 6. DESIGN & USER EXPERIENCE

- Follow the existing design system.
- Maintain a consistent visual identity.
- Use clean, modern and responsive layouts.
- Prioritize readability and mobile usability.
- Use reusable components and consistent design tokens.
- Ensure accessible contrast, keyboard navigation, visible focus states and meaningful image alt text.
- Preserve existing light/dark mode functionality when available.
- Avoid excessive animations, decoration and unnecessary UI complexity.

Use UI-UX-Pro-Max for relevant UI/UX work only when the skill is actually available.

Do not redesign unrelated pages without authorization.

## 7. TECHNICAL STACK & ARCHITECTURE

Project technologies reported by the owner:

- Docusaurus 3
- React 19
- TypeScript
- Markdown / MDX
- CSS Modules
- GitHub Pages
- Visual Studio Code and Codex

Verify actual dependency versions and scripts from `package.json`.

Expected GitHub Pages base URL: `/tech-blog/`.

Respect the existing Docusaurus configuration, routing, plugins and deployment workflow.

Prefer:

- React functional components and TypeScript.
- MDX for educational lessons and long-form content.
- Typed data structures for resource listings and filters.
- CSS Modules and existing CSS variables.
- Reusable components.
- Separation of content data and presentation.

Avoid introducing Next.js, backend services, databases, authentication, CMS, Tailwind CSS or additional dependencies without a demonstrated need and explicit approval.

Use Docusaurus routing and URL utilities appropriately. Do not hard-code root-relative asset paths that break under `/tech-blog/`.

## 8. DEVELOPMENT WORKFLOW

### Before coding

1. Understand the user's objective.
2. Inspect relevant files and existing components.
3. Identify reusable functionality.
4. Check architectural and routing constraints.
5. Propose an implementation approach for nontrivial changes.
6. Identify expected file changes, risks and verification steps.

### During coding

- Make small, focused changes.
- Reuse existing components when appropriate.
- Keep data separate from presentation.
- Use meaningful English identifiers.
- Maintain type safety.
- Avoid unnecessary dependencies.
- Do not modify unrelated files.
- Do not remove existing content without approval.
- Do not change routes or deployment configuration without assessing the impact.
- Do not introduce secrets or private information into the repository.

### After coding

- Run relevant checks using scripts actually defined in the project.
- Run the production build when applicable.
- Verify changed routes and links.
- Check responsive behavior for UI changes when testing tools are available.
- Check GitHub Pages base URL compatibility.
- Report actual test results and any unverified behavior.

Never claim that code has been tested or deployed unless it actually has.

Do not commit, push, merge or deploy without explicit authorization.

## 9. CONTENT ACCURACY, PRIVACY & COPYRIGHT

- Use accurate educational content appropriate for the intended grade.
- Do not invent curriculum requirements, achievements, credentials or personal details.
- Distinguish original resources from adapted or externally sourced materials.
- Attribute external sources when appropriate.
- Publish downloadable files only when sharing rights are established.
- Never expose student personal information, grades or confidential assessments.
- Do not publish student images without an appropriate basis for consent.
- Do not include API keys, tokens or credentials in source code.
- Clearly identify PowerPoint files containing macros and provide relevant safety guidance.
- Do not invent thumbnails, download URLs, demos or usage statistics.

Use real content for production. Development mock data must be clearly identified and removed or replaced before public release.

## 10. LANGUAGE POLICY — VIETNAMESE BY DEFAULT

Vietnamese is the default language of the website.

### Website Content

- Write headings, navigation labels, buttons, descriptions, messages, tooltips, empty states and error messages in natural Vietnamese.
- Use terminology appropriate for Vietnamese education and Computer Science.
- Keep established technical terms in English when that is clearer or more accurate.
- Do not automatically translate programming languages, API names, library names, identifiers or technical standards.

### Code and Documentation

- Use English for identifiers, functions, variables, component names, file names and APIs.
- Write comments and project documentation in Vietnamese by default.
- Use Vietnamese for sample content and placeholders.
- Preserve code syntax and framework conventions.

### Consistency

- Do not introduce unnecessary English user-facing text into Vietnamese pages.
- Preserve the meaning of existing content when editing.
- Use consistent terminology across the website.

## 11. TASK REPORTING & KNOWLEDGE TRANSFER

After completing an implementation task, report:

1. Objective and implemented solution.
2. Files created, modified or removed.
3. Important implementation decisions.
4. Commands executed and actual test results.
5. Known limitations, risks and unverified behavior.
6. Suggested next steps, if relevant.

When introducing React, TypeScript or Docusaurus concepts, briefly explain how the implementation works so the project owner can learn from the changes.

Do not describe planned work as completed work.

## 12. DECISION-MAKING & SCOPE CONTROL

Before implementing a feature, evaluate:

1. Does it support the educational purpose?
2. Does it improve the user experience?
3. Is it compatible with the existing architecture?
4. Can it be maintained easily?
5. Is a simpler solution available?

Prioritize the MVP before advanced features.

Do not independently introduce:

- New top-level content categories.
- Authentication or user accounts.
- Backend services or databases.
- Complex browser-based Python execution.
- AI chatbots or unrelated integrations.
- Unnecessary UI frameworks.

Advanced features may be researched and proposed separately, with clear benefits, trade-offs and implementation costs.

**The goal is not to maximize the number of features. The goal is to build a useful, reliable and maintainable educational website.**