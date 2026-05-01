# 权限管理系统 (Permission Dashboard)

一个功能完善的在线办公权限管理页面，支持角色权限可视化配置、层级菜单展示、权限筛选和数据导出功能。

## 功能特性

- **角色权限可视化配置**：通过树形结构直观地为角色配置权限，支持全选、部分选中（Indeterminate）状态
- **层级菜单展示**：左侧侧边栏展示系统菜单的层级结构，支持展开/收起
- **权限筛选功能**：支持按角色名称、编码和权限名称、编码进行模糊搜索
- **数据导出功能**：支持将角色列表、权限列表和角色权限配置导出为 CSV 格式

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.4.14 | CSS 框架 |
| Angular Material | 21.2.9 | UI 组件库 |
| Angular Router | 21.2.x | 路由管理 |
| Angular CLI | 21.2.8 | 项目构建工具 |

## 项目结构

```
permission-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sidebar/                    # 侧边栏组件
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.css
│   │   │   └── permission-tree/            # 权限树组件
│   │   │       ├── permission-tree.component.ts
│   │   │       ├── permission-tree.component.html
│   │   │       └── permission-tree.component.css
│   │   ├── pages/
│   │   │   └── permission-management/      # 权限管理主页面
│   │   │       ├── permission-management.component.ts
│   │   │       ├── permission-management.component.html
│   │   │       └── permission-management.component.css
│   │   ├── services/
│   │   │   ├── permission.service.ts       # 权限数据服务
│   │   │   ├── role.service.ts             # 角色数据服务
│   │   │   └── export.service.ts           # 数据导出服务
│   │   ├── models/
│   │   │   ├── permission.model.ts         # 权限数据模型
│   │   │   └── role.model.ts               # 角色数据模型
│   │   ├── app-module.ts                   # 根模块
│   │   ├── app-routing-module.ts           # 路由模块
│   │   ├── app.ts                          # 根组件
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css                          # 全局样式（包含 Tailwind）
├── angular.json                            # Angular 配置
├── package.json                            # 依赖配置
├── tailwind.config.js                      # Tailwind 配置
├── postcss.config.js                       # PostCSS 配置
├── tsconfig.json                           # TypeScript 配置
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0

### 安装依赖

```bash
cd permission-dashboard
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

## 核心功能说明

### 1. 角色管理

- 展示所有角色列表，包含角色名称、编码、描述、权限数量、状态等信息
- 支持按角色名称或编码进行搜索筛选
- 点击角色行可选中该角色进行权限配置
- 区分系统角色和自定义角色

### 2. 权限配置

- 以树形结构展示所有权限，支持菜单、按钮、接口三种类型
- 选中父节点会自动选中所有子节点
- 部分子节点选中时，父节点显示为不确定状态（Indeterminate）
- 支持全部展开/收起、全选/取消全选操作
- 实时显示已选中权限数量和权限覆盖率

### 3. 权限筛选

- 角色列表搜索：支持按角色名称、编码、描述模糊搜索
- 权限树搜索：支持按权限名称、编码、描述模糊搜索
- 搜索结果自动展开相关节点，方便查看

### 4. 数据导出

- 导出角色列表：导出当前筛选结果的角色数据为 CSV
- 导出权限列表：导出所有权限数据为 CSV
- 导出角色权限配置：导出当前选中角色的权限配置为 CSV
- CSV 文件支持中文编码（UTF-8 BOM），兼容 Excel

## 数据模型

### Role（角色）

```typescript
interface Role {
  id: string;                    // 角色ID
  name: string;                  // 角色名称
  code: string;                  // 角色编码
  description?: string;          // 描述
  permissionIds: string[];       // 权限ID列表
  status: 'active' | 'inactive'; // 状态
  isSystem: boolean;             // 是否系统角色
  createdAt: Date;               // 创建时间
  updatedAt: Date;               // 更新时间
}
```

### Permission（权限）

```typescript
interface Permission {
  id: string;                              // 权限ID
  name: string;                            // 权限名称
  code: string;                            // 权限编码
  description?: string;                    // 描述
  type: 'menu' | 'button' | 'api';        // 类型
  parentId?: string;                       // 父级ID
  children?: Permission[];                 // 子权限
  icon?: string;                           // 图标
  route?: string;                          // 路由路径
  apiUrl?: string;                         // API地址
  order?: number;                          // 排序
  status: 'active' | 'inactive';           // 状态
  createdAt: Date;                         // 创建时间
  updatedAt: Date;                         // 更新时间
}
```

## 自定义数据

当前项目使用模拟数据。如需自定义数据，请修改以下文件：

- `src/app/services/role.service.ts` - 角色数据
- `src/app/services/permission.service.ts` - 权限数据

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run watch` | 监听模式构建 |
| `npm run test` | 运行测试 |

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License
