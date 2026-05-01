# Healthcare Provider Directory

一个基于 Angular 框架的医疗保健提供者目录应用，提供医生简介展示、专业过滤器、预约安排、保险集成和患者评论功能。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9.2
- **样式**: Tailwind CSS 4.0.0
- **UI 组件库**: PrimeNG 21.2.0
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 功能特性

### 1. 医生简介展示
- 响应式 CSS Grid 布局
- 医生卡片展示（头像、姓名、专业、医院、评分）
- 医生详细信息页面
- 评分和评价数量显示

### 2. 专业过滤器
- 按专业筛选（心脏病学、神经病学、儿科学、骨科、皮肤科、普外科）
- 按保险提供商筛选
- 仅显示可用医生选项
- 一键清除所有筛选条件

### 3. 预约安排
- 日期选择器（排除周末）
- 时间段选择
- 患者信息表单
- 保险信息选择
- 就诊原因填写
- 表单验证

### 4. 保险集成
- 显示医生接受的保险计划
- 预约时选择保险提供商
- 保险信息详情页面

### 5. 患者评论
- 查看现有患者评论
- 评论评分显示
- 评论提交功能
- 评论有用投票显示

## 项目结构

```
healthcare-provider-directory/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   │   └── home.component.ts          # 首页组件（医生列表和过滤器）
│   │   │   ├── doctor-detail/
│   │   │   │   └── doctor-detail.component.ts # 医生详情组件
│   │   │   └── appointment/
│   │   │       └── appointment.component.ts   # 预约组件
│   │   ├── models/
│   │   │   ├── doctor.model.ts                 # 医生数据模型
│   │   │   ├── review.model.ts                 # 评论数据模型
│   │   │   └── appointment.model.ts            # 预约数据模型
│   │   ├── services/
│   │   │   ├── doctor.service.ts               # 医生数据服务
│   │   │   ├── review.service.ts               # 评论数据服务
│   │   │   └── appointment.service.ts          # 预约管理服务
│   │   ├── app.ts                              # 根组件
│   │   ├── app.config.ts                       # 应用配置
│   │   └── app.routes.ts                       # 路由配置
│   ├── index.html                              # HTML 入口文件
│   ├── main.ts                                 # 应用入口文件
│   └── styles.css                              # 全局样式（Tailwind CSS）
├── public/                                     # 静态资源
├── angular.json                                # Angular 项目配置
├── package.json                                # 项目依赖配置
├── tsconfig.json                               # TypeScript 配置
├── tsconfig.app.json                           # 应用级 TypeScript 配置
├── tsconfig.spec.json                          # 测试 TypeScript 配置
└── .gitignore                                  # Git 忽略文件
```

## 安装和启动

### 前置要求

确保你的系统已安装以下软件：
- Node.js (推荐版本 18.x 或更高)
- npm (通常随 Node.js 一起安装)
- Angular CLI 21.2.8

### 安装步骤

1. **进入项目目录**
   ```bash
   cd healthcare-provider-directory
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

### 运行项目

**开发模式**
```bash
npm start
```
或
```bash
ng serve
```

项目将在 `http://localhost:4200` 启动。

**构建生产版本**
```bash
npm run build
```
或
```bash
ng build
```

构建产物将输出到 `dist/` 目录。

**监视模式**
```bash
npm run watch
```
或
```bash
ng build --watch --configuration development
```

## 路由配置

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | `HomeComponent` | 首页 - 医生列表和过滤器 |
| `/doctor/:id` | `DoctorDetailComponent` | 医生详情页面 |
| `/appointment/:doctorId` | `AppointmentComponent` | 预约安排页面 |

## 数据模型

### Doctor (医生)
- `id`: 唯一标识符
- `name`: 医生姓名
- `specialty`: 专业领域
- `hospital`: 所属医院
- `rating`: 评分 (1-5)
- `reviewCount`: 评价数量
- `experience`: 从业年限
- `education`: 教育背景
- `languages`: 语言列表
- `insurance`: 接受的保险列表
- `about`: 个人简介
- `image`: 头像图片 URL
- `available`: 是否可用
- `nextAvailable`: 下次可用日期

### Review (评论)
- `id`: 唯一标识符
- `doctorId`: 医生 ID
- `patientName`: 患者姓名
- `rating`: 评分
- `date`: 评论日期
- `title`: 评论标题
- `content`: 评论内容
- `helpful`: 有用投票数

### Appointment (预约)
- `id`: 唯一标识符 (可选)
- `doctorId`: 医生 ID
- `patientName`: 患者姓名
- `patientEmail`: 患者邮箱
- `patientPhone`: 患者电话
- `date`: 预约日期
- `time`: 预约时间
- `reason`: 就诊原因
- `insurance`: 保险提供商
- `status`: 预约状态 (pending/confirmed/cancelled)

## 服务层

### DoctorService
- `getDoctors()`: 获取所有医生
- `getDoctorById(id)`: 根据 ID 获取医生
- `getSpecialties()`: 获取所有专业
- `getInsuranceProviders()`: 获取所有保险提供商
- `searchDoctors(specialty?, insurance?, available?)`: 搜索医生

### ReviewService
- `getReviewsByDoctorId(doctorId)`: 获取医生的所有评论
- `getAverageRating(doctorId)`: 获取医生的平均评分

### AppointmentService
- `getAvailableSlots()`: 获取可用的预约时间段
- `createAppointment(appointment)`: 创建预约
- `getAppointments()`: 获取所有预约
- `cancelAppointment(id)`: 取消预约

## 组件说明

### HomeComponent (首页组件)
- 医生列表展示 (CSS Grid 布局)
- 多条件筛选功能
- 响应式设计
- 导航到详情页和预约页

### DoctorDetailComponent (医生详情组件)
- 医生完整信息展示
- 标签页布局 (关于/保险/评论)
- 评论提交功能
- 预约入口

### AppointmentComponent (预约组件)
- 响应式表单
- 日期和时间选择
- 表单验证
- 预约提交和确认

## 样式指南

项目使用 Tailwind CSS 进行样式设计，遵循以下原则：
- 响应式设计 (mobile-first)
- 统一的颜色和间距
- 组件化样式
- 良好的可访问性

## 开发指南

### 添加新医生
在 `src/app/services/doctor.service.ts` 中的 `doctors` 数组添加新医生对象。

### 添加新评论
在 `src/app/services/review.service.ts` 中的 `reviews` 数组添加新评论对象。

### 自定义样式
- 全局样式: `src/styles.css`
- 组件样式: 组件内的 `styles` 属性或单独的 CSS 文件

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 联系方式

如有问题或建议，请创建 Issue 或 Pull Request。
