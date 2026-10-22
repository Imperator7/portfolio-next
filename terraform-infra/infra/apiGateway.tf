data "aws_acm_certificate" "api_cert" {
  domain   = "api.rungroj.dev"
  statuses = ["ISSUED"]
  region   = "ap-southeast-7"
}

resource "aws_apigatewayv2_domain_name" "api_gateway" {
  domain_name = "api.rungroj.dev"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.api_cert.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.portfolio_api_gateway.id
  stage       = aws_apigatewayv2_stage.stage_api_gateway.id
  domain_name = aws_apigatewayv2_domain_name.api_gateway.id
}

resource "aws_apigatewayv2_api" "portfolio_api_gateway" {
  name                         = "portfolio-contact-api"
  protocol_type                = "HTTP"
  disable_execute_api_endpoint = true

  cors_configuration {
    allow_origins = ["https://rungroj.dev", "https://www.rungroj.dev", "https://rungroj-portfolio.vercel.app/"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_integration" "portfolio_api_gateway" {
  api_id           = aws_apigatewayv2_api.portfolio_api_gateway.id
  integration_type = "AWS_PROXY"

  description            = "Contact Message Lambda"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.contact_message.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "message_route_portfolio_api_gateway" {
  api_id    = aws_apigatewayv2_api.portfolio_api_gateway.id
  route_key = "POST /message"
  target    = "integrations/${aws_apigatewayv2_integration.portfolio_api_gateway.id}"

}

resource "aws_apigatewayv2_stage" "stage_api_gateway" {
  api_id      = aws_apigatewayv2_api.portfolio_api_gateway.id
  name        = "portfolio_api_gateway"
  auto_deploy = true

  route_settings {
    route_key                = "POST /message"
    throttling_burst_limit   = 10
    throttling_rate_limit    = 5
    detailed_metrics_enabled = true
  }
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_message.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.portfolio_api_gateway.execution_arn}/*/*"
}