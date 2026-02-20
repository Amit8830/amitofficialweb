# Amit .dev Portfolio

A full-featured, responsive portfolio website built with Next.js 14, Tailwind CSS, and canvas animations.

## 🚀 Features

- **Animated Star Background** - Canvas-based twinkling stars with floating particles
- **Typing Animation** - Multi-text typewriter effect in hero section
- **Glitch Text Effect** - CSS glitch animation on main headline
- **Timeline Resume** - Animated education & experience timeline
- **Animated Skill Bars** - Scroll-triggered skill progress bars
- **Project Gallery** - Filterable works grid
- **Space Dodge Game** - Fully playable browser game (keyboard + mobile touch controls)
- **Testimonials** - Quote cards section
- **Contact Form** - Full contact form with validation
- **Fully Responsive** - Works on mobile, tablet, and desktop

## 📦 Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎮 Game Controls

- **Arrow Left / A** – Move ship left
- **Arrow Right / D** – Move ship right  
- **Space / Arrow Up / W** – Shoot
- **Mobile** – On-screen buttons (shown during gameplay)

## 🎨 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **HTML5 Canvas** (Star background + Space Dodge game)
- **Framer Motion** (optional for future enhancements)
- **Google Fonts** – Syne + JetBrains Mono

## 📁 Project Structure

```
amit-portfolio/
├── app/
│   ├── globals.css       # Global styles & animations
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Main page composition
├── components/
│   ├── StarBackground.tsx  # Animated canvas background
│   ├── Navbar.tsx          # Responsive sticky navigation
│   ├── HeroSection.tsx     # Hero with gems, typing, CTA
│   ├── AboutSection.tsx    # About with stats
│   ├── ResumeSection.tsx   # Education & experience timeline
│   ├── SkillsSection.tsx   # Skill bars + tech stack
│   ├── WorksSection.tsx    # Filterable project gallery
│   ├── GameSection.tsx     # Space Dodge canvas game
│   ├── TestimonialsSection.tsx
│   ├── ContactSection.tsx  # Contact form
│   ├── Footer.tsx
│   └── SectionHeader.tsx   # Reusable section header
├── public/
│   └── resume.pdf          # Add your resume here
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🔧 Customization

1. Update personal info in each component (name, email, GitHub, etc.)
2. Replace project cards in `WorksSection.tsx` with real project data
3. Add your photo to `public/images/` and update `AboutSection.tsx`
4. Add resume PDF to `public/resume.pdf`
5. Update colors in `tailwind.config.js` and `globals.css`

## 📝 License

© 2026 Amit Gupta. All rights reserved.
