import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Encrypt from './pages/Encrypt'
import Decrypt from './pages/Decrypt'
import BruteForce from './pages/BruteForce'
import FrequencyAnalysis from './pages/FrequencyAnalysis'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/decrypt" element={<Decrypt />} />
        <Route path="/bruteforce" element={<BruteForce />} />
        <Route path="/frequency" element={<FrequencyAnalysis />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App