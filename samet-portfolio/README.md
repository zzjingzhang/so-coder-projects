# Samet Soysal - Personal Portfolio

A modern, responsive personal portfolio website built with React, Vite, and TypeScript. Features glassmorphism design, multi-language support, dark mode, and real-time statistics tracking.

## 🚀 Features

- **Glassmorphism Design**: Modern UI with glassy effects and gradient backgrounds
- **Multi-language Support**: English and Turkish language switching
- **Dark/Light Mode**: Theme toggle with smooth transitions
- **Real-time Statistics**:
  - Visitor counter (total and daily)
  - Resume views and downloads tracking (per language)
  - Project links click tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Sections**: Hero, About, Experience, Projects, Skills, Contact
- **404 Page**: Custom error page with animated background

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS 4, CSS
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting

## 📁 Project Structure

```
samet-portfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── AboutSection.tsx       # About me section
│   │   ├── ContactSection.tsx     # Contact form section
│   │   ├── ExperienceSection.tsx  # Work experience timeline
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Header.tsx             # Navigation header
│   │   ├── HeroSection.tsx        # Hero section with resume buttons
│   │   ├── NotFoundPage.tsx       # 404 error page
│   │   ├── ProjectsSection.tsx    # Projects grid with click tracking
│   │   ├── SkillsSection.tsx      # Skills with category filtering
│   │   └── VisitorCounter.tsx     # Visitor count display
│   ├── contexts/
│   │   ├── LanguageContext.tsx    # Language switching context
│   │   ├── StatsContext.tsx       # Statistics tracking context
│   │   └── ThemeContext.tsx       # Dark/Light mode context
│   ├── data/
│   │   ├── projects.ts            # Projects data
│   │   ├── skills.ts              # Skills data
│   │   └── translations.ts        # i18n translations (EN/TR)
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.css
│   ├── App.tsx                    # Main app component
│   ├── index.css                  # Global styles with glassmorphism
│   └── main.tsx                   # Application entry point
├── 404.html                       # Static 404 page for deployment
├── .firebaserc                    # Firebase project configuration
├── .gitignore                     # Git ignore rules
├── firebase.json                  # Firebase hosting configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.app.json              # TypeScript app config
├── tsconfig.json                  # TypeScript root config
├── tsconfig.node.json             # TypeScript node config
└── vite.config.ts                 # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or yarn or pnpm

### Installation

1. **Navigate to the project directory**:
```bash
cd samet-portfolio
```

2. **Install dependencies**:
```bash
npm install
```

### Development

**Start the development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5176` (or the next available port).

### Build

**Build for production**:
```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview

**Preview the production build**:
```bash
npm run preview
```

### Linting

**Run ESLint**:
```bash
npm run lint
```

## 🌐 Deployment

### Firebase Hosting

1. **Install Firebase CLI** (if not already installed):
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase** (if first time):
```bash
firebase init hosting
```
- Select "Use an existing project" or create a new one
- Set `dist` as the public directory
- Configure as a single-page app (rewrite all URLs to index.html)
- Do NOT overwrite existing files

4. **Deploy**:
```bash
npm run build
firebase deploy
```

### Alternative Deployment Options

The project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag & drop the `dist` folder or connect Git
- **Cloudflare Pages**: Deploy from Git repository
- **GitHub Pages**: Build and deploy to `gh-pages` branch

## 📝 Configuration

### Language Switching

Languages are configured in `src/data/translations.ts`. Currently supported:
- English (`en`)
- Turkish (`tr`)

To add a new language:
1. Add translations to `translations.ts`
2. Update the language toggle in `Header.tsx`

### Theme Configuration

The theme (dark/light mode) is managed by `ThemeContext.tsx`:
- Defaults to system preference
- Saves preference to localStorage
- Uses `dark` class on `html` element

### Statistics Tracking

All statistics are stored in `localStorage`:
- **Visitors**: Total count and daily count (resets each day)
- **Resume**: Views and downloads tracked separately for each language
- **Projects**: Click counts for each project link

To use a backend for persistent stats:
1. Modify `StatsContext.tsx` to use API calls instead of localStorage
2. Add a backend service (Firebase Firestore, Supabase, etc.)

## 🎨 Design Features

### Glassmorphism

Implemented using CSS with:
- `backdrop-filter: blur()` for frosted glass effect
- Semi-transparent backgrounds (`rgba(255, 255, 255, 0.05)`)
- Subtle borders (`rgba(255, 255, 255, 0.1)`)

### Gradients

- **Background**: Dark gradient by default (`#1a1a2e` → `#16213e` → `#0f3460`)
- **Accent**: Blue → Purple → Pink gradient for text and buttons
- **Animations**: Rotating radial gradients and floating particles

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

## 👤 Author

**Samet Soysal**
- GitHub: [@sametsoysal](https://github.com/sametsoysal)
- LinkedIn: [Samet Soysal](https://linkedin.com/in/sametsoysal)
- Website: [sametsoysal.com](https://sametsoysal.com)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://react.dev/) - The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- Inspired by modern glassmorphism design trends

---

⭐ If you found this project helpful, please give it a star!
