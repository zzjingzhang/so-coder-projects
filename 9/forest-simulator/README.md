# Forest Simulator - 动态昼夜森林环境模拟器

一个基于物理的 3D 森林环境模拟器，支持动态昼夜循环、多种天气条件和交互式相机导航。

## 技术栈

- **框架**: Angular 21+ (Standalone Components)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Angular Material
- **3D 渲染引擎**: Three.js
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder

## 项目结构

```
forest-simulator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── control-panel/
│   │   │       ├── control-panel.component.ts
│   │   │       ├── control-panel.component.html
│   │   │       └── control-panel.component.css
│   │   ├── models/
│   │   │   └── environment.model.ts
│   │   ├── pages/
│   │   │   └── forest/
│   │   │       ├── forest.component.ts
│   │   │       ├── forest.component.html
│   │   │       └── forest.component.css
│   │   ├── services/
│   │   │   ├── environment.service.ts
│   │   │   └── forest-renderer.service.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 核心功能

### 1. 动态昼夜循环
- 基于时间的光照系统（日出、上午、中午、下午、日落、夜晚）
- 太阳/月亮位置动态计算
- 天空颜色和环境光自动调整
- 可配置的时间自动循环播放

### 2. 天气系统
- **晴天**: 明亮的阳光和清晰的视野
- **多云**: 柔和的光线和云层覆盖
- **雨天**: 动态雨滴粒子效果和湿润氛围
- **雾天**: 渐变雾气效果和朦胧氛围

### 3. 相机导航
- 鼠标拖拽: 旋转视角
- 滚轮: 缩放视野
- 右键拖拽: 平移相机
- 可调整的视野角度 (FOV)
- 一键重置相机位置

### 4. UI 控制面板
- **时间控制**: 时间滑块、自动播放开关、速度调节
- **天气控制**: 天气类型选择、降雨强度、雾气浓度
- **相机控制**: FOV 调节、重置按钮
- **整体重置**: 一键恢复所有默认设置

## 安装与启动

### 前置要求
- Node.js 18+ 
- npm 或 yarn 包管理器

### 安装依赖

```bash
cd forest-simulator
npm install
```

### 开发模式启动

```bash
npm start
```

应用将在 `http://localhost:4200` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 运行测试

```bash
npm test
```

## 使用说明

1. **启动应用**: 运行 `npm start` 后在浏览器中打开应用
2. **探索环境**: 使用鼠标拖拽旋转视角，滚轮缩放，右键平移
3. **调整时间**: 在右侧控制面板中拖动时间滑块，或启用自动循环
4. **切换天气**: 从下拉菜单中选择不同的天气条件
5. **调整相机**: 修改 FOV 值或使用重置按钮恢复默认视角

## 架构设计

### 状态管理
- 使用 RxJS BehaviorSubject 进行响应式状态管理
- EnvironmentService 统一管理环境状态
- 组件通过订阅 state$ Observable 响应状态变化

### 3D 渲染
- ForestRendererService 封装 Three.js 渲染逻辑
- 场景包含地面、树木、光照系统
- 基于物理的光照 (PBR) 材质
- 实时光影投射和接收

### 组件架构
- **Standalone Components**: 使用 Angular 独立组件模式
- **ControlPanelComponent**: UI 控制面板，提供交互式控件
- **ForestComponent**: 主页面组件，整合 3D 渲染和 UI 控件
- **分层设计**: 组件 → 服务 → 模型的清晰层级

## 性能优化

- 使用 requestAnimationFrame 进行动画循环
- 阴影贴图尺寸优化 (2048x2048)
- 粒子系统批量渲染
- 响应式像素比处理
- 组件销毁时的资源清理

## 未来扩展

- [ ] 添加更多树木种类和植被
- [ ] 实现动态风场效果
- [ ] 添加水体和倒影
- [ ] 支持第一人称视角漫游
- [ ] 添加音效系统
- [ ] 实现时间流逝加速/减速
- [ ] 添加季节变换效果

## 许可证

MIT License
