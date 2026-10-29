# Portfolio v2 (rungroj.dev)

The site is a Next.js static export in `frontend/` (this folder; run every npm command here). `terraform-infra/`, beside it at the repo root, holds the AWS infrastructure and the contact Lambda (see Infrastructure and deploy). Paths below are relative to `frontend/`, except `terraform-infra/…`, which is relative to the repo root. v2 replaced the first frontend (`.jsx` components in `layout/` and `components/`); its history is in git.

Design system: @DESIGN.md (v4, synced with the code; every color in it matches `app/tokens.css` in both themes). If they ever disagree, the code wins: `app/tokens.css` for tokens, the components for patterns. Update DESIGN.md in the same change as any new component, color or motion.

Tokens live in `app/tokens.css` (Tailwind v4 `@theme`). Never hard-code a hex or an arbitrary size in a component; use token utilities (`bg-canvas`, `text-accent-ink`, `rounded-md`, `text-display`, …). Exceptions that are content, not tokens: tech brand colors (`components/tech-icon.tsx`), AWS/Cloudflare/Terraform service icons (`components/service-icon.tsx`).

## Folder rules

- Never run `terraform apply`, upload to S3 or otherwise touch AWS without the owner's explicit go-ahead.
- The impeccable skill lives in the workshop repo (`C:\Users\6330466221\Desktop\aidlc_mikelopster_workshop`), read-only; run its launcher with cwd here. It caches its binary in `~/.impeccable`.

## Who the site is for, and the owner's taste

- Recruiter-first. The first screen must answer: open to work, which roles (junior fullstack or cloud), where (Bangkok or remote), headline, resume, contact, main expertise, certifications. On **every** screen size the hero must fit the first screen.
- The owner is preparing for **cloud engineer** roles (AWS, Terraform, CI/CD with GitHub Actions). Positioning: "Fullstack developer, AWS certified."
- Facts only from real sources: the repos' READMEs (github.com/Imperator7), `terraform-infra/` (Terraform and the Lambda), the resume, or what the owner says. Do not claim things like "rungroj.dev has a CI/CD pipeline" until the owner says so. Facts the owner has confirmed: OAC between CloudFront and S3, S3 Block Public Access on, Terraform remote state in a private S3 bucket with locking, ACM certs on both rungroj.dev and api.rungroj.dev, Cloudflare Registrar holds the domain. TOEIC Listening & Reading 965/990 (CEFR C1), issued 15 Jan 2025 (show the issued date only).
- Hero project = **rungroj.dev only** (Dine Together is "In development"). Note easy has **no live demo** (Firebase account expired); `demoUrl` is optional and the "Live demo" link hides when it's missing.
- **Desktop (lg+) is the reference layout.** Responsive work for phones/tablets goes in `max-lg:` / `max-sm:` / `sm:max-lg:` classes so desktop stays pixel-identical; measure desktop before and after.
- Owner's taste, learned by iteration:
  - Likes: smooth, refined motion; things graspable at a glance; monochrome UI where color comes only from content (AWS orange, the green live dot, success green, brand/service icons).
  - Rejected: red/brick accents (tried twice, removed), blue accent ("too plain" white is the answer, with a gentle sheen), heavy glows on buttons, black discs inside white buttons, cards behind the hero expertise, captions under badges, hover states that *darken* (hover should energize: lift, glow, shine).
  - Rejected on the message form ("too AI slop"): a light circling the border, dot-grid and glow backgrounds, focus halos, an outline plus a deep shadow, a decorative icon tile, three stacked header lines, pixel sunglasses on the photo, a Ctrl + Enter hint. What worked: a real, meaningful detail (the photo, the live Bangkok clock, the progress ring) instead of an effect. Run `impeccable` (critique) when something reads as generic.
  - Wants facts scannable, not in paragraphs (the About rebuild). Asks "should I…?" questions: give a verdict and the reason, then offer to do it.
  - Iterates fast and visually: verify each change in the browser before reporting it.

## Current page structure

- `app/not-found.tsx`: the styled 404 (exported as `404.html` for S3 + CloudFront): a large faint "404", one-line explanation, "Back to the home page" `ButtonLink`.
- `lib/theme.ts`: the one place the theme is read and written: `useTheme()` (subscribes to `<html data-theme>`), `getTheme()`, `applyTheme()` (sets `data-theme`, the `<meta name="theme-color">` so the phone's address bar matches, `#0d0f13` dark / `#e7ebf1` light, and localStorage). `ThemeToggle` and the contact form's Turnstile (`options={{ theme }}`, re-keyed on change because Turnstile can't restyle a live widget) use it. The pre-paint script in the layout also sets the meta color for a saved light choice.
- `app/layout.tsx`: Poppins (display) + Inter (body), pre-paint theme script, skip link, `FloatingNav`, page, `Footer`, `BackToTop`, `TouchSpotlight`, `ToastTapToClose` (a tap anywhere on a toast dismisses it), sonner `<Toaster>` (top-center, 8 s, close button, dark card, pointer cursor). Site icon: `app/icon.svg` (white laptop, green `>_` prompt).
- **FloatingNav** (`components/floating-nav.tsx`): round menu button top-right that expands in place. Opens on hover for mouse (`(hover: hover)`), closes 250 ms after leaving; a click within 400 ms of a hover-open is ignored. Menu links scroll with `jumpTo` (see Gotchas); the menu's mail icon also jumps to `#contact` (no `mailto:` in the menu). Left of it, **ThemeToggle** (`components/theme-toggle.tsx`): a two-sided pill (sun | moon, white thumb slides under the active side, `aria-pressed` buttons); fades out and goes `inert` while the menu is open. Phones (`max-sm`): the ThemeToggle is not in the top bar but a "Theme" row inside the open menu (owner's request), and section titles get `max-sm:pr-16` because a jump lands them level with the menu button (`scroll-padding-top: 1rem` on phones, 6rem from sm). The toggle's thumb can be dragged (pointer capture after 4px, settles on the nearer side, the click ending a drag is swallowed). Changing the theme plays a 650ms reveal: a view transition whose new snapshot is uncovered by a `clip-path` circle growing from the pressed point (`setTheme(theme, x, y)`; the default cross-fade is turned off in globals.css); no animation for reduced motion or without `startViewTransition`. In the hidden browser pane a view transition waits for a frame, so the theme only flips after a screenshot; wrap it for padding, since the thumb is positioned from the group's edge.
- **Hero** (`components/hero.tsx`), in order: "Open to work" pill + roles line; headline "Fullstack developer, [AWS logo] certified."; Resume (`ResumeButton`, glass), "Contact me" (solid white; hover lifts, glows, shine sweeps, envelope tilts), "See projects" (hidden on phones); "Main expertise" in 3 groups (`EXPERTISE`, `data/stack.ts`), kept clear of the face in the photo: desktop three columns `lg:w-[min(54rem,calc(72vw-14.5svh-5rem))]` (the face's left edge is ~72vw − 14.5svh for the 1046×598 photo at object-position 72%; it overlapped below ~1500px wide), tablets a stacked column `w-[min(22rem,46%)]`, phones stacked full width, and short phones (`short-phone:` custom variant in globals.css, max-width 639.98px and max-height 720px, iPhone SE) hide it and show "Main expertise ↓" (to `#skills`) and "See projects ↓" links instead (the row is pulled up `-mt-2` so the name still fits 667px); on other phones "See projects ↓" sits on the right of the "Main expertise" heading line (`-my-3` keeps its 44px touch area without adding height). All three use the hero's `TextLink`; bottom row: name lockup **RUNGROJ** (uppercase, tracked) with a white rule + **RUNGSARANON**, and certification badges (desktop: hover/focus details panel; touch: a shine sweeps across each badge, masked to its shape).
  - Phones: photo starts 48% down and fades in from the dark top so the face sits between Main expertise and the badges; badges left-aligned above the name; expertise titles above each group; "Open to work" sits level with the floating buttons. Tablets: content starts below the floating buttons.
- **Projects** (`components/work.tsx`, id `work`, title "How I build projects"): rungroj.dev card (`components/highlights.tsx`): Live pill, screenshot, then open/close cards (`DetailCard`, native `<details class="disclosure">`): "How it works" (Cloudflare domain node, a tree of two lanes `rungroj.dev` and `api.rungroj.dev`; each lane is one `Pipeline` (a lane's start, "from the browser" / "from the contact form", sits in its header). Desktop: one CSS grid per lane, `--flow-cols` = equal box columns as many as the longest row with 2rem arrow columns between, so boxes line up across lanes. A lane's `phase` and optional `continuation` split it into two labelled rows: "sync · while the visitor waits" (API Gateway → `portfolio-contact` Lambda → DynamoDB table) and "async · then, in the background" (DynamoDB Streams → `dynamodb_send_email` Lambda → SES, with an `ap-southeast-1 · Singapore` chip, `kind: 'region'`), joined on desktop by an elbow line (`.flow-line`) from the table down into the stream; on phones the async label sits between them in one column. Steps take an optional `name` (the Lambda function names, mono under the service) so the two Lambdas read as different pieces, and the stream is its own service (`dynamodb-streams`: AWS's official "DynamoDB Stream" resource icon, a bare glyph, so `tile: true` in `SERVICE_META` puts it on a white tile; every AWS icon in `public/aws-icons/` is from the 07/31/2026 Architecture Icons release). Desktop hover on a lane (`.flow-lane:hover`, in globals.css) plays it box by box like the touch spotlight. Chip labels swap `-` for non-breaking hyphens so region codes never split; the domain box reads "Cloudflare Registrar"; `homeRegion` (ap-southeast-7 · Thailand) is a line above the domain, ACM chips name their region (us-east-1 for CloudFront, ap-southeast-7 for API Gateway), nodes with security chips: TLS cert · ACM, OAC, Block Public Access, remote state) and "Built with". Then "Mini learning projects" with the count beside the title ("5 projects") and `ProjectCarousel` (`components/project-carousel.tsx`): `ProjectCard`s (rendered on the server, passed as `slides`) in one grid cell, front card plus neighbours turned in 3D (translate 62%, rotate y 28°, scale 0.86, opacity 0.45), clipped at the page edge. Autoplay every 3.5 s, and every touch or click restarts the countdown (`touches` counter in the effect deps); a mouse hover or keyboard focus holds it; no autoplay for reduced motion. Drag with mouse or finger (cards follow the pointer 1:1 with transitions off; `drag` is stored in cards, not px, because the react-hooks lint forbids reading the deck ref during render; on release it settles on the nearest card, and a flick over 40px turns one; pointer capture starts after 6px so clicks and link taps still work, and the click that ends a drag is swallowed), arrows, arrow keys, a click on a side card (overlay button over its `inert` content), and dots: the current dot is a 48px track that fills over the countdown (`grow-x` keyframes, linear, re-keyed on each reset). No case-study links (the `/work/[slug]` pages still build, unlinked).
- **Skills** (`components/skills.tsx`): on phones a compact version (16px icons, body-sm names, tighter rows; section header `max-sm:mb-6`) so the whole stack fits one iPhone SE screen after the hero's jump (owner: "if it's over one screen it's too big"). There is no separate Certifications section any more: it was folded into About (the owner found AWS SAA repeated too close together). `data/certifications.ts` still feeds the hero badges and About.
- **About** (`components/about.tsx`, title "Background and credentials", takes `certifications`; it replaced the old Certifications section): `profile.about` as the intro beside the title, then two groups side by side from `lg` (stacked below), each an h3 on a strong rule with rows divided by hairlines, all left-aligned with the title. **Certifications**: every cert as a full-size `FactRow` (primary first): value `shortName`, label `label` (both in `data/certifications.ts`), detail "Certified <issued> · Verify". The owner asked for DataRockie at the same size as the rest ("Data Analyst"). **Education**: B.Eng. (Chula emblem, portrait 673×1024 so fixed height + `w-auto`; `existsSync` with a `GraduationCap` fallback) and TOEIC 965 with `/990` as the fact's small `unit` beside the value, detail "Issued 15 Jan 2025" (`CefrLadder`: six bars A1–C2 filled to C1; the filled bars rise one after another as the section scrolls in, a CSS scroll-driven animation, `.cefr-rise` in globals.css, skipped for reduced motion or without `animation-timeline` support). A `FactRow` is a grid: picture left (96px, 80px on phones, `aria-hidden` `dd` placed by the grid because a `dl` needs `dt` first), value in heading-1, label, detail. Owner history: rejected a Bangkok clock, the flag, a progress-ring gauge, a centred row of three (mixed alignment) and DataRockie as a lone line or a small row (orphaned, then too small).
- **Contact** ("Let's connect"): details + `ResumeButton tone="page"` + the message form (`components/contact-form.tsx`): a recessed header strip with `ProgressAvatar` (photo + progress ring), title, "To Rungroj · I usually reply within a day", and `LocalTime` (Bangkok clock, hidden on phones); then the fields and Send. Ctrl/⌘ + Enter submits (no hint shown). Then the footer.
- Nav order (`data/navigation.ts`, also the `SectionId` type): How I build projects → Skills → About → Contact. A new section needs an entry here, or `Section`'s `id` won't type-check.

## State and data rules (strict, set by the owner)

| Kind of state | Owner | Examples here |
| --- | --- | --- |
| Form state + validation | **react-hook-form + zod** | contact form |
| Server state | **TanStack Query** | `useSendMessage` (`useMutation`, min 1.4 s so the send animation can play); button uses `isPending`/`isSuccess` + `reset()` |
| Client state shared by 2+ components | **zustand** (`stores/ui-store.ts`) | `menuOpen`, `activeSection` |
| Client state in one component | `useState` | "Copied", resume `done` / `awaitingReturn` |
| Browser-derived values | `useSyncExternalStore` (no copied state) | theme (`<html data-theme>`), back-to-top visibility (scroll position), the Bangkok clock (minute ticker, `null` on the server) |
| Values derived from the form | `useWatch` (not `watch`: the React Compiler lint rejects it) | the progress ring's per-field progress |

- Forms: zod schema in `lib/schemas/`, types from `z.infer`, `useForm({ resolver: zodResolver(schema) })`, register fields with `TextField` / `TextAreaField` (`components/ui/field.tsx`, floating-label outlined fields), submit calls a mutation, server errors → `setError('root.server')` + `toast.error`. Form values never go into zustand. The contact form validates `onTouched` but shows a field's error only after Send was pressed (`isSubmitted`) or when the field has text: leaving an empty field must not turn it red (owner's rule).
- Network: functions in `lib/api/` parse responses with zod (the Lambda returns `{ ok, message }` or `{ error }`); keys from `lib/query-keys.ts`; no `fetch` in `useEffect`.
- Content in `data/*.ts`, parsed with zod at build time. Edit content there, never in components.

## Theme and color

- Dark is the default (`:root` in `@theme`); light overrides in `:root[data-theme='light']`.
- **Accent is monochrome**: white on dark (`#f4f5f7`, hover `#d9dde4`), near-black on light. `on-accent` flips with it. Primary buttons get a gentle silver gradient (`from-accent to-accent-hover`) + a faint top highlight + a small contact shadow; no glow.
- The hero, nav, toast and badge panels are always dark (`night`, `on-night`, `glass`). Text on a white fill uses `text-night`, never `text-ink` (ink flips to light in dark mode). "Inverse of the page" elements (back-to-top) use `bg-ink text-canvas`.
- Live/status dot: `--color-live` (`#16e06a`) with the `animate-halo` ring (`LiveDot`, exported from `components/ui/status-pill.tsx`). Live pills are white with dark text. The same green fills the form's progress ring and the sent badge.

## Motion and interaction patterns

- Send button (`components/ui/button.tsx` + `components/ui/morph-label.tsx`): a soft-tinted disc grows to fill the whole button (arrow rides its edge, launches off, spinner appears), then turns green with the drawn check. Padding swaps sides while busy; the button width eases to each label ("Send message" → "Sending…" → "Sent!").
- `ResumeButton`: sweep fill + arrow drop on hover; click → green fill + `SuccessCheck` + "Downloaded". On touch screens (iOS ignores `download` for PDFs) a tap shows "Opening…" while the fill crosses for 700 ms (`OPEN_DELAY_MS`, kept under Safari's ~1 s gesture window), then `window.open` in a new tab; if that returns `null` (blocked) it falls back to `location.assign`. "Opened" plays only when the page is visible again (`visibilitychange`, 800 ms fallback).
- Progress ring (`components/progress-avatar.tsx`): one SVG circle, mirrored so it runs counterclockwise; `stroke-dasharray` = running total of `fieldProgress()` in `contact-form.tsx` (a third per field) and transitions over 900 ms. On `isSuccess`: full ring, glow, `-rotate-120`, `animate-thump` on the photo (a `key` change replays it), green mail badge.
- Touch screens have no hover, so `TouchSpotlight` marks `[data-spotlight]` elements in the middle 30% of the screen with `data-inview`; style them with `group-data-inview/name:` or the unlayered rules at the end of `globals.css` (request-flow lanes light up in order via `--step`, closed cards nudge their chevron, screenshots and cert cards lift/zoom). Taps press controls to `scale: 0.97`.
- Open/close cards animate height with `::details-content` + `interpolate-size` (globals.css); browsers without it just snap open.
- Everything respects `prefers-reduced-motion` (globals kills animations/transitions).

## Gotchas (each cost time)

- **Tailwind v4 important** is a suffix: `bg-success!`. `cn()` (`lib/cn.ts`) only joins classes, it does **not** merge: never pass two classes for the same property and hope; split them into exclusive branches (see `ServiceIcon`, where a passed size *replaces* the default).
- **Base-layer CSS loses to utilities.** Rules in `@layer base` can't override `border-hairline`, `text-faint`, etc. State rules meant to beat utilities (like the touch spotlight) live **outside** any layer at the end of `globals.css`.
- **Transitions fight over `transition-property`.** Each button variant sets its own transition; the primary `Button` animates padding/translate too. Don't put `transition-colors` in shared base classes.
- **CSS `url()` with spaces** (the DataRockie badge filename) is invalid unquoted and silently drops `mask-image`. Use `url("${encodeURI(path)}")`.
- **Next `<Link>` to the current URL is a no-op**, so re-clicking `/#work` did nothing. `FloatingNav`'s `jumpTo` scrolls with `scrollIntoView` and `history.pushState` on the home page.
- **Section jumps:** `scroll-padding-top` (5rem phones, 6rem sm+) in globals + `Section`'s `-scroll-mt-section` / `lg:-scroll-mt-section-lg` (exactly cancels its top padding) land headings ~20 px under the floating buttons. Keep them in sync if the buttons or section padding change.
- **`overflow: hidden` clips descenders** ("g" in "Sending"). Clip sideways only with `overflow-x-clip`.
- **Sonner close button** is shifted by a `transform`; cancel with `transform-none!`. Sonner applies dismissals inside `requestAnimationFrame`.
- **`window.open(url, '_blank', 'noopener')` always returns `null`**, so a blocked tab can't be detected. Open without it and set `tab.opener = null`.
- **react-icons** rejects `attr` in its types; crop an icon's empty canvas with an `overflow-hidden` wrapper (the AWS logo in `hero.tsx`).
- `fade-out-bottom` fades over `--fade-size` (14rem default, 7rem below lg via `max-lg:[--fade-size:7rem]`); keep the name and badges above it.
- Tailwind v4 leaves buttons with the arrow cursor; globals restores `cursor: pointer`. Images, icons, buttons, pills and cards are `user-select: none` (images also undraggable, no iOS save sheet); text and contact links stay selectable.
- Hydration: anything reading `window` uses `useSyncExternalStore` with a server snapshot, or runs in an effect.

- **Turnstile** (`@marsidev/react-turnstile` in the contact form): the library loads Cloudflare's script itself, so don't add a `<script>` for it in the layout (it loaded twice). The site key is `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env` (template: `.env.example`); `next.config.ts` stops a production build without it. The Lambda (`terraform-infra/infra/lambda/index.mjs`) takes `turnstileToken` in its `.strict()` schema, checks it with Cloudflare's `siteverify` (secret key in Secrets Manager, `prod/turnstile`) and answers **403** when it fails; `lib/api/contact.ts` turns that into "The security check didn't pass…". The form's schema and the Lambda's must stay in step: a field one sends and the other doesn't accept is a 400 on every send.
- **`.env` files** are all git-ignored (`.env`, `.env.*`) except `.env.example`. Only public `NEXT_PUBLIC_*` values belong in this static site.

- **Turnstile on localhost** shows "Unable to connect to website": the real site key only allows the real domain. That's expected in dev; put Cloudflare's test site key in `.env.local` to try the form locally.
- **Section titles** use `text-balance`, but Chrome still split "How I build projects" as "How I / build projects" on phones, so the title keeps "I build" together with a non-breaking space (`title={'How I build projects'}`; a plain JSX attribute string doesn't process `\u` escapes).

## Verifying in the browser

- Dev server: `npm run dev` (port 3000; it used to land on 3001 when 3000 was taken). **On :3000 the contact API's CORS accepts real sends.**
- **Never send a real message** while testing (it writes to the owner's DynamoDB). Stub `window.fetch` for `POST` requests (or URLs containing `/message`), re-stub right before submitting (a reload clears it), and restore it after. Success body: `{ ok: true, message }`; a 500 with `{ message }` produces the error toast. Fill fields through the native value setter + an `input` event so react-hook-form sees them.
- Small things (the form photo, its ring): set `style.zoom` on the wrapper to inspect, then reload.
- Testing on the owner's iPhone: `npm run dev:lan` (binds `0.0.0.0`) and open `http://<PC LAN IP>:3000` (was `192.168.1.33`); `allowedDevOrigins` in `next.config.ts` lets the phone load dev scripts. Windows Firewall may need to allow Node.js (owner's call). Sends from the phone fail CORS by design.
- The browser pane often doesn't render frames (especially when hidden): screenshots are stale (black hero photo, mid-animation), transitions stay frozen at their start, and **IntersectionObserver never fires**. `requestAnimationFrame` doesn't run either, so toasts never dismiss and smooth scrolling (`scroll-behavior: smooth`) never moves: set `window.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 16)` and `document.documentElement.style.scrollBehavior = 'auto'` for the test. Front the tab (`tabs_select`), retake once, measure with `getBoundingClientRect` / `getComputedStyle`, read transition end values by injecting `*{transition:none!important}`, and test spotlight styles by setting `data-inview` by hand.
- The `mobile` preset emulates touch (`hover: none`, `pointer: coarse`); reload after switching presets.
- Check desktop 1280×800 and 1920×1080 (unchanged), phone 375×812 **and 375×700** (Safari with bars), tablet 768×1024: hero fits, face not covered on phones, no horizontal overflow.
- `document.querySelector('a[download]')` finds the **menu's** Resume link first; scope queries to the section.
- Reset any `localStorage.theme`, URL hash or test form input you set.

## Commands

```bash
npm run dev        # Next dev server on :3000
npm run dev:lan    # same, reachable from a phone on the same Wi-Fi
npm run lint       # ESLint: next core-web-vitals + typescript + tanstack query
npm run typecheck  # tsc --noEmit
npm run build      # static export into out/
```

Run typecheck, lint and build after every change. Commit messages are Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `docs:`, `infra:`), and only when the owner asks.

## Platform constraints

- Static export (`output: 'export'`): no API routes, no server actions. Writes go to `https://api.rungroj.dev`.
- TypeScript only. Default-exported components, single quotes, no semicolons (Prettier config in `.prettierrc`; Prettier itself isn't installed).

## Infrastructure and deploy

- `terraform-infra/bootstrap/`: one-time S3 bucket for remote Terraform state (local state). `terraform-infra/infra/`: private S3 bucket + CloudFront with OAC, ACM certificate lookup in `us-east-1`, the URL-rewrite CloudFront Function (`htmlExtendHelper.js`, `/work/x` → `/work/x.html`), a 403 → `/404.html` error page, API Gateway HTTP API at `api.rungroj.dev` (`POST /message`, throttled, CORS allow-list in `apiGateway.tf`), the Lambda and DynamoDB `portfolio-contact-messages`.
- Region `ap-southeast-7`. State: S3 backend `state-bucket-portfolio-project`, key `portfolio/terraform.tfstate`, `use_lockfile`.
- The Lambda is its own Node package (`terraform-infra/infra/lambda/`, own `package.json`), outside the site's lint and typecheck.
- Ignore rules: the root `.gitignore` covers Terraform state, `.terraform/`, `*.tfvars`, `lambda.zip`, every `node_modules` and env files; `frontend/.gitignore` adds the site's build output.
- Deploy is manual: put the Turnstile site key in `frontend/.env`, `npm run build` in `frontend/`, upload `out/` to the bucket from `terraform output bucket_name` (sync with delete, so pages from the old site go away), then invalidate `/*` on the distribution from `terraform output distribution_id`.
- Never commit `*.tfstate`, `.terraform/`, `*.tfvars` or `.env`.
