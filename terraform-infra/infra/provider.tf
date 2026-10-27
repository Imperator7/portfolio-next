provider "aws" {
  region = "ap-southeast-7"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
