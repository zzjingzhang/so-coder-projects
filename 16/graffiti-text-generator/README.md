# 涂鸦文本生成器 (Graffiti Text Generator)

一个基于 Angular 框架的涂鸦风格文本生成器，支持多种视觉效果和自定义选项。

## 项目简介

这是一个功能丰富的涂鸦文本生成器，允许用户创建具有街头艺术风格的文字效果。项目包含气泡字母、喷漆滴落、颜色填充、砖墙背景等多种视觉元素，完全符合城市艺术的美学风格。

## 技术栈

- **框架**: Angular 17+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 功能特性

### 视觉效果
- **气泡字母**: 圆润饱满的气泡字体风格
- **街头涂鸦**: 倾斜、有层次感的街头艺术风格
- **霓虹风格**: 闪烁发光的霓虹效果
- **复古风格**: 怀旧的复古涂鸦效果

### 背景选项
- **砖墙**: 经典的红砖墙面背景
- **混凝土**: 灰色混凝土质感背景
- **城市夜景**: 带有星空和建筑物的城市夜景
- **纯色背景**: 可自定义的纯色背景

### 自定义选项
- 文字内容输入
- 字体大小调整 (50px - 200px)
- 字母间距调整 (0px - 50px)
- 6种预设颜色选择
- 效果开关控制
  - 显示轮廓
  - 颜色填充
  - 喷漆滴落
- 一键随机样式
- 一键重置功能

## 项目结构

```
graffiti-text-generator/
├── src/
│   ├── app/
│   │   ├── graffiti-generator/
│   │   │   ├── graffiti-generator.component.ts
│   │   │   ├── graffiti-generator.component.html
│   │   │   ├── graffiti-generator.component.css
│   │   │   └── graffiti-generator.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── public/
│   └── favicon.ico
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 安装和运行

### 前置要求

确保你的开发环境已经安装以下软件：
- Node.js (建议版本 18.x 或更高)
- npm (Node.js 包管理器)
- Angular CLI (建议版本 17.x 或更高)

### 安装步骤

1. **克隆项目到本地**
   ```bash
   cd graffiti-text-generator
   ```

2. **安装项目依赖**
   ```bash
   npm install
   ```

### 启动开发服务器

```bash
ng serve
```

或

```bash
npm start
```

服务器启动后，打开浏览器访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 使用说明

### 基本操作

1. **输入文字**: 在"输入文本"框中输入你想要生成的文字
2. **选择风格**: 从下拉菜单中选择喜欢的涂鸦风格
3. **选择背景**: 选择合适的背景效果
4. **调整颜色**: 点击颜色按钮选择文本颜色
5. **调整大小**: 使用滑块调整字体大小和字母间距
6. **控制效果**: 使用开关控制轮廓、填充和滴落效果
7. **生成预览**: 点击"生成涂鸦"按钮应用所有设置
8. **随机样式**: 点击"随机样式"获取随机组合
9. **重置设置**: 点击"重置"按钮恢复默认设置

### 效果说明

- **气泡字母**: 圆润、饱满的字体，适合需要可爱或活泼风格的场景
- **街头涂鸦**: 倾斜的字体和粗重的轮廓，展现真正的街头艺术感
- **霓虹风格**: 发光的文字效果，带有闪烁动画，适合夜间场景
- **复古风格**: 带有旧时代感觉的字体，适合怀旧主题

### 背景说明

- **砖墙**: 经典的红砖纹理，为涂鸦提供真实的墙面质感
- **混凝土**: 灰色的水泥墙面，适合工业风格的涂鸦
- **城市夜景**: 带有星空和建筑物轮廓的夜景背景，营造都市氛围
- **纯色背景**: 可自定义的纯色背景，适合需要简洁背景的场景

## 开发指南

### 项目架构

- **AppModule**: 应用的根模块，引入所有必要的模块和组件
- **AppRoutingModule**: 路由配置模块，管理应用的导航
- **GraffitiGeneratorComponent**: 主要的功能组件，包含所有涂鸦生成逻辑

### 样式系统

项目使用 Tailwind CSS 作为主要的样式框架，结合自定义 CSS 实现特殊的涂鸦效果：

- `tailwind.config.js`: Tailwind 配置文件
- `postcss.config.js`: PostCSS 配置文件
- `src/styles.css`: 全局样式，引入 Tailwind 基础样式
- `src/app/graffiti-generator/graffiti-generator.component.css`: 组件特定样式，包含所有涂鸦效果

### 扩展功能

如果你想添加新的涂鸦风格，可以：

1. 在 `graffiti-generator.component.ts` 中的 `graffitiStyles` 数组添加新风格
2. 在 `graffiti-generator.component.css` 中添加对应的样式类
3. 在组件模板中确保新风格被正确应用

## 技术细节

### 响应式设计

项目完全采用响应式设计，支持：
- 桌面端 (1024px 以上)
- 平板端 (768px - 1024px)
- 移动端 (768px 以下)

### 性能优化

- 使用 Angular 的 Change Detection 机制优化渲染
- 样式采用模块化组织，避免样式冲突
- 动画效果使用 CSS 实现，确保流畅性

### 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issue: [GitHub Issues](https://github.com/your-repo/issues)
- 邮件: your-email@example.com

## 致谢

- Angular 团队提供优秀的框架
- Tailwind CSS 团队提供强大的样式工具
- NG-ZORRO 团队提供精美的 UI 组件
- 所有街头艺术家为这个项目提供的灵感

---

© 2026 涂鸦文本生成器 | 用艺术点亮城市
