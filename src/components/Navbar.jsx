import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex gap-6 items-center">
      <span className="font-bold text-xl text-purple-400 mr-4">CipherViz</span>
      <Link to="/" className="hover:text-purple-400">Home</Link>
      <Link to="/encrypt" className="hover:text-purple-400">Encrypt</Link>
      <Link to="/decrypt" className="hover:text-purple-400">Decrypt</Link>
      <Link to="/bruteforce" className="hover:text-purple-400">Brute Force</Link>
      <Link to="/frequency" className="hover:text-purple-400">Frequency Analysis</Link>
    </nav>
  )
}

export default Navbar