# React Admin Dashboard

A modern, feature-rich admin dashboard built with React, TypeScript, Tailwind CSS, and PrimeReact.

## Features

- 📊 **Data Visualization**: Charts and graphs powered by Recharts
- 📅 **Calendar**: Interactive calendar component
- 📋 **Data Table**: Sortable, paginated data tables
- 📝 **Forms**: Form handling with Formik and Yup validation
- 🎨 **Theme Support**: Dark/light theme toggle
- 🔐 **Authentication**: Basic auth flow with Zustand state management
- 📱 **Responsive Design**: Works on all screen sizes
- 🚀 **PWA Ready**: Progressive Web App support

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: PrimeReact
- **Routing**: React Router v6
- **State Management**: Zustand
- **Charts**: Recharts
- **Forms**: Formik + Yup
- **Build Tool**: Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Development build
npm run build

# Production build
npm run build:prod

# Staging build
npm run build:staging
```

### Preview Production Build

```bash
npm run preview
```

### Lint & Format

```bash
npm run lint
npm run format
```

## Project Structure

```
react-admin-dashboard/
├── public/
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Charts.tsx
│   │   ├── Calendar.tsx
│   │   ├── Table.tsx
│   │   ├── Forms.tsx
│   │   ├── Icons.tsx
│   │   └── Login.tsx
│   ├── store/
│   │   └── appStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_ENV=development
```

## Authentication

The app includes a basic authentication system. Any email and password (min 6 chars) will work for demo purposes.

## License

MIT
