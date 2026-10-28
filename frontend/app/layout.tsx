import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { Toaster } from 'sonner'
import FloatingNav from '@/components/floating-nav'
import BackToTop from '@/components/back-to-top'
import Footer from '@/components/footer'
import TouchSpotlight from '@/components/touch-spotlight'
import ToastTapToClose from '@/components/toast-tap-to-close'
import { profile } from '@/data/profile'
import QueryProvider from '@/providers/query-provider'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '600'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Rungroj Rungsaranon · Fullstack developer',
    template: '%s · Rungroj Rungsaranon',
  },
  description:
    'Fullstack developer in Bangkok building with React, Next.js, TypeScript, Node and AWS. Open to junior frontend, backend and fullstack roles.',
}

export const viewport: Viewport = {
  themeColor: '#0d0f13',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable}`}
      // The script below sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Dark is the default; apply a saved "light" choice before first
            paint so the page never flashes the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';var m=document.querySelector('meta[name=\"theme-color\"]');if(m)m.setAttribute('content','#e7ebf1')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <QueryProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
          >
            Skip to content
          </a>
          <FloatingNav
            resumeUrl={profile.resumeUrl}
            githubUrl={profile.githubUrl}
          />
          <div id="top">{children}</div>
          <Footer profile={profile} />
          <BackToTop />
          <TouchSpotlight />
          <ToastTapToClose />
        </QueryProvider>
        {/* Sonner, themed: dark card like the hero and menu, Poppins title,
            8 s on screen (paused while hovered), close button, icons that pop;
            a tap anywhere on a toast closes it (ToastTapToClose). */}
        <Toaster
          position="top-center"
          duration={8000}
          closeButton
          visibleToasts={3}
          offset={24}
          gap={12}
          icons={{
            success: <CircleCheck className="size-5 animate-pop" />,
            error: <CircleAlert className="size-5 animate-pop" />,
          }}
          toastOptions={{
            classNames: {
              toast:
                'w-[min(24rem,calc(100vw-2rem))]! cursor-pointer! items-start! gap-3! rounded-md! border-0! bg-night/95! p-4! pr-11! font-sans! text-on-night! shadow-[0_24px_60px_-16px_rgb(0_0_0/0.5)]! ring-1! ring-glass-line! backdrop-blur-xl!',
              title: 'font-display! text-body! font-semibold!',
              description: 'mt-0.5! text-body-sm! text-on-night-muted!',
              icon: 'mt-0.5! size-5! shrink-0!',
              success: '[&_[data-icon]]:text-success-on-night',
              error: '[&_[data-icon]]:text-danger-on-night',
              // Sonner nudges its close button half off the corner with a
              // transform; cancel that and keep it inside, quiet until hovered.
              closeButton:
                'top-3! right-3! left-auto! size-7! transform-none! border-0! bg-transparent! text-on-night-muted! hover:bg-glass! hover:text-on-night!',
            },
          }}
        />
      </body>
    </html>
  )
}
