#!/bin/bash

echo "======================================"
echo "当代舞蹈学院网站 - 项目启动脚本"
echo "======================================"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
  echo "正在安装项目依赖..."
  npm install
  echo "依赖安装完成！"
else
  echo "依赖已安装，跳过安装步骤"
fi

echo ""
echo "正在启动开发服务器..."
echo "服务器将在 http://localhost:5173 运行"
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
