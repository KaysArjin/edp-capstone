import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
