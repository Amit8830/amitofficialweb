export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-800/50 bg-[#060a0e]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="font-mono font-bold text-xl">
            <span className="text-white">Amit</span>
            <span className="text-cyan-400"> .dev</span>
          </button>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {['Home', 'About', 'Resume', 'Skills', 'Works', 'Game', 'Contact'].map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-slate-500 text-sm hover:text-white transition-colors font-mono"
              >
                {l}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/50">
          <p className="text-slate-600 text-sm font-mono">
            © 2026 Amit Gupta. Built with ❤ &amp; React + Next.js
          </p>
        
        </div>
      </div>
    </footer>
  )
}
