resource "aws_s3_bucket" "state_bucket" {
  bucket = "state-bucket-portfolio-project"
}

resource "aws_s3_bucket_public_access_block" "block_public_s3" {
  bucket = aws_s3_bucket.state_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "versioning_s3" {
  bucket = aws_s3_bucket.state_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}