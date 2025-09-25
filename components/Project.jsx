'use client'

import Image from 'next/image'
import Link from 'next/link'
import GithubIcon from './icons/GithubIcon'
import ExternalLinkIcon from './icons/ExternalLinkIcon'

export default function Project({
  img,
  name,
  description,
  stack,
  link,
  github,
  type,
}) {
  return (
    <div className="relative w-full max-w-2xl rounded-4xl bg-gray backdrop-blur-sm overflow-hidden">
      <div className="relative w-full sm:h-52 aspect-[16/9] overflow-hidden">
        <Image
          src={`/${img}`}
          fill
          alt={name}
          quality={90}
          className="object-cover scale-105"
        />
      </div>

      <div className="relative rounded-b-4xl h-fit max-h-50 p-6 text-white bg-white/10 backdrop-blur-3xl">
        <h2 className="secondary-topic-text">{name}</h2>
        <div className="flex justify-between items-start ">
          <div className="flex flex-wrap items-center gap-y-2">
            {stack.map((tech, i) => (
              <span
                key={i}
                className={[
                  'font-semibold mr-2 rounded-2xl bg-white/40 backdrop-blur-md px-3 py-1 text-sm md:text-base',
                  i >= 3 ? 'hidden sm:inline-flex' : '',
                ].join(' ')}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-4 text-xl max-w-[40%]">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="view github's repo"
            >
              <GithubIcon className="w-10 h-10 hover:text-black transform-all duration-150" />
            </a>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Try ${name}'s demo`}
              className="bg-green-600 pl-4 pr-3 py-2 rounded-xl inline-flex items-center gap-0.5 hover:-translate-y-1 active:translate-y-1 transition-transform duration-150 ease-in-out caret-transparent"
            >
              <span className="hidden sm:inline-flex font-semibold text-nowrap mx-1">
                Try now!
              </span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
