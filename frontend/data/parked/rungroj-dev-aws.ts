import { ProjectSchema } from '@/lib/schemas/content'

// When the site is back on CloudFront, replace the Vercel entry in projects.ts
// with this card, use the slug 'rungroj-dev' and restore its live URL.
export const rungrojDevAws = ProjectSchema.parse({
  slug: 'rungroj-dev-aws',
  name: 'rungroj.dev on AWS',
  tagline:
    'My portfolio fully serverless on AWS: S3 and CloudFront for the site, a contact API that emails me, every resource in Terraform.',
  summary:
    'My portfolio, taken from a Vercel side project to production on infrastructure I own. The domain is registered with Cloudflare, the static Next.js site is served from S3 through CloudFront, and the “Leave me a message” form posts to my own serverless API: API Gateway, Lambda and DynamoDB. Each new message is streamed from DynamoDB to a second Lambda that emails it to me with Amazon SES. Every AWS resource is defined in Terraform, and every merge to main deploys the site through GitHub Actions.',
  image: '/picture/portfolio.png',
  type: 'from-scratch',
  stage: 'completed',
  featured: true,
  stack: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Cloudflare',
    'S3',
    'CloudFront',
    'API Gateway',
    'Lambda',
    'DynamoDB',
    'SES',
    'Terraform',
    'GitHub Actions',
    'Zod',
  ],
  highlights: [
    'Own domain, rungroj.dev, registered through Cloudflare Registrar, with ACM TLS certificates for the site (us-east-1, as CloudFront requires) and for api.rungroj.dev (ap-southeast-7).',
    'Hosted in the AWS Thailand region (ap-southeast-7); only the CloudFront certificate (us-east-1) and SES (ap-southeast-1, Singapore) live elsewhere.',
    'The static Next.js export is served from a private S3 bucket, with Block Public Access on, through CloudFront; origin access control (OAC) makes CloudFront the only reader.',
    'The “Leave me a message” form posts to API Gateway on api.rungroj.dev; a Lambda validates it with Zod and stores it in DynamoDB, encrypted at rest, with point-in-time recovery.',
    'A DynamoDB Stream feeds a second Lambda, filtered to new messages only (one per batch, two retries), which emails each one to me through Amazon SES in Singapore (ap-southeast-1). The form never waits on the email.',
    'The API route is throttled (burst 10, 5 requests a second), CORS is an allow-list, and the default execute-api endpoint is disabled so only my domain reaches it.',
    'All AWS resources are defined in Terraform, with remote state in a private S3 bucket and locking.',
    'Every merge to main deploys the site with GitHub Actions: typecheck, lint and build, then sync to S3 and invalidate CloudFront. It signs in to AWS with OIDC, so no AWS keys are stored in GitHub, and its IAM role trusts only this repo’s main branch and may only write the site bucket and invalidate its distribution.',
  ],
  domain: {
    service: 'cloudflare',
    role: 'Holds rungroj.dev; its DNS points both hostnames to AWS',
  },
  architecture: [
    {
      label: 'Opening the site',
      from: 'Browser',
      host: 'rungroj.dev',
      steps: [
        {
          service: 'cloudfront',
          role: 'Global CDN that serves the site over HTTPS',
          badges: [
            // CloudFront only takes certificates from us-east-1.
            { label: 'TLS cert · ACM · us-east-1', service: 'acm' },
            { label: 'Reads S3 through OAC' },
          ],
        },
        {
          service: 's3',
          role: 'Private bucket with the static Next.js build',
          badges: [
            { label: 'Block Public Access on' },
            { label: 'Only CloudFront can read (OAC)' },
          ],
        },
      ],
    },
    {
      label: 'Leaving a message',
      from: 'Contact form',
      host: 'api.rungroj.dev',
      steps: [
        {
          service: 'api-gateway',
          role: 'Custom domain, throttled, CORS allow-list',
          badges: [{ label: 'TLS cert · ACM · ap-southeast-7', service: 'acm' }],
        },
        {
          service: 'lambda',
          name: 'portfolio-contact',
          role: 'Writer: checks Turnstile, validates with Zod, saves it',
        },
        {
          service: 'dynamodb',
          role: 'Table: stores the message, encrypted at rest',
          badges: [{ label: 'Point-in-time recovery' }, { label: 'Stream on' }],
        },
      ],
      phase: 'while the visitor waits',
      // The table's stream is a separate log of its changes. The Lambda
      // service polls it (event source mapping) and invokes the notifier.
      continuation: {
        label: 'then, in the background',
        steps: [
          {
            service: 'dynamodb-streams',
            role: 'Log of every change to the table, kept 24 h in shards; Lambda polls it',
            badges: [{ label: 'New item images' }],
          },
          {
            service: 'lambda',
            name: 'dynamodb_send_email',
            role: 'Reader: gets each new item from the stream, emails it',
            badges: [{ label: 'New items only' }, { label: '2 retries' }],
          },
          {
            service: 'ses',
            role: 'Sends it to my inbox from noreply@rungroj.dev',
            badges: [{ label: 'ap-southeast-1 · Singapore', kind: 'region' }],
          },
        ],
      },
    },
  ],
  homeRegion: { code: 'ap-southeast-7', name: 'Thailand' },
  foundations: [
    {
      service: 'terraform',
      role: 'Every AWS resource as code',
      badges: [
        { label: 'Remote state in a private S3 bucket', service: 's3' },
        { label: 'State locking' },
      ],
    },
    {
      service: 'github-actions',
      role: 'Checks, builds and deploys the site on every merge to main',
      badges: [
        { label: 'OIDC · no stored AWS keys' },
        { label: 'Least-privilege IAM role' },
      ],
    },
  ],
  builtWith: [
    {
      group: 'Frontend',
      items: [
        'Next.js 16 (static export)',
        'React 19',
        'TypeScript',
        'Tailwind CSS 4',
      ],
    },
    {
      group: 'Forms & data',
      items: ['React Hook Form', 'Zod', 'TanStack Query', 'Sonner'],
    },
    {
      group: 'Cloud',
      items: [
        'S3',
        'CloudFront',
        'ACM',
        'API Gateway',
        'Lambda (Node.js)',
        'DynamoDB Streams',
        'SES',
      ],
    },
    {
      group: 'Infrastructure',
      items: ['Terraform', 'GitHub Actions (OIDC)', 'Cloudflare Registrar'],
    },
  ],
  repoUrl: 'https://github.com/Imperator7/portfolio-next',
})
