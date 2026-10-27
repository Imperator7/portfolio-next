resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "portfolio-site-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "rewrite_url" {
  name    = "append-html-extension"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = file("./htmlExtendHelper.js")
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_acm_certificate" "portfolio_site_cert" {
  provider = aws.us_east_1
  domain   = "rungroj.dev"
  statuses = ["ISSUED"]
}

// cloudfront setup
resource "aws_cloudfront_distribution" "cloudfront_portfolio" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.s3_static_hosting.bucket_regional_domain_name
    origin_id                = "s3-portfolio"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-portfolio"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_url.arn
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 404
    response_page_path = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = ["rungroj.dev", "www.rungroj.dev"]

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.portfolio_site_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

// bucket policy 
data "aws_iam_policy_document" "portfolio_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.s3_static_hosting.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cloudfront_portfolio.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "portfolio_s3_policy" {
  bucket = aws_s3_bucket.s3_static_hosting.id
  policy = data.aws_iam_policy_document.portfolio_s3_policy.json
}