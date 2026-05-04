import { Injectable } from '@angular/core';
import { Product, System, Menu, Announcement, AnnouncementLevel, DeviceType, AnnouncementStatus } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getProducts(): Product[] {
    return [
      { id: 'p1', name: '大麦', code: 'damai', description: '大麦电商平台' },
      { id: 'p2', name: 'BI', code: 'bi', description: '商业智能平台' },
      { id: 'p3', name: '丽晟', code: 'lisheng', description: '丽晟管理系统' },
      { id: 'p4', name: '百维', code: 'baiwei', description: '百维业务系统' }
    ];
  }

  getSystems(): System[] {
    return [
      { id: 's1', name: '大麦电商版', code: 'damai-ec', productId: 'p1', isMobile: false, description: 'PC端电商管理' },
      { id: 's2', name: '大麦零售版', code: 'damai-retail', productId: 'p1', isMobile: false, description: 'PC端零售管理' },
      { id: 's3', name: '大麦移动端', code: 'damai-mobile', productId: 'p1', isMobile: true, description: '移动端应用' },
      { id: 's4', name: '零售BI', code: 'retail-bi', productId: 'p2', isMobile: false, description: '零售数据分析' },
      { id: 's5', name: '百图-科技中心项目大屏', code: 'baitu-dashboard', productId: 'p2', isMobile: false, description: '数据大屏展示' },
      { id: 's6', name: '丽晟-OTB', code: 'lisheng-otb', productId: 'p3', isMobile: false, description: 'OTB管理系统' },
      { id: 's7', name: '丽选', code: 'lixuan', productId: 'p3', isMobile: true, description: '丽选移动应用' },
      { id: 's8', name: '百维-业财版', code: 'baiwei-finance', productId: 'p4', isMobile: false, description: '业财一体化' },
      { id: 's9', name: '百观-报告中心', code: 'baiguan-report', productId: 'p2', isMobile: false, description: '报告管理中心' }
    ];
  }

  getMenus(): Menu[] {
    return [
      { id: 'm1', name: '实时数据', code: 'realtime-data', systemId: 's2', path: '/retail/realtime', description: '零售实时数据监控' },
      { id: 'm2', name: '销售报表', code: 'sales-report', systemId: 's2', path: '/retail/sales', description: '销售数据分析报表' },
      { id: 'm3', name: '库存管理', code: 'inventory', systemId: 's1', path: '/ec/inventory', description: '电商库存管理' },
      { id: 'm4', name: '订单管理', code: 'orders', systemId: 's1', path: '/ec/orders', description: '电商订单管理' },
      { id: 'm5', name: '我的商品', code: 'my-products', systemId: 's9', path: '/report/products', description: '我的商品分析' },
      { id: 'm6', name: '数据概览', code: 'overview', systemId: 's4', path: '/bi/overview', description: '零售BI数据概览' },
      { id: 'm7', name: 'OTB计划', code: 'otb-plan', systemId: 's6', path: '/otb/plan', description: 'OTB计划管理' },
      { id: 'm8', name: '财务报表', code: 'finance-report', systemId: 's8', path: '/finance/report', description: '财务报表分析' }
    ];
  }

  getSystemsByProduct(productId: string): System[] {
    return this.getSystems().filter(s => s.productId === productId);
  }

  getMenusBySystem(systemId: string): Menu[] {
    return this.getMenus().filter(m => m.systemId === systemId);
  }

  getMockAnnouncements(): Announcement[] {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    return [
      {
        id: 'a1',
        title: '系统升级通知',
        content: '<p>尊敬的用户：</p><p>为了提供更好的服务体验，我们将于本周六凌晨2:00-4:00进行系统升级维护。</p><p>升级期间系统将暂停服务，请您提前做好相关工作安排。</p><p>感谢您的理解与支持！</p>',
        summary: '系统将于本周六凌晨2:00-4:00进行升级维护',
        publishTime: yesterday,
        validFrom: yesterday,
        validTo: nextWeek,
        level: AnnouncementLevel.PRODUCT,
        deviceType: DeviceType.ALL,
        productId: 'p1',
        status: AnnouncementStatus.PUBLISHED,
        createdBy: 'admin',
        createdAt: yesterday,
        readCount: 156,
        clickCount: 89
      },
      {
        id: 'a2',
        title: '新功能上线：数据导出优化',
        content: '<p>亲爱的用户：</p><p>我们很高兴地宣布，数据导出功能已完成优化升级！</p><ul><li>导出速度提升50%</li><li>支持多种格式导出（Excel、CSV、PDF）</li><li>增加导出进度显示</li></ul><p>欢迎体验新功能，如有问题请联系客服。</p>',
        summary: '数据导出功能优化升级，支持多种格式',
        publishTime: lastWeek,
        validFrom: lastWeek,
        validTo: new Date(now.setMonth(now.getMonth() + 1)),
        level: AnnouncementLevel.SYSTEM,
        deviceType: DeviceType.PC,
        systemId: 's4',
        status: AnnouncementStatus.PUBLISHED,
        createdBy: 'admin',
        createdAt: lastWeek,
        readCount: 234,
        clickCount: 156
      },
      {
        id: 'a3',
        title: '实时数据模块维护通知',
        content: '<p>各位用户：</p><p>实时数据模块将于今日18:00-19:00进行例行维护。</p><p>维护期间实时数据更新可能会有延迟，历史数据查询不受影响。</p><p>给您带来的不便敬请谅解。</p>',
        summary: '实时数据模块今日18:00-19:00维护',
        publishTime: now,
        validFrom: now,
        validTo: tomorrow,
        level: AnnouncementLevel.MENU,
        deviceType: DeviceType.ALL,
        systemId: 's2',
        menuId: 'm1',
        status: AnnouncementStatus.PUBLISHED,
        createdBy: 'operator',
        createdAt: now,
        readCount: 45,
        clickCount: 23
      },
      {
        id: 'a4',
        title: '移动端版本更新公告',
        content: '<p>亲爱的移动端用户：</p><p>大麦移动端APP已发布新版本v2.5.0，主要更新内容：</p><ul><li>优化首页加载速度</li><li>新增消息推送功能</li><li>修复已知问题</li></ul><p>请前往应用商店下载更新，体验更好的服务。</p>',
        summary: '移动端APP v2.5.0版本发布',
        publishTime: lastWeek,
        validFrom: lastWeek,
        validTo: nextWeek,
        level: AnnouncementLevel.PRODUCT,
        deviceType: DeviceType.MOBILE,
        productId: 'p1',
        status: AnnouncementStatus.PUBLISHED,
        createdBy: 'admin',
        createdAt: lastWeek,
        readCount: 892,
        clickCount: 567
      },
      {
        id: 'a5',
        title: '财务报表模块培训通知',
        content: '<p>各位同事：</p><p>为帮助大家更好地使用财务报表模块，我们将于下周三下午14:00-16:00组织线上培训。</p><p>培训内容包括：</p><ul><li>新报表功能介绍</li><li>高级筛选技巧</li><li>自定义报表制作</li></ul><p>请提前10分钟进入线上会议室。</p>',
        summary: '财务报表模块培训下周三下午举行',
        publishTime: yesterday,
        validFrom: yesterday,
        validTo: new Date(now.setDate(now.getDate() + 5)),
        level: AnnouncementLevel.MENU,
        deviceType: DeviceType.PC,
        systemId: 's8',
        menuId: 'm8',
        status: AnnouncementStatus.PUBLISHED,
        createdBy: 'trainer',
        createdAt: yesterday,
        readCount: 78,
        clickCount: 45
      }
    ];
  }
}
