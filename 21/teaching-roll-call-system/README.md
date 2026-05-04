# 教课点名系统

一个使用Vue 3 + Vite构建的趣味点名系统，采用卡通风格设计，带有丰富的动画效果。

## 项目结构

```
teaching-roll-call-system/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── router/
│   │   └── index.js          # 路由配置
│   ├── views/
│   │   └── RollCallView.vue  # 点名系统主视图
│   ├── App.vue               # 根组件
│   ├── main.js               # 入口文件
│   └── style.css             # 全局样式和动画
├── index.html                # HTML模板
├── package.json              # 依赖配置
├── postcss.config.js         # PostCSS配置
├── tailwind.config.js        # Tailwind CSS配置
└── vite.config.js            # Vite配置
```

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI组件库**: Ant Design Vue
- **路由**: Vue Router
- **打包工具**: Vite

## 功能特性

1. **卡通风格界面**: 采用渐变背景和卡通元素设计
2. **名字滚动动画**: 点击"开始点名"后，同学名字以滚动方式显示（1秒2个名字）
3. **音乐效果**: 点名过程中播放简单的旋律音效
4. **倒计时显示**: 显示10秒倒计时
5. **随机选中**: 10秒后随机选中一位同学
6. **庆祝动画**: 选中同学名字显示五彩缤纷的庆祝动画
7. **名字卡片**: 底部显示所有同学名字的卡片，点名时边缘有彩虹闪烁效果
8. **重新开始**: 选中后点击按钮可重置并重新开始

## 同学名单

张三、李四、王五、赵六、钱七、孙八、刘刘、黄一、张久、郭及、黄小小、陈友友、赵词、陈戉、温开

## 安装和运行

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd teaching-roll-call-system
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. 打开页面后，点击中间的"开始点名"按钮
2. 同学名字开始滚动显示，同时播放音乐
3. 倒计时显示剩余时间（10秒）
4. 10秒后随机选中一位同学，名字显示庆祝动画
5. 点击"重新开始"按钮可以重置状态，再次进行点名

## 动画效果

- **滚动动画**: 名字垂直滚动切换
- **彩虹边框**: 点名时底部名字卡片边缘彩虹色闪烁
- **庆祝动画**: 选中后名字颜色和大小变化
- **弹跳动画**: 选中后名字上下弹跳

## 开发说明

- 主视图组件: `src/views/RollCallView.vue`
- 路由配置: `src/router/index.js`
- 全局样式和动画: `src/style.css`
- 入口文件: `src/main.js`

## 许可证

MIT
