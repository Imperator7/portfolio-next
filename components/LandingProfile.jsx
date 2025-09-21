import Navbar from '../layout/Navbar/Navbar'
import Image from 'next/image'

export default function LandingProfile({ navList }) {
  return (
    <div className="flex flex-col min-h-[95vh] relative justify-between">
      <Navbar navList={navList} />
      <Image
        src="/picture/profile.png"
        quality={100}
        alt="profile-picture"
        fill
        className="object-cover z-0 max-h-[100vh]"
      />
      <div className="relative z-10 m-5 flex items-end">
        <div className="flex flex-col justify-end pointer-events-none mb-10">
          <h1 className="text-white font-bold text-9xl caret-transparent  drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
            Rungroj
          </h1>
          <h1 className="text-white font-bold leading-tight text-9xl caret-transparent  drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
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
