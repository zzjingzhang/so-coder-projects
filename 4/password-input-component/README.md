# 密码输入组件 (Password Input Component)

一个功能丰富、可高度自定义的 React 密码输入组件，基于 TypeScript、Tailwind CSS 和 shadcn/ui 构建。

## 项目结构

```
password-input-component/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── password-input/
│   │   │   ├── PasswordInput.tsx       # 密码输入组件核心实现
│   │   │   ├── PasswordInput.test.tsx  # 组件单元测试
│   │   │   └── index.ts                # 组件导出
│   │   └── ui/
│   │       └── input.tsx               # shadcn/ui Input 基础组件
│   ├── lib/
│   │   └── utils.ts                    # 工具函数 (cn)
│   ├── test/
│   │   └── setup.ts                    # 测试环境配置
│   ├── App.tsx                         # 组件演示页面
│   ├── index.css                       # 全局样式 (Tailwind)
│   ├── main.tsx                        # 应用入口
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 技术栈

- **框架**: React 19.1.0
- **语言**: TypeScript 5.8.3
- **样式**: Tailwind CSS 3.4.17
- **UI 组件库**: shadcn/ui (基于 Radix UI)
- **路由**: React Router 7.5.0
- **打包工具**: Vite 6.3.5
- **测试框架**: Vitest + Testing Library
- **图标**: Lucide React

## 功能特性

### 核心功能
- ✅ 密码/文本可见性切换
- ✅ 支持浮动标签 (floatingLabelText)
- ✅ 提示文本和错误文本显示
- ✅ 禁用状态支持
- ✅ 全宽模式
- ✅ 受控和非受控使用
- ✅ 道具驱动的可见性控制

### 自定义样式
- ✅ 按钮样式自定义 (buttonClassName)
- ✅ 图标样式自定义 (iconClassName)
- ✅ 容器样式自定义 (wrapperClassName)
- ✅ 标签样式自定义 (labelClassName)
- ✅ 错误文本样式自定义 (errorClassName)
- ✅ 提示文本样式自定义 (hintClassName)
- ✅ 输入框样式自定义 (className)

### 无障碍支持
- ✅ 语义化的 aria-label
- ✅ 键盘导航支持
- ✅ 焦点管理

## 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| hintText | string | - | 提示文本 |
| floatingLabelText | string | - | 浮动标签文本 |
| disabled | boolean | false | 是否禁用 |
| errorText | string | - | 错误文本 |
| fullWidth | boolean | false | 是否占满宽度 |
| buttonDisabled | boolean | false | 是否禁用切换按钮 |
| visible | boolean | false | 初始可见性状态 |
| onVisibleChange | (visible: boolean) => void | - | 可见性变化回调 |
| buttonClassName | string | - | 按钮自定义类名 |
| iconClassName | string | - | 图标自定义类名 |
| wrapperClassName | string | - | 容器自定义类名 |
| labelClassName | string | - | 标签自定义类名 |
| errorClassName | string | - | 错误文本自定义类名 |
| hintClassName | string | - | 提示文本自定义类名 |

### 继承自 HTML Input 的属性
- value
- defaultValue
- onChange
- placeholder
- name
- id
- 及其他所有 input 属性

## 使用示例

### 基本用法

```tsx
import { PasswordInput } from '@/components/password-input'

function Example() {
  return (
    <PasswordInput
      placeholder="请输入密码"
      hintText="至少8个字符"
    />
  )
}
```

### 带有浮动标签

```tsx
<PasswordInput
  floatingLabelText="密码"
  hintText="请输入您的登录密码"
/>
```

### 受控使用

```tsx
import { useState } from 'react'

function ControlledExample() {
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState('')

  return (
    <>
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        visible={visible}
        onVisibleChange={setVisible}
        placeholder="请输入密码"
      />
      <p>当前可见性: {visible ? '可见' : '隐藏'}</p>
    </>
  )
}
```

### 自定义样式

```tsx
<PasswordInput
  placeholder="自定义样式"
  className="border-2 border-blue-300 bg-blue-50"
  buttonClassName="bg-blue-100 hover:bg-blue-200 rounded-full"
  iconClassName="text-blue-600"
  wrapperClassName="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
/>
```

### 错误状态

```tsx
<PasswordInput
  placeholder="请输入密码"
  errorText="密码不能为空"
/>
```

## 启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 运行测试

```bash
npm run test        # 监听模式
npm run test:run    # 单次运行
```

## 测试覆盖

组件单元测试覆盖以下场景：

- ✅ 组件渲染
- ✅ 默认隐藏状态
- ✅ 道具驱动的可见性更改
- ✅ 按钮禁用状态
- ✅ 切换行为
- ✅ 受控和非受控使用
- ✅ 自定义样式应用
- ✅ 禁用状态
- ✅ 错误状态显示

## 演示页面

运行 `npm run dev` 后，打开 http://localhost:5173 查看组件演示页面，包含：

1. **基本用法** - 默认状态和浮动标签
2. **各种状态** - 可见、隐藏、禁用、错误、全宽
3. **自定义样式** - 按钮、图标、容器样式
4. **受控与非受控** - 不同的使用方式
5. **与基础组件比较** - 与 shadcn/ui Input 的对比
6. **表单示例** - 实际应用场景

## License

MIT
