import Image from 'next/image'
import type { IconType } from 'react-icons'
import { SiCloudflare, SiGithubactions, SiTerraform } from 'react-icons/si'
import type { Service } from '@/lib/schemas/content'
import { cn } from '@/lib/cn'

type ServiceMeta = { label: string } & (
  // `tile`: a resource icon (a bare glyph, no square of its own), shown on a
  // white tile like the brand logos.
  | { src: string; tile?: boolean }
  | { Icon: IconType; color: string }
)

// AWS services use the official AWS Architecture Icons (07/31/2026 release, in
// public/aws-icons/), which AWS publishes for architecture diagrams: service
// icons for the services, the "DynamoDB Stream" resource icon for the stream.
// WAF, ELB, ECS, RDS, ECR, Systems Manager, EventBridge and CloudWatch come from
// the same set via the aws-icons npm package (3.3.0).
// Cloudflare, Terraform and GitHub Actions use their brand logos.
export const SERVICE_META: Record<Service, ServiceMeta> = {
  cloudflare: { label: 'Cloudflare Registrar', Icon: SiCloudflare, color: '#f38020' },
  cloudfront: { label: 'Amazon CloudFront', src: '/aws-icons/cloudfront.svg' },
  s3: { label: 'Amazon S3', src: '/aws-icons/s3.svg' },
  acm: { label: 'AWS Certificate Manager', src: '/aws-icons/acm.svg' },
  'api-gateway': { label: 'Amazon API Gateway', src: '/aws-icons/api-gateway.svg' },
  lambda: { label: 'AWS Lambda', src: '/aws-icons/lambda.svg' },
  dynamodb: { label: 'Amazon DynamoDB', src: '/aws-icons/dynamodb.svg' },
  'dynamodb-streams': {
    label: 'DynamoDB Streams',
    src: '/aws-icons/dynamodb-streams.svg',
    tile: true,
  },
  ses: { label: 'Amazon SES', src: '/aws-icons/ses.svg' },
  terraform: { label: 'Terraform', Icon: SiTerraform, color: '#7b42bc' },
  'github-actions': { label: 'GitHub Actions', Icon: SiGithubactions, color: '#2088ff' },
  waf: { label: 'AWS WAF', src: '/aws-icons/waf.svg' },
  alb: { label: 'Application Load Balancer', src: '/aws-icons/alb.svg' },
  ecs: { label: 'Amazon ECS on Fargate', src: '/aws-icons/ecs.svg' },
  rds: { label: 'Amazon RDS', src: '/aws-icons/rds.svg' },
  ecr: { label: 'Amazon ECR', src: '/aws-icons/ecr.svg' },
  ssm: { label: 'SSM Parameter Store', src: '/aws-icons/ssm.svg' },
  eventbridge: { label: 'EventBridge Scheduler', src: '/aws-icons/eventbridge.svg' },
  cloudwatch: { label: 'Amazon CloudWatch', src: '/aws-icons/cloudwatch.svg' },
}

/**
 * The service's icon as a square tile, 40px by default. A `className` with
 * its own size and radius replaces the default (cn doesn't merge classes, so
 * passing both would leave the CSS order to pick one).
 */
export function ServiceIcon({ service, className }: { service: Service; className?: string }) {
  const meta = SERVICE_META[service]
  const sizing = className ?? 'size-10 rounded-[6px]'
  if ('src' in meta && !meta.tile) {
    return (
      <Image src={meta.src} alt="" width={40} height={40} className={cn('shrink-0', sizing)} />
    )
  }
  return (
    <span
      aria-hidden
      className={cn('grid shrink-0 place-items-center bg-white ring-1 ring-hairline', sizing)}
    >
      {'src' in meta ? (
        <Image src={meta.src} alt="" width={40} height={40} className="size-[72%]" />
      ) : (
        <meta.Icon className="size-[60%]" style={{ color: meta.color }} />
      )}
    </span>
  )
}
