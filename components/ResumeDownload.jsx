import { IoMdDownload } from 'react-icons/io'

const ResumeDownload = ({ position }) => {
  return (
    <div>
      <a
        href="/files/Resume_Rungroj_Rungsaranon.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        className={[
          'btn bg-green-600/80 hover:bg-green-400/80 backdrop-blur-xs cursor-pointer max-w-fit caret-transparent flex items-center gap-1 pointer-events-auto transition-colors duration-150',
          position === 'top' ? 'hidden lg:inline-flex' : '',
        ].join(' ')}
      >
        <span>Download Resume</span>
        <IoMdDownload />
      </a>
    </div>
  )
}
export default ResumeDownload
