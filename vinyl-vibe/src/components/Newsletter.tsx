import React, { useState } from 'react';
import { MailIcon } from './Icons';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('请输入邮箱地址');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('请输入有效的邮箱地址');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 border border-purple-500/20 p-8 md:p-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-6">
              <MailIcon size={32} className="text-purple-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              订阅我们的音乐资讯
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              第一时间获取新碟上架、独家优惠、限量版唱片和音乐活动信息
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="输入您的邮箱地址"
                    className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      status === 'error'
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                    }`}
                    disabled={status === 'loading' || status === 'success'}
                  />
                  {status === 'error' && errorMessage && (
                    <p className="absolute -bottom-6 left-0 text-xs text-red-400">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                    status === 'success'
                      ? 'bg-green-500 cursor-default'
                      : status === 'loading'
                      ? 'bg-gray-600 cursor-wait'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>订阅中...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>订阅成功</span>
                    </>
                  ) : (
                    <>
                      <span>立即订阅</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-8">
              我们尊重您的隐私，绝不会向第三方分享您的信息
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
