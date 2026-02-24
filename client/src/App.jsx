import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AgeGate from './pages/AgeGate'
import Home from './pages/Home'
import Results from './pages/Results'
import Layout from './components/Layout'

function App() {
  const [ageVerified, setAgeVerified] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified')
    if (verified === 'true') {
      setAgeVerified(true)
    }
  }, [])

  const handleAgeVerification = (isOver21) => {
    if (isOver21) {
      setAgeVerified(true)
      localStorage.setItem('ageVerified', 'true')
    } else {
      // Redirect to a non-alcoholic version or show message
      window.location.href = 'https://www.example.com'
    }
  }

  if (!ageVerified) {
    return <AgeGate onVerify={handleAgeVerification} />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
