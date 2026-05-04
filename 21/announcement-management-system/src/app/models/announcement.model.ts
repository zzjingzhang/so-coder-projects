export enum AnnouncementLevel {
  PRODUCT = 'product',
  SYSTEM = 'system',
  MENU = 'menu'
}

export enum DeviceType {
  PC = 'pc',
  MOBILE = 'mobile',
  ALL = 'all'
}

export enum AnnouncementStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  EXPIRED = 'expired'
}

export interface Product {
  id: string;
  name: string;
  code: string;
  description?: string;
}

export interface System {
  id: string;
  name: string;
  code: string;
  productId: string;
  isMobile: boolean;
  description?: string;
}

export interface Menu {
  id: string;
  name: string;
  code: string;
  systemId: string;
  path: string;
  description?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  summary?: string;
  publishTime: Date;
  validFrom: Date;
  validTo: Date;
  level: AnnouncementLevel;
  deviceType: DeviceType;
  productId?: string;
  systemId?: string;
  menuId?: string;
  status: AnnouncementStatus;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  readCount: number;
  clickCount: number;
}

export interface AnnouncementQueryParams {
  title?: string;
  publishTimeFrom?: Date;
  publishTimeTo?: Date;
  level?: AnnouncementLevel;
  productId?: string;
  systemId?: string;
  menuId?: string;
  status?: AnnouncementStatus;
  page?: number;
  pageSize?: number;
}

export interface AnnouncementReadState {
  announcementId: string;
  userId: string;
  readAt: Date;
  deviceType: DeviceType;
}

export interface TrackingEvent {
  eventType: string;
  announcementId: string;
  userId: string;
  deviceType: DeviceType;
  timestamp: Date;
  pageUrl?: string;
  userAgent?: string;
}
