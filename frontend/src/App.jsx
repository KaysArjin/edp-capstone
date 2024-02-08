import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Header />
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='landing'
                element={<LandingPage />}
            />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
