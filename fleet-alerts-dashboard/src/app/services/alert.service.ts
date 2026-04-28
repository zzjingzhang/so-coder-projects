import { Injectable } from '@angular/core';
import { Alert, AlertType } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts: Alert[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const now = new Date();
    
    this.alerts = [
      {
        id: '1',
        type: AlertType.CRITICAL,
        title: '检测到严重碰撞',
        context: '车辆 #VH-782 • 驾驶员：张伟',
        details: '在 18 区附近的 37 号高速公路上检测到撞击',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 35),
        isRead: false
      },
      {
        id: '2',
        type: AlertType.CRITICAL,
        title: '检测到反复超速',
        context: '车辆 #VH-456 • 驾驶员：李明',
        details: '速度多次突破 95 英里/小时',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 20),
        isRead: false
      },
      {
        id: '3',
        type: AlertType.CRITICAL,
        title: '车辆设备离线',
        context: '车辆 #VH-912',
        details: '设备离线超过 6 小时，最后位置未知',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 45),
        isRead: false
      },
      {
        id: '4',
        type: AlertType.CRITICAL,
        title: '驾驶员分数进入不良类别',
        context: '驾驶员：王芳 • 车队：华东区',
        details: '连续 3 周分数低于 60 分',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 16, 10),
        isRead: true
      },
      
      {
        id: '5',
        type: AlertType.ATTENTION,
        title: '提交验证文件',
        context: '驾驶员：赵强 • 文件类型：驾驶证',
        details: '驾驶证即将过期，请提交新的验证文件',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 5),
        isRead: false
      },
      {
        id: '6',
        type: AlertType.ATTENTION,
        title: '车辆保养到期',
        context: '车辆 #VH-324 • 保养类型：常规检查',
        details: '已超过建议保养日期 5 天',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30),
        isRead: false
      },
      {
        id: '7',
        type: AlertType.ATTENTION,
        title: '未分配的行程已完成',
        context: '行程 #TR-9876 • 车辆 #VH-156',
        details: '行程已完成但未分配给驾驶员，请查看详情',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 15),
        isRead: false
      },
      {
        id: '8',
        type: AlertType.ATTENTION,
        title: '车辆得分低于车队中位数',
        context: '车辆 #VH-643 • 车队平均：78 分',
        details: '当前得分：62 分，已连续 2 周低于中位数',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 9, 45),
        isRead: false
      },
      {
        id: '9',
        type: AlertType.ATTENTION,
        title: '驾驶员得分低于中位数',
        context: '驾驶员：刘洋 • 车队平均：75 分',
        details: '当前得分：68 分，请关注驾驶行为',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 20),
        isRead: true
      },
      {
        id: '10',
        type: AlertType.ATTENTION,
        title: '机队得分进入较差类别',
        context: '车队：西南区 • 公司平均：72 分',
        details: '车队平均得分：61 分，已进入较差类别',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 11, 30),
        isRead: true
      },
      {
        id: '11',
        type: AlertType.ATTENTION,
        title: '设备连接不稳定',
        context: '车辆 #VH-889',
        details: '过去 24 小时内连接中断 5 次',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 16, 10),
        isRead: true
      },
      {
        id: '12',
        type: AlertType.ATTENTION,
        title: '文档即将过期',
        context: '车辆 #VH-234 • 文档类型：保险',
        details: '保险文件将在 7 天后过期',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 8, 50),
        isRead: true
      },
      
      {
        id: '13',
        type: AlertType.INFORMATIONAL,
        title: '新司机上任',
        context: '驾驶员：陈晓 • 入职日期：今天',
        details: '已分配到华东区车队',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
        isRead: false
      },
      {
        id: '14',
        type: AlertType.INFORMATIONAL,
        title: '分配给驾驶员的车辆',
        context: '车辆 #VH-567 • 驾驶员：王芳',
        details: '已分配为主要车辆',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30),
        isRead: false
      },
      {
        id: '15',
        type: AlertType.INFORMATIONAL,
        title: '新增车辆',
        context: '车辆 #VH-999 • 类型：冷藏车',
        details: '已注册并加入车队',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 10, 15),
        isRead: true
      },
      {
        id: '16',
        type: AlertType.INFORMATIONAL,
        title: '资产已删除',
        context: '车辆 #VH-123 • 已退役',
        details: '已从活跃车辆列表中移除',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 15, 45),
        isRead: true
      },
      {
        id: '17',
        type: AlertType.INFORMATIONAL,
        title: '舰队得分每周更新',
        context: '公司平均：74 分',
        details: '本周得分较上周上升 2 分',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 7, 0),
        isRead: true
      },
      {
        id: '18',
        type: AlertType.INFORMATIONAL,
        title: 'FM 加入通知',
        context: '车队经理：周杰 • 部门：运营部',
        details: '已加入系统并分配到华北区',
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 14, 20),
        isRead: true
      }
    ];
  }

  getAlerts(): Alert[] {
    return [...this.alerts];
  }

  getAlertById(id: string): Alert | undefined {
    return this.alerts.find(a => a.id === id);
  }

  markAsRead(id: string): void {
    const alert = this.getAlertById(id);
    if (alert) {
      alert.isRead = true;
    }
  }

  markAsUnread(id: string): void {
    const alert = this.getAlertById(id);
    if (alert) {
      alert.isRead = false;
    }
  }

  markAllAsRead(): void {
    this.alerts.forEach(alert => {
      alert.isRead = true;
    });
  }
}
