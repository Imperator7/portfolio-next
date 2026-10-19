data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "s3_static_hosting" {
  bucket = "rungroj-portfolio-hosting-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_public_access_block" "s3_static_hosting" {
  bucket = aws_s3_bucket.s3_static_hosting.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}