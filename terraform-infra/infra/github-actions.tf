// Lets the GitHub Actions deploy workflow (.github/workflows/deploy-frontend.yml)
// upload the site to S3 and clear the CloudFront cache, without any AWS keys
// stored in GitHub.
//
// How it works (OpenID Connect, "OIDC"):
// 1. On each run GitHub issues a short-lived signed token that says which repo
//    and branch the run belongs to.
// 2. The workflow hands that token to AWS STS (AssumeRoleWithWebIdentity).
// 3. AWS checks the signature against the provider below and the repo/branch
//    against the role's trust policy, then returns credentials valid ~1 hour.

locals {
  github_repo = "Imperator7/portfolio-next"
}

// Tells this AWS account to trust tokens signed by GitHub. One per account:
// if it already exists, import it instead of creating a second one.
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

// create iam role: only workflow runs on the main branch of this repo may use it
resource "aws_iam_role" "github_deploy_frontend" {
  name = "portfolio-github-deploy-frontend"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = "sts:AssumeRoleWithWebIdentity"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:${local.github_repo}:ref:refs/heads/main"
        }
      }
    }]
  })
}

// attach policy into role: the least needed for `aws s3 sync --delete` on the
// site bucket and one CloudFront invalidation. Nothing else in the account.
resource "aws_iam_role_policy" "github_deploy_frontend" {
  name = "deploy-site-to-s3-and-invalidate"
  role = aws_iam_role.github_deploy_frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ListSiteBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.s3_static_hosting.arn
      },
      {
        Sid      = "WriteSiteObjects"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.s3_static_hosting.arn}/*"
      },
      {
        Sid      = "InvalidateSiteCache"
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
        Resource = aws_cloudfront_distribution.cloudfront_portfolio.arn
      }
    ]
  })
}
