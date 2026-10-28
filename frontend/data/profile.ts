import { ProfileSchema } from '@/lib/schemas/content'

// Parsed at build time: a typo here fails `npm run build` instead of the page.
export const profile = ProfileSchema.parse({
  firstName: 'Rungroj',
  lastName: 'Rungsaranon',
  role: 'Fullstack developer',
  location: 'Bangkok, Thailand',
  openToWork: true,
  availability: 'Junior fullstack/cloud engineer roles · Bangkok or remote',
  headline: 'Fullstack developer,',
  headlineHighlight: 'AWS certified.',
  intro:
    'I design, build and ship complete web apps, from the UI and API to the cloud they run on. Civil engineer by degree, software developer by practice.',
  about:
    'I studied civil engineering at Chulalongkorn and moved into software by building small apps and tools all through university. Now I build complete web apps with React, Next.js, Express and TypeScript, and run them on AWS infrastructure I define in Terraform, this site included.',
  education: {
    degree: 'B.Eng. Civil Engineering',
    school: 'Chulalongkorn University',
  },
  email: 'rungrojr.ball@gmail.com',
  phone: '095-528-4138',
  githubUrl: 'https://github.com/Imperator7',
  githubHandle: 'Imperator7',
  resumeUrl: '/files/Rungroj_Rungsaranon_Resume.pdf',
})
