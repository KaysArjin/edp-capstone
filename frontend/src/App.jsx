import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import SendMessagePage from './pages/SendMessagePage';
import ContactPage from './pages/ContactPage';

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState("")

  const handleUsername = (u) => {setUsername(u)}; 
  console.log(username)

  return (
    <BrowserRouter>
    <div className='App'>       
        <Routes>
            <Route
                path='/'
                element={<HomePage username = {username} handleUsername = {handleUsername}/>}
            />
            <Route
                path='/landingpage'
                element={<LandingPage  username = {username} handleUsername = {handleUsername}/>}
            />
            <Route
                path='/sendmessagepage'
                element={<SendMessagePage  username = {username} handleUsername = {handleUsername}/>}
            />
            <Route
                path='/contactpage'
                element={<ContactPage  username = {username} handleUsername = {handleUsername}/>}
            />
        </Routes>       
    </div>
    </BrowserRouter>
  )
}

export default App
