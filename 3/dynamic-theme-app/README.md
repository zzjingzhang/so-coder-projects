# 动态主题演示应用

一个功能完整的 Vue 3 动态主题演示应用，展示了多主题切换、深色模式、表单验证、数据管理等功能。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **打包工具**: Vite

## 项目结构

```
dynamic-theme-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── AlertSection.vue          # 警报组件
│   │   ├── ForecastSlider.vue         # 天气预报滑块组件
│   │   ├── HeartRateMonitor.vue       # 心率监视器组件
│   │   ├── ThemeChanger.vue           # 主题切换组件
│   │   ├── ValidationForm.vue         # 表单验证组件
│   │   └── WeatherCard.vue            # 天气卡组件
│   ├── router/
│   │   └── index.js                   # 路由配置
│   ├── store/
│   │   └── theme.js                   # 主题状态管理
│   ├── themes/
│   │   └── index.js                   # 主题定义
│   ├── views/
│   │   ├── Dashboard.vue              # 仪表板页面
│   │   └── DessertTable.vue           # 甜点管理页面
│   ├── App.vue                        # 根组件
│   ├── main.js                        # 入口文件
│   └── style.css                      # 全局样式
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 功能特性

### 1. 主题系统
- **三个预定义主题**: 蓝色主题、绿色主题、橙色主题
- **深色/浅色模式切换**: 支持一键切换深色和浅色模式
- **主题持久化**: 主题设置自动保存到 localStorage

### 2. 仪表板页面

#### 验证表单
- 姓名、邮箱、项目选择三个字段
- 实时表单验证
- 验证、重置、重置验证三个按钮

#### 警报组件
- 四种类型的警报：警告、信息、成功、错误
- 支持关闭按钮

#### 天气卡
- 显示位置、日期
- 温度显示
- 天气图标
- 风速和湿度信息

#### 天气预报滑块
- 7天天气预报
- 滑块选择日期
- 预报列表展示

#### 心率监视器
- 实时模拟心跳数据
- 脉冲动画效果
- SVG 迷你图展示最近 20 次心跳
- 平均、最低、最高 BPM 统计
- 右下角悬浮实时心率显示

### 3. 甜点管理页面
- CRUD 操作：添加、编辑、删除
- 数据表格支持排序
- 删除前确认对话框
- 重置为初始数据功能
- 表单验证

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 主题切换
1. 点击顶部导航栏右侧的下拉菜单选择主题
2. 点击月亮/太阳图标切换深色/浅色模式
3. 主题设置会自动保存，下次打开应用时保持

### 表单验证
1. 在仪表板页面的表单中输入数据
2. 点击"验证"按钮进行验证
3. 点击"重置"按钮清空表单
4. 点击"重置验证"按钮清除验证状态

### 甜点管理
1. 点击"添加甜点"按钮添加新记录
2. 点击编辑图标修改现有记录
3. 点击删除图标删除记录（需要确认）
4. 点击"重置数据"按钮恢复初始数据

## 组件说明

### ThemeChanger
主题切换组件，提供主题下拉选择和深色模式切换按钮。

### ValidationForm
表单验证组件，演示 Element Plus 的表单验证功能。

### AlertSection
警报展示组件，展示四种类型的警报样式。

### WeatherCard
天气信息卡片，展示当前天气信息。

### ForecastSlider
天气预报滑块组件，支持滑块选择日期查看预报。

### HeartRateMonitor
心率监视器组件，模拟实时心率数据展示。

### DessertTable
甜点管理表格组件，实现完整的 CRUD 功能。

## 响应式设计
应用完全响应式，支持：
- 移动端 (< 768px)
- 平板端 (768px - 1024px)
- 桌面端 (> 1024px)

## 开发说明

### 主题扩展
如需添加新主题，可在 `src/themes/index.js` 中添加新的主题配置：

```javascript
export const themes = {
  // 现有主题...
  purple: {
    name: '紫色主题',
    light: {
      '--el-color-primary': '#a855f7',
      // 其他颜色配置...
    },
    dark: {
      '--el-color-primary': '#a855f7',
      // 其他颜色配置...
    }
  }
}
```

### 样式定制
全局样式和主题变量在 `src/style.css` 中定义。Tailwind CSS 主题通过 `@theme` 指令配置。

## 许可证

MIT License
