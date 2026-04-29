# Ring Sizer

A responsive web application that helps users find their perfect ring size across multiple measurement systems (US, UK, Europe, Japan, and China).

## Features

- **Multiple Input Methods**: 
  - Enter finger circumference (mm)
  - Enter ring diameter (mm)
  - Select a known size from any measurement system

- **International Size Conversion**:
  - United States (US) - Number-based system (1-18)
  - United Kingdom (UK) - Letter-based system (A-Z, Z+1)
  - Europe (EU) - Circumference-based (44-72)
  - Japan (JP) - Number-based (1-30)
  - China (CN) - Number-based (1-30)

- **Visual Preview**: Interactive hand model with ring visualization

- **Responsive Design**: Works on desktop and mobile devices

- **Measurement Guide**: Step-by-step instructions for accurate finger measurement

## Technology Stack

- **Framework**: Angular 21.2.0 (Standalone Components)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.19
- **UI Components**: PrimeNG 21.1.6
- **Icons**: PrimeIcons 7.0.0
- **Routing**: Angular Router
- **Build Tool**: Angular CLI Application Builder

## Project Structure

```
ring-sizer/
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   └── ring-size.data.ts        # Ring size conversion data
│   │   ├── models/
│   │   │   └── ring-size.model.ts       # TypeScript interfaces and types
│   │   ├── services/
│   │   │   └── ring-size.service.ts     # Ring size conversion service
│   │   ├── ring-sizer/
│   │   │   ├── ring-sizer.component.ts  # Main component
│   │   │   ├── ring-sizer.component.html
│   │   │   └── ring-sizer.component.css
│   │   ├── app.ts                        # Root component
│   │   ├── app.config.ts                 # Application configuration
│   │   └── app.routes.ts                 # Route definitions
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## Installation

1. Navigate to the project directory:
```bash
cd ring-sizer
```

2. Install dependencies:
```bash
npm install
```

## Development Server

Run the development server:

```bash
npm run dev
```

or

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Key Components

### RingSizeService (`src/app/services/ring-size.service.ts`)

Provides ring size conversion functionality:
- `convertByCircumference(circumference: number)` - Convert using finger circumference
- `convertByDiameter(diameter: number)` - Convert using ring diameter
- `convertBySize(system: MeasurementSystem, size: string)` - Convert using known size
- `findClosestEntry(circumference: number)` - Find closest matching size entry
- `getAllData()` - Get complete size conversion data

### RingSizerComponent (`src/app/ring-sizer/`)

Main application component featuring:
- Three input modes (Circumference, Diameter, Known Size)
- Interactive size selection dropdowns
- Real-time conversion display
- Visual ring preview on hand SVG
- Measurement guide

## Measurement Systems

### United States (US)
- Range: 1 - 18 (including half sizes: 1.5, 2.5, etc.)

### United Kingdom (UK)
- Range: A - Z, Z+1

### Europe (EU)
- Range: 44 - 72 (based on internal circumference in mm)

### Japan (JP)
- Range: 1 - 30

### China (CN)
- Range: 1 - 30

## How to Use

1. **Choose Input Method**: Select from Circumference, Diameter, or Known Size
2. **Enter Measurement**: 
   - For Circumference: Measure around your finger and enter in mm
   - For Diameter: Enter the inner diameter of a ring that fits
   - For Known Size: Select your measurement system and known size
3. **View Results**: See equivalent sizes across all supported measurement systems
4. **Visual Preview**: Check the hand model to visualize ring size

## Measurement Tips

- Measure your finger at the end of the day when fingers are at their largest
- Measure multiple times for accuracy
- Consider the fit: ring should slide on with slight resistance
- If between sizes, consider going up half a size
- For wider bands (6mm+), you may need to go up a full size

## License

This project is for demonstration purposes.

## Contributing

This is a demonstration project. For issues or feature requests, please contact the project maintainer.
