import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { GigaTable } from './components/GigaTable';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { mockUsers, departments, roles, statusOptions } from './data/mockData';
import type { ColumnConfig, EditorButton } from './types';

const columns: ColumnConfig[] = [
  {
    field: 'avatar',
    header: 'Avatar',
    width: '80px',
    align: 'center',
    render: (value) => (
      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
        {value}
      </div>
    ),
  },
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    editor: {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter name',
      className: 'custom-name-field',
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
      placeholder: 'Enter email',
    },
  },
  {
    field: 'age',
    header: 'Age',
    sortable: true,
    align: 'center',
    editor: {
      name: 'age',
      label: 'Age',
      type: 'number',
      min: 18,
      max: 100,
    },
  },
  {
    field: 'department',
    header: 'Department',
    sortable: true,
    editor: {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: departments,
      required: true,
    },
  },
  {
    field: 'status',
    header: 'Status',
    sortable: true,
    align: 'center',
    render: (value) => (
      <span className={`giga-badge ${value === 'active' ? 'giga-badge-success' : 'giga-badge-warning'}`}>
        {value === 'active' ? 'Active' : 'Inactive'}
      </span>
    ),
    editor: {
      name: 'status',
      label: 'Status',
      type: 'radio',
      options: statusOptions,
    },
  },
  {
    field: 'progress',
    header: 'Progress',
    sortable: true,
    chart: {
      type: 'progress',
      config: {
        color: '#0ea5e9',
        showLabel: true,
        maxValue: 100,
      },
    },
    editor: {
      name: 'progress',
      label: 'Progress',
      type: 'range',
      min: 0,
      max: 100,
    },
  },
  {
    field: 'tasks',
    header: 'Weekly Tasks',
    chart: {
      type: 'trend',
      config: {
        color: '#22c55e',
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
];

const buttons: EditorButton[] = [
  {
    type: 'create',
    label: 'Create User',
    icon: 'pi pi-plus',
    beforeHook: async () => {
      console.log('Before create hook');
      return true;
    },
    afterHook: (result) => {
      console.log('After create hook:', result);
    },
  },
  {
    type: 'edit',
    beforeHook: async (data) => {
      console.log('Before edit hook:', data);
      return true;
    },
    afterHook: (result) => {
      console.log('After edit hook:', result);
    },
  },
  {
    type: 'delete',
    beforeHook: async (data) => {
      console.log('Before delete hook:', data);
      return window.confirm(`Are you sure you want to delete ${data?.name}?`);
    },
    afterHook: (result) => {
      console.log('After delete hook:', result);
    },
  },
  {
    type: 'custom',
    label: 'Export',
    icon: 'pi pi-download',
    className: 'p-button-secondary',
    onClick: (selectedRows) => {
      console.log('Exporting:', selectedRows);
      alert(`Exporting ${selectedRows?.length || 'all'} rows`);
    },
  },
];

function TableDemo() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            GigaTables Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A production-ready datatable with full CRUD functionality
          </p>
        </div>

        <GigaTable
          columns={columns}
          data={mockUsers}
          pageSize={5}
          pageSizeOptions={[5, 10, 20]}
          globalSearch={true}
          globalSearchPlaceholder="Search users..."
          rowSelection={true}
          selectionMode="multiple"
          stripedRows={true}
          showGridlines={true}
          responsiveLayout="scroll"
          buttons={buttons}
          buttonPosition="top"
          editable={true}
          onRowClick={(row) => console.log('Row clicked:', row)}
          onSelectionChange={(rows) => console.log('Selected:', rows)}
        />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to GigaTables
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A powerful, production-ready datatable component for React with full CRUD functionality.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="giga-card p-6">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Server-Side Loading</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Load data from configurable endpoints with pagination, sorting, and filtering.
            </p>
          </div>
          <div className="giga-card p-6">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-semibold mb-2">Rich Form Fields</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Support for text, textarea, rich text, date picker, file upload, and more.
            </p>
          </div>
          <div className="giga-card p-6">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2">Chart Plugins</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Progress bars, pie charts, and trend charts directly in table columns.
            </p>
          </div>
        </div>

        <Link to="/table">
          <Button 
            label="View Demo" 
            icon="pi pi-table" 
            className="p-button-primary text-lg px-8 py-3"
          />
        </Link>
      </div>
    </div>
  );
}

function AppContent() {
  const { setTheme, isDark } = useTheme();

  return (
    <Router>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary-600">
            GigaTables
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/table" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
            >
              Table Demo
            </Link>
            <Button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              icon={isDark ? 'pi pi-sun' : 'pi pi-moon'}
              label={isDark ? 'Light' : 'Dark'}
              className="p-button-text"
            />
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<TableDemo />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
