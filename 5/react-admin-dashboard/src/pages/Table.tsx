import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', date: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', date: '2024-01-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', date: '2024-01-25' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', date: '2024-02-01' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Editor', status: 'Active', date: '2024-02-05' },
  { id: 6, name: 'Eva Martinez', email: 'eva@example.com', role: 'Viewer', status: 'Inactive', date: '2024-02-10' },
  { id: 7, name: 'David Anderson', email: 'david@example.com', role: 'Editor', status: 'Active', date: '2024-02-15' },
  { id: 8, name: 'Sophia Taylor', email: 'sophia@example.com', role: 'Admin', status: 'Active', date: '2024-02-20' },
]

const statusBodyTemplate = (rowData: any) => {
  const severity = rowData.status === 'Active' ? 'success' : 'danger'
  return <Tag value={rowData.status} severity={severity} />
}

const actionBodyTemplate = () => {
  return (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm p-button-rounded p-button-outlined" />
      <Button icon="pi pi-trash" className="p-button-sm p-button-rounded p-button-outlined p-button-danger" />
    </div>
  )
}

const TablePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Data Table</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage and view your data</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">User List</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Showing {tableData.length} users</p>
          </div>
          <Button label="Add User" icon="pi pi-plus" className="bg-blue-500 hover:bg-blue-600" />
        </div>

        <DataTable
          value={tableData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          className="p-datatable-sm"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="id" header="ID" style={{ width: '4rem' }} />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column field="status" header="Status" body={statusBodyTemplate} />
          <Column field="date" header="Join Date" />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '8rem' }} />
        </DataTable>
      </div>
    </div>
  )
}

export default TablePage
