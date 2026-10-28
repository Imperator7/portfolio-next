import { existsSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { ArrowUpRight, GraduationCap } from 'lucide-react'
import Section from '@/components/ui/section'
import type { Certification, Profile } from '@/lib/schemas/content'

type Fact = {
  value: string
  label: string
  detail: string
  /** Shown small after the value, e.g. "/990" for a score. */
  unit?: string
  picture: React.ReactNode
  /** The issuer's public record, for a certification. */
  verifyUrl?: string
}

// ETS maps TOEIC Listening & Reading to CEFR C1 from 945 (490 + 455).
const TOEIC = { score: 965, max: 990 }

// The university's emblem, when the owner has added the file; until then
// a graduation cap stands in, so the page never shows a broken image.
const CHULA_EMBLEM = '/picture/chulalongkorn.png'
const hasChulaEmblem = existsSync(path.join(process.cwd(), 'public', CHULA_EMBLEM))

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
const CEFR_REACHED = CEFR_LEVELS.indexOf('C1')

/**
 * TOEIC's CEFR level as a ladder: six bars rising A1 to C2, filled up to
 * C1, so "fifth of six" reads before any text does.
 */
function CefrLadder() {
  return (
    <span className="flex flex-col items-center gap-2">
      <span className="flex h-14 items-end gap-1 sm:h-16">
        {CEFR_LEVELS.map((level, index) => (
          <span
            key={level}
            // The filled bars rise one after another as the section scrolls
            // in (scroll-driven, CSS only; see .cefr-rise in globals.css).
            className={
              index <= CEFR_REACHED
                ? 'cefr-rise w-2 origin-bottom rounded-[2px] bg-ink sm:w-2.5'
                : 'w-2 rounded-[2px] ring-1 ring-hairline-strong ring-inset sm:w-2.5'
            }
            style={
              {
                height: `${((index + 1) / CEFR_LEVELS.length) * 100}%`,
                '--rise-start': `${index * 6}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </span>
      <span className="text-label font-semibold tracking-wider text-ink">C1</span>
    </span>
  )
}

/** A quiet "Verify" link to an issuer's public record. */
function VerifyLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 font-medium text-accent-ink underline decoration-hairline-strong underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current"
    >
      Verify
      <ArrowUpRight aria-hidden className="size-3.5" />
      <span className="sr-only">{name} (opens in a new tab)</span>
    </a>
  )
}

/** One fact: picture on the left, the value in large type, label, detail. */
function FactRow({ fact }: { fact: Fact }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 py-6 sm:gap-x-6">
      {/* In the source the label comes first (a dl needs its dt before the
          dd) so screen readers hear it first; the grid places the picture
          left and the value on top. */}
      <dt className="col-start-2 row-start-2 mt-2 text-body font-medium text-balance text-ink">
        {fact.label}
      </dt>
      <dd className="col-start-2 row-start-1 self-end font-display text-heading-1 whitespace-nowrap tabular-nums">
        {fact.value}
        {fact.unit && (
          <span className="ml-1.5 align-baseline font-sans text-heading-3 font-normal tracking-normal text-faint">
            {fact.unit}
          </span>
        )}
      </dd>
      <dd className="col-start-2 row-start-3 mt-0.5 self-start text-body-sm text-muted">
        {fact.detail}
        {fact.verifyUrl && (
          <>
            {' · '}
            <VerifyLink href={fact.verifyUrl} name={fact.label} />
          </>
        )}
      </dd>
      <dd
        aria-hidden
        className="col-start-1 row-span-3 row-start-1 grid size-20 place-items-center sm:size-24"
      >
        {fact.picture}
      </dd>
    </div>
  )
}

/** A group's title on a strong rule, then its rows divided by hairlines. */
function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <h3 className="border-b border-hairline-strong pb-4 text-heading-3">{title}</h3>
      <div className="flex flex-col divide-y divide-hairline">{children}</div>
    </div>
  )
}

type AboutProps = { profile: Profile; certifications: Certification[] }

/**
 * Background and credentials, grouped by what they are: Certifications
 * (AWS SAA, then Data Analyst) and Education (the degree and TOEIC). Every fact is a picture on the left and
 * the fact in large type beside it, left-aligned with the title above;
 * two columns from lg, stacked below.
 */
export default function About({ profile, certifications }: AboutProps) {
  // Every certification as a full fact, the primary ones first.
  const certs: Fact[] = [
    ...certifications.filter((cert) => cert.emphasis !== 'secondary'),
    ...certifications.filter((cert) => cert.emphasis === 'secondary'),
  ].map((cert) => ({
    value: cert.shortName,
    label: cert.label,
    detail: `Certified ${cert.issued}`,
    verifyUrl: cert.verifyUrl,
    picture: (
      <Image
        src={cert.image}
        alt=""
        width={96}
        height={96}
        className="size-20 object-contain drop-shadow-[0_8px_16px_rgb(0_0_0/0.35)] sm:size-24"
      />
    ),
  }))

  const education: Fact[] = [
    {
      value: 'B.Eng.',
      label: profile.education.degree.replace(/^B\.Eng\.\s*/, ''),
      detail: profile.education.school,
      picture: hasChulaEmblem ? (
        <Image
          src={CHULA_EMBLEM}
          alt=""
          // The emblem is portrait (673 × 1024): fix its height to the
          // picture box and let the width follow, so it can't overflow.
          width={63}
          height={96}
          className="h-20 w-auto sm:h-24"
        />
      ) : (
        <span className="grid size-full place-items-center rounded-full bg-sunken ring-1 ring-hairline">
          <GraduationCap className="size-1/2 text-muted" />
        </span>
      ),
    },
    {
      value: String(TOEIC.score),
      label: 'TOEIC · CEFR C1',
      unit: `/${TOEIC.max}`,
      detail: 'Issued 15 Jan 2025',
      picture: <CefrLadder />,
    },
  ]

  return (
    <Section id="about" title="Background and credentials" intro={profile.about}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
        <Group title="Certifications">
          <dl className="flex flex-col divide-y divide-hairline">
            {certs.map((fact) => (
              <FactRow key={fact.value} fact={fact} />
            ))}
          </dl>
        </Group>
        <Group title="Education">
          <dl className="flex flex-col divide-y divide-hairline">
            {education.map((fact) => (
              <FactRow key={fact.value} fact={fact} />
            ))}
          </dl>
        </Group>
      </div>
    </Section>
  )
}
