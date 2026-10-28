# rungroj.dev

The portfolio of Rungroj Rungsaranon, fullstack developer, AWS certified, and the AWS infrastructure it runs on.

Live: [rungroj.dev](https://rungroj.dev)

| Folder | What it is |
| --- | --- |
| [`frontend/`](frontend/) | The site: Next.js 16 static export, React 19, TypeScript, Tailwind CSS 4. Setup, layout and deploy steps are in [frontend/README.md](frontend/README.md). |
| [`terraform-infra/`](terraform-infra/) | Terraform for everything behind it: S3 + CloudFront (OAC, ACM) for the site, API Gateway + Lambda + DynamoDB for the contact form, with Cloudflare Turnstile checked in the Lambda (secret in Secrets Manager). |

```
Browser ─▶ CloudFront ─▶ S3 (private, static site from frontend/out)
        └▶ api.rungroj.dev (API Gateway) ─▶ Lambda ─▶ DynamoDB
```

## Contact

- Email: [rungrojr.ball@gmail.com](mailto:rungrojr.ball@gmail.com)
- GitHub: [Imperator7](https://github.com/Imperator7)
