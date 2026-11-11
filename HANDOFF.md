# Handoff: rungroj.dev on Vercel while AWS moves accounts

Updated 2026-11-11.

## Where it stands

- **Site:** rungroj.dev runs on Vercel, behind Cloudflare DNS. Vercel deploys every push to `main`.
- **Contact API:** `message.rungroj.dev` → API Gateway (regional) → Lambda → DynamoDB → Stream → Lambda → SES, all in `ap-southeast-7`, applied in the new AWS account.
- **Parked:** `terraform-infra/infra/_parked/` (CloudFront, the GitHub Actions OIDC role, their outputs) and `frontend/data/parked/rungroj-dev-aws.ts` (the old S3 + CloudFront project card).
- **Paused:** `.github/workflows/deploy-frontend.yml` runs only from the manual button.
- **Movie Ticketing:** no `demoUrl` while its demo is down, so no Live pill.

## Still to do

1. Send one real message from https://rungroj.dev and confirm the email arrives (proves Turnstile, DynamoDB and SES end to end).
2. `terraform apply` the CORS fix (the Vercel origin without its trailing slash). Owner runs it.

## When CloudFront is available in the new account

Never `terraform apply` without the owner's go-ahead.

1. Move `cloudfront.tf`, `github-actions.tf` and the parked outputs from `_parked/` back into `infra/`; plan and apply.
2. Set the GitHub repository variables (`AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `TURNSTILE_SITE_KEY`) to the new account's values.
3. Turn the push trigger back on in `deploy-frontend.yml`.
4. Point the rungroj.dev DNS from Vercel back to CloudFront.
5. Swap the parked AWS card back in as the only rungroj.dev card (update the API hostname and SES region in it first).
6. Restore Movie Ticketing's `demoUrl` once its demo is up, and its link in the README.
7. Update the README, `frontend/CLAUDE.md` and `frontend/DESIGN.md` to match.
