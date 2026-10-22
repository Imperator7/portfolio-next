resource "aws_dynamodb_table" "contact_messages" {
  name         = "portfolio-contact-messages"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}