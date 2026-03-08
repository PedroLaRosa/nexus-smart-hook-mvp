# CLAUDE.md - Nexus MVP

## Project Overview

Frontend MVP using **Hexagonal Architecture** with vertical slicing by business modules.

**Tech stack**: React + TypeScript + Vite + CSS Modules + Vitest + Playwright

**Key scripts**:
- `npm start` — dev server (Vite, port 5173)
- `npm run validate` — compile + lint + test
- `npm run compile` — TypeScript check
- `npm run lint` — ESLint
- `npm test` — Vitest unit tests

---

## Core Rules (always apply)

@.claude/rules/agent-xp.md
@.claude/rules/architecture-hexagonal.md
@.claude/rules/design-naming.md
@.claude/rules/design-functions.md
@.claude/rules/design-classes-modules.md
@.claude/rules/design-comments.md
@.claude/rules/design-errors.md
@.claude/rules/practices-tdd.md
@.claude/rules/practices-inside-out.md

---

## Layer-Specific Rules

### When working in domain/entities/
@.claude/rules/architecture-domain-entities.md

### When working in domain/value-objects/
@.claude/rules/architecture-domain-value-objects.md

### When working in domain/repositories/
@.claude/rules/architecture-domain-repositories.md

### When working in domain/services/
@.claude/rules/architecture-domain-services.md

### When working in application/
@.claude/rules/architecture-application-usecases.md
@.claude/rules/architecture-application-dtos.md

### When working in infrastructure/adapters/
@.claude/rules/architecture-infrastructure-adapters.md

### When working in factory.ts
@.claude/rules/architecture-infrastructure-factory.md

### When working in *.tsx files
@.claude/rules/frontend-components.md
@.claude/rules/frontend-hooks.md
@.claude/rules/frontend-css-modules.md
@.claude/rules/frontend-i18n.md

### When working in *.hook.ts files
@.claude/rules/frontend-hooks.md

### When working in *.module.css files
@.claude/rules/frontend-css-modules.md

### When working in locales/**/*.json or src/shared/infrastructure/i18n/
@.claude/rules/frontend-i18n.md

### When working in *.test.ts / *.test.tsx files
@.claude/rules/practices-testing.md

---

## Custom Commands

| Command | Description |
|---------|-------------|
| `/validate` | Run full project validation (compile + lint + test), fix errors |
| `/tdd` | Reminder to apply strict TDD cycle |
| `/tpp` | Apply TPP: choose simplest transformation that passes the test |
| `/refactor` | Refactor applying naming, functions, and classes rules |
| `/refactor-tests` | Refactor tests following testing standards |
| `/rename` | Rename last artifact following naming standards |
| `/tests` | Compile and run all tests, verify nothing is failing |
| `/ux-review` | Visual UX review using Playwright MCP |
