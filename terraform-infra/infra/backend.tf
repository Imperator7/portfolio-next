terraform {
  backend "s3" {
    bucket       = "state-bucket-portfolio-project"
    key          = "portfolio/terraform.tfstate"
    region       = "ap-southeast-7"
    encrypt      = true
    use_lockfile = true
  }
}