import { useState, useMemo } from 'react'

function App() {
  const [currentMinute, setCurrentMinute] = useState(0)
  const [peoplePerMinute, setPeoplePerMinute] = useState(2)
  const [maxMinutes, setMaxMinutes] = useState(10)

  const simulationData = useMemo(() => {
    const data = []
    let totalPeople = 1
    let newPeople = 1

    for (let minute = 0; minute <= maxMinutes; minute++) {
      if (minute === 0) {
        newPeople = 1
        totalPeople = 1
      } else {
        newPeople = Math.pow(peoplePerMinute, minute)
        totalPeople += newPeople
      }

      data.push({
        minute,
        newPeople,
        totalPeople,
        formula: `${peoplePerMinute}^${minute}`,
      })
    }
    return data
  }, [peoplePerMinute, maxMinutes])

  const currentData = simulationData[currentMinute]

  const handleNext = () => {
    if (currentMinute < maxMinutes) {
      setCurrentMinute(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentMinute > 0) {
      setCurrentMinute(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentMinute(0)
  }

  const handleGoTo = (minute) => {
    setCurrentMinute(minute)
  }

  const renderTree = () => {
    const nodes = []
    const levels = Math.min(currentMinute + 1, 6)

    for (let level = 0; level < levels; level++) {
      const count = Math.pow(peoplePerMinute, level)
      const displayCount = Math.min(count, 16)
      const isMore = count > 16

      nodes.push(
        <div key={level} className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            第 {level} 分钟 ({count} 人)
          </p>
          <div className="flex justify-center flex-wrap gap-2">
            {Array.from({ length: displayCount }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${
                  level === currentMinute
                    ? 'bg-blue-500'
                    : level < currentMinute
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >
                👤
              </div>
            ))}
            {isMore && (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  level <= currentMinute ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                +{count - 16}
              </div>
            )}
          </div>
        </div>
      )
    }

    return nodes
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-blue-500 text-white rounded-lg p-6 text-center">
            <h1 className="text-3xl font-bold">📢 消息传播模拟器</h1>
            <p className="mt-2 opacity-90">理解指数增长的神奇力量</p>
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                每人每分钟传递给几个人？
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={peoplePerMinute}
                onChange={(e) => {
                  setPeoplePerMinute(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))
                  setCurrentMinute(0)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                模拟多少分钟？
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={maxMinutes}
                onChange={(e) => {
                  const value = Math.min(20, Math.max(1, parseInt(e.target.value) || 1))
                  setMaxMinutes(value)
                  if (currentMinute > value) setCurrentMinute(value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className={`rounded-lg shadow p-6 text-center ${currentData.newPeople > 100 ? 'bg-orange-50' : 'bg-blue-50'}`}>
              <p className="text-sm text-gray-600">当前时间</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                第 {currentMinute} 分钟
              </p>
              <p className="text-sm text-gray-500 mt-1">
                共 {maxMinutes} 分钟
              </p>
            </div>
          </div>

          {/* Stats and Tree */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">📊 统计数据</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">本分钟新增</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {currentData.newPeople.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      公式: {currentData.formula}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">累计总人数</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                      {currentData.totalPeople.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      等比数列求和
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="font-bold text-yellow-700 mb-2">
                    💡 有趣的事实：
                  </p>
                  <p className="text-sm text-yellow-800">
                    如果每人每分钟告诉 {peoplePerMinute} 个新的人，
                    那么在第 {maxMinutes} 分钟时，
                    总共有 <strong>{simulationData[maxMinutes].totalPeople.toLocaleString()}</strong> 人知道这个消息！
                  </p>
                </div>
              </div>
            </div>

            {/* Tree */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">🌳 传播树状图</h2>
              </div>
              <div className="p-6">
                <div className="text-center max-h-96 overflow-y-auto">
                  {renderTree()}
                </div>
                <hr className="my-4" />
                <div className="text-sm text-gray-600 text-center">
                  <div className="flex justify-center gap-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      已传播
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      当前传播
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      尚未传播
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">📈 数据变化表</h2>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-3 text-left font-bold">分钟</th>
                    <th className="px-4 py-3 text-left font-bold">本分钟新增</th>
                    <th className="px-4 py-3 text-left font-bold">计算公式</th>
                    <th className="px-4 py-3 text-left font-bold">累计总人数</th>
                    <th className="px-4 py-3 text-left font-bold">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {simulationData.map((data, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        index === currentMinute
                          ? 'bg-blue-100'
                          : index < currentMinute
                          ? 'bg-green-50'
                          : 'bg-white'
                      }`}
                      onClick={() => handleGoTo(index)}
                    >
                      <td className={`px-4 py-3 ${index === currentMinute ? 'font-bold' : ''}`}>
                        第 {data.minute} 分钟
                      </td>
                      <td className="px-4 py-3 font-bold text-green-600">
                        {data.newPeople.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          {data.formula} = {data.newPeople}
                        </code>
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-600">
                        {data.totalPeople.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {index === currentMinute ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            当前
                          </span>
                        ) : index < currentMinute ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            已完成
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            待传播
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex">
                <button
                  onClick={handlePrev}
                  disabled={currentMinute === 0}
                  className={`px-6 py-3 rounded-l-lg border border-gray-300 font-medium transition-colors ${
                    currentMinute === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ⏮️ 上一分钟
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-t border-b border-gray-300 bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  🔄 重置
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentMinute === maxMinutes}
                  className={`px-6 py-3 rounded-r-lg border border-gray-300 font-medium transition-colors ${
                    currentMinute === maxMinutes
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  下一分钟 ⏭️
                </button>
              </div>

              <button
                onClick={() => setCurrentMinute(maxMinutes)}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
              >
                ▶️ 直接播放到最后
              </button>
            </div>
          </div>

          {/* Math Explanation */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">📚 数学原理解释</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-blue-700">
                  1. 指数增长公式
                </h3>
                <p className="text-lg font-bold text-center my-4">
                  第 n 分钟新增人数 = {peoplePerMinute}<sup>n</sup>
                </p>
                <p className="text-gray-700">
                  在第 0 分钟，只有 1 个人知道消息。
                  在第 1 分钟，这个人告诉 {peoplePerMinute} 个新的人。
                  在第 2 分钟，这 {peoplePerMinute} 个人每人又告诉 {peoplePerMinute} 个新的人，
                  所以新增了 {peoplePerMinute} × {peoplePerMinute} = {peoplePerMinute * peoplePerMinute} 人。
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-green-700">
                  2. 等比数列求和公式
                </h3>
                <p className="text-lg font-bold text-center my-4">
                  累计总人数 = 1 + {peoplePerMinute} + {peoplePerMinute}² + ... + {peoplePerMinute}<sup>n</sup>
                </p>
                <p className="text-lg font-bold text-center my-2">
                  = ({peoplePerMinute}<sup>n+1</sup> - 1) ÷ ({peoplePerMinute} - 1)
                </p>
                <p className="text-gray-700">
                  这是一个等比数列求和问题。
                  首项 a₁ = 1，公比 r = {peoplePerMinute}，
                  前 n+1 项的和就是累计知道消息的总人数。
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-purple-700">
                  3. 指数增长的威力
                </h3>
                <p className="text-gray-700">
                  指数增长最神奇的地方在于：刚开始增长很慢，但越到后面增长越快！
                </p>
                <p className="text-gray-700 mt-2">
                  比如：
                </p>
                <p className="text-gray-700 mt-2">
                  • 第 0 分钟：1 人
                </p>
                <p className="text-gray-700">
                  • 第 5 分钟：{Math.pow(peoplePerMinute, 5).toLocaleString()} 人
                </p>
                <p className="text-gray-700">
                  • 第 {maxMinutes} 分钟：{Math.pow(peoplePerMinute, maxMinutes).toLocaleString()} 人！
                </p>
                <p className="text-gray-700 mt-2 font-bold text-purple-700">
                  这就是为什么病毒会在人群中迅速传播，也是为什么复利投资在长期会带来巨大收益！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
