import Image from 'next/image'

export default function Project({ img, name, description, stack, link }) {
  return (
    <div className="group w-fit max-w-3xl rounded-4xl bg-white/60 backdrop-blur-sm overflow-hidden">
      <div className="group-hover:scale-150 group-hover:translate-y-22 transition-all duration-500">
        <Image
          src={`/${img}`}
          width={500}
          height={500}
          alt={img}
          className="w-full h-full"
        />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3 drop-shadow-lg">{name}</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/25 backdrop-blur-sm text-white border border-white/40 hover:bg-white/35 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-6 opacity-0  transition-all duration-500 delay-300 transform -translate-y-4 ">
          <button className="bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-full text-sm font-medium border border-white/40 transition-colors duration-200 shadow-lg">
            View Project →
          </button>
        </div>
      </div>

      {/* Content - fades out completely on hover */}
      <div className="p-6  transition-all duration-400">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
