# 🪐 Planet Generator

一个基于程序生成的行星生成器，可以创建具有不同地形、海洋和大气的独特行星。

## ✨ 功能特性

- **程序化行星生成**：使用 Simplex 噪声算法生成独特的行星地形
- **多种地形类型**：深海、海洋、浅水、沙滩、沙漠、草原、森林、山脉、雪地、冰川
- **可调整参数**：
  - 种子值（随机化行星外观）
  - 行星半径
  - 地形粗糙度
  - 海平面高度
  - 温度（影响地形类型）
  - 湿度（影响植被密度）
  - 大气密度和颜色
- **预设行星**：类地行星、类火星行星、冰雪世界、沙漠世界、海洋世界
- **实时预览**：参数调整后实时更新行星显示
- **美观的 UI**：使用 PrimeNG 组件和 Tailwind CSS 构建

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.4.x | 样式框架 |
| PrimeNG | 19.0.x | UI 组件库 |
| Angular Router | 21.2.x | 路由管理 |
| Angular CLI | 21.2.x | 项目构建 |
| Simplex Noise | 4.0.x | 噪声生成算法 |
| RxJS | 7.8.x | 响应式编程 |

## 📁 项目结构

```
planet-generator/
├── .vscode/                    # VSCode 配置
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── public/                     # 公共资源
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── planet-generator/          # 行星生成器主组件
│   │   │   │   ├── planet-generator.component.ts
│   │   │   │   ├── planet-generator.component.html
│   │   │   │   └── planet-generator.component.css
│   │   │   └── properties-panel/          # 属性面板组件
│   │   │       ├── properties-panel.component.ts
│   │   │       ├── properties-panel.component.html
│   │   │       └── properties-panel.component.css
│   │   ├── models/
│   │   │   └── planet.models.ts            # 数据模型定义
│   │   ├── services/
│   │   │   └── planet-generator.service.ts # 行星生成核心逻辑
│   │   ├── app.config.ts      # 应用配置
│   │   ├── app.routes.ts      # 路由配置
│   │   ├── app.ts             # 根组件
│   │   ├── app.html           # 根组件模板
│   │   └── app.css            # 根组件样式
│   ├── index.html             # 入口 HTML
│   ├── main.ts                # 入口文件
│   └── styles.css             # 全局样式
├── .editorconfig              # 编辑器配置
├── .gitignore                 # Git 忽略配置
├── .prettierrc                # Prettier 配置
├── angular.json               # Angular 配置
├── package.json               # 依赖配置
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.app.json          # TypeScript 应用配置
├── tsconfig.json              # TypeScript 配置
└── tsconfig.spec.json         # TypeScript 测试配置
```

## 🚀 快速开始

### 前提条件

- Node.js 24.x 或更高版本
- npm 11.12.1 或更高版本
- Angular CLI 21.2.x

### 安装依赖

```bash
cd planet-generator
npm install
```

### 开发模式运行

```bash
npm start
```

然后在浏览器中打开 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/planet-generator/` 目录。

### 运行测试

```bash
npm test
```

## 🎮 使用说明

### 预设行星

1. 从"预设行星"下拉菜单中选择一个预设
2. 点击"应用"按钮生成该类型的行星

可用预设：
- **类地行星**：蓝色海洋、绿色陆地、温带气候
- **类火星行星**：红色大气、低海平面、干燥气候
- **冰雪世界**：白色冰冻表面、寒冷气候
- **沙漠世界**：黄色大气、干旱气候、极少水体
- **海洋世界**：深蓝色大气、极高海平面

### 自定义参数

使用右侧的属性面板调整以下参数：

#### 地形设置
- **种子值**：控制行星生成的随机种子，相同种子生成相同行星
- **行星半径**：调整行星大小（100-200 像素）
- **地形粗糙度**：从平滑到崎岖（0.2-3.0）

#### 海洋设置
- **海平面高度**：调整覆盖行星表面的水量（0-90%）

#### 气候设置
- **温度**：从冰冻到火山（影响地形类型分布）
- **湿度**：从干旱到雨林（影响植被颜色和密度）

#### 大气设置
- **大气密度**：从无到非常稠密
- **大气颜色**：8种预设颜色选择

### 随机化

点击"🎲 随机化种子"按钮可以生成全新的行星外观。

## 🔧 核心架构

### 噪声生成

项目使用 `simplex-noise` 库生成多层噪声，通过叠加不同频率和振幅的噪声来创建自然的地形起伏。

```typescript
// 多层噪声叠加
for (let i = 0; i < octaves; i++) {
  const noiseValue = this.noise2D(x, y);
  height += noiseValue * amplitude;
  maxAmplitude += amplitude;
  amplitude *= 0.5;  // 每层振幅减半
  frequency *= 2;    // 每层频率加倍
}
```

### 地形类型映射

根据海拔高度、温度和湿度参数，将噪声值映射到不同的地形类型：

| 地形类型 | 海拔范围 | 温度条件 |
|---------|---------|---------|
| 深海 | 0 - 15% | 任意 |
| 海洋 | 15% - 25% | 任意 |
| 浅水 | 25% - 30% | 任意 |
| 沙滩 | 30% - 33% | 任意 |
| 草原/森林 | 33% - 70% | 温带 |
| 沙漠 | 33% - 70% | 高温 |
| 冰川 | 30% - 70% | 低温 |
| 山脉 | 70% - 85% | 任意 |
| 雪地 | 85% - 95% | 任意 |
| 冰冠 | 95% - 100% | 任意 |

### Canvas 渲染

行星使用 HTML5 Canvas 渲染，支持：
- 像素级地形绘制
- 3D 光照阴影效果
- 大气层渐变效果
- 星空背景

## 📝 开发指南

### 添加新的地形类型

1. 在 `src/app/models/planet.models.ts` 中的 `TerrainType` 枚举添加新类型
2. 在 `TERRAIN_COLORS` 数组中添加对应的颜色和海拔范围
3. 如果需要特殊的温度条件，修改 `getTerrainColors()` 方法

### 添加新的预设行星

在 `src/app/services/planet-generator.service.ts` 中的 `createPreset()` 方法添加新的 case：

```typescript
case 'my-custom-planet':
  return {
    ...DEFAULT_PLANET_PARAMS,
    seed: baseSeed,
    waterLevel: 0.5,
    temperature: 0.7,
    // ... 其他参数
  };
```

然后在 `planet-generator.component.ts` 中的 `presetOptions` 数组添加新选项。

## 🐛 常见问题

**Q: 为什么修改参数后行星没有变化？**
A: 某些参数（如种子值、粗糙度）需要点击"重新生成行星"按钮才会生效。

**Q: 如何保存我喜欢的行星？**
A: 记下种子值，以后可以通过输入相同的种子值重新生成相同的行星。

**Q: 行星旋转动画可以暂停吗？**
A: 是的，将鼠标悬停在行星上会暂停旋转动画。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
