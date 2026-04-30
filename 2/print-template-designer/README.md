# 打印模板设计器

一个功能强大的打印模板设计器，支持拖拽式设计、条码/二维码打印、票据定位打印等功能。

## 功能特性

- 🎨 **可视化设计**: 拖拽式界面，直观的打印元素管理
- 📄 **多种纸张尺寸**: 支持 A3、A4、A5、B3、B4、B5 及自定义尺寸
- 🔄 **旋转功能**: 支持画布和元素的旋转
- 🖼️ **丰富的元素类型**:
  - 文本、长文本
  - 图片
  - 表格
  - 自定义 HTML
  - 一维条码 (CODE128, CODE39, EAN13 等)
  - 二维码
- 👁️ **快速预览**: 一键预览打印效果
- 🖨️ **直接打印**: 支持直接打印
- 💾 **导出功能**: 支持导出 JSON 和 HTML
- 📥 **导入功能**: 支持从 JSON 导入模板
- 🧾 **票据定位打印**: 示例展示小票打印功能

## 技术栈

- **框架**: Vue 3 + TypeScript
- **UI 组件库**: Vuetify 3
- **样式**: Tailwind CSS 4
- **路由**: Vue Router 4
- **构建工具**: Vite
- **条码/二维码**: jsbarcode, qrcode
- **打印**: html2canvas, jspdf

## 项目结构

```
print-template-designer/
├── public/                     # 静态资源
├── src/
│   ├── assets/                 # 资源文件
│   ├── components/
│   │   ├── elements/           # 元素渲染组件
│   │   │   ├── ElementBarcode.vue     # 条码组件
│   │   │   ├── ElementHtml.vue        # HTML组件
│   │   │   ├── ElementImage.vue       # 图片组件
│   │   │   ├── ElementLongText.vue    # 长文本组件
│   │   │   ├── ElementQRCode.vue      # 二维码组件
│   │   │   ├── ElementTable.vue       # 表格组件
│   │   │   └── ElementText.vue        # 文本组件
│   │   ├── Canvas.vue          # 画布组件
│   │   ├── ElementPanel.vue    # 元素面板组件
│   │   └── PropertyPanel.vue   # 属性面板组件
│   ├── plugins/
│   │   └── vuetify.ts          # Vuetify 配置
│   ├── router/
│   │   └── index.ts            # 路由配置
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   ├── utils/
│   │   ├── elementUtils.ts     # 元素工具函数
│   │   └── exportUtils.ts      # 导出工具函数
│   ├── views/
│   │   ├── PrintDesigner.vue   # 打印设计器主页面
│   │   └── Examples.vue        # 示例页面
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── style.css               # 全局样式
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

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

项目将在 `http://localhost:5173/` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 设计器页面

1. **添加元素**: 从左侧面板拖拽元素到画布上
2. **选择元素**: 点击画布上的元素进行选择
3. **移动元素**: 选中元素后拖拽移动
4. **调整大小**: 选中元素后拖拽四角的调整手柄
5. **编辑属性**: 在右侧属性面板编辑选中元素的属性
6. **删除元素**: 点击属性面板的删除按钮或元素列表中的删除图标

### 纸张设置

- 从顶部工具栏选择预设纸张尺寸 (A3/A4/A5/B3/B4/B5)
- 选择 "custom" 可自定义宽高
- 使用旋转按钮可旋转整个画布

### 预览与打印

- **快速预览**: 在新窗口中预览打印效果
- **直接打印**: 调用浏览器打印功能
- **导出 HTML**: 导出为可独立使用的 HTML 文件

### 导入/导出

- **导出 JSON**: 将当前模板保存为 JSON 文件
- **导出 HTML**: 将当前模板导出为 HTML 文件
- **导入 JSON**: 从 JSON 文件恢复模板

### 示例页面

访问 `/examples` 路径查看:
- 条码/二维码打印示例
- 票据定位打印示例 (小票打印)

## 主要依赖

```json
{
  "vue": "^3.5.32",
  "vue-router": "^4.5.0",
  "vuetify": "^3.8.3",
  "@mdi/font": "^7.4.47",
  "qrcode": "^1.5.4",
  "jsbarcode": "^3.11.6",
  "html2canvas": "^1.4.1",
  "jspdf": "^3.0.4"
}
```

## 开发依赖

```json
{
  "typescript": "~6.0.2",
  "vite": "^8.0.10",
  "vue-tsc": "^3.2.7",
  "tailwindcss": "^4.2.4",
  "postcss": "^8.5.3",
  "autoprefixer": "^10.4.21",
  "@types/qrcode": "^1.5.5",
  "@types/jsbarcode": "^3.11.4"
}
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
