output "site_url" {
  value = "https//${aws_cloudfront_distribution.cloudfront_portfolio.domain_name}"
}

output "distribution_id" {
  value = aws_cloudfront_distribution.cloudfront_portfolio.id
}

output "bucket_name" {
  value = aws_s3_bucket.s3_static_hosting.bucket
}

output "api_endpoint" {
  value = aws_apigatewayv2_stage.stage_api_gateway.invoke_url
}

output "domain_name_api_gateway" {
  value = aws_apigatewayv2_domain_name.api_gateway.domain_name_configuration[0].target_domain_name
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy_frontend.arn
}
