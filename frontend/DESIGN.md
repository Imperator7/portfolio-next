---
version: 4
name: Rungroj Portfolio
description: A recruiter-first portfolio. Dark by default (light on request), monochrome, with color coming only from content (AWS orange, a green "live" dot, success green, brand and service icons). A full-screen photo hero that dissolves into the page and answers who, what, where and "available?" on the first screen of every device; the name as an uppercase lockup bottom-left and the certification badges bottom-right. A floating menu that expands in place, a two-sided theme switch, open/close detail cards, and motion that rewards hover on desktop and scrolling on touch screens. Poppins for display, Inter for reading. Format follows getdesign.md (https://getdesign.md/mobbin/design-md). Version 4 replaces the light cobalt theme of v3; the code (app/tokens.css, components/) is the source this file was rebuilt from.

colors:
  # Dark theme (default). Contrast on canvas: ink 17:1, muted 8.4:1,
  # faint 5.6:1, accent-ink 19:1, danger 6.4:1; on-accent on accent 17:1.
  canvas: '#0d0f13'
  surface: '#151820'
  sunken: '#1e222c'
  ink: '#eef0f4'
  muted: '#a7adb8'
  faint: '#8a909b'
  hairline: 'rgba(255, 255, 255, 0.08)'
  hairline-strong: 'rgba(255, 255, 255, 0.18)'
  accent: '#f4f5f7'
  accent-hover: '#d9dde4'
  accent-soft: 'rgba(255, 255, 255, 0.10)'
  accent-ink: '#ffffff'
  on-accent: '#0d0f13'
  danger: '#f87171'
  success: '#22a35a'
  # Always dark: the hero photo, the menu, toasts, badge panels.
  night: '#0e0e11'
  on-night: '#fafafa'
  on-night-muted: 'rgba(250, 250, 250, 0.78)'
  accent-on-night: '#ffffff'
  success-on-night: '#4ade80'
  danger-on-night: '#fca5a5'
  glass: 'rgba(255, 255, 255, 0.14)'
  glass-line: 'rgba(255, 255, 255, 0.32)'
  # Content colors.
  live: '#16e06a'
  aws: '#ff9900'

colors-light:
  # :root[data-theme='light']. Contrast on canvas: muted 7.1:1, faint 5.0:1,
  # accent-ink 15:1, danger 6.0:1.
  canvas: '#e7ebf1'
  surface: '#f6f8fb'
  sunken: '#d9dfe8'
  ink: '#12151b'
  muted: '#464c57'
  faint: '#5b616c'
  hairline: 'rgba(18, 21, 27, 0.10)'
  hairline-strong: 'rgba(18, 21, 27, 0.22)'
  accent: '#12151b'
  accent-hover: '#2a2f38'
  accent-soft: 'rgba(18, 21, 27, 0.08)'
  accent-ink: '#12151b'
  on-accent: '#ffffff'
  danger: '#b42318'
  success: '#15803d'

typography:
  name:
    fontFamily: Poppins
    fontSize: 'clamp(3.25rem, 8vw, 7.5rem)'
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: '0.05em'
    textTransform: uppercase
  display:
    fontFamily: Poppins
    fontSize: 'clamp(2rem, 4.2vw, 4.25rem)'
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: '-0.02em'
  heading-1:
    fontFamily: Poppins
    fontSize: 'clamp(2rem, 4.4vw, 3.5rem)'
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: '-0.03em'
  heading-2:
    fontFamily: Poppins
    fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)'
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  heading-3:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: '-0.01em'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.3

rounded:
  sm: 10px
  md: 16px
  lg: 28px
  full: 9999px

spacing:
  section: 80px
  section-lg: 128px
  gutter: 16px
  gutter-sm: 32px
  gutter-lg: 48px
  content-max: 1216px
  prose-max: 65ch
  scroll-padding-top: '80px phones, 96px from sm up'

motion:
  ease: 'cubic-bezier(0.16, 1, 0.3, 1) (ease-out-expo)'
  settle: '1400ms: hero photo from 106% scale + 6px blur'
  rise: '1200ms, 120ms delay: the name rises 0.3em'
  grow-x: '1200ms, 400ms delay: the rule before the surname draws in'
  halo: '2s loop: a ring breathes out of the live dot'
  glint: '4.5s loop: a shine crosses a badge (touch screens)'
  pop / draw / burst / spark: 'the success check: pops in, circle and tick draw, a ring bursts, six sparks fly'
  launch / appear: 'send button: the arrow launches off, the spinner appears'
  ring-fill: '900ms: the message form''s photo ring eases to each new length'
  thump: '700ms: the form''s photo bounces when a message is sent'

components:
  floating-menu:
    backgroundColor: '{colors.night} at 85% + blur'
    ring: '{colors.glass-line}'
    closed: '56px circle, top-right'
    open: 'min(21rem, 100vw - 1.5rem) wide panel'
  theme-switch:
    backgroundColor: '{colors.night} at 85% + blur'
    thumb: '{colors.on-night}'
    size: 'two 44px sides'
  button-primary:
    background: 'gradient {colors.accent} → {colors.accent-hover}'
    textColor: '{colors.on-accent}'
    shadow: 'inset 0 1px 0 white/35%, 0 1px 2px black/25%'
    disc: '{colors.on-accent} at 10%'
    rounded: '{rounded.full}'
  button-outline:
    borderColor: '{colors.hairline-strong}'
    hoverBorder: '{colors.ink}'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
  resume-button:
    photo: '{colors.glass} + {colors.glass-line} ring, sweep {colors.on-night}'
    page: '{colors.ink} at 14% + {colors.ink} at 32% ring, sweep {colors.ink}'
    success: '{colors.success} fill'
  contact-me:
    backgroundColor: '{colors.on-night}'
    textColor: '{colors.night}'
    hover: 'lift 4px, white ring 4px at 20%, white glow, shine sweep'
  status-pill:
    live: 'white fill, {colors.night} text, {colors.live} dot with halo'
    onPhoto: '{colors.glass} + {colors.glass-line} ring'
    neutral: '{colors.sunken} fill, {colors.muted} text'
    rounded: '{rounded.full}'
  text-field:
    style: 'outlined, floating label'
    borderColor: '{colors.hairline-strong}'
    hoverBorder: '{colors.faint}'
    focusBorder: '{colors.accent} 2px'
    invalidBorder: '{colors.danger}'
    labelNotch: '{colors.surface}'
    rounded: '{rounded.sm}'
  message-form:
    backgroundColor: '{colors.surface}'
    ring: '{colors.hairline-strong}, {colors.ink} at 45% while a field has focus'
    header: '{colors.sunken} at 60% strip, {colors.hairline} rule below'
    shadow: none
    rounded: '{rounded.md}'
  progress-avatar:
    photo: '64px phones, 80px from sm up'
    track: '{colors.hairline-strong}, 3.5 of 100 units'
    fill: '{colors.live}, counterclockwise from the top'
    sent: 'full ring, {colors.live} glow, mail badge ({colors.live} fill, {colors.night} icon)'
  about-fact:
    rule: '{colors.hairline-strong} above'
    picture: '96px box (80px on phones) on the left, decorative (aria-hidden)'
    value: '{typography.heading-1}'
    label: '{typography.body}, 500, {colors.ink}'
    detail: '{typography.body-sm}, {colors.muted}'
  toast:
    backgroundColor: '{colors.night} at 95% + blur'
    ring: '{colors.glass-line}'
    rounded: '{rounded.md}'
    dismiss: 'tap anywhere, the ×, or swipe'
  detail-card:
    backgroundColor: '{colors.canvas} at 40%'
    borderColor: '{colors.hairline}'
    rounded: '{rounded.md}'
  diagram-node:
    backgroundColor: '{colors.canvas}'
    borderColor: '{colors.hairline}'
    rounded: '{rounded.sm}'
    chip: '{colors.surface} pill, 16px icon'
  certification-card:
    backgroundColor: '{colors.surface}'
    borderColor: '{colors.hairline}'
    rounded: '{rounded.md}'
  back-to-top:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.canvas}'
    size: '48px phones, 56px from sm up'
---

## Overview

The site is built for one reader first: a recruiter or hiring manager with a minute to spare. Everything they look for is on the first screen of any device, and every detail is one scroll or one tap deeper.

**Information architecture**

1. **Floating menu** (top-right): a round button that expands in place into How I build projects, Skills, About and Contact (each with a one-line description, the current one marked), plus Resume, GitHub and a mail icon that jumps to Contact (it doesn't open a mail app). It opens on hover with a mouse, on tap with touch; Esc, a click outside or a link closes it. Links scroll even when the URL already points at that section.
2. **Theme switch**, just left of the menu: sun | moon with a white thumb under the active side. Dark is the default; the choice is remembered. On phones it is not in the top bar: it is a "Theme" row inside the open menu. The thumb can be dragged as well as tapped. Switching reveals the new theme in a circle growing from the pressed point over 650ms (`ease-out-expo`).
3. **Hero** (one full screen on every device): "Open to work" pill + roles and location; the headline "Fullstack developer, [AWS logo] certified."; Resume (PDF), Contact me, See projects (hidden on phones); Main expertise in three groups, never over the face in the photo (three columns that end before it on desktop, a stacked column on tablets and phones, and on short phones like the iPhone SE a "Main expertise ↓" link to Skills instead); the name lockup RUNGROJ / RUNGSARANON bottom-left; the certification badges bottom-right.
4. **How I build projects**: two big projects, Movie Ticketing then rungroj.dev, each with Live, screenshot, tagline, Live site / Code and two open/close cards (Movie Ticketing's paths: the site from S3, and `/api/*` through a VPC origin, an internal load balancer and ECS Fargate to RDS). For rungroj.dev: **How it works** (the domain at Cloudflare Registrar branching into two request paths, rungroj.dev and api.rungroj.dev, each a chain of AWS service boxes with security chips; the api line carries on in a second row from the DynamoDB Stream to the notifier Lambda and SES in Singapore) and **Built with**. Then **Mini learning projects** (with the count beside the title) as a rotating deck: one card in front (screenshot on top, name, pills, tagline, stack, links), its neighbours turned away in 3D on either side. It turns every 3.5 s; a touch restarts the countdown. It can be dragged with a mouse or a finger: the cards follow and settle on the nearest one (grab cursor). Below it, dots (the current one a long track that fills over the countdown) and previous / next buttons.
5. **Skills**: every tool grouped by where it sits in the stack, with brand logos. On phones it is compact (small icons, smaller names, tight rows) so the whole stack reads on one screen.
6. **About** ("Background and credentials", which also replaces the old Certifications section): a two-sentence story beside the title, then two groups side by side: **Certifications** (AWS SAA and Data Analyst, each a full fact with a Verify link) and **Education** (B.Eng. Chulalongkorn with the university emblem, TOEIC 965 /990, the /990 small and faint beside the score, with a CEFR ladder filled to C1 whose bars rise one by one as it scrolls into view). Every fact leads with a picture on its left. Built to be scanned, not read.
7. **Contact** ("Let's connect"): email (with copy), phone, GitHub, Resume, and the message form as the section's focal point.
8. **Back to top**: appears once the first screen is scrolled past.

**Look**: a dark, quiet page where type, photography and the badges carry the color. The accent is white (near-black in light mode), so actions read as the brightest thing on the page rather than a hue. The hero photo is bright, shaded only behind the text, and dissolves into the page.

## Colors

- **Canvas** #0d0f13 page · **Surface** #151820 cards, the form, the project card · **Sunken** #1e222c screenshot frames, tech chips.
- **Ink** #eef0f4 · **Muted** #a7adb8 supporting copy · **Faint** #8a909b labels and arrows. All pass WCAG AA on canvas.
- **Accent** is monochrome: #f4f5f7 fills (with #0d0f13 text, 17:1) and #ffffff links and focus. Light mode flips it to near-black. There is no hue accent: red and blue were both tried and rejected.
- **Content colors only**: AWS orange #ff9900 for the logo in the headline; **live** #16e06a for the status dot; **success** for confirmations; tech brand colors (`components/tech-icon.tsx`) and the official AWS Architecture Icons (`public/aws-icons/`) are content, not tokens.
- **Danger** for form errors only, always with an icon and a message.
- **Night** surfaces (hero, menu, toasts, badge panels) stay dark in both themes. Text on a white fill uses `night`, never `ink` (ink turns light in dark mode). "Inverse of the page" elements use `ink` fill with `canvas` text.
- Browser surfaces are themed: selection in the accent, a hairline scrollbar, a 2px accent focus outline with 2px offset.

## Typography

- **Poppins** 500 for the name, headline and headings; **Inter** for everything you read. Both via `next/font/google`.
- **Name lockup**: RUNGROJ in uppercase at `name` size with 0.05em tracking; under it a 2px white rule (draws in) and RUNGSARANON in wide-tracked capitals (0.42em) at a fifth of the size, its gap measured from the first name's size so it holds at every width.
- Headings balance their wrapping; paragraphs use `text-wrap: pretty`; reading text stops at 65ch. Sentence case except the name and the expertise group titles (small, tracked capitals).

| Token                    | Size                          | Use                              |
| ------------------------ | ----------------------------- | -------------------------------- |
| name                     | clamp(3.25rem, 8vw, 7.5rem)   | RUNGROJ in the hero              |
| display                  | clamp(2rem, 4.2vw, 4.25rem)   | Hero headline                    |
| heading-1                | clamp(2rem, 4.4vw, 3.5rem)    | Section titles, project name, About facts |
| heading-2                | clamp(1.5rem, 2.6vw, 2.25rem) | Sub-sections                     |
| heading-3                | 20px                          | Card titles, menu rows, skills, the form title |
| body-lg / body / body-sm | 18 / 16 / 14px                | Reading / default / meta         |
| button                   | 15px, 600                     | Buttons                          |
| label                    | 13px, 500                     | Pills, chips, group titles       |

## Layout

- 4px grid. Content max 1216px; gutters 16 / 32 / 48px (phones / `sm` / `lg`). Sections are 80px apart on phones, 128px from `lg`.
- **Section header**: title in 7 of 12 columns, intro in 5, bottom-aligned; stacked on phones. Jumping to a section lands its heading about 20px under the floating buttons (`scroll-padding-top` + a scroll margin that cancels the section's top padding).
- **Desktop (`lg`+) is the reference layout.** Phones and tablets are adjusted with `max-lg:` / `max-sm:` / `sm:max-lg:` classes so desktop never shifts.
- **Hero, desktop**: content column (max 48rem; the expertise row 54rem) top-left; name bottom-left; badges bottom-right, AWS 192px and DataRockie 176px at 1280.
- **Hero, tablet**: content starts below the floating buttons; desktop columns with smaller expertise text; badges right.
- **Hero, phone**: "Open to work" level with the floating buttons; Resume and Contact share a row ("See projects" hidden); expertise titles above each compact group; the photo starts 48% down and fades in, so the face sits between the expertise and the badges; badges (88 / 80px) left-aligned above the name. Must fit 375×700.
- **Projects / Skills rows**: hairline-divided, a label column (3) and content (9).
- Touch targets at least 44px. No horizontal scroll at 375px.

## Elevation and shape

- Elevation is a fill step (canvas → surface) or a hairline, declared once per element (never an outline plus a wide soft shadow). Shadows are reserved for things that float: the menu, toasts, lifted cards on hover, the back-to-top button.
- Radii: inputs and diagram nodes 10px, cards, screenshots and the message form 16px, every button, pill and chip fully round.

## Components

- **Primary button** (Send message): an accent pill with a gentle silver gradient and a faint top highlight; a soft-tinted disc holds the arrow. Sending: the disc fills the whole button, the arrow rides its edge and launches off, a spinner appears; success: the fill turns green and the check draws in. The padding moves to the icon's side and the width eases to each label ("Send message" → "Sending…" → "Sent!"). Sending takes at least 1.4s so the sequence can play.
- **Resume button**: glass over the photo, a frosted ink pill on the page. Hover: a fill sweeps in and the download arrow drops and returns. Click: green fill, the check, "Downloaded". On touch screens a tap first runs the fill across as a 0.7s "Opening…" bar, then the PDF opens in a new tab (in the same tab if the browser blocks it), and "Opened" (centered) plays when the visitor comes back.
- **Contact me** (hero): solid white; hover lifts 4px, glows white, a shine sweeps across and the envelope tilts as if sent. Hover never darkens.
- **Status pill**: "live" is white with a green dot and halo; on the photo it's glass.
- **Text fields**: outlined with a floating label that rests inside and moves into a notch in the border on focus or once filled; 2px accent border on focus; danger border, label and message on error.
- **Message form**: built like a message being written. A recessed header strip names who reads it: the owner's photo in a progress ring, "Leave me a message" (heading-3), "To Rungroj · I usually reply within a day" ("To Rungroj ·" hidden on phones), and on the right the owner's live Bangkok time with a sun (07:00–22:00) or moon (hidden on phones). Below: the three fields and Send. One outline is the whole elevation; it firms up while a field has focus. Ctrl/⌘ + Enter sends, with no on-screen hint.
- **Progress ring** (`components/progress-avatar.tsx`): one unbroken line round the photo showing the running total of the form, a third per field, filling green counterclockwise from the top and easing to each new length. Name fills over 3 characters, message over 24; email stops at 80% until it's a valid address, then fills. Sent: the ring is full, glows and turns a third of a turn counterclockwise, the photo bounces and a green mail badge pops in at its corner; about 3s later it drains back.
- **Toasts** (sonner): dark night card, top-center, 8s; a tap anywhere on a toast closes it (`components/toast-tap-to-close.tsx`), as do the × and a swipe.
- **About groups**: two columns from `lg` (stacked below), each an h3 (heading-3) on a strong hairline rule, rows divided by hairlines, everything left-aligned with the section title (never centred blocks under left-aligned rules). A fact row is the picture on the left (96px box, 80px on phones, so the text lines up) and beside it a heading-1 value, an ink label and a muted detail. The pictures are real marks (the badge, the emblem) or the data itself (the CEFR ladder), never stock photos, decorative illustrations or progress rings.
- **Project deck**: screenshots shown whole (never cropped) in a 2:1 frame over a blurred copy of themselves; cards `rounded.md`, surface, strong hairline ring plus one soft offset shadow; side cards rotate 28° on y, scale 0.86, 45% opacity, desaturated; 900ms `ease-out-expo` turns. Current dot 48 × 6px track filling linearly over 3.5 s, others 6px dots; 44px hit areas.
- **Form errors**: red only after Send was pressed or when a field holds wrong text; an empty, untouched-by-Send field stays neutral.
- **Site icon** (`app/icon.svg`): a white laptop with a green terminal prompt (`>_`) on its screen, on canvas.
- **Detail cards** ("How it works", "Built with"): native `<details>`; a closed card shows a one-line preview (service icons, group names); the round chevron flips on open; height animates.
- **Diagram**: a Cloudflare domain node, then a tree of request paths, each a hostname chip and a chain of service boxes (official AWS Architecture Icons, 07/2026 release: service icons, and the DynamoDB Stream resource glyph on a white tile like the brand logos; name, role) joined by arrows; a path can have two rows, each with a small mono `sync` / `async` pill and what it means ("while the visitor waits", "then, in the background"), joined by one elbow line from the end of the first row into the start of the second, both reading left to right; a resource name (the Lambda function) sits in mono under its service so look-alike boxes read as different pieces; each path's start (from the browser, from the contact form) sits in its header. Hovering a path on desktop plays it box by box, like the touch spotlight joined by arrows; security chips (TLS cert · ACM, OAC, Block Public Access, remote state) on the boxes, and a pin chip for a service in another region (SES, ap-southeast-1); ACM chips name their region (us-east-1 for CloudFront, ap-southeast-7 for API Gateway). Above the domain, one line names the home region (ap-southeast-7 · Thailand). On desktop every path shares one column grid (equal box columns as many as the longest row, 2rem arrows between), so boxes line up from path to path. A project without a domain node starts straight with its paths, 32px apart. Under the paths, "Behind it all" holds the supporting pieces as boxes in two columns (stacked on phones): Terraform (remote state, locking) and GitHub Actions (the deploy: OIDC, least-privilege role), both on white tiles with their brand logos.
- **Certification badges** (hero): the images alone, linking to verification. Desktop hover/focus raises a dark details panel; touch screens get a shine sweeping across each badge, clipped to its shape.
- **Certification cards**: badge, name, issuer · date, "Verify credential"; the whole card is the link; lifts and tilts the badge on hover.
- **Back to top**: an `ink` circle with a `canvas` arrow, bottom-right, rising in after the first screen.
- Images, icons, buttons, pills and cards can't be text-selected or dragged; copy (headline, body, email, phone) can.

## Motion

- One ease everywhere: exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), 300–700ms for UI, up to 1.4s for the hero entrance.
- **Entrance**: the hero photo settles from 106% and a slight blur; the name rises; the rule before the surname draws in.
- **Desktop**: hover is the feedback: lifts, sweeps, glows, arrows nudging, screenshots zooming slightly. The menu opens on hover.
- **Touch screens** (no hover): taps press controls to 97%; whatever scrolls into the middle of the screen reacts like a hover: request paths light up box by box, closed cards nudge their chevron, screenshots and certification cards lift, badges glint.
- Everything is off under `prefers-reduced-motion`.

## Finishing details

- The phone's address bar takes the theme's canvas color (dark `#0d0f13`, light `#e7ebf1`) and follows the switch.
- Third-party widgets follow the site's theme, not the device's (the Turnstile check in the form).
- A missing page gets the site's own 404: a large faint "404", one plain sentence, and a primary button back home.
- Section titles balance their lines; no title strands a short word on a line of its own.

## Do's and don'ts

**Do**: answer "who, what, where, available?" on the first screen of every device · keep Resume one tap away everywhere · make hover (and its touch stand-in) energize · keep claims to what the repos, the infrastructure code, the resume and the owner support · keep desktop stable when adjusting phones and tablets.

**Don't**: add a hue accent (red and blue were rejected) · darken things on hover · put cards or panels behind the hero text · caption the badges · cover the face in the hero photo on phones · use glass anywhere but over the photo · use heavy glows on regular buttons · use weights above 600 · reach for template effects to "highlight" something (a light circling a border, dot-grid or glow backgrounds, focus halos, outline plus deep shadow: all tried on the form and read as AI-made) · put meme props on the owner's photo (pixel sunglasses were rejected) · show keyboard-shortcut hints · open with paragraphs where facts would do.
