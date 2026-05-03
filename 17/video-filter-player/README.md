# 视频滤镜播放器

一个基于 React + TypeScript 的视频滤镜特效播放器，支持实时切换多种滤镜效果，每个滤镜强度可通过滑块调节。

## 功能特性

- 🎬 **视频播放控制**：支持播放/暂停、进度条、音量调节、全屏播放、视频切换
- 🎨 **多种滤镜效果**：灰度、怀旧、模糊、亮度、对比度、饱和度、色相、反转
- ⚡ **预设效果**：一键应用预设滤镜组合（黑白电影、怀旧复古、赛博朋克等）
- 🔧 **实时调节**：拖动滑块实时调整滤镜强度，所见即所得
- 📱 **响应式布局**：适配不同屏幕尺寸

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.x | 前端框架 |
| TypeScript | 5.8.x | 类型安全 |
| Vite | 6.x | 构建工具 |
| Tailwind CSS | 4.x | 样式框架 |
| MUI (Material-UI) | 9.x | UI 组件库 |
| React Router | 7.x | 路由管理 |

## 项目结构

```
video-filter-player/
├── public/
│   └── vite.svg              # 项目图标
├── src/
│   ├── assets/               # 静态资源
│   │   └── react.svg
│   ├── components/           # 组件目录
│   │   ├── FilterPanel.tsx   # 滤镜控制面板
│   │   ├── PresetFilters.tsx # 预设滤镜组件
│   │   └── VideoPlayer.tsx   # 视频播放器组件
│   ├── pages/                # 页面目录
│   │   └── HomePage.tsx      # 主页面
│   ├── types/                # 类型定义
│   │   └── filter.ts         # 滤镜相关类型
│   ├── utils/                # 工具函数
│   │   └── filterUtils.ts    # 滤镜工具函数
│   ├── App.tsx                # 应用入口组件
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js          # PostCSS 配置
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts             # Vite 配置
```

## 滤镜效果说明

| 滤镜名称 | CSS 属性 | 调节范围 | 说明 |
|----------|----------|----------|------|
| 灰度 | grayscale | 0-100% | 黑白效果 |
| 怀旧 | sepia | 0-100% | 复古棕褐色效果 |
| 模糊 | blur | 0-10px | 模糊程度 |
| 亮度 | brightness | 0-200% | 画面明亮程度 |
| 对比度 | contrast | 0-200% | 明暗对比程度 |
| 饱和度 | saturate | 0-300% | 色彩鲜艳程度 |
| 色相 | hue-rotate | 0-360deg | 色彩偏移角度 |
| 反转 | invert | 0-100% | 颜色反相效果 |

## 预设效果

- **无滤镜**：恢复原始画面
- **黑白电影**：高对比度黑白效果
- **怀旧复古**：温暖的棕褐色调
- **赛博朋克**：高饱和度、霓虹色调
- **冷色调**：偏蓝的冷色系
- **暖色调**：温暖的橙黄色调
- **高对比**：强烈的明暗对比
- **梦幻模糊**：柔和的朦胧效果

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd video-filter-player
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 视频播放

1. 点击视频中央或播放按钮开始播放
2. 拖动进度条跳转到指定位置
3. 点击音量图标调节音量
4. 点击全屏按钮进入全屏模式
5. 点击上一个/下一个按钮切换视频

### 滤镜调节

1. 在右侧滤镜面板中，拖动对应的滑块调节滤镜强度
2. 当前调节的值会实时显示在滑块上方
3. 调整后的效果会实时应用到视频上
4. 点击重置按钮可恢复所有滤镜为默认值

### 使用预设

1. 在预设效果区域点击任一预设标签
2. 该预设的滤镜组合会立即应用到视频上
3. 可在此基础上继续微调各滤镜参数

## 开发说明

### 添加新滤镜

1. 在 `src/types/filter.ts` 中的 `FILTERS` 数组添加新滤镜配置
2. 确保在 `getDefaultFilterState` 函数中包含新滤镜的默认值
3. 如有需要，在 `src/utils/filterUtils.ts` 中更新滤镜字符串生成逻辑

### 添加预设效果

1. 在 `src/components/PresetFilters.tsx` 中的 `PRESETS` 数组添加新预设配置
2. 配置预设名称和对应的滤镜参数组合

## 浏览器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## License

MIT
