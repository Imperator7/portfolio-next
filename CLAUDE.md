# rungroj.dev

Two parts, each in its own folder:

- `frontend/`: the site (Next.js static export). Run npm commands there. Its working notes: @frontend/CLAUDE.md
- `terraform-infra/`: AWS infrastructure and the contact Lambda (own `package.json` in `infra/lambda/`).

Never run `terraform apply`, upload to S3 or otherwise touch AWS without the owner's explicit go-ahead. Never commit Terraform state, `.terraform/`, `*.tfvars` or `.env` (the root `.gitignore` covers them).
