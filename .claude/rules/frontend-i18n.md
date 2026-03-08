# I18n Translation Standards

Scope: `*.tsx`, `locales/**/*.json`, `src/shared/infrastructure/i18n/i18n.ts`

## Architecture

- i18next initialized synchronously in `src/shared/infrastructure/i18n/i18n.ts`
- Locale files in `locales/{lang}/{namespace}.json` (one file per namespace per language)
- Languages: `en` (default/fallback) and `es`
- Language detection: `navigator.language.startsWith('es')` → `'es'`, otherwise `'en'`
- Import i18n in `src/main.tsx` and `vitest.setup.ts` before any component renders

---

## Translation Tag Format

The full logical key is: `{namespace}:{component-name}.{text_key}`

When calling `useTranslation('namespace')`, the namespace prefix is implicit:
```tsx
const { t } = useTranslation('auth');
t('github-button.continue_with_github')  // → locales/en/auth.json → "github-button" → "continue_with_github"
```

---

## Naming Conventions

### Namespace (file name + registration key)
- **snake_case** matching the feature/page name
- Examples: `landing`, `auth`, `health`, `dashboard`, `smart_hook`

```typescript
// GOOD
import enSmartHook from '../../../../locales/en/smart_hook.json';
resources: { en: { smart_hook: enSmartHook } }

// BAD - camelCase or kebab-case for namespace
resources: { en: { smartHook: ..., 'smart-hook': ... } }
```

### Top-level JSON key (component name)
- **kebab-case** matching the component filename
- Examples: `"github-button"`, `"user-menu"`, `"smart-hook-from-video"`, `"auth-callback"`

```json
// GOOD - auth.json
{
  "github-button": { "continue_with_github": "Continue with GitHub" },
  "user-menu": { "sign_out": "Sign out" }
}

// BAD - camelCase or other conventions
{
  "githubButton": { ... },
  "UserMenu": { ... }
}
```

### Property key (text identifier)
- **snake_case** describing the text's role
- Examples: `"continue_with_github"`, `"error_title"`, `"status_label"`, `"url_placeholder"`

```json
// GOOD
{ "smart-hook-from-video": { "button_analyzing": "Analyzing...", "result_label": "Hook for the first 3 seconds:" } }

// BAD - camelCase or vague names
{ "smart-hook-from-video": { "buttonAnalyzing": "...", "text1": "..." } }
```

---

## Component Usage

### Simple strings — `useTranslation` + `t()`

```tsx
// GOOD - call useTranslation with the namespace, then t('component.key')
const { t } = useTranslation('auth');
<button>{t('github-button.continue_with_github')}</button>
<button aria-label={t('user-menu.aria_label')}>

// GOOD - deeply nested
const { t } = useTranslation('dashboard');
{t('dashboard.nav.smart_hook_from_video')}
```

### Interpolation — `{{variable}}` syntax

```json
// In JSON file
{ "auth-callback": { "error": "Error: {{message}}" } }
```

```tsx
// In component
t('auth-callback.error', { message: error.message })
```

### Strings with embedded HTML — `Trans` component

Use `Trans` when the JSON value contains markup tags like `<bold>text</bold>`.

```json
// In JSON file — use custom tag names (not actual HTML)
{ "hero": { "headline": "<bold>Extract the perfect hook</bold> from any video" } }
```

```tsx
// In component — map custom tags to JSX elements
import { Trans } from 'react-i18next';

<Trans i18nKey="hero.headline" ns="landing" components={{ bold: <b /> }} />
```

---

## Adding New Translations

When adding a new translatable string:

1. **Identify namespace** — which feature/page does it belong to?
2. **Add the key** to `locales/en/{namespace}.json` under the correct component object
3. **Mirror the key** in `locales/es/{namespace}.json` with the Spanish translation
4. **Register the namespace** in `i18n.ts` if it's new (add to resources + imports)
5. **Call `t()`** in the component using `useTranslation('{namespace}')`

```json
// locales/en/auth.json — add new key to existing component object
{
  "github-button": {
    "continue_with_github": "Continue with GitHub",
    "sign_in_description": "Sign in to access your account"
  }
}
```

---

## File Structure

```
locales/
├── en/
│   ├── landing.json       # Landing page strings
│   ├── auth.json          # Auth components (GitHubButton, UserMenu, AuthCallback)
│   ├── health.json        # Health component
│   ├── dashboard.json     # Dashboard layout
│   └── smart_hook.json    # SmartHookFromVideo component
└── es/
    └── (mirror of en/, identical keys)

src/shared/infrastructure/i18n/
└── i18n.ts               # i18next initialization
```

---

## Non-Negotiable Rules

### NEVER:
1. Hardcode UI strings directly in `.tsx` files — always use `t()`
2. Use camelCase for top-level JSON keys (component names) — use kebab-case
3. Use camelCase or kebab-case for namespace names — use snake_case
4. Use camelCase for property keys — use snake_case
5. Add a key in only one language file — both `en` and `es` must always be updated together
6. Use `<Trans>` for plain text without markup — use `t()` instead

### ALWAYS:
1. Follow the format `{namespace}:{component-name}.{text_key}` as the logical key
2. Group all strings of a component under the same top-level key in the JSON
3. Keep `locales/en/` and `locales/es/` in perfect sync (identical structure, all keys present)
4. Use `{{variable}}` for dynamic values in translations
5. Use `<Trans>` with `components={{ tagName: <Element /> }}` for strings containing embedded HTML
