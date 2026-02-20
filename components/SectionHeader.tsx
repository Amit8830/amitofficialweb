interface SectionHeaderProps {
  title: string
  highlight: string
  comment: string
}

export default function SectionHeader({ title, highlight, comment }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="w-12 h-0.5 bg-cyan-400 mb-6"></div>
      <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">
        <span className="text-white">{title} </span>
        <span className="text-cyan-400">{highlight}</span>
      </h2>
      <p className="text-slate-500 font-mono text-sm tracking-wider">
        <span className="text-slate-600">{'// '}</span>
        {comment}
      </p>
    </div>
  )
}

