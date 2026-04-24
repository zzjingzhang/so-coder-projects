import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = '正在生成您的个人网站...' }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0f172a]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin-custom" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary animate-pulse-custom"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-slate-800 dark:text-slate-100">{message}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">请稍候，这可能需要几秒钟</p>
        </div>
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              style={{
                animation: `bounce 1.4s infinite ease-in-out both`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
