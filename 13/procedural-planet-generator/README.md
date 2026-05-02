# 程序性行星生成器 (Procedural Planet Generator)

一个基于 Angular 框架构建的交互式行星生成器，使用 Perlin 噪声算法动态生成独特的行星地形、大气和水体。

## 项目结构

```
procedural-planet-generator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── planet-generator/
│   │   │   │   ├── planet-generator.component.ts
│   │   │   │   ├── planet-generator.component.html
│   │   │   │   └── planet-generator.component.css
│   │   │   └── control-panel/
│   │   │       ├── control-panel.component.ts
│   │   │       ├── control-panel.component.html
│   │   │       └── control-panel.component.css
│   │   ├── services/
│   │   │   └── noise.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── tailwind.config.js
├── postcss.config.js
├── karma.conf.js
└── README.md
```

## 技术栈

- **框架**: Angular 18.x
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder
- **算法**: Perlin 噪声算法 (2D/3D)

## 功能特性

### 🌍 动态行星生成
- 使用 Perlin 噪声算法生成自然的地形起伏
- 实时渲染行星表面（陆地、海洋、山脉、雪地）
- 动态云层效果
- 行星自转动画

### 🎛️ 交互式控制面板
- **种子值 (Seed)**: 确定行星生成的随机种子，相同种子生成相同行星
- **水位 (Water Level)**: 调整海洋和陆地的比例
- **噪声等级 (Noise Level)**: 控制地形的崎岖程度
- **八度 (Octaves)**: 控制噪声细节层次
- **持续度 (Persistence)**: 控制各层噪声的影响权重
- **隙度 (Lacunarity)**: 控制频率倍增系数
- **缩放 (Scale)**: 控制噪声采样的缩放比例

### 🎨 视觉效果
- 深邃的太空背景与闪烁的星空
- 行星大气层光晕效果
- 实时光照计算
- 响应式设计，支持多种屏幕尺寸

## 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 18.0.0

## 安装与启动

### 1. 安装依赖

```bash
cd procedural-planet-generator
npm install
```

### 2. 开发模式启动

```bash
npm start
# 或
ng serve
```

应用将在 `http://localhost:4200` 启动。

### 3. 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

### 4. 运行测试

```bash
npm test
# 或
ng test
```

## 使用说明

### 调整参数

1. **种子值**: 输入任意整数，相同的种子值会生成完全相同的行星。点击"随机生成"按钮可以随机生成新的种子值。

2. **水位**: 拖动滑块从 0% 到 100%，控制行星上海洋的面积：
   - 较低水位: 更多陆地，可能形成巨大的大陆
   - 较高水位: 更多海洋，可能形成群岛

3. **噪声等级**: 控制地形的崎岖程度：
   - 较低值: 平滑的地形，像平原或浅海
   - 较高值: 崎岖的地形，像山脉和深谷

4. **高级参数**:
   - **八度**: 增加细节层次，更多八度会产生更复杂的地形
   - **持续度**: 控制后续噪声层的影响衰减速度
   - **隙度**: 控制频率的倍增系数
   - **缩放**: 放大或缩小地形特征

### 保存和分享

记录下你喜欢的行星的种子值，这样你就可以随时重新生成相同的行星，或者分享给朋友！

## Perlin 噪声算法说明

本项目使用改进的 Perlin 噪声算法来生成地形：

1. **基础噪声**: 使用 2D/3D Perlin 噪声生成自然的随机图案
2. **分形布朗运动 (FBM)**: 叠加多个不同频率和振幅的噪声层
3. **地形颜色映射**: 根据海拔高度映射不同的地形颜色：
   - 深海: 深蓝色
   - 浅海: 蓝色
   - 海滩: 浅棕色
   - 低地: 绿色
   - 高地: 深绿色
   - 丘陵: 黄绿色
   - 山脉: 灰色
   - 雪峰: 白色

## 开发指南

### 项目结构说明

- `app/planet-generator/`: 行星渲染组件，负责 Canvas 绘制
- `app/control-panel/`: 控制面板组件，负责参数调整
- `app/services/noise.service.ts`: Perlin 噪声算法实现
- `styles.css`: 全局样式和 Tailwind 配置

### 添加新功能

1. 在对应组件目录中添加新文件
2. 在 `app.module.ts` 中声明或导入
3. 遵循现有的代码风格和命名规范

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 首次运行需要安装依赖，请确保网络连接正常以便下载 npm 包。
