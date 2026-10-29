resource "aws_dynamodb_table" "contact_messages" {
  name             = "portfolio-contact-messages"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "id"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"

  attribute {
    name = "id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Environment = "dev"
    Application = "portfolio-email-sender"
  }
}

data "archive_file" "notifier_zip" {
  type        = "zip"
  source_dir  = "${path.module}/notifier"
  output_path = "${path.module}/notifier.zip"
}

resource "aws_iam_role" "lambda_email_notifier" {
  name = "portfolio-email-notifier-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = "sts:AssumeRole"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_email_notifier" {
  name = "allow-dynamodb-stream-and-ses"
  role = aws_iam_role.lambda_email_notifier.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "DynamoDBStreamRead"
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator",
          "dynamodb:ListStreams"
        ]
        Resource = aws_dynamodb_table.contact_messages.stream_arn
      },
      {
        Sid    = "AllowSendEmailViaSES"
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_email_notifier" {
  role       = aws_iam_role.lambda_email_notifier.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_event_source_mapping" "dynamodb_stream_trigger" {
  event_source_arn       = aws_dynamodb_table.contact_messages.stream_arn
  function_name          = aws_lambda_function.email_notifier.arn
  starting_position      = "LATEST"
  batch_size             = 1
  maximum_retry_attempts = 2

  filter_criteria {
    filter {
      pattern = jsonencode({
        eventName = ["INSERT"]
      })
    }
  }

  depends_on = [aws_iam_role_policy.lambda_email_notifier, aws_iam_role_policy_attachment.lambda_email_notifier]
}


resource "aws_lambda_function" "email_notifier" {
  function_name    = "dynamodb_send_email"
  role             = aws_iam_role.lambda_email_notifier.arn
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  filename         = data.archive_file.notifier_zip.output_path
  source_code_hash = data.archive_file.notifier_zip.output_base64sha256
  timeout          = 10

  environment {
    variables = {
      SENDER_EMAIL    = "noreply@rungroj.dev"
      RECIPIENT_EMAIL = "rungrojr.ball@gmail.com"
    }
  }

  tags = {
    Environment = "dev"
    Application = "portfolio-email-sender"
  }
}