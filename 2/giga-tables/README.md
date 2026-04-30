# GigaTables

A production-ready, feature-rich datatable component for React with complete CRUD functionality.

## Features

- **Server-Side Data Loading**: Load data from configurable endpoints with pagination, sorting, and filtering
- **Rich Form Fields**: Support for text, textarea, rich text editor, date picker, file upload, select, checkbox, radio, range, and hidden fields
- **Chart Plugins**: Progress bars, pie charts, and trend charts directly in table columns
- **Full CRUD Operations**: Create, edit, and delete records with modal forms
- **Editor Buttons**: Configurable buttons with before/after hooks for custom logic
- **Global Search**: Search across all columns
- **Column Sorting**: Sort data by any column
- **Row Selection**: Single or multiple row selection
- **Theming**: Light/dark mode support with custom themes
- **Responsive Design**: Works on all screen sizes

## Project Structure

```
giga-tables/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components
│   │   │   ├── ProgressChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   └── index.ts
│   │   ├── form/            # Form field components
│   │   │   ├── TextField.tsx
│   │   │   ├── TextAreaField.tsx
│   │   │   ├── RichTextField.tsx
│   │   │   ├── NumberField.tsx
│   │   │   ├── RangeField.tsx
│   │   │   ├── DateField.tsx
│   │   │   ├── SelectField.tsx
│   │   │   ├── MultiSelectField.tsx
│   │   │   ├── CheckboxField.tsx
│   │   │   ├── RadioField.tsx
│   │   │   ├── FileField.tsx
│   │   │   ├── HiddenField.tsx
│   │   │   ├── FormField.tsx
│   │   │   └── index.ts
│   │   ├── GigaTable/       # Main table component
│   │   │   ├── GigaTable.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── context/              # React context
│   │   └── ThemeContext.tsx
│   ├── hooks/                # Custom hooks
│   │   └── useServerSideData.ts
│   ├── data/                 # Mock data
│   │   └── mockData.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html               # HTML template
├── package.json
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Styling
- **PrimeReact** - UI component library
- **Recharts** - Charting library
- **React Quill** - Rich text editor
- **React Router** - Routing
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Production Build

Build the library for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Basic Example

```tsx
import { GigaTable } from 'giga-tables';

const columns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    editor: {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  },
  {
    field: 'email',
    header: 'Email',
    sortable: true,
    editor: {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
  },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

function App() {
  return <GigaTable columns={columns} data={data} />;
}
```

### Server-Side Data Loading

```tsx
<GigaTable
  columns={columns}
  serverSide={{
    endpoint: 'https://api.example.com/users',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token',
    },
  }}
/>
```

### Custom Buttons with Hooks

```tsx
const buttons = [
  {
    type: 'create',
    label: 'Create',
    beforeHook: async () => {
      // Run before create
      return true; // Return false to cancel
    },
    afterHook: (result) => {
      // Run after create
      console.log('Created:', result);
    },
  },
  {
    type: 'custom',
    label: 'Export',
    icon: 'pi pi-download',
    onClick: (selectedRows) => {
      console.log('Exporting:', selectedRows);
    },
  },
];

<GigaTable columns={columns} data={data} buttons={buttons} />
```

### Chart Columns

```tsx
const columns = [
  {
    field: 'progress',
    header: 'Progress',
    chart: {
      type: 'progress',
      config: {
        color: '#0ea5e9',
        showLabel: true,
      },
    },
  },
  {
    field: 'skills',
    header: 'Skills',
    chart: {
      type: 'pie',
      config: {
        showLabel: false,
      },
    },
  },
  {
    field: 'trend',
    header: 'Trend',
    chart: {
      type: 'trend',
      config: {
        color: '#22c55e',
      },
    },
  },
];
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| columns | `ColumnConfig[]` | Column definitions | Required |
| data | `Record<string, unknown>[]` | Local data | `[]` |
| serverSide | `ServerSideConfig` | Server-side configuration | `undefined` |
| pageSize | `number` | Number of rows per page | `10` |
| pageSizeOptions | `number[]` | Available page sizes | `[5, 10, 20, 50]` |
| globalSearch | `boolean` | Enable global search | `true` |
| globalSearchPlaceholder | `string` | Search input placeholder | `'Search...'` |
| rowSelection | `boolean` | Enable row selection | `false` |
| selectionMode | `'single' \| 'multiple'` | Selection mode | `'multiple'` |
| stripedRows | `boolean` | Enable striped rows | `true` |
| showGridlines | `boolean` | Show grid lines | `true` |
| responsiveLayout | `'scroll' \| 'stack'` | Responsive layout mode | `'scroll'` |
| buttons | `EditorButton[]` | Custom buttons | `[]` |
| buttonPosition | `'top' \| 'bottom' \| 'both' \| 'none'` | Button position | `'top'` |
| editable | `boolean` | Enable edit/delete buttons | `true` |
| emptyMessage | `string` | Message when no data | `'No records found'` |

## Form Field Types

- `hidden` - Hidden input
- `text` - Text input
- `textarea` - Text area
- `richtext` - Rich text editor
- `number` - Number input
- `range` - Range slider
- `date` - Date picker
- `select` - Dropdown select
- `multiselect` - Multi-select dropdown
- `checkbox` - Checkbox
- `radio` - Radio buttons
- `file` - File upload
- `email` - Email input
- `password` - Password input

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
