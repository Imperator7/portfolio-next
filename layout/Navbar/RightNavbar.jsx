import NavLink from './NavLink'

export default function RightNavbar({ navList, scrolled }) {
  return (
    <div
      className={[
        'fixed pointer-events-none right-8 z-50 text-white flex flex-col justify-around items-end h-full',
        'transition-transform duration-300',
        scrolled ? '' : 'translate-x-100',
      ].join(' ')}
    >
      <NavLink key={'top'} nav={'back to the top'} link={'top'} />
      {navList.map((nav, i) => (
        <NavLink key={i} nav={nav} />
      ))}
    </div>
  )
}
