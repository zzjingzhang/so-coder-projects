import Mock from 'mockjs';
import type { User, Role, Product, Order, Article, SystemLog, SystemConfig } from '../types';

const Random = Mock.Random;

export const generateMockUsers = (count: number): User[] => {
  return Mock.mock({
    [`list|${count}`]: [
      {
        'id|+1': 1,
        username: '@first',
        email: '@email',
        phone: /^1[3-9]\d{9}$/,
        avatar: () => Random.image('100x100', Random.color(), Random.character()),
        'role|1': ['管理员', '编辑', '普通用户', '访客'],
        'roleId|1': ['admin', 'editor', 'user', 'guest'],
        'status|1': ['active', 'inactive'],
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        lastLoginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  }).list;
};

export const generateMockRoles = (): Role[] => {
  return [
    {
      id: '1',
      name: '超级管理员',
      code: 'admin',
      description: '拥有系统所有权限',
      status: 'active',
      permissions: ['*'],
      menuPermissions: ['*'],
      buttonPermissions: ['*'],
      createTime: '2024-01-01 00:00:00',
    },
    {
      id: '2',
      name: '管理员',
      code: 'manager',
      description: '拥有大部分管理权限',
      status: 'active',
      permissions: ['dashboard', 'users', 'products', 'orders', 'content'],
      menuPermissions: ['dashboard', 'users', 'products', 'orders', 'content'],
      buttonPermissions: ['users:view', 'users:add', 'users:edit', 'products:view'],
      createTime: '2024-01-02 00:00:00',
    },
    {
      id: '3',
      name: '编辑',
      code: 'editor',
      description: '内容编辑权限',
      status: 'active',
      permissions: ['dashboard', 'content'],
      menuPermissions: ['dashboard', 'content'],
      buttonPermissions: ['content:view', 'content:add', 'content:edit'],
      createTime: '2024-01-03 00:00:00',
    },
    {
      id: '4',
      name: '普通用户',
      code: 'user',
      description: '仅查看权限',
      status: 'active',
      permissions: ['dashboard'],
      menuPermissions: ['dashboard'],
      buttonPermissions: [],
      createTime: '2024-01-04 00:00:00',
    },
  ];
};

export const generateMockProducts = (count: number): Product[] => {
  const categories = ['电子产品', '服装', '家居', '美妆', '食品', '运动', '图书'];
  return Mock.mock({
    [`list|${count}`]: [
      {
        'id|+1': 1000,
        name: () => {
          const productNames = ['智能手机', '笔记本电脑', '平板电脑', '智能手表', '蓝牙耳机', '相机', '游戏机', '电视', '冰箱', '洗衣机', '空调', '微波炉', '烤箱', '空气净化器', '净水器'];
          return productNames[Math.floor(Math.random() * productNames.length)] + ' Pro';
        },
        'category|1': categories,
        categoryId: () => 'cat_' + Math.floor(Math.random() * 7),
        'price|100-10000': 1,
        'originalPrice|100-10000': 1,
        'stock|0-1000': 1,
        'status|1': ['on', 'off'],
        description: '@sentence(20)',
        images: () => [
          Random.image('400x400', Random.color(), 'Product 1'),
          Random.image('400x400', Random.color(), 'Product 2'),
          Random.image('400x400', Random.color(), 'Product 3'),
        ],
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  }).list;
};

export const generateMockOrders = (count: number): Order[] => {
  const statuses: Order['status'][] = ['pending', 'paid', 'shipped', 'completed', 'cancelled', 'refunded'];
  return Mock.mock({
    [`list|${count}`]: [
      {
        'id|+1': 10000,
        orderNo: () => 'ORD' + Date.now().toString().slice(-10) + Math.floor(Math.random() * 1000).toString().padStart(4, '0'),
        'userId|1': [1, 2, 3, 4, 5],
        username: '@first',
        'totalAmount|100-10000': 1,
        'status|1': statuses,
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        address: {
          name: '@name',
          phone: /^1[3-9]\d{9}$/,
          province: '@province',
          city: '@city',
          district: '@county',
          detail: '@county(true)',
        },
        items: () => [
          {
            id: Random.integer(1, 100),
            productId: Random.integer(1000, 2000),
            productName: '商品名称 ' + Random.integer(1, 100),
            productImage: Random.image('100x100', Random.color(), 'Product'),
            price: Random.integer(100, 5000),
            quantity: Random.integer(1, 5),
            totalPrice: 0,
          },
        ],
      },
    ],
  }).list;
};

export const generateMockArticles = (count: number): Article[] => {
  const categories = ['公告', '新闻', '活动', '帮助', '其他'];
  const statuses: Article['status'][] = ['draft', 'published', 'scheduled'];
  return Mock.mock({
    [`list|${count}`]: [
      {
        'id|+1': 1,
        title: '@ctitle(10, 30)',
        summary: '@csentence(20, 50)',
        content: '@cparagraph(50, 200)',
        cover: () => Random.image('800x400', Random.color(), 'Cover'),
        'category|1': categories,
        tags: () => [Random.ctitle(3, 6), Random.ctitle(3, 6), Random.ctitle(3, 6)],
        'status|1': statuses,
        author: '@cname',
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        'viewCount|0-10000': 1,
      },
    ],
  }).list;
};

export const generateMockLogs = (count: number, type: 'operation' | 'login' | 'api'): SystemLog[] => {
  const actions: Record<string, string[]> = {
    operation: ['登录系统', '退出登录', '查看用户列表', '新增用户', '编辑用户', '删除用户', '查看角色列表', '新增角色', '编辑角色', '删除角色', '查看商品列表', '新增商品', '编辑商品', '删除商品', '查看订单列表', '查看订单详情', '发货', '退款', '查看文章列表', '新增文章', '编辑文章', '删除文章', '发布文章', '查看系统配置', '修改系统配置'],
    login: ['登录成功', '登录失败-密码错误', '登录失败-用户不存在', '登录失败-账号已锁定', '登录失败-验证码错误'],
    api: ['GET /api/users', 'POST /api/users', 'PUT /api/users', 'DELETE /api/users', 'GET /api/products', 'POST /api/products', 'PUT /api/products', 'DELETE /api/products', 'GET /api/orders', 'POST /api/orders'],
  };

  const modules: Record<string, string[]> = {
    operation: ['用户管理', '角色管理', '商品管理', '订单管理', '内容管理', '系统设置'],
    login: ['登录模块'],
    api: ['API接口'],
  };

  return Mock.mock({
    [`list|${count}`]: [
      {
        'id|+1': 1,
        type: type,
        'userId|1': [1, 2, 3, 4, 5],
        username: '@first',
        'action|1': actions[type],
        'module|1': modules[type],
        ip: '@ip',
        userAgent: () => `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Random.integer(100, 120)}.0.0.0 Safari/537.36`,
        'status|1': ['success', 'fail'],
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  }).list;
};

export const generateMockConfigs = (): SystemConfig[] => {
  return [
    {
      id: '1',
      key: 'site.name',
      value: 'Enterprise Admin',
      description: '站点名称',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '2',
      key: 'site.logo',
      value: '/logo.png',
      description: '站点Logo',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '3',
      key: 'site.description',
      value: '企业级后台管理系统',
      description: '站点描述',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '4',
      key: 'site.keywords',
      value: '后台管理,React,Ant Design,Vite',
      description: '站点关键词',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '5',
      key: 'notification.email',
      value: 'true',
      description: '邮件通知开关',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '6',
      key: 'notification.sms',
      value: 'false',
      description: '短信通知开关',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '7',
      key: 'security.sessionTimeout',
      value: '30',
      description: '会话超时时间(分钟)',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '8',
      key: 'security.loginRetryLimit',
      value: '5',
      description: '登录重试次数限制',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '9',
      key: 'security.forceLogout',
      value: 'false',
      description: '强制退出登录',
      updateTime: '2024-01-01 00:00:00',
    },
    {
      id: '10',
      key: 'system.version',
      value: '1.0.0',
      description: '系统版本号',
      updateTime: '2024-01-01 00:00:00',
    },
  ];
};

export const mockUsers = generateMockUsers(50);
export const mockRoles = generateMockRoles();
export const mockProducts = generateMockProducts(100);
export const mockOrders = generateMockOrders(80);
export const mockArticles = generateMockArticles(60);
export const mockOperationLogs = generateMockLogs(100, 'operation');
export const mockLoginLogs = generateMockLogs(50, 'login');
export const mockApiLogs = generateMockLogs(200, 'api');
export const mockConfigs = generateMockConfigs();
