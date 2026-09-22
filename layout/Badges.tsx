import Section from '@/components/Section'
import Badge from '@/components/Badge'
import { BadgeData } from '@/components/Badge'

const Badges = () => {
  const badges: BadgeData[] = [
    {
      name: 'Certified Solutions Architect - Associate',
      provider: 'AWS',
      issuedBy: 'Sep 3rd 2026',
      image: '/picture/aws-certified-solutions-architect-associate.png',
      verifyUrl:
        'https://www.credly.com/badges/97d33890-d257-4e96-8ad2-8fe6bfccc477/public_url',
    },
    {
      name: 'Certified Professional Data Analyst',
      provider: 'DataRockie School',
      issuedBy: 'March 25th 2024',
      image:
        '/picture/DataRockie School - Certified Professional Data Analyst - 2024-03-25.png',
      verifyUrl:
        'https://badges.parchment.com/public/assertions/R0a1vHKuQCuwcKdmfkF9-g?identity__email=rungrojr.ball@gmail.com',
    },
  ]

  return (
    <Section>
      <h2 className="topic-text">Licenses & Certifications</h2>
      <div className="flex gap-8">
        {badges.map((badge: BadgeData) => (
          <Badge key={badge.name} badge={badge}></Badge>
        ))}
      </div>
    </Section>
  )
}
export default Badges
