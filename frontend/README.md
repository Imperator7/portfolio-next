# rungroj.dev

The portfolio of Rungroj Rungsaranon, fullstack developer, AWS certified. A Next.js static export served from S3 and CloudFront; the contact form posts to an API Gateway + Lambda + DynamoDB backend. All of the infrastructure is defined in Terraform in this repo.

Live: [rungroj.dev](https://rungroj.dev)

## What's on the page

- **Hero**: open-to-work status, roles, resume, contact, main expertise and certification badges, all on the first screen at every size.
- **How I build projects**: rungroj.dev itself, with how the request flows through Cloudflare, CloudFront, S3, API Gateway, Lambda and DynamoDB, then the mini learning projects as a rotating, draggable deck.
- **Skills**: the stack grouped by role.
- **Background and credentials**: AWS Solutions Architect – Associate, DataRockie Data Analyst, B.Eng. (Chulalongkorn), TOEIC 965/990.
- **Contact**: details, resume, and a message form guarded by Cloudflare Turnstile.
- Dark and light themes, a styled 404, reduced-motion support throughout.

## Stack

| Part | Tools |
| --- | --- |
| Site | Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4 |
| Forms and data | react-hook-form + zod, TanStack Query, zustand |
| Contact backend | API Gateway (HTTP API), Lambda (Node, zod), DynamoDB, Secrets Manager, Cloudflare Turnstile |
| Hosting | S3 (Block Public Access) + CloudFront with OAC, ACM certificates, Cloudflare Registrar |
| Infrastructure | Terraform, remote state in a private S3 bucket with locking |

## Run it

```bash
cd frontend
npm install
cp .env.example .env   # add the Turnstile site key
npm run dev            # http://localhost:3000
```

```bash
npm run lint
npm run typecheck
npm run build          # static site in out/
```

On localhost the real Turnstile key shows "Unable to connect to website"; put Cloudflare's test site key in `.env.local` to try the form.

## Layout

```
app/              routes (home, /work/[slug], 404), tokens.css (design tokens), globals.css
components/       page sections and ui/ primitives
data/             all content (profile, projects, stack, certifications), checked with zod at build time
lib/              zod schemas, the contact API client, theme helpers
hooks/, stores/   TanStack Query mutation, zustand UI store
public/           photos, badges, resume PDF, AWS service icons
```

The infrastructure is in `../terraform-infra/`: `bootstrap/` (state bucket) and `infra/` (site, API, Lambda, DynamoDB).

`DESIGN.md` is the design system; `CLAUDE.md` has the working notes for coding agents.

## Deploy

Manual for now:

1. `npm run build` with the Turnstile site key in `.env`.
2. `aws s3 sync out/ s3://<bucket> --delete` (bucket: `terraform output bucket_name` in `../terraform-infra/infra`).
3. `aws cloudfront create-invalidation --distribution-id <id> --paths "/*"` (id: `terraform output distribution_id`).

## Contact

- Email: [rungrojr.ball@gmail.com](mailto:rungrojr.ball@gmail.com)
- GitHub: [Imperator7](https://github.com/Imperator7)
