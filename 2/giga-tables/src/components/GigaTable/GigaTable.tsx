import React, { useState, useCallback, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import type { GigaTableProps, EditorButton, ButtonPosition } from '../../types';
import { FormField } from '../form';
import { ProgressChart, PieChart, TrendChart } from '../charts';

export const GigaTable: React.FC<GigaTableProps> = ({
  columns,
  data: initialData,
  serverSide,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  globalSearch = true,
  globalSearchPlaceholder = 'Search...',
  rowSelection = false,
  selectionMode = 'multiple',
  stripedRows = true,
  showGridlines = true,
  responsiveLayout = 'scroll',
  buttons = [],
  buttonPosition = 'top',
  editable = true,
  onEdit,
  onDelete,
  onRowClick,
  onSelectionChange,
  className = '',
  emptyMessage = 'No records found',
  loading: externalLoading,
}) => {
  const [data, setData] = useState<Record<string, unknown>[]>(initialData || []);
  const [totalRecords, setTotalRecords] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>([]);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<1 | -1 | undefined>(undefined);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const toastRef = React.useRef<Toast>(null);

  const fetchServerSideData = useCallback(async () => {
    if (!serverSide) return;

    setLoading(true);
    try {
      const params = {
        page,
        pageSize: currentPageSize,
        sortField,
        sortOrder,
        globalFilter: globalFilterValue || undefined,
      };

      const requestParams = serverSide.transformRequest
        ? serverSide.transformRequest(params)
        : params;

      const url = new URL(serverSide.endpoint);
      
      if (serverSide.method === 'GET' || !serverSide.method) {
        Object.entries(requestParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
        if (serverSide.params) {
          Object.entries(serverSide.params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
          });
        }
      }

      const response = await fetch(url.toString(), {
        method: serverSide.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...serverSide.headers,
        },
        body: serverSide.method === 'POST' ? JSON.stringify(requestParams) : undefined,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const jsonData = await response.json();
      const transformedData = serverSide.transformResponse
        ? serverSide.transformResponse(jsonData)
        : jsonData;

      setData(transformedData.data);
      setTotalRecords(transformedData.totalRecords);
    } catch (error) {
      if (serverSide.onError) {
        serverSide.onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [serverSide, page, currentPageSize, sortField, sortOrder, globalFilterValue]);

  useEffect(() => {
    if (serverSide) {
      fetchServerSideData();
    }
  }, [fetchServerSideData, serverSide]);

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilterValue(value);
    setPage(1);
  };

  const handlePageChange = (event: { first: number; rows: number }) => {
    setPage(Math.floor(event.first / event.rows) + 1);
    setCurrentPageSize(event.rows);
  };

  const handleSortChange = (event: { field: string; order: number }) => {
    setSortField(event.field);
    setSortOrder(event.order as 1 | -1);
  };

  const handleSelectionChange = (value: Record<string, unknown>[]) => {
    setSelectedRows(value);
    onSelectionChange?.(value);
  };

  const handleRowClick = (event: { data: Record<string, unknown>; index: number }) => {
    onRowClick?.(event.data, event.index);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const editableColumns = columns.filter(col => col.editor);

    editableColumns.forEach(col => {
      const editor = col.editor!;
      const value = formData[col.field];

      if (editor.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[col.field] = `${editor.label} is required`;
      }

      if (editor.customValidator) {
        const customError = editor.customValidator(value);
        if (customError) {
          errors[col.field] = customError;
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    const createButton = buttons.find(b => b.type === 'create');
    
    if (createButton?.beforeHook) {
      const proceed = await createButton.beforeHook();
      if (!proceed) return;
    }

    setDialogMode('create');
    const defaultFormData: Record<string, unknown> = {};
    columns.forEach(col => {
      if (col.editor) {
        defaultFormData[col.field] = col.editor.defaultValue ?? '';
      }
    });
    setFormData(defaultFormData);
    setFormErrors({});
    setDialogVisible(true);
  };

  const handleEdit = async (row: Record<string, unknown>) => {
    const editButton = buttons.find(b => b.type === 'edit');
    
    if (editButton?.beforeHook) {
      const proceed = await editButton.beforeHook(row);
      if (!proceed) return;
    }

    setDialogMode('edit');
    setFormData(row);
    setFormErrors({});
    setDialogVisible(true);
    onEdit?.(row);
  };

  const handleDelete = async (row: Record<string, unknown>) => {
    const deleteButton = buttons.find(b => b.type === 'delete');
    
    if (deleteButton?.beforeHook) {
      const proceed = await deleteButton.beforeHook(row);
      if (!proceed) return;
    }

    if (serverSide) {
      setLoading(true);
      try {
        const deleteEndpoint = `${serverSide.endpoint}/${row['id'] || row['_id']}`;
        const response = await fetch(deleteEndpoint, {
          method: 'DELETE',
          headers: serverSide.headers,
        });
        
        if (response.ok) {
          toastRef.current?.show({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Record deleted successfully' 
          });
          fetchServerSideData();
        }
      } catch (error) {
        toastRef.current?.show({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to delete record' 
        });
      } finally {
        setLoading(false);
      }
    } else {
      const newData = data.filter(r => r !== row);
      setData(newData);
      setTotalRecords(newData.length);
      toastRef.current?.show({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Record deleted successfully' 
      });
    }
    
    onDelete?.(row);
    if (deleteButton?.afterHook) {
      deleteButton.afterHook(row);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const buttonType = dialogMode === 'create' ? 'create' : 'edit';
    const actionButton = buttons.find(b => b.type === buttonType);

    if (serverSide) {
      setLoading(true);
      try {
        const method = dialogMode === 'create' ? 'POST' : 'PUT';
        const endpoint = dialogMode === 'create' 
          ? serverSide.endpoint 
          : `${serverSide.endpoint}/${formData['id'] || formData['_id']}`;

        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...serverSide.headers,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toastRef.current?.show({ 
            severity: 'success', 
            summary: 'Success', 
            detail: `Record ${dialogMode === 'create' ? 'created' : 'updated'} successfully` 
          });
          setDialogVisible(false);
          fetchServerSideData();
          
          if (actionButton?.afterHook) {
            actionButton.afterHook(formData);
          }
        }
      } catch (error) {
        toastRef.current?.show({ 
          severity: 'error', 
          summary: 'Error', 
          detail: `Failed to ${dialogMode === 'create' ? 'create' : 'update'} record` 
        });
      } finally {
        setLoading(false);
      }
    } else {
      if (dialogMode === 'create') {
        const newRecord = { ...formData, id: Date.now() };
        setData([...data, newRecord]);
        setTotalRecords(totalRecords + 1);
      } else {
        setData(data.map(r => r['id'] === formData['id'] ? formData : r));
      }
      setDialogVisible(false);
      toastRef.current?.show({ 
        severity: 'success', 
        summary: 'Success', 
        detail: `Record ${dialogMode === 'create' ? 'created' : 'updated'} successfully` 
      });
      
      if (actionButton?.afterHook) {
        actionButton.afterHook(formData);
      }
    }
  };

  const renderCell = (value: unknown, row: Record<string, unknown>, column: typeof columns[0]) => {
    if (column.render) {
      return column.render(value, row, data.indexOf(row));
    }

    if (column.chart) {
      const chartConfig = column.chart.config || {};
      switch (column.chart.type) {
        case 'progress':
          return (
            <ProgressChart
              value={Number(value) || 0}
              max={chartConfig.maxValue || 100}
              color={chartConfig.color}
              showLabel={chartConfig.showLabel}
              format={chartConfig.format}
            />
          );
        case 'pie':
          return (
            <PieChart
              data={value as Array<{ name: string; value: number; color?: string }> || []}
              width={80}
              height={80}
              showLegend={chartConfig.showLabel}
            />
          );
        case 'trend':
          return (
            <TrendChart
              data={value as Array<{ name: string; value: number }> || []}
              width={120}
              height={60}
              color={chartConfig.color}
            />
          );
        default:
          return value;
      }
    }

    return value;
  };

  const renderEditorButtons = (rowData: Record<string, unknown>) => {
    if (!editable) return null;

    return (
      <div className="flex gap-2">
        <Button
          label="Edit"
          size="small"
          severity="secondary"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          label="Del"
          size="small"
          severity="danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const actionColumn: typeof columns[0] = {
    field: 'actions',
    header: 'Actions',
    sortable: false,
    align: 'center',
    style: { width: '120px' },
    render: (_: unknown, row: Record<string, unknown>) => renderEditorButtons(row),
  };

  const visibleColumns = [...columns];
  if (editable) {
    visibleColumns.push(actionColumn);
  }

  const renderToolbarButtons = (position: ButtonPosition) => {
    const hasCreateButton = buttons.some(b => b.type === 'create');
    const showAtPosition = buttonPosition === position || buttonPosition === 'both';
    
    if (!showAtPosition) return null;

    return (
      <div className="flex gap-2">
        {hasCreateButton && (
          <Button
            icon="pi pi-plus"
            label="Create"
            className="p-button-primary"
            onClick={handleCreate}
          />
        )}
        {buttons.filter(b => b.type === 'custom').map((btn, index) => (
          <Button
            key={index}
            icon={btn.icon}
            label={btn.label}
            className={btn.className || 'p-button-secondary'}
            disabled={btn.disabled}
            onClick={() => btn.onClick?.(selectedRows)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`giga-card ${className}`}>
      <Toast ref={toastRef} />
      
      {buttonPosition !== 'bottom' && buttonPosition !== 'none' && (
        <Toolbar className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            {renderToolbarButtons('top')}
            {globalSearch && (
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  type="text"
                  value={globalFilterValue}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                  placeholder={globalSearchPlaceholder}
                  className="w-full sm:w-64"
                />
              </span>
            )}
          </div>
        </Toolbar>
      )}

      <DataTable
        value={data}
        paginator
        rows={currentPageSize}
        rowsPerPageOptions={pageSizeOptions}
        totalRecords={totalRecords}
        loading={loading || externalLoading}
        globalFilter={globalFilterValue}
        selection={selectedRows}
        selectionMode={rowSelection ? selectionMode : undefined}
        onSelectionChange={handleSelectionChange}
        onPage={handlePageChange}
        onSort={handleSortChange}
        onRowClick={handleRowClick}
        responsiveLayout={responsiveLayout}
        stripedRows={stripedRows}
        showGridlines={showGridlines}
        emptyMessage={emptyMessage}
        className="w-full"
      >
        {visibleColumns.map((column, index) => (
          <Column
            key={index}
            field={column.field}
            header={column.header}
            sortable={column.sortable !== false}
            filter={column.filter}
            style={column.style}
            className={column.className}
            align={column.align}
            body={(rowData: Record<string, unknown>) => 
              renderCell(rowData[column.field], rowData, column)
            }
          />
        ))}
      </DataTable>

      {buttonPosition !== 'top' && buttonPosition !== 'none' && (
        <Toolbar className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            {renderToolbarButtons('bottom')}
            {rowSelection && selectedRows.length > 0 && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.length} row(s) selected
              </span>
            )}
          </div>
        </Toolbar>
      )}

      <Dialog
        visible={dialogVisible}
        header={dialogMode === 'create' ? 'Create Record' : 'Edit Record'}
        modal
        className="w-full max-w-lg"
        onHide={() => setDialogVisible(false)}
      >
        <div className="p-4 space-y-4">
          {columns
            .filter(col => col.editor && !col.editor.hidden)
            .map(col => (
              <FormField
                key={col.field}
                config={col.editor!}
                value={formData[col.field]}
                onChange={(value) => setFormData(prev => ({ ...prev, [col.field]: value }))}
                error={formErrors[col.field]}
              />
            ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            label="Cancel"
            className="p-button-secondary"
            onClick={() => setDialogVisible(false)}
          />
          <Button
            label={dialogMode === 'create' ? 'Create' : 'Update'}
            className="p-button-primary"
            onClick={handleSave}
            loading={loading}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default GigaTable;
