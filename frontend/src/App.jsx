import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';

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
        </Routes>       
    </div>
    </BrowserRouter>
  )
}

export default App
