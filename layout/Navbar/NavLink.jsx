const NavLink = ({ nav, link = nav }) => {
  return (
    <a
      href={`#${link}`}
      className="liquid-glass hover:scale-150 text-xl font-bold transition-all duration-75 drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
    >
      {nav}
    </a>
  )
}
export default NavLink
