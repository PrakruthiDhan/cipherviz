import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-8">
      <h1 className="text-5xl font-bold text-purple-400 mb-4">CipherViz</h1>
      <p className="text-gray-400 text-xl mb-8 text-center max-w-2xl">
        An interactive tool to visualize classical cryptographic techniques and the methods used to break them.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        <div
          onClick={() => navigate('/encrypt')}
          className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-purple-900 transition-colors"
        >
          <h2 className="text-purple-400 font-bold text-xl mb-2"> Encrypt & Decrypt</h2>
          <p className="text-gray-400">Visualize Caesar and Vigenère ciphers with step-by-step animations.</p>
        </div>
        <div
          onClick={() => navigate('/bruteforce')}
          className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-purple-900 transition-colors"
        >
          <h2 className="text-purple-400 font-bold text-xl mb-2"> Brute Force</h2>
          <p className="text-gray-400">Watch all 25 Caesar shifts tried automatically until the message is cracked.</p>
        </div>
        <div
          onClick={() => navigate('/frequency')}
          className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-purple-900 transition-colors"
        >
          <h2 className="text-purple-400 font-bold text-xl mb-2"> Frequency Analysis</h2>
          <p className="text-gray-400">Compare letter frequencies to standard English to reveal cipher patterns.</p>
        </div>
      </div>
    </div>
  )
}

export default Home