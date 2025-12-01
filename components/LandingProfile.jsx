import Navbar from '../layout/Navbar/Navbar'
import Image from 'next/image'

export default function LandingProfile({ navList }) {
  return (
    <div className="flex flex-col max-h-[95vh] h-[80vh] md:h-[95vh] relative justify-between">
      <Navbar navList={navList} />
      <Image
        src="/picture/profile.png"
        quality={100}
        alt="profile-picture"
        fill
        priority
        sizes="100vw"
        draggable={false}
        className="z-0 object-cover object-[75%_30%] max-h-[dvh] pointer-events-none"
      />
      <div className="relative z-10 m-5 flex items-end">
        <div
          className={[
            'flex flex-col justify-end pointer-events-none mb-10',
            'text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold',
          ].join(' ')}
        >
          <h1 className="caret-transparent  drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)] ">
            Rungroj
          </h1>
          <h1 className="leading-tight caret-transparent  drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
            Rungsaranon
          </h1>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="z-1 absolute left-0 right-0 bottom-0 h-40 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>
    </div>
  )
}
