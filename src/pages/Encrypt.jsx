import { useState } from 'react'
import { motion } from 'framer-motion'

function Encrypt() {
  const [plaintext, setPlaintext] = useState('')
  const [key, setKey] = useState('')
  const [cipher, setCipher] = useState('caesar')
  const [result, setResult] = useState('')
  const [steps, setSteps] = useState([])

  function caesarEncrypt(text, shift) {
    shift = parseInt(shift)
    let output = ''
    let stepList = []
    for (let i = 0; i < text.length; i++) {
      let char = text[i]
      if (char.match(/[a-zA-Z]/)) {
        let base = char === char.toUpperCase() ? 65 : 97
        let encrypted = String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base)
        stepList.push(`${char} + ${shift} = ${encrypted}`)
        output += encrypted
      } else {
        output += char
        stepList.push(`${char} → unchanged`)
      }
    }
    return { output, stepList }
  }

  function vigenereEncrypt(text, keyword) {
    keyword = keyword.toLowerCase()
    let output = ''
    let stepList = []
    let ki = 0
    for (let i = 0; i < text.length; i++) {
      let char = text[i]
      if (char.match(/[a-zA-Z]/)) {
        let base = char === char.toUpperCase() ? 65 : 97
        let shift = keyword[ki % keyword.length].charCodeAt(0) - 97
        let encrypted = String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base)
        stepList.push(`${char} + ${keyword[ki % keyword.length]}(${shift}) = ${encrypted}`)
        output += encrypted
        ki++
      } else {
        output += char
        stepList.push(`${char} → unchanged`)
      }
    }
    return { output, stepList }
  }

  async function handleEncrypt() {
    if (!plaintext || !key) return
    let res
    if (cipher === 'caesar') {
      res = caesarEncrypt(plaintext, key)
    } else {
      res = vigenereEncrypt(plaintext, key)
    }
    setResult(res.output)
    setSteps(res.stepList)

    // Save to backend
    await fetch('http://localhost:5000/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operation: 'encrypt',
        cipherType: cipher,
        inputText: plaintext,
        key: key,
        outputText: res.output
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-purple-400 mb-8"> Encrypt</h1>
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
        <textarea
          className="bg-gray-900 text-white rounded-lg p-3 resize-none"
          rows={3}
          placeholder="Enter plaintext..."
          value={plaintext}
          onChange={e => setPlaintext(e.target.value)}
        />
        <input
          className="bg-gray-900 text-white rounded-lg p-3"
          placeholder={cipher === 'caesar' ? 'Enter shift number (e.g. 3)' : 'Enter keyword (e.g. KEY)'}
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <select
          className="bg-gray-900 text-white rounded-lg p-3"
          value={cipher}
          onChange={e => setCipher(e.target.value)}
        >
          <option value="caesar">Caesar Cipher</option>
          <option value="vigenere">Vigenère Cipher</option>
        </select>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>
        {result && (
          <div className="bg-gray-900 rounded-lg p-4 mt-2">
            <p className="text-purple-400 font-bold mb-2">Result:</p>
            <p className="text-green-400 text-xl font-mono">{result}</p>
          </div>
        )}
        {steps.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-4 mt-2 max-h-48 overflow-y-auto">
            <p className="text-purple-400 font-bold mb-2">Step-by-step:</p>
            {steps.map((step, i) => (
              <motion.p
                key={i}
                className="text-gray-300 font-mono text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {step}
              </motion.p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Encrypt