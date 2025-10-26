import { FaCircle } from 'react-icons/fa'

const ProjectStatusBar = ({ stage }) => {
  return (
    <div className="absolute flex items-center gap-1 liquid-glass bg-white/40 left-4 top-4 py-2 px-4 font-semibold rounded-full">
      <span>
        {stage === 'Completed' ? (
          <FaCircle className="text-green-500" />
        ) : (
          <FaCircle className="animate-pulse text-yellow-400" />
        )}
      </span>
      <span>{stage}</span>
    </div>
  )
}
export default ProjectStatusBar
