import { IoMdDownload } from 'react-icons/io'

const ResumeDownload = () => {
  return (
    <div>
      <a
        href="/files/rungroj_rungsaranon_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        className="btn bg-green-600/80 backdrop-blur-xs cursor-pointer max-w-fit caret-transparent flex items-center gap-1 pointer-events-auto"
      >
        <span>Download Resume</span>
        <IoMdDownload />
      </a>
    </div>
  )
}
export default ResumeDownload
