# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 15 (App Router, Turbopack dev) + React 19 + TypeScript (strict), Tailwind CSS v4, next-intl, next-auth (Google), Redux Toolkit, MSW, Storybook 9. This is a **React** project — Angular-specific global rules (OnPush, RxJS, `$localize`, etc.) do not apply here.

Toolchain per README: Node.js v22.15.1, npm v10.9.2. Copy `env.local.example` to `.env.local` before running (Google OAuth, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_API_URL`, Shopify Storefront domain/token).

## Commands

```bash
npm run dev               # dev server on http://localhost:3000 (turbopack)
npm run build             # production build
npm run lint              # next lint (next/core-web-vitals + next/typescript + storybook rules)
npm run storybook         # Storybook on :6006
npm run test-storybook    # Storybook test-runner (needs Storybook running); add --watch to watch
npx vitest --project=storybook                                      # story tests via Vitest browser mode (headless Chromium/Playwright)
npx vitest --project=storybook app/_components/task/Task.stories.tsx # single story file
```

There are no unit tests outside Storybook stories; stories (with a11y checks in `todo` mode) are the test suite. Storybook only picks up stories under `app/_components/**/*.stories.tsx` — the top-level `stories/` folder is Storybook boilerplate and is not loaded.

## Architecture

- **Routing:** `app/layout.tsx` (server) resolves the locale and wraps everything in `NextIntlClientProvider` + `app/providers.tsx` (`SessionProvider`). `app/template.tsx` is a client component that renders the shared `Header` and page shell. Feature pages live in the `app/(marketing)/` route group (`about`, `blog`, `shopify`, `shopify/[slug]`, `task`); the home page is `app/page.tsx`.
- **Private folders:** `app/_components/` (UI, each component in its own kebab-case folder with optional `.stories.tsx`), `app/_hooks/`, `app/_lib/` (`interfaces/` types, `services/`, `queries/` Shopify GraphQL strings, `store/` Redux).
- **Imports:** use the `@/` alias (maps to repo root), e.g. `@/app/_lib/...`, `@/i18n/config`.

### Data sources (three different ones)

1. **Mock REST API via MSW** — the home page (`/plan`) and blog (`/blog`) are client components that `fetch(\`${config.apiUrl}<endpoint>?locale=..\`)`. In development, `app/template.tsx` starts the MSW browser worker (`mocks/browser.ts`), which serves localized data from `mocks/handlers.ts`. `NEXT_PUBLIC_API_URL` must be set (with trailing slash) for handlers to match. The worker script lives in `public/mockServiceWorker.js`. Storybook uses the same MSW setup via `msw-storybook-addon`.
2. **Shopify Storefront GraphQL** — server components call `shopifyFetch<T>()` (`app/_lib/services/shopify.ts`) with query strings from `app/_lib/queries/`. Intended backend: https://github.com/ptitsynamv/next-shopify-local.
3. **Redux Toolkit** — `app/_lib/store/store.ts` holds the `taskbox` slice (async `fetchTasks` thunk against jsonplaceholder, `updateTaskState` reducer). The `Provider` is mounted only in `app/(marketing)/task/page.tsx`, not app-wide. Stories mock the store by building a local slice with the same `taskbox` shape.

### i18n

next-intl **without locale routing**: the locale comes from a `LOCALE` cookie (`app/_lib/services/locale.ts` server actions), read in `i18n/request.ts`, which loads `messages/<locale>.json`. Supported locales are `en` and `uk` (`i18n/config.ts`). Any new UI string must be added to **both** `messages/en.json` and `messages/uk.json` under the component's namespace (`useTranslations('Header')`, etc.). Mock API data is localized separately in `mocks/handlers.ts`.

### Auth & theming

- next-auth with Google provider at `app/api/auth/[...nextauth]/route.ts`; client helpers in `app/_lib/services/auth.ts`, session read via `useSession()`.
- Dark mode is a `dark` class toggled on `<html>` (`app/_hooks/useTheme.tsx`); style with Tailwind `dark:` variants.

## Code style

Prettier (via VS Code settings): single quotes, trailing commas, print width 100. Prefer non-relative `@/` imports.
