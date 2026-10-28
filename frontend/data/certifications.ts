import { z } from 'zod'
import { CertificationSchema } from '@/lib/schemas/content'

export const certifications = z.array(CertificationSchema).parse([
  {
    name: 'AWS Certified Solutions Architect – Associate',
    provider: 'Amazon Web Services',
    shortName: 'AWS SAA',
    label: 'Solutions Architect – Associate',
    issued: 'Sep 2026',
    image: '/picture/aws-certified-solutions-architect-associate.png',
    verifyUrl:
      'https://www.credly.com/badges/97d33890-d257-4e96-8ad2-8fe6bfccc477/public_url',
  },
  {
    name: 'Certified Professional Data Analyst',
    provider: 'DataRockie School',
    shortName: 'Data Analyst',
    label: 'Certified Professional, DataRockie School',
    issued: 'Mar 2024',
    image:
      '/picture/DataRockie School - Certified Professional Data Analyst - 2024-03-25.png',
    verifyUrl:
      'https://badges.parchment.com/public/assertions/R0a1vHKuQCuwcKdmfkF9-g?identity__email=rungrojr.ball@gmail.com',
    emphasis: 'secondary',
  },
])
