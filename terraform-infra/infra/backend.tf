terraform {
  backend "s3" {
    bucket       = "state-bucket-rungroj-portfolio-project"
    key          = "portfolio/terraform.tfstate"
    region       = "ap-southeast-7"
    encrypt      = true
    use_lockfile = true
  }
}