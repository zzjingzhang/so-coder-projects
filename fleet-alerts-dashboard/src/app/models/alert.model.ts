export enum AlertType {
  CRITICAL = 'critical',
  ATTENTION = 'attention',
  INFORMATIONAL = 'informational'
}

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  context: string;
  details: string;
  timestamp: Date;
  isRead: boolean;
}
