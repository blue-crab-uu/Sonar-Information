# Copilot / AI Assistant Instructions for this repository ✅

Short, actionable guidance to help AI coding agents be productive with this Gatsby starter project.

## Big picture 🔧
- This is a **Gatsby v5** static site (React 18) using the starter boilerplate. Key directories: `src/pages/` (page components), `src/templates/` (programmatic pages), `src/components/` (UI pieces), and `src/images/` (static images).
- Build is handled by Gatsby: pages are generated at build-time; see `gatsby-node.js` for any programmatic page creation (example: deferred static generation at `/using-dsg`).

## Important commands & workflows ▶️
- Development: `npm run develop` (alias: `npm start`) — runs the dev server at `http://localhost:8000`.
- Production build: `npm run build` then inspect via `npm run serve`.
- Clean cache/artifacts: `npm run clean`.
- Formatting: `npm run format` (Prettier is configured in `devDependencies`).
- Tests: `npm run test` is a placeholder (exits non-zero); there are no unit tests currently.

## Project-specific patterns & examples 🧭
- Images: `gatsby-source-filesystem` points to `src/images/` (see `gatsby-config.js`). Use `StaticImage` from `gatsby-plugin-image` for local static images (example: `src/pages/index.js`).
- GraphQL/queries: `useStaticQuery` is used in `src/components/layout.js`. Use GraphiQL at `/___graphql` during development to explore schemas and queries.
- CSS: Module CSS is used for component-scoped styles (e.g., `src/components/index.module.css`). Global styles live in `src/components/layout.css` and are imported directly in `layout.js`.
- Navigation: Use `Link` from `gatsby` for internal links (see `src/components/header.js` and `src/pages/index.js`).
- Programmatic pages & DSG: `gatsby-node.js` shows `createPage({ path: '/using-dsg', component: './src/templates/using-dsg.js', defer: true })` — to create deferred static pages, include `defer: true`.

## Integration points & external dependencies 🔗
- Plugins of note (see `gatsby-config.js`): `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`, `gatsby-source-filesystem`, `gatsby-plugin-manifest`.
- Site metadata lives in `gatsby-config.js` and is queried via GraphQL (e.g., `site.siteMetadata.title`).

## What not to assume ❗
- There are no tests or CI workflows in the repo; do not assume tests exist. The `test` script is intentionally a placeholder.
- This repo is a minimal starter — many production concerns (routing, i18n, SSR edge cases, CI) are not implemented here.

## Quick fixes / PR guidance for an AI assistant ✍️
- For visual changes: edit `src/components/*` and update CSS modules in `src/components/*.module.css`.
- To add images: put files in `src/images/` and reference via `StaticImage` or GraphQL File nodes if dynamic.
- To add a programmatic page: update `gatsby-node.js` to call `createPage()` and add a template in `src/templates/`.
- Run `npm run format` before committing to match repo formatting.

If you want, I can expand this file with snippets for common tasks (adding images, creating pages, or migrating to a plugin), or merge any existing guidance you prefer. 💡
