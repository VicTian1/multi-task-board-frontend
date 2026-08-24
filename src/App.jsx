import './App.css'
import React from "react"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import TaskBoard from './components/TaskBoard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
function App() {
 
  const [authMode,setAuthMode]=React.useState(localStorage.getItem("token")?"board":"login")
 

  

  

  function onSwitchToLogin(){
    setAuthMode('login')
  }

  function onSwitchToRegister(){
    setAuthMode('register')
  }

  function loginSuccess(){
    setAuthMode('board')
  }
  function handleLogout(){
        localStorage.removeItem("token")
        onSwitchToLogin()
    }


  return (
    
    <>
      {authMode==='register' && <RegisterPage onSwitchToLogin={onSwitchToLogin}/>}
      {authMode==='login' && <LoginPage onSwitchToRegister={onSwitchToRegister} loginSuccess={loginSuccess}/>}
      {authMode==='board' && <TaskBoard handleLogout={handleLogout} />}
      <ToastContainer position='top-right' autoClose={3000} />
    </>
    
  )
}

export default App
