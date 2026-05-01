import { useState, useMemo } from 'react'

function CounterPage() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const charCount = text.replace(/\s/g, '').length
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const wordCount = text.trim() === '' ? 0 : words.length
    return { charCount, wordCount }
  }, [text])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          字符与单词计数器
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="开始输入文字..."
            className="w-full h-64 p-6 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-400 transition-colors text-gray-700 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center transform hover:scale-105 transition-transform">
            <div className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              {stats.charCount}
            </div>
            <div className="text-xl font-semibold text-gray-600">
              字符数（不计空格）
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10 text-center transform hover:scale-105 transition-transform">
            <div className="text-7xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
              {stats.wordCount}
            </div>
            <div className="text-xl font-semibold text-gray-600">
              单词数
            </div>
          </div>
        </div>

        <div className="text-center text-white/80 text-base">
          实时统计您输入的字符数（不计空格）和单词数
        </div>
      </div>
    </div>
  )
}

export default CounterPage
