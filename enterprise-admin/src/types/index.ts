export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  roleId: string;
  status: 'active' | 'inactive';
  createTime: string;
  lastLoginTime: string;
}

export interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  permissions: string[];
  menuPermissions: string[];
  buttonPermissions: string[];
  createTime: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button';
  parentId: string | null;
  path?: string;
  icon?: string;
  children?: Permission[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  stock: number;
  status: 'on' | 'off';
  description: string;
  images: string[];
  createTime: string;
  updateTime: string;
}

export interface Order {
  id: string;
  orderNo: string;
  userId: string;
  username: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
  createTime: string;
  payTime?: string;
  shipTime?: string;
  completeTime?: string;
  cancelTime?: string;
  refundTime?: string;
  address: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    detail: string;
  };
  items: OrderItem[];
  logistics?: Logistics[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Logistics {
  id: string;
  orderId: string;
  courier: string;
  trackingNo: string;
  status: 'pending' | 'shipping' | 'delivered';
  createTime: string;
  traces: LogisticsTrace[];
}

export interface LogisticsTrace {
  time: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  createTime: string;
  updateTime: string;
  publishTime?: string;
  scheduledTime?: string;
  viewCount: number;
}

export interface SystemLog {
  id: string;
  type: 'operation' | 'login' | 'api';
  userId: string;
  username: string;
  action: string;
  module: string;
  ip: string;
  userAgent: string;
  status: 'success' | 'fail';
  errorMessage?: string;
  createTime: string;
  duration?: number;
  requestUrl?: string;
  requestMethod?: string;
  requestParams?: string;
  responseData?: string;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  updateTime: string;
}

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

export interface DashboardStat {
  key: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

export interface TrendData {
  name: string;
  value: number;
  value2?: number;
}
