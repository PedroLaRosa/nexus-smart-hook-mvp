# Nexus MVP

AI-powered tool that generates compelling video hooks from video URLs or scripts. Paste a video or your script and get 11 hook options — ranked from best to worst — for the first 3 seconds of your content.

## Features

- **Smart Hook from Video** — paste a YouTube URL and AI extracts the perfect opening hook
- **Smart Hook from Script** — paste your script and get 1 recommended hook + 10 alternatives
- **GitHub Authentication** — sign in with GitHub to access the tools

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** — fast dev server and build
- **Gemini 2.5 Flash** — AI hook generation
- **CSS Modules** — scoped styles, no frameworks
- **Vitest** + Testing Library — unit and hook tests
- **Playwright** — E2E tests

## Architecture

Hexagonal Architecture with vertical slicing by business module:

```
src/
├── shared/                          # Cross-cutting concerns
│   ├── domain/                      # Maybe, DomainError, Id, Url
│   └── infrastructure/
│       ├── http/HttpClient.ts       # Single fetch wrapper
│       ├── i18n/                    # i18next setup (en / es)
│       ├── ui/                      # App, routes, globals.css
│       └── factory.ts               # Dependency wiring (no DI container)
│
├── auth/                            # GitHub OAuth flow
│   ├── domain/
│   ├── application/                 # SignIn, SignOut, GetSession, ProcessCallback
│   └── infrastructure/
│       ├── adapters/                # SupabaseAuthAdapter
│       └── ui/                      # GitHubButton, UserMenu, AuthCallback
│
├── smartHookFromVideo/              # Hook generation from video URL
│   ├── domain/
│   ├── application/                 # GenerateSmartHookUseCase + Port
│   └── infrastructure/
│       ├── adapters/                # GeminiSmartHookAdapter
│       └── ui/                      # SmartHookFromVideo component + hook
│
├── smartHookFromScript/             # Hook generation from script text
│   ├── domain/
│   ├── application/                 # GenerateSmartHookFromScriptUseCase + Port
│   └── infrastructure/
│       ├── adapters/                # GeminiSmartHookFromScriptAdapter
│       └── ui/                      # SmartHookFromScript component + hook
│
└── health/                          # System health check
    ├── domain/
    ├── application/                 # HealthUseCase
    └── infrastructure/
        ├── adapters/                # HttpHealthRepository
        └── ui/                      # Health component + hook
```

### Dependency Rule

```
Infrastructure → Application → Domain
```

Dependencies always point inward. Domain has no external dependencies.

### Key Design Decisions

- **No DI container** — simple `factory.ts` with `get` (cached) / `create` (new instance) naming
- **No null** — `Maybe<T>` for all optional values
- **No fetch in adapters** — `HttpClient` is the single place where fetch is called
- **No Context API** — custom Subjects for shared state
- **InMemoryRepositories** instead of mocks in unit tests
- **Inside-out TDD** — domain → use case → adapter → UI

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Gemini API key
- Supabase project (for auth)

### Installation

```bash
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

| Variable                 | Description                       |
| ------------------------ | --------------------------------- |
| `VITE_API_URL`           | Backend API URL (default: `/api`) |
| `VITE_SUPABASE_URL`      | Supabase project URL              |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key                 |

### Development

```bash
npm start        # Dev server on http://localhost:5173
```

### Validation

```bash
npm run validate      # TypeScript + lint + all tests
npm run compile       # TypeScript check only
npm run lint          # ESLint only
npm test              # Vitest unit tests
npm run test:e2e      # Playwright E2E tests
```

### Build

```bash
npm run build
npm run preview
```

## Testing Strategy

| Layer                                    | Type        | Tool                          |
| ---------------------------------------- | ----------- | ----------------------------- |
| Domain entities, value objects, services | Unit        | Vitest                        |
| Use cases                                | Unit        | Vitest + InMemoryRepositories |
| Hooks                                    | Unit        | Vitest + Testing Library      |
| Components                               | Unit        | Vitest + Testing Library      |
| HTTP adapters                            | Integration | Vitest + real API             |
| Full UI flows                            | E2E         | Playwright                    |

## License

MIT
