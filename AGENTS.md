# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

Personal portfolio site for Rungroj Rungsaranon (fullstack developer). A single landing page with sections: hero, About me, Certifications, Projects, Tech stack, Contacts, and a resume download.

It is built as a **static export** (`output: 'export'`) and hosted on **AWS S3 + CloudFront** at `rungroj.dev`, provisioned with Terraform. (The README still mentions Vercel; that was the previous host.)

## Stack

- Next.js 16 (App Router, Turbopack), React 19
- Tailwind CSS v4 (via `@tailwindcss/postcss`; no `tailwind.config`, theme lives in `app/globals.css`)
- TypeScript, but most components are still `.jsx` (`allowJs` is on). New files should be `.tsx`.
- `react-icons` for icons (`si` brand icons for the tech stack)
- Fonts: Geist / Geist Mono via `next/font/google`
- Terraform (AWS provider ~6.x) for infrastructure

## Commands

```bash
npm install
npm run dev      # dev server (Turbopack) at http://localhost:3000
npm run build    # static export into ./out
npm run lint     # eslint (flat config, next/core-web-vitals + next/typescript)
```

There are no tests.

## Layout

```
app/
  layout.tsx        root layout, fonts, metadata (title, favicon)
  page.tsx          the whole page: composes the sections; navList drives nav + anchor ids
  globals.css       Tailwind import + shared classes: .topic-text, .secondary-topic-text, .btn, .liquid-glass
components/         reusable pieces (Section wrapper, Project card, Badge, TechStack tile, ContactDetail, ResumeDownload, icons/)
layout/             page sections (AboutMe, Badges, Projects, Stack, Contact) and Navbar/ (top Navbar, RightNavbar, NavLink)
public/
  picture/          project screenshots, profile photo, certification badges
  files/            resume PDF (linked by ResumeDownload)
  logo/favicon.svg
terraform-infra/
  bootstrap/        one-time: S3 bucket for remote Terraform state (local state)
  infra/            site: private S3 bucket, CloudFront + OAC, ACM cert lookup (us-east-1), URL-rewrite CloudFront Function (htmlExtendHelper.js)
out/, .next/        build output, git-ignored; do not edit
```

## Where content lives

Content is hard-coded in the section components, not in a CMS or data folder:

- Projects: `projects` array in `layout/Projects.jsx` (`name, img, description, type, stack, link, github, stage`). `type` is `'From Scratch'` or `'Figma to Code'`; `stage` is `'Completed'` or anything else (shown as in progress). Images go in `public/picture/` and `img` is the path without a leading slash.
- Certifications: `badges` array in `layout/Badges.tsx` (typed by `BadgeData` in `components/Badge.tsx`).
- Tech stack: `stacks` array in `layout/Stack.jsx`. Each `name` must have an entry in both `icons` and `brandColor` in `components/TechStack.jsx` (or an alias in `aliases`), otherwise rendering crashes.
- Nav: `navList` in `app/page.tsx`. Each label is also the `id` of the section wrapper it scrolls to, so renaming a label means renaming that `id` too. `'Download Resume'` is special-cased in `NavLink` to render the resume button.
- About me and contact details: `layout/AboutMe.jsx`, `components/ContactDetail.jsx`.

## Conventions

- Prettier-style formatting: single quotes, no semicolons, 2-space indent, trailing commas.
- Default-exported function components; Tailwind utility classes inline, often composed with `[...].join(' ')`.
- Use the `@/` path alias (maps to repo root) for imports.
- Wrap sections in `components/Section` and use `.topic-text` for the section `h2`.
- Only add `'use client'` when a component needs state, effects or browser APIs (`RightNavbar`, `ContactDetail`).
- Because of the static export, no server features: no API routes, no runtime image optimisation (`images.unoptimized: true`), no `headers()`/cookies. Optimise images before adding them to `public/`.
- Commit messages follow conventional-ish prefixes: `feat:`, `fix:`, `chore:`, `style:`, `build:`, `infra:`.

## Infrastructure and deploy

- AWS region `ap-southeast-7`; the ACM certificate for `rungroj.dev` must be in `us-east-1` (aliased provider in `infra/cloudfront.tf`).
- State: S3 backend `state-bucket-portfolio-project`, key `portfolio/terraform.tfstate`, with `use_lockfile`.
- Deploy is manual: `npm run build`, upload `out/` to the bucket from `terraform output bucket_name`, then invalidate the CloudFront distribution (`terraform output distribution_id`).
- Never commit `*.tfstate`, `.terraform/` or `*.tfvars`. Do not run `terraform apply` or touch AWS without the owner's explicit go-ahead.
