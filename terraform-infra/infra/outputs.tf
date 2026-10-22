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