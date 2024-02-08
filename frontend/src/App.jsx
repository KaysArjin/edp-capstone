import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginForm />
      <RegistrationForm />
    </>
  )
}

export default App
