import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WaveInput from '../components/WaveInput';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('两次输入的密码不一致！');
      return;
    }
    console.log('Register submitted:', { username, email, password });
    alert('注册成功！');
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
              <i className="pi pi-user-plus text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">创建账户</h1>
            <p className="text-gray-500">请填写以下信息完成注册</p>
          </div>

          <form onSubmit={handleSubmit}>
            <WaveInput
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
            />

            <WaveInput
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱地址"
            />

            <WaveInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />

            <WaveInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入密码"
            />

            <div className="mb-6">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">
                  我已阅读并同意{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                    服务条款
                  </Link>{' '}
                  和{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                    隐私政策
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 shadow-lg shadow-purple-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/60 text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="pi pi-user-plus"></i>
              <span>注册</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              已有账户？{' '}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
              >
                立即登录
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
          © 2025 Wave Login. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
