import React from "react"
import apiClient from "../api/axios"
import { toast } from 'react-toastify'
export default function LoginPage({onSwitchToRegister,loginSuccess}){
    const [username,setUsername]=React.useState("")
    const [password,setPassword]=React.useState("")

    function handleLogin(e){
        e.preventDefault()
        apiClient.post("/api/auth/login",{"username":username,"password":password})
        .then(response=>{
            toast.success("Login successful!")
            localStorage.setItem("token",response.data.token)
            loginSuccess()
            
    })
        .catch(error=>{
            const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
            toast.error(errorMsg)
        }
        )
  }

    return (
        <div className="form-overlay">
            <div className="register-login-card">
                <div className="register-login-header">
                    Welcome Back
                </div>
                <form className="register-login-form" onSubmit={e=>handleLogin(e)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" value={username} type="text" placeholder="Please enter your username"
                        onChange={e=>setUsername(e.target.value)} 
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" value={password} type="password" placeholder="Please enter your password" 
                        onChange={e=>setPassword(e.target.value)}
                        required 
                        />
                    </div>
                    <button>Sign In</button>
                </form>
                <div className="register-login-footer">
                    Don't have an account?
                    <button type="button" className="btn-link" onClick={onSwitchToRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}