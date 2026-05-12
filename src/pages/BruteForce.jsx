import { useState } from 'react'
import { motion } from 'framer-motion'

function BruteForce() {
  const [ciphertext, setCiphertext] = useState('')
  const [results, setResults] = useState([])
  const [found, setFound] = useState(null)

  const commonWords = ['the', 'and', 'is', 'in', 'it', 'of', 'to', 'a', 'that', 'was', 'he', 'she', 'they', 'we', 'are', 'for', 'on', 'with', 'as', 'at']

  function caesarDecrypt(text, shift) {
    let output = ''
    for (let i = 0; i < text.length; i++) {
      let char = text[i]
      if (char.match(/[a-zA-Z]/)) {
        let base = char === char.toUpperCase() ? 65 : 97
        output += String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base)
      } else {
        output += char
      }
    }
    return output
  }

  function looksLikeEnglish(text) {
    const words = text.toLowerCase().split(/\s+/)
    return words.some(word => commonWords.includes(word))
  }

  function handleBruteForce() {
    if (!ciphertext) return
    let allResults = []
    let foundShift = null

    for (let shift = 1; shift <= 25; shift++) {
      let decrypted = caesarDecrypt(ciphertext, shift)
      let isEnglish = looksLikeEnglish(decrypted)
      if (isEnglish && !foundShift) foundShift = shift
      allResults.push({ shift, decrypted, isEnglish })
    }

    setResults(allResults)
    setFound(foundShift)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-purple-400 mb-8">Brute Force Attack</h1>
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
        <textarea
          className="bg-gray-900 text-white rounded-lg p-3 resize-none"
          rows={3}
          placeholder="Enter Caesar ciphertext..."
          value={ciphertext}
          onChange={e => setCiphertext(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
          onClick={handleBruteForce}
        >
          Run Brute Force
        </button>

        {found && (
          <div className="bg-green-900 rounded-lg p-4">
            <p className="text-green-400 font-bold">✅ Likely key found: Shift {found}</p>
            <p className="text-white font-mono">{results[found - 1]?.decrypted}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-4 max-h-72 overflow-y-auto flex flex-col gap-2">
            <p className="text-purple-400 font-bold mb-2">All 25 shifts:</p>
            {results.map((r, i) => (
              <motion.div
                key={i}
                className={`p-2 rounded font-mono text-sm ${r.isEnglish ? 'bg-green-800 text-green-200' : 'text-gray-400'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <span className="text-purple-400 mr-2">Shift {r.shift}:</span>
                {r.decrypted}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BruteForce