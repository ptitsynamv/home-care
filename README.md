# Home Care

**A bilingual (English / Ukrainian) home-renovation showcase built with the Next.js App Router.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Storybook](https://img.shields.io/badge/Storybook-9-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![MSW](https://img.shields.io/badge/MSW-2-FF6A33?logo=mockserviceworker&logoColor=white)](https://mswjs.io)
[![Node.js](https://img.shields.io/badge/Node.js-22.15.1-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey)](#license)
[![Build](https://img.shields.io/badge/CI-not%20configured-lightgrey?logo=githubactions&logoColor=white)](#testing)
<!-- When a GitHub Actions workflow exists, swap the badge above for:
[![Build](https://github.com/ptitsynamv/home-care/actions/workflows/<workflow>.yml/badge.svg)](https://github.com/ptitsynamv/home-care/actions)
-->

Home Care is a portfolio app for a renovation business. It shows service plans, a blog and a Shopify product catalog, with Google sign-in, a light/dark theme and an English/Ukrainian language switcher. It's also a sandbox for modern React tooling: Server Components, Redux Toolkit, Mock Service Worker and Storybook interaction tests.

---

## Table of contents

- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Testing](#testing)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [License](#license)

## Key features

- **Service plans:** the home page shows pricing cards and opens a "call me back" form in a modal.
- **Blog:** shows localized articles loaded from the REST API.
- **Shopify catalog:** server-rendered product list and product detail pages (`/shopify/[slug]`), loaded through the Shopify Storefront GraphQL API.
- **Task board:** a Redux Toolkit demo at `/task` with async loading and pinned/archived task states.
- **Internationalization:** English and Ukrainian via `next-intl`. The selected language is saved in a cookie, so URLs stay the same in both languages.
- **Authentication:** Google sign-in with NextAuth.js.
- **Dark mode:** class-based theme toggle using Tailwind's `dark:` variants.
- **API mocking:** Mock Service Worker serves the REST API in development and in Storybook, so no backend is needed.
- **Component workshop:** Storybook 9 with accessibility checks and story tests that run in a headless browser through Vitest.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack dev server) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Language | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| State | [Redux Toolkit](https://redux-toolkit.js.org) + [React Redux](https://react-redux.js.org) |
| i18n | [next-intl](https://next-intl.dev) |
| Auth | [NextAuth.js v4](https://next-auth.js.org) (Google provider) |
| Commerce | [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL) |
| Mocking | [Mock Service Worker](https://mswjs.io) |
| Component dev & tests | [Storybook 9](https://storybook.js.org), [Vitest 3](https://vitest.dev) (browser mode), [Playwright](https://playwright.dev) |
| Linting | ESLint 9 (`next/core-web-vitals`, `next/typescript`, Storybook plugin) |

## Prerequisites

| Tool | Version |
| --- | --- |
| [Node.js](https://nodejs.org) | **22.15.1** (the tested version) |
| npm | **10.9.2** (ships with Node 22.15.1) |
| Git | any recent version |

If you have a different Node version installed (Node 24, for example), use a version manager so this project runs on the tested version:

```bash
# macOS / Linux — https://github.com/nvm-sh/nvm
nvm install 22.15.1
nvm use 22.15.1

# Windows — https://github.com/coreybutler/nvm-windows
nvm install 22.15.1
nvm use 22.15.1

node -v   # v22.15.1
npm -v    # 10.9.2
```

You'll also need these, depending on which features you want to use:

- **Google sign-in:** a Google Cloud OAuth 2.0 client ID.
- **The `/shopify` pages:** a Shopify Storefront API endpoint and token. For a local backend, see [ptitsynamv/next-shopify-local](https://github.com/ptitsynamv/next-shopify-local).

## Getting started

```bash
# 1. Clone
git clone https://github.com/ptitsynamv/home-care.git
cd home-care

# 2. Use the right Node version (see Prerequisites)
nvm use 22.15.1

# 3. Install dependencies
npm install

# 4. Create your local environment file
cp env.local.example .env.local      # Windows PowerShell: Copy-Item env.local.example .env.local
#    ...then fill in the values (see the next section)

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

In development, the Mock Service Worker starts in the browser and serves the `plan` and `blog` endpoints, so the home page and blog work without a backend.

## Environment variables

Put these in `.env.local` at the project root. Git ignores this file.

| Variable | Required for | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Home page, Blog | Base URL of the REST API. **Must end with `/`**: requests are built as `${NEXT_PUBLIC_API_URL}plan` and `${NEXT_PUBLIC_API_URL}blog`. In development, MSW intercepts these requests, so any base URL works (e.g. `http://localhost:3000/mock-api/`). |
| `GOOGLE_CLIENT_ID` | Sign-in | OAuth client ID from Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | Sign-in | OAuth client secret. |
| `NEXTAUTH_SECRET` | Sign-in | Random string used to encrypt sessions, e.g. `openssl rand -base64 32`. |
| `SHOPIFY_STORE_DOMAIN` | `/shopify` | The **full Storefront GraphQL endpoint URL**, not just the domain. It's passed straight to `fetch`. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `/shopify` | Storefront API access token. |

For Google OAuth, add this authorized redirect URI to your OAuth client:

```
http://localhost:3000/api/auth/callback/google
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with Turbopack on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint through `next lint` |
| `npm run storybook` | Start Storybook on [http://localhost:6006](http://localhost:6006) |
| `npm run build-storybook` | Build a static Storybook into `storybook-static/`, which any static host can serve |
| `npm run test-storybook` | Run the Storybook test runner against a running Storybook (add `--watch` to watch for changes) |

## Testing

The project's tests are its Storybook stories: interaction tests plus accessibility checks with `@storybook/addon-a11y`.

**Option A: Vitest in browser mode (headless Chromium)**

```bash
npx playwright install chromium    # one-time browser download

npx vitest --project=storybook                                        # all stories
npx vitest --project=storybook app/_components/task/Task.stories.tsx  # a single file
```

**Option B: Storybook test runner**

```bash
npm run storybook          # terminal 1
npm run test-storybook     # terminal 2
```

> Accessibility checks are set to `todo` in `.storybook/preview.ts`. Violations are reported in the test UI but don't fail the run. Change the setting to `'error'` to enforce them.

No CI pipeline is set up yet, so run these checks locally before pushing.

## Project structure

```text
home-care/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group (doesn't appear in URLs)
│   │   ├── about/                #   /about
│   │   ├── blog/                 #   /blog         – client fetch → REST API / MSW
│   │   ├── shopify/              #   /shopify      – server component → Shopify GraphQL
│   │   │   └── [slug]/           #   /shopify/:handle
│   │   └── task/                 #   /task         – Redux Provider + task board
│   ├── _components/              # Shared UI (private folder, not routed)
│   │   ├── layout/header.tsx     #   Navigation, auth buttons, theme & locale switchers
│   │   ├── task/, task-list/,    #   Task board components + *.stories.tsx
│   │   │   inbox-screen/
│   │   ├── modal/, locale-switcher/, theme-button/, hooks/
│   ├── _hooks/                   # App-level hooks (useTheme)
│   ├── _lib/
│   │   ├── interfaces/           #   TypeScript types + runtime config
│   │   ├── queries/              #   Shopify GraphQL query strings
│   │   ├── services/             #   shopifyFetch, auth helpers, locale server actions
│   │   └── store/store.ts        #   Redux Toolkit store (taskbox slice)
│   ├── api/auth/[...nextauth]/   # NextAuth route handler
│   ├── layout.tsx                # Root layout: fonts, locale, providers
│   ├── template.tsx              # Header + page shell; starts MSW in development
│   ├── providers.tsx             # Client providers (NextAuth SessionProvider)
│   ├── page.tsx                  # Home page – service plans + callback modal
│   └── error.tsx, loading.tsx, not-found.tsx
├── i18n/                         # next-intl config (locales, request config)
├── messages/                     # Translation files: en.json, uk.json
├── mocks/                        # MSW handlers + browser/node setup
├── public/                       # Static assets, product images, mockServiceWorker.js
├── .storybook/                   # Storybook + Vitest setup
├── stories/                      # Storybook starter examples (not loaded by config)
├── env.local.example             # Template for .env.local
├── next.config.ts
├── vitest.config.ts
└── eslint.config.mjs
```

## How it works

**Data sources.** The app gets data from three places:

1. **REST API (mocked).** The home page and blog are client components that call `NEXT_PUBLIC_API_URL` with a `?locale=` parameter. In development, `app/template.tsx` starts the MSW browser worker, and `mocks/handlers.ts` returns localized data. In production, these requests go to the real API.
2. **Shopify Storefront API.** The `/shopify` pages are React Server Components. They call `shopifyFetch()` with GraphQL queries from `app/_lib/queries/`.
3. **Redux Toolkit.** The `/task` page has its own `<Provider>`. The `fetchTasks` thunk loads sample todos from JSONPlaceholder.

**Internationalization.** The locale comes from a `LOCALE` cookie. The language switcher sets it through a server action, and `i18n/request.ts` loads the matching `messages/<locale>.json` file. URLs have no locale prefix. When you add UI text, add the key to both `messages/en.json` and `messages/uk.json`.

**Theming.** The `ThemeButton` toggles a `dark` class on `<html>`. Components style themselves with Tailwind's `dark:` variants.

## License

This repository has no license yet. Until a `LICENSE` file is added, all rights are reserved by the author.
