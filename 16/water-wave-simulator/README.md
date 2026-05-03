# 水面波浪模拟器 (Water Wave Simulator)

基于 Gerstner 波浪模型的实时水面渲染应用，支持波幅、波速和水体透明度的实时调节。

## 项目简介

本项目使用 Three.js 实现了真实感水面渲染，包括：
- **Gerstner 波浪模型**：通过多个正弦波叠加模拟真实水面效果
- **菲涅尔反射**：根据视角动态调整水面反射强度
- **泡沫模拟**：在波峰位置模拟白色泡沫效果
- **实时参数调节**：支持波幅、波速、透明度的实时控制

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4+ | 前端框架 |
| Vue Router | 4.2+ | 路由管理 |
| Vuetify | 3.5+ | UI 组件库 |
| Tailwind CSS | 3.4+ | CSS 框架 |
| Three.js | 0.160+ | 3D 渲染引擎 |
| Vite | 5.0+ | 构建工具 |
| JavaScript | ES6+ | 开发语言 |

## 项目结构

```
water-wave-simulator/
├── public/
│   └── vite.svg              # Vite 图标
├── src/
│   ├── components/
│   │   ├── WaterWaveRenderer.vue    # 波浪渲染组件（核心）
│   │   └── ControlPanel.vue          # 控制面板组件
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── views/
│   │   └── WaterWave.vue      # 主页面视图
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式
├── index.html                 # HTML 入口
├── package.json               # 项目配置
├── vite.config.js             # Vite 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── postcss.config.js          # PostCSS 配置
```

## 核心功能说明

### Gerstner 波浪模型

Gerstner 波浪（也称为圆周波）通过以下公式计算每个顶点的位移：

```
vec3 gerstnerWave(vec2 direction, float steepness, float wavelength, vec2 position) {
  float k = 2.0 * PI / wavelength;
  float c = sqrt(gravity / k);  // 波速
  float f = k * (dot(direction, position) - c * time);
  float a = steepness / k * amplitude;
  
  return vec3(
    direction.x * (a * cos(f)),
    a * sin(f),
    direction.y * (a * cos(f))
  );
}
```

本项目使用 4 个不同方向、波长和陡度的波浪叠加，产生更自然的水面效果。

### 视觉效果

- **菲涅尔效应**：边缘反射更强，中心更透明
- **深度渐变**：从深蓝（深水）到浅蓝（浅水）的颜色过渡
- **高光反射**：模拟太阳在水面的高光
- **天空盒**：渐变天空背景增强沉浸感

## 安装与运行

### 前置要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd water-wave-simulator
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动。

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

### 控制面板

右上角的控制面板提供以下调节选项：

1. **波幅 (Amplitude)**
   - 范围：0.0 - 2.0
   - 默认：0.5
   - 控制波浪的高度，值越大波浪越高

2. **波速 (Speed)**
   - 范围：0.1 - 3.0
   - 默认：1.0
   - 控制波浪移动的速度

3. **透明度 (Transparency)**
   - 范围：10% - 100%
   - 默认：70%
   - 控制水体的透明程度

4. **重置默认**
   - 一键恢复所有参数到默认值

5. **查看说明**
   - 展开/收起 Gerstner 波浪模型的详细说明

### 相机控制

- **自动旋转**：相机默认会缓慢环绕水面旋转
- **高度变化**：相机高度会轻微起伏，增强动态感

## 性能优化

- **高细分网格**：256x256 分段的平面几何体，保证波浪细节
- **GPU 计算**：所有波浪计算在 GPU 着色器中完成
- **像素比限制**：最高 2 倍像素比，平衡画质与性能
- **WebGL 抗锯齿**：启用 4x MSAA 提升画面质量

## 浏览器兼容性

- Chrome/Edge >= 80
- Firefox >= 75
- Safari >= 14
- 需要支持 WebGL 2.0 和 ES6+

## 开发说明

### 自定义波浪参数

在 `WaterWaveRenderer.vue` 的顶点着色器中，可以修改波浪参数：

```glsl
vec3 wave1 = gerstnerWave(vec2(1.0, 0.3), 0.25, 8.0, pos.xz);  // 方向, 陡度, 波长
vec3 wave2 = gerstnerWave(vec2(0.5, 1.0), 0.15, 5.0, pos.xz);
// ... 添加更多波浪
```

### 自定义水面颜色

在片元着色器中修改颜色 uniforms：

```glsl
uniform vec3 uWaterColor;   // 浅水颜色
uniform vec3 uDeepColor;    // 深水颜色
uniform vec3 uFoamColor;    // 泡沫颜色
```

## License

MIT License

## 参考资料

- [Gerstner Waves - Wikipedia](https://en.wikipedia.org/wiki/Gerstner_wave)
- [Realistic Water Rendering - NVIDIA](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vuetify Documentation](https://vuetifyjs.com/)
