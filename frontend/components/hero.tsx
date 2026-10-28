import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { FaAws } from 'react-icons/fa'
import { TECH_META } from '@/components/tech-icon'
import { cn } from '@/lib/cn'
import ResumeButton from '@/components/resume-button'
import StatusPill from '@/components/ui/status-pill'
import type { Certification, Profile, Tech } from '@/lib/schemas/content'

/** A quiet white text link with a down arrow; its underline draws in on hover. */
function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2 text-button whitespace-nowrap text-on-night',
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      <ArrowDown
        aria-hidden
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-1 group-focus-visible:translate-y-1"
      />
    </a>
  )
}

type HeroProps = {
  profile: Profile
  expertise: { title: string; techs: Tech[] }[]
  certifications: Certification[]
}

/**
 * The first screen, full-bleed: availability, what I do, the resume and my
 * main expertise on the left; my name bottom-left and the certifications
 * bottom-right, so all of it reads at a glance.
 */
export default function Hero({ profile, expertise, certifications }: HeroProps) {
  // "AWS certified." → "AWS" (orange) + "certified."
  const [highlightBrand, ...rest] = profile.headlineHighlight.split(' ')
  const highlightRest = rest.join(' ')

  return (
    <section
      aria-labelledby="hero-title"
      // Desktop (lg+) is the reference layout; the max-* classes compact
      // phones and tablets so everything fits on the first screen.
      className="relative isolate flex min-h-svh flex-col justify-between gap-6 overflow-hidden px-5 pt-20 pb-36 text-on-night max-lg:gap-4 max-lg:pb-10 max-sm:pt-4 max-sm:pb-3 sm:px-10 sm:max-lg:pt-26 sm:pt-12 lg:px-14"
    >
      {/* The whole backdrop (photo and its shading) dissolves into the page
          over the last 14rem, which sits below the name and badges. */}
      <div
        aria-hidden
        className="fade-out-bottom absolute inset-0 -z-10 bg-night max-lg:[--fade-size:7rem]"
      >
        {/* Phones: the text needs the full width, so the photo starts below
            it (48% down, fading in from the dark top) and the face lands in
            the open space between Main expertise and the badges. */}
        <div className="absolute inset-0 max-sm:top-[48%] max-sm:[mask-image:linear-gradient(to_bottom,transparent,#000_28%)]">
          <Image
            src="/picture/profile.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-settle object-cover object-[72%_30%] brightness-110"
          />
        </div>
        {/* Shade only where the text sits: the left side and behind the name,
            light everywhere else so the photo stays bright. */}
        <div className="absolute inset-0 bg-linear-to-r from-night/85 via-night/45 via-45% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-40 h-1/3 bg-linear-to-t from-night/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-night/55" />
      </div>

      {/* A soft shadow keeps the white text readable over the brighter photo. */}
      <div className="flex max-w-3xl flex-col items-start gap-5 max-lg:gap-4 max-sm:gap-3 [text-shadow:0_1px_14px_rgb(0_0_0/0.55)]">
        {profile.openToWork && (
          // On phones the pill sits level with the menu buttons (there's room
          // to their left) and the roles line starts just below them.
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:gap-y-3">
            <StatusPill
              live
              onPhoto
              size="lg"
              className="max-sm:gap-2.5 max-sm:px-4 max-sm:py-2 max-sm:text-body-sm"
            >
              Open to work
            </StatusPill>
            <p className="text-body text-on-night-muted max-sm:text-body-sm">
              {profile.availability}
            </p>
          </div>
        )}
        <h1 id="hero-title" className="text-display">
          <span className="sr-only">
            {profile.firstName} {profile.lastName}.{' '}
          </span>
          {profile.headline}{' '}
          {/* The certification: the AWS logo stands in for the word "AWS"
              (screen readers still hear it), sized so its letters match the
              headline's lowercase and sit on the same baseline. */}
          <span className="whitespace-nowrap">
            {/* The icon's 640×512 canvas has empty bands above and below the
                artwork (y 64–448). This box is exactly the artwork's 5:3 size
                and clips them off. Sized in em, so it scales with the
                headline: the "aws" letters match the lowercase height and sit
                on the baseline, and the smile hangs below like a descender. */}
            <span
              aria-hidden
              className="mr-[0.18em] inline-block overflow-hidden text-aws"
              style={{ width: '1.87em', height: '1.12em', verticalAlign: '-0.42em' }}
            >
              <FaAws
                className="block"
                style={{ width: '1.87em', height: '1.496em', marginTop: '-0.187em' }}
              />
            </span>
            <span className="sr-only">{highlightBrand}</span>
            {highlightRest}
          </span>
        </h1>
        {/* Extra space above so the AWS logo's smile hangs clear of the buttons. */}
        <div className="mt-4 flex flex-wrap items-center gap-3 max-sm:mt-3 max-sm:gap-2 sm:mt-6">
          <ResumeButton href={profile.resumeUrl} className="max-sm:min-h-11 max-sm:px-4 max-sm:py-2.5" />
          <a
            href="#contact"
            // Hover energizes rather than dims: the pill stays solid white,
            // lifts, glows, a shine sweeps across it and the envelope tilts
            // up as if it's being sent.
            className="group relative isolate inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full bg-on-night px-5 py-3 max-sm:min-h-11 max-sm:px-4 max-sm:py-2.5 text-button whitespace-nowrap text-night transition-[translate,scale,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_0_0_4px_rgb(255_255_255/0.2),0_12px_32px_-6px_rgb(255_255_255/0.5)] focus-visible:-translate-y-1 focus-visible:shadow-[0_0_0_4px_rgb(255_255_255/0.2),0_12px_32px_-6px_rgb(255_255_255/0.5)] active:scale-[0.97]"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-night/12 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-[400%] group-focus-visible:translate-x-[400%]"
            />
            <Mail
              aria-hidden
              className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-12 group-hover:scale-110 group-focus-visible:-rotate-12"
            />
            Contact me
          </a>
          {/* Phones show this link further down (beside Main expertise),
              where it costs the hero no extra line. */}
          <TextLink href="#work" className="min-h-12 px-3 max-sm:hidden">
            See projects
          </TextLink>
        </div>
        {/* Short phones only, where the list below is hidden: links down to
            the full stack in Skills and to the projects. */}
        <div className="-mt-2 hidden items-center gap-6 short-phone:flex">
          <TextLink href="#skills">Main expertise</TextLink>
          <TextLink href="#work">See projects</TextLink>
        </div>
        {/* Kept clear of the face in the photo. The photo (1046 × 598) is
            object-cover at 72% across, so the face's left edge sits at
            about 72vw − 14.5svh (until the screen is wider than 1.75:1).
            Desktop: three columns, at most 54rem and ending ~24px short of
            that edge (they ran over the face below ~1500px wide).
            Tablets: the groups stack in a narrow column on the left.
            Short phones (iPhone SE): hidden, so the photo and the name fit
            on the first screen; the Skills section lists the same stack. */}
        <div className="w-full pt-2 max-sm:pt-1 short-phone:hidden sm:max-lg:w-[min(22rem,46%)] lg:w-[min(54rem,calc(72vw-14.5svh-5rem))]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-body-sm font-semibold text-on-night">Main expertise</h2>
            {/* Phones: the projects link rides on this line. The negative
                margin keeps its 44px touch area without making the line
                taller (the hero must fit one screen). */}
            <TextLink href="#work" className="-my-3 sm:hidden">
              See projects
            </TextLink>
          </div>
          {/* No cards: a firmer shadow, full-white names a step larger and
              bright group titles keep it readable on the photo. */}
          {/* Phones and tablets: compact groups stacked, each title on top
              of its techs. Desktop (lg+): three columns. */}
          <dl className="mt-3 grid max-lg:gap-0 max-sm:mt-2 lg:grid-cols-3 lg:gap-6 [text-shadow:0_1px_3px_rgb(0_0_0/0.7),0_1px_16px_rgb(0_0_0/0.6)]">
            {expertise.map((group) => (
              <div
                key={group.title}
                className="border-t border-glass-line pt-3 max-lg:py-2.5 max-sm:py-2"
              >
                <dt className="text-label font-semibold tracking-wider text-on-night uppercase max-sm:text-[0.6875rem] max-sm:leading-tight">
                  {group.title}
                </dt>
                <dd className="mt-2.5 max-lg:mt-2 max-sm:mt-1.5">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 max-lg:gap-x-3.5 max-lg:gap-y-1.5 max-sm:gap-x-3 max-sm:gap-y-1">
                    {group.techs.map((tech) => {
                      const { label, Icon } = TECH_META[tech]
                      return (
                        <li
                          key={tech}
                          className="flex items-center gap-2 text-body font-medium max-lg:gap-1.5 max-lg:text-body-sm max-sm:text-label"
                        >
                          <Icon aria-hidden className="size-[1.1em] shrink-0" />
                          {label}
                        </li>
                      )
                    })}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-8 max-lg:gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p
          aria-hidden
          className="wordmark-fit animate-rise font-display text-name whitespace-nowrap uppercase select-none [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]"
        >
          {profile.firstName}
          {/* The surname as an editorial lockup under the first name: a soft
              white rule that draws in, then the name in wide-tracked
              capitals. The gap is measured from the first name's size (not
              the surname's own em), so it stays in proportion at every width. */}
          <span className="mt-[calc(var(--text-name)*0.16)] flex items-center gap-[0.9em] text-[max(0.2em,0.875rem)] leading-none font-medium tracking-[0.42em] text-on-night/85 uppercase">
            <span
              aria-hidden
              className="h-[2px] w-[2.5em] origin-left animate-grow-x rounded-full bg-on-night/70"
            />
            {profile.lastName}
          </span>
        </p>

        {/* Just the badges; on desktop each one's details rise out of it on
            hover or keyboard focus. The badges speak for themselves, so
            touch screens get no caption. Each links to its verification. */}
        <ul
          aria-label="Certifications"
          // Tablets: right-aligned. Phones: left-aligned above the name, so
          // they stay clear of the face in the photo (it sits on the right).
          className="flex items-end gap-5 max-sm:gap-3 max-sm:self-start sm:max-lg:self-end lg:-mb-10 lg:gap-6"
        >
          {certifications.map((cert, index) => (
            <li key={cert.name} className="group relative">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'relative flex flex-col items-center gap-2 rounded-md outline-offset-4',
                  cert.emphasis === 'primary'
                    ? 'w-22 sm:w-28 lg:w-48 2xl:w-52'
                    : 'w-20 sm:w-26 lg:w-44 2xl:w-48',
                )}
              >
                <Image
                  src={cert.image}
                  alt={`${cert.name}, ${cert.provider}. Verify (opens in a new tab)`}
                  width={208}
                  height={208}
                  className={cn(
                    'object-contain drop-shadow-[0_8px_20px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-out-expo group-focus-within:-translate-y-1 group-focus-within:scale-105 group-hover:-translate-y-1 group-hover:scale-105',
                    // The primary badge leads; secondary ones sit smaller beside it.
                    cert.emphasis === 'primary'
                      ? 'size-22 sm:size-28 lg:size-48 2xl:size-52'
                      : 'size-20 sm:size-26 lg:size-44 2xl:size-48',
                  )}
                />
                {/* Touch screens only (no hover there): a shine sweeps across
                    the badge every few seconds, clipped to the badge's own
                    shape by using its image as the mask. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden animate-glint bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.6)_50%,transparent_65%)] bg-size-[250%_100%] bg-no-repeat pointer-coarse:block"
                  style={{
                    // Quoted and encoded: an unquoted url() with spaces in
                    // the filename (the DataRockie badge) is invalid CSS,
                    // which drops the mask and leaves a rectangle of shine.
                    maskImage: `url("${encodeURI(cert.image)}")`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    animationDelay: `${1.2 + index * 0.35}s`,
                  }}
                />
              </a>
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-full left-0 mb-3 w-64 origin-bottom-left translate-y-2 pointer-coarse:hidden lg:right-0 lg:left-auto lg:origin-bottom-right scale-95 rounded-md bg-night/90 p-4 opacity-0 blur-sm ring-1 ring-glass-line backdrop-blur-xl transition-[opacity,translate,scale,filter] duration-500 ease-out-expo group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:blur-none group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none"
              >
                <p className="text-body-sm leading-snug font-semibold">{cert.name}</p>
                <p className="mt-0.5 text-label text-on-night-muted">
                  {cert.provider} · {cert.issued}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-label text-accent-on-night">
                  Click to verify
                  <ArrowUpRight className="size-3.5" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
