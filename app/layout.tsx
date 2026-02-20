import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amit .dev | Web & App Developer',
  description: 'Portfolio of Amit Gupta - React JS & React Native Developer from Bhiwandi, India',
  keywords: 'React Developer, React Native, JavaScript, TypeScript, Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080c10] text-slate-200 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
