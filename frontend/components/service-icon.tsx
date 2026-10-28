import Image from 'next/image'
import type { IconType } from 'react-icons'
import { SiCloudflare, SiTerraform } from 'react-icons/si'
import type { Service } from '@/lib/schemas/content'
import { cn } from '@/lib/cn'

type ServiceMeta = { label: string } & (
  | { src: string }
  | { Icon: IconType; color: string }
)

// AWS services use the official AWS Architecture Icons (2021 set, in
// public/aws-icons/), which AWS publishes for architecture diagrams.
// Cloudflare and Terraform use their brand logos.
export const SERVICE_META: Record<Service, ServiceMeta> = {
  cloudflare: { label: 'Cloudflare', Icon: SiCloudflare, color: '#f38020' },
  cloudfront: { label: 'Amazon CloudFront', src: '/aws-icons/cloudfront.svg' },
  s3: { label: 'Amazon S3', src: '/aws-icons/s3.svg' },
  acm: { label: 'AWS Certificate Manager', src: '/aws-icons/acm.svg' },
  'api-gateway': { label: 'Amazon API Gateway', src: '/aws-icons/api-gateway.svg' },
  lambda: { label: 'AWS Lambda', src: '/aws-icons/lambda.svg' },
  dynamodb: { label: 'Amazon DynamoDB', src: '/aws-icons/dynamodb.svg' },
  terraform: { label: 'Terraform', Icon: SiTerraform, color: '#7b42bc' },
}

/**
 * The service's icon as a square tile, 40px by default. A `className` with
 * its own size and radius replaces the default (cn doesn't merge classes, so
 * passing both would leave the CSS order to pick one).
 */
export function ServiceIcon({ service, className }: { service: Service; className?: string }) {
  const meta = SERVICE_META[service]
  const sizing = className ?? 'size-10 rounded-[6px]'
  if ('src' in meta) {
    return (
      <Image src={meta.src} alt="" width={40} height={40} className={cn('shrink-0', sizing)} />
    )
  }
  const { Icon, color } = meta
  return (
    <span
      aria-hidden
      className={cn('grid shrink-0 place-items-center bg-white ring-1 ring-hairline', sizing)}
    >
      <Icon className="size-[60%]" style={{ color }} />
    </span>
  )
}
