# AGENTS.md

This repository is a Next.js 16 (App Router) app with TypeScript, Tailwind v4, and Prisma.
Use this guide when making changes so automated agents follow the existing conventions.

## Quick Start
- Package manager: npm (package.json present).
- Framework: Next.js App Router in `src/app`.
- Language: TypeScript with `strict: true`.
- Styling: Tailwind (via `@import "tailwindcss"` in `src/app/globals.css`).

## Commands
Run commands from the repo root.

### Development
- `npm run dev` - start local dev server (http://localhost:3000).
- `npm run build` - production build.
- `npm run start` - start production server after build.

### Lint
- `npm run lint` - run ESLint (Next.js core-web-vitals + TypeScript).

### Tests
- No test runner is configured in `package.json`.
- If tests are added later, prefer a `npm run test -- <pattern>` convention so single-test runs are possible.
- Until then, rely on lint + TypeScript for verification.

### Prisma
- Schema file: `prisma/schema.prisma`.
- Migrations live under `prisma/migrations`.
- Seed script: `prisma/seed.ts` (run manually if needed).

## Repo Layout
- `src/app` - Next.js App Router pages, layouts, API routes.
- `src/components` - client components.
- `src/lib` - utilities and domain logic.
- `src/data` - static tarot data.
- `prisma` - database schema + migrations.

## Cursor / Copilot Rules
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` were found.
- If these are added later, update this file with their guidance.

## Code Style Guidelines
Follow the existing patterns in the file you are touching. Prefer consistency over invention.

### TypeScript + React
- Use TypeScript everywhere; keep `strict` compliance.
- Use `type` aliases for simple shapes (common in this repo).
- Prefer explicit props typing when non-trivial.
- Use functional components and hooks.
- Keep client components marked with the `"use client"` directive.

### Imports
- Use ES module imports, double quotes, and semicolons.
- Prefer path alias imports with `@/*` for internal modules.
- Typical ordering:
  1. Framework/Next imports
  2. Third-party
  3. Internal `@/` imports
  4. Relative imports

### Formatting
- 2-space indentation.
- Double quotes for strings.
- Semicolons required.
- Keep lines readable; wrap long JSX props.
- Prefer inline JSX formatting similar to existing files.

### Naming Conventions
- Components: `PascalCase` (e.g., `TarotChat`).
- Hooks/functions/vars: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` when global or module-level.
- File names match component names (e.g., `TarotChat.tsx`).

### Error Handling
- API routes return `NextResponse.json` with explicit status codes.
- Validate input early and return friendly error messages.
- Use `try/catch` for network calls and timeouts.
- Prefer safe defaults when data may be missing (`?? "No reply."`).

### API Routes (Next.js)
- Routes live under `src/app/api/**/route.ts`.
- Export HTTP handlers (`GET`, `POST`) as named exports.
- Prefer `runtime = "nodejs"` when using fetch timeouts or Node APIs.

### Data Access (Prisma)
- Keep schema changes in `prisma/schema.prisma`.
- Follow existing naming: `Reading`, `ReadingCard`, `TarotCard`.
- Use `cuid()` ids and existing enum casing.

### Styling
- Tailwind is available; `src/app/globals.css` defines theme variables.
- Some components use inline styles; match surrounding patterns.
- Avoid heavy visual changes without aligning to current page structure.

### Environment Variables
- API routes expect `AI_SERVICE_URL` and `AI_SHARED_SECRET`.
- Validate env vars before use; return 500 if missing.

## Suggested Workflow
1. Identify the file and follow its local style.
2. Update or add types as needed.
3. Run `npm run lint` after changes.
4. If introducing tests later, add a single-test command and document it here.

## Notes for Agents
- Do not add new tooling/config unless requested.
- Keep changes minimal and scoped to the task.
- If you touch Prisma schema, consider whether a migration is needed.
