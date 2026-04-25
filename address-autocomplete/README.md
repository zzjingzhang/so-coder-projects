# 地址自动完成组件 (Address Autocomplete)

一个功能完整的地址搜索和编辑组件，支持智能搜索、表单校验、主题切换等功能。

## 功能特性

- **智能地址搜索**：输入关键词即可获取地址建议列表
- **离线开发支持**：内置Mock数据，无需网络即可开发和测试
- **表单编辑与校验**：选择地址后可弹出编辑对话框，支持实时表单验证
- **暗/亮主题切换**：支持流畅的主题切换，使用CSS变量实现统一配色
- **输入防抖处理**：优化搜索性能，减少不必要的API请求
- **键盘导航支持**：完整的键盘操作支持（方向键、Enter、Escape）
- **响应式设计**：完美适配桌面端和移动端

## 技术栈

- **React 18.2** - UI框架
- **TypeScript** - 类型安全的JavaScript
- **Vite 5.0** - 下一代前端构建工具
- **Element Plus** - Vue 3 UI组件库（项目配置支持）
- **CSS变量** - 主题配色系统

## 项目结构

```
address-autocomplete/
├── src/
│   ├── components/              # UI组件目录
│   │   ├── AddressAutocomplete.tsx    # 地址自动完成核心组件
│   │   ├── AddressAutocomplete.css
│   │   ├── AddressEditDialog.tsx      # 地址编辑对话框组件
│   │   ├── AddressEditDialog.css
│   │   ├── ThemeToggle.tsx            # 主题切换按钮组件
│   │   └── ThemeToggle.css
│   ├── contexts/                # React Context目录
│   │   └── ThemeContext.tsx           # 主题上下文提供者
│   ├── hooks/                   # 自定义Hooks目录
│   │   └── useDebounce.ts             # 防抖Hook
│   ├── mock/                    # Mock数据目录
│   │   └── index.ts                   # 地址建议Mock数据
│   ├── services/                # 服务层目录
│   │   └── addressService.ts          # 地址服务（API调用、格式化、校验）
│   ├── styles/                  # 样式文件目录
│   │   ├── global.css                 # 全局样式
│   │   └── variables.css              # CSS变量（主题配色）
│   ├── types/                   # TypeScript类型定义
│   │   └── index.ts
│   ├── App.tsx                  # 主应用组件
│   ├── App.css
│   ├── main.tsx                 # 应用入口文件
│   └── vite-env.d.ts            # Vite环境类型声明
├── index.html                   # HTML模板
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript配置
├── tsconfig.node.json           # Vite Node环境TypeScript配置
├── vite.config.ts               # Vite配置
└── .gitignore                   # Git忽略文件
```

## 快速开始

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 进入项目目录
cd address-autocomplete

# 安装依赖
npm install

# 或者使用 yarn
yarn
```

### 启动开发服务器

```bash
npm run dev

# 或者使用 yarn
yarn dev
```

开发服务器默认运行在 `http://localhost:3000`，启动后会自动在浏览器中打开。

### 构建生产版本

```bash
npm run build

# 或者使用 yarn
yarn build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview

# 或者使用 yarn
yarn preview
```

### 代码检查

```bash
npm run lint

# 或者使用 yarn
yarn lint
```

## 使用说明

### 搜索地址

1. 在搜索框中输入地址关键词（如：北京、上海、中关村等）
2. 系统会根据输入实时显示匹配的地址建议列表
3. 可以使用鼠标点击选择，或使用键盘方向键导航后按Enter选择

### 编辑地址

1. 选择地址后会自动弹出编辑对话框
2. 在对话框中可以修改以下字段：
   - 省份（必填，下拉选择）
   - 城市（必填，文本输入）
   - 区县（必填，文本输入）
   - 街道（可选）
   - 详细地址（必填）
   - 邮政编码（可选，6位数字）
3. 表单会实时验证必填字段和数据格式
4. 点击"保存"按钮完成编辑，点击"取消"放弃修改

### 主题切换

点击页面右上角的太阳/月亮图标即可在亮/暗主题之间切换。主题选择会自动保存到本地存储。

## 核心组件说明

### AddressAutocomplete

地址自动完成核心组件，提供搜索输入框和建议列表。

**Props:**
- `onAddressSelect: (address: Address) => void` - 选择地址后的回调函数
- `placeholder?: string` - 输入框占位文本
- `className?: string` - 自定义CSS类名

### AddressEditDialog

地址编辑对话框组件，提供完整的表单编辑和校验功能。

**Props:**
- `isOpen: boolean` - 对话框是否打开
- `address: Address | null` - 要编辑的地址对象
- `onClose: () => void` - 关闭对话框的回调
- `onSave: (address: Address) => void` - 保存地址的回调

### ThemeProvider

主题上下文提供者，使用React Context管理主题状态。

**使用方式:**
```tsx
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// 在应用顶层包裹
<ThemeProvider>
  <App />
</ThemeProvider>

// 在组件中使用
const { theme, toggleTheme } = useTheme();
```

## 自定义配置

### 使用真实API

项目默认使用Mock数据进行开发。如需使用真实的地址API，请修改 `src/services/addressService.ts`：

```ts
import { configureAddressApi } from './services/addressService';

// 在应用初始化时配置
configureAddressApi({
  useMock: false,
  apiUrl: 'https://your-api-endpoint.com/search',
  apiKey: 'your-api-key' // 可选
});
```

### 调整防抖延迟

默认防抖延迟为300ms，可在 `src/components/AddressAutocomplete.tsx` 中修改：

```ts
const debouncedValue = useDebounce(inputValue, 500); // 修改为500ms
```

## 浏览器支持

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

---

**注意**: 本项目默认使用Mock数据进行开发。如需接入真实地址服务，请参考"自定义配置"部分。
