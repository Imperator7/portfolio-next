import NavLink from './NavLink'

export default function Navbar({ navList }) {
  return (
    <nav
      className={[
        'z-50 mt-5 text-white font-bold flex justify-around w-full items-center',
      ].join('hover:scale:110 transition-all duration-75')}
    >
      {navList.map((nav, i) => (
        <NavLink key={i} nav={nav} position={'top'} />
      ))}
    </nav>
  )
}
