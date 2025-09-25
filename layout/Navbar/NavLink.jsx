import ResumeDownload from '@/components/ResumeDownload'

const NavLink = ({ nav, link = nav, position = 'right' }) => {
  return (
    <>
      {nav !== 'Download Resume' ? (
        <a
          href={`#${link}`}
          className={[
            'liquid-glass pointer-events-auto hover:scale-140 text-xl font-bold transition-all duration-75 drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)] text-nowrap',
            'invisible lg:visible',
          ].join(' ')}
        >
          {nav}
        </a>
      ) : (
        <ResumeDownload position={position} />
      )}
    </>
  )
}
export default NavLink
