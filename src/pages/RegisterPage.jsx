import React from "react"
import apiClient from "../api/axios"
import { toast } from 'react-toastify'

export default function RegisterPage({onSwitchToLogin}){
    const [username,setUsername]=React.useState("")
    const [password,setPassword]=React.useState("")

    function handleRegister(e){
        e.preventDefault()
        apiClient.post("/api/auth/register",{"username":username,"password":password})
        .then(()=>{
            toast.success("Account registered successfully!")
            onSwitchToLogin()
            
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
                    Join Us
                </div>
                <form className="register-login-form" onSubmit={e=>handleRegister(e)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" value={username} type="text" placeholder="Please enter your username"
                        onChange={e=>setUsername(e.target.value)} 
                        required  minLength={4} maxLength={16} pattern="[a-zA-Z0-9_]{4,16}$"
                        title="Username must be 4-16 characters long and contain only letters,numbers, and underscores"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" value={password} type="password" placeholder="Please enter your password" 
                        onChange={e=>setPassword(e.target.value)}
                        required minLength={8} maxLength={32} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,32}$"
                        title="Password must be 8-32 characters long and contain both letters and numbers"
                        />
                    </div>
                    <button>Sign Up</button>
                </form>
                <div className="register-login-footer">
                    Already have an account?
                    <button type="button" className="btn-link" onClick={onSwitchToLogin}>Log In</button>
                </div>
            </div>
        </div>
    )
}