export type FieldType = 
  | 'hidden' 
  | 'text' 
  | 'textarea' 
  | 'richtext' 
  | 'number' 
  | 'range' 
  | 'date' 
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'radio'
  | 'file'
  | 'email'
  | 'password';

export type ChartType = 'progress' | 'pie' | 'trend';

export type ButtonPosition = 'top' | 'bottom' | 'both' | 'none';

export type ButtonType = 'create' | 'edit' | 'delete' | 'custom';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  options?: Array<{ label: string; value: string | number | boolean }>;
  min?: number;
  max?: number;
  step?: number;
  format?: string;
  accept?: string;
  multiple?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  customValidator?: (value: unknown) => string | null;
}

export interface ColumnConfig {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  width?: string;
  hidden?: boolean;
  style?: React.CSSProperties;
  className?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>, rowIndex: number) => React.ReactNode;
  chart?: {
    type: ChartType;
    config?: ChartConfig;
  };
  editor?: FieldConfig;
}

export interface ChartConfig {
  dataKey?: string;
  color?: string;
  showLabel?: boolean;
  maxValue?: number;
  format?: (value: number) => string;
}

export interface EditorButton {
  type: ButtonType;
  label?: string;
  icon?: string;
  className?: string;
  disabled?: boolean;
  position?: ButtonPosition;
  beforeHook?: (data?: Record<string, unknown>) => Promise<boolean> | boolean;
  afterHook?: (result: unknown) => void;
  onClick?: (selectedRows?: Record<string, unknown>[]) => void;
}

export interface ServerSideConfig {
  endpoint: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  transformRequest?: (params: ServerSideParams) => Record<string, unknown>;
  transformResponse?: (response: unknown) => ServerSideResponse;
  onError?: (error: unknown) => void;
}

export interface ServerSideParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 1 | -1;
  globalFilter?: string;
  filters?: Record<string, unknown>;
}

export interface ServerSideResponse {
  data: Record<string, unknown>[];
  totalRecords: number;
}

export interface ThemeConfig {
  primary?: string;
  secondary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  text?: string;
  textSecondary?: string;
  background?: string;
  backgroundSecondary?: string;
  border?: string;
}

export interface GigaTableProps {
  columns: ColumnConfig[];
  data?: Record<string, unknown>[];
  serverSide?: ServerSideConfig;
  pageSize?: number;
  pageSizeOptions?: number[];
  globalSearch?: boolean;
  globalSearchPlaceholder?: string;
  rowSelection?: boolean;
  selectionMode?: 'single' | 'multiple';
  stripedRows?: boolean;
  showGridlines?: boolean;
  responsiveLayout?: 'scroll' | 'stack';
  theme?: 'light' | 'dark' | ThemeConfig;
  buttons?: EditorButton[];
  buttonPosition?: ButtonPosition;
  editable?: boolean;
  onEdit?: (row: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onRowClick?: (row: Record<string, unknown>, rowIndex: number) => void;
  onSelectionChange?: (selectedRows: Record<string, unknown>[]) => void;
  onPageChange?: (page: number) => void;
  onSortChange?: (field: string, order: 1 | -1) => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  className?: string;
  style?: React.CSSProperties;
  emptyMessage?: string;
  loading?: boolean;
}

export interface FormFieldProps {
  config: FieldConfig;
  value?: unknown;
  onChange?: (value: unknown) => void;
  error?: string;
  disabled?: boolean;
}

export interface ProgressChartProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  format?: (value: number) => string;
  className?: string;
}

export interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  className?: string;
}

export interface TrendChartProps {
  data: Array<{ name: string; value: number }>;
  width?: number;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export interface GigaTablesContextType {
  theme: ThemeConfig;
  setTheme: (theme: 'light' | 'dark' | ThemeConfig) => void;
  isDark: boolean;
}
