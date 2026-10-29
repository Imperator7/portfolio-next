import { z } from 'zod'
import { ProjectSchema } from '@/lib/schemas/content'

// Facts come from each repo's README (github.com/Imperator7) and, for
// rungroj.dev, from the Terraform and Lambda code in terraform-infra/.
// Order is the order on the page. The one `featured` project is the hero
// project shown under the hero; the rest are listed as mini learning projects.
export const projects = z.array(ProjectSchema).parse([
  {
    slug: 'rungroj-dev',
    name: 'rungroj.dev',
    tagline:
      'My portfolio, live on my own domain and fully serverless on AWS, with a contact API that emails me and every resource in Terraform.',
    summary:
      'My portfolio, taken from a Vercel side project to production on infrastructure I own. The domain is registered with Cloudflare, the static Next.js site is served from S3 through CloudFront, and the “Leave me a message” form posts to my own serverless API: API Gateway, Lambda and DynamoDB. Each new message is streamed from DynamoDB to a second Lambda that emails it to me with Amazon SES. Every AWS resource is defined in Terraform.',
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
      { group: 'Infrastructure', items: ['Terraform', 'Cloudflare Registrar'] },
    ],
    demoUrl: 'https://rungroj.dev',
    repoUrl: 'https://github.com/Imperator7/portfolio-next',
  },
  {
    slug: 'dine-together',
    name: 'Dine Together',
    tagline:
      'QR-code group ordering for restaurants, with a shared view of incoming orders so a table never orders the same dish twice.',
    summary:
      'A full-stack group ordering system. Staff open a table session from a dashboard, which generates a QR code for that table. Guests scan it and order from their own phones into one shared session, and the kitchen sees every order arrive on its own display.',
    image: '/picture/group-ordering.png',
    type: 'from-scratch',
    stage: 'in-development',
    featured: false,
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Zod',
      'MongoDB',
      'Mongoose',
    ],
    highlights: [
      'Table manager dashboard for staff to monitor occupied tables, track active sessions and open new ones.',
      'Each table session gets a QR code that opens the menu with the session and table number already set.',
      'An “Incoming orders” tracker syncs across the whole table, so guests see what’s already on its way.',
      'A kitchen display where new orders appear as guests place them.',
      'Zod schemas shared between client and server validate every order and session request.',
    ],
    demoUrl:
      'https://dinetogether.vercel.app/menu?sessionId=6947a8e16a882fae9384c37a&table=3',
    repoUrl: 'https://github.com/Imperator7/Group-ordering',
    extraLinks: [
      {
        label: 'Staff table manager',
        url: 'https://dinetogether.vercel.app/table',
      },
      {
        label: 'Kitchen display',
        url: 'https://dinetogether.vercel.app/orders',
      },
    ],
  },
  {
    slug: 'task-management',
    name: 'Task management',
    tagline:
      'A to-do app built as a frontend take-home test, with optimistic updates that roll back on error over a mocked REST API.',
    summary:
      'A React and TypeScript to-do app built for a frontend developer test. It talks to a REST API mocked at the network level with MSW, so it behaves like a real client: loading and error states, optimistic updates and rollbacks.',
    image: '/picture/task-management.png',
    type: 'from-scratch',
    stage: 'completed',
    featured: false,
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Zod', 'MSW'],
    highlights: [
      'Create, edit, complete and delete to-dos against a REST API.',
      'Optimistic updates with rollback when a request fails.',
      'MSW mocks every endpoint with a consistent { ok, data } / { ok, error } envelope.',
      'Zod validates data at runtime; toasts confirm every action.',
    ],
    demoUrl: 'https://task-management-rungroj.vercel.app/',
    repoUrl: 'https://github.com/Imperator7/todolist-frontend',
  },
  {
    slug: 'note-easy',
    name: 'Note easy',
    tagline: 'A Nuxt note-taking app with sign-in, categories and sorting.',
    summary:
      'A note and task app built with Nuxt and Vue. Notes can be categorized and sorted, with full create, read, update and delete, behind a sign-in.',
    image: '/picture/note-easy.png',
    type: 'from-scratch',
    stage: 'completed',
    featured: false,
    stack: [
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Tailwind CSS',
      'nuxt-auth-utils',
      'Zod',
    ],
    highlights: [
      'Full CRUD for notes, with categories and sorting.',
      'Sign-in with nuxt-auth-utils.',
      'Input validated with Zod.',
      'Was deployed on Firebase App Hosting; the demo is offline now that the account has expired.',
    ],
    // No demoUrl: the Firebase account expired, so the demo is offline.
    repoUrl: 'https://github.com/Imperator7/note-easy',
  },
  {
    slug: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    tagline:
      'The React tutorial rebuilt from scratch, then refactored to useReducer and a custom hook.',
    summary:
      'I re-implemented the classic React tutorial without copying it, then compared my version with the official one and refactored the state management.',
    image: '/picture/tictactoe.png',
    type: 'from-scratch',
    stage: 'completed',
    featured: false,
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Winner and tie detection, with the winning line highlighted.',
      'Time travel through past moves.',
      'Occupied squares and finished games can’t be clicked.',
      'State refactored to useReducer and centralized in a custom hook.',
    ],
    learnings: [
      'Strict Mode mounts components twice on purpose, to surface impure code.',
      'Dynamic Tailwind class names need a safelist, or the JIT compiler drops them.',
      'Assets referenced from index.html must live in public/, since only imported files get bundled.',
    ],
    demoUrl: 'https://tictactoe-from-react-docs.vercel.app/',
    repoUrl: 'https://github.com/Imperator7/tictactoe-from-react-docs',
  },
  {
    slug: 'space-tourism',
    name: 'Space Tourism',
    tagline:
      'A multi-page site built pixel-perfect from a Figma design, responsive across mobile, tablet and desktop.',
    summary:
      'A Figma-to-code exercise: a multi-page space tourism site implemented to match the design at three breakpoints.',
    image: '/picture/space-tourism.png',
    type: 'figma-to-code',
    stage: 'completed',
    featured: false,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    highlights: [
      'Matches the Figma design on mobile, tablet and desktop.',
      'Multi-page navigation built with the Next.js App Router.',
    ],
    demoUrl: 'https://space-tour-figma-based.vercel.app/',
    repoUrl: 'https://github.com/Imperator7/space-tour-figma-based',
  },
])

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug)
