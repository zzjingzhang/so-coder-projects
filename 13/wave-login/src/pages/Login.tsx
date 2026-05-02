import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WaveInput from '../components/WaveInput';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    alert('登录成功！');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <style>{`
        @keyframes waveLetter {
          0% {
            transform: translateY(0);
            color: #64748b;
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(-8px);
            color: #8b5cf6;
          }
        }
      `}</style>
      
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl shadow-purple-200/50 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-4 shadow-lg shadow-purple-200">
              <i className="pi pi-user text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h1>
            <p className="text-gray-500">请登录您的账户</p>
          </div>

          <form onSubmit={handleSubmit}>
            <WaveInput
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入您的邮箱地址"
            />

            <WaveInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入您的密码"
            />

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">记住我</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
              >
                忘记密码？
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 shadow-lg shadow-purple-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/60 text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="pi pi-sign-in"></i>
              <span>登录</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              还没有账户？{' '}
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
              >
                立即注册
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">或者使用以下方式登录</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <i className="pi pi-google text-xl text-red-500"></i>
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <i className="pi pi-github text-xl text-gray-800"></i>
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <i className="pi pi-weixin text-xl text-green-500"></i>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
          © 2025 Wave Login. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
