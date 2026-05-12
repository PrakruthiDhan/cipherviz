import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const englishFreq = {
  a: 8.2, b: 1.5, c: 2.8, d: 4.3, e: 12.7, f: 2.2, g: 2.0, h: 6.1,
  i: 7.0, j: 0.2, k: 0.8, l: 4.0, m: 2.4, n: 6.7, o: 7.5, p: 1.9,
  q: 0.1, r: 6.0, s: 6.3, t: 9.1, u: 2.8, v: 1.0, w: 2.4, x: 0.2,
  y: 2.0, z: 0.1
}

function FrequencyAnalysis() {
  const [text, setText] = useState('')
  const [chartData, setChartData] = useState([])

  function handleAnalyze() {
    if (!text) return
    const clean = text.toLowerCase().replace(/[^a-z]/g, '')
    const total = clean.length
    const counts = {}

    for (let char of clean) {
      counts[char] = (counts[char] || 0) + 1
    }

    const data = Object.keys(englishFreq).map(letter => ({
      letter: letter.toUpperCase(),
      'Your Text (%)': parseFloat(((counts[letter] || 0) / total * 100).toFixed(2)),
      'English (%)': englishFreq[letter]
    }))

    setChartData(data)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-purple-400 mb-8"> Frequency Analysis</h1>
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
        <textarea
          className="bg-gray-900 text-white rounded-lg p-3 resize-none"
          rows={3}
          placeholder="Enter any text to analyze..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
          onClick={handleAnalyze}
        >
          Analyze
        </button>

        {chartData.length > 0 && (
          <div className="mt-4">
            <p className="text-purple-400 font-bold mb-4">Letter Frequency Comparison:</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis dataKey="letter" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#a78bfa' }}
                />
                <Legend />
                <Bar dataKey="Your Text (%)" fill="#a78bfa" />
                <Bar dataKey="English (%)" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default FrequencyAnalysis