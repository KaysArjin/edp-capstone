import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import SendMessagePage from './pages/SendMessagePage';
import ContactPage from './pages/ContactPage';

function App() {
  const [count, setCount] = useState(0)
  const [password, setPassword] = useState("")

  const handleUsername = (p) => {setPassword(p)};

  console.log(password)

  return (
    <BrowserRouter>
    <div className='App'>       
        <Routes>
            <Route
                path='/'
                element={<HomePage username = {password} handleUsername = {handleUsername}/>}
            />
            <Route
                path='/landingpage'
                element={<LandingPage />}
            />
            <Route
                path='/sendmessagepage'
                element={<SendMessagePage />}
            />
            <Route
                path='/contactpage'
                element={<ContactPage />}
            />
        </Routes>       
    </div>
    </BrowserRouter>
  )
}

export default App
