export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface StatCard {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
  trend: number[];
}

export interface DataTableItem {
  id: number;
  name: string;
  status: string;
  value: number;
  date: string;
  category: string;
}

export interface ActivityItem {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  time: string;
}

export interface GaugeData {
  value: number;
  max: number;
  label: string;
  color: string;
}
