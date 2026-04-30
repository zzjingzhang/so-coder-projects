# Animated Components Demo
A beautiful animation demonstration of modern React application showcasing various UI animations built with Framer Motion, Tailwind CSS, and React Router.

## Features

### 🎬 Demo Pages

1. **Home Page** - Navigation to all animation demos with animated entry cards
2. **Button States** - Custom button with idle, loading, success, and error states with smooth transitions
3. **Page Transitions** - Expandable TV show cards with animated layout changes
4. **Heart Animation** - Interactive heart with scale, bounce, ripple, and particle effects
5. **Scroll Animations** - List of TV shows with scroll-triggered animations
6. **TV Show Detail** - Parallax scrolling with collapsing title image and animated navigation
7. **SVG Animations** - Hamburger menu morphing into close icon

### 🎨 Animation Features

- **Button Animations**: Color transitions, loading spinner rotation, success scale animation, error shake animation
- **Page Transitions**: Layout animations, image scaling, content staggered animations
- **Heart Effects**: Bounce scale, ripple expansion, particle explosions, ripple circles
- **Scroll Animations**: Viewport-triggered fade-in, staggered delays
- **SVG Morphing**: Path animations, draw effects, rotate transforms
- **Parallax Scrolling**: Scroll progress tracking, value transforms

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Next generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

## Project Structure

```
animated-components-demo/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Page.tsx              # Wrapper with navigation
│   │   ├── AnimatedButton.tsx    # Animated button with states
│   │   ├── LogoTitle.tsx       # Title component
│   │   ├── NextEpisodeBadge.tsx
│   │   └── TvShowCard.tsx
│   ├── data/
│   │   └── tvShowsData.ts      # TV show data
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ButtonDemo.tsx
│   │   ├── PageTransitionDemo.tsx
│   │   ├── HeartDemo.tsx
│   │   ├── ScrollAnimationDemo.tsx
│   │   ├── TvShowDetail.tsx
│   │   └── SvgDemo.tsx
│   ├── styles/
│   │   └── theme.ts         # Theme configuration
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── tsconfig.json
```

## Getting Started

### Installation

```bash
cd animated-components-demo
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to the local development URL shown in your terminal.

### Build

```bash
npm run build
```

## License

MIT
