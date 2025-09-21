const MessageIcon = () => {
  return (
    <span
      className="absolute -top-4 left-1/2 -translate-x-32 flex items-center gap-1
                     bg-black/60 text-white text-xs rounded-lg px-3 py-1 opacity-0
                     group-hover:opacity-100 transition-opacity duration-300
                     shadow-lg z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-green-300"
      >
        <path d="M4 4h16v16H4z" fill="none" />
        <path
          d="M20 4H4a2 2 0 00-2 2v12a2 
                     2 0 002 2h16a2 2 0 002-2V6a2 
                     2 0 00-2-2zm0 2v.01L12 13 
                     4 6.01V6h16zM4 18V8l8 5 
                     8-5v10H4z"
        />
      </svg>
      Mail now!
    </span>
  )
}
export default MessageIcon
