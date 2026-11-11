output "site_url" {
  value = "https//${aws_cloudfront_distribution.cloudfront_portfolio.domain_name}"
}

output "distribution_id" {
  value = aws_cloudfront_distribution.cloudfront_portfolio.id
}


output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy_frontend.arn
}
