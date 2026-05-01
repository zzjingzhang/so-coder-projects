import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import RichTextEditor from './components/RichTextEditor';
import './App.css';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">欢迎使用富文本表格编辑器</h1>
      <p className="mb-6 text-gray-700">
        这是一个功能强大的富文本编辑器，支持表格编辑功能。您可以：
      </p>
      <ul className="list-disc pl-8 mb-6 text-gray-700">
        <li className="mb-2">插入、删除行和列</li>
        <li className="mb-2">合并和拆分单元格</li>
        <li className="mb-2">自定义表格样式（边框、背景色、文字颜色等）</li>
        <li className="mb-2">使用弹出层工具栏进行表格操作</li>
      </ul>
      <Link 
        to="/editor" 
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        开始使用编辑器
        <i className="pi pi-arrow-right ml-2"></i>
      </Link>
    </div>
  );
};

const EditorPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">富文本编辑器</h1>
      <RichTextEditor />
    </div>
  );
};

const About = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">关于</h1>
      <div className="text-gray-700 space-y-4">
        <p>
          这是一个基于 React、Vite、Tailwind CSS 和 PrimeReact 构建的富文本编辑器，
          专门设计用于支持高级表格编辑功能。
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3">主要功能</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>富文本编辑（加粗、斜体、下划线、对齐方式等）</li>
          <li>表格插入和编辑</li>
          <li>行和列的插入与删除</li>
          <li>单元格合并与拆分</li>
          <li>表格样式自定义</li>
          <li>弹出层工具栏</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3">技术栈</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>React 19.x</li>
          <li>Vite 8.x</li>
          <li>Tailwind CSS 4.x</li>
          <li>PrimeReact 11.x</li>
          <li>React Router 7.x</li>
        </ul>
      </div>
    </div>
  );
};

function App() {
  const items = [
    {
      label: '首页',
      icon: 'pi pi-home',
      command: () => window.location.href = '/'
    },
    {
      label: '编辑器',
      icon: 'pi pi-pencil',
      command: () => window.location.href = '/editor'
    },
    {
      label: '关于',
      icon: 'pi pi-info',
      command: () => window.location.href = '/about'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Menubar model={items} className="mb-4" />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
