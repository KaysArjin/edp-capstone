import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import OrgChartPage from './pages/OrgChartPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='App'>       
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='/landingpage'
                element={<LandingPage />}
            />
            <Route
                path='/orgchartpage'
                element={<OrgChartPage />}
            />
            <Route
                path='/orgchartpage'
                element={<ContactPage />}
            />
        </Routes>       
    </div>
    </BrowserRouter>
  )
}

export default App
