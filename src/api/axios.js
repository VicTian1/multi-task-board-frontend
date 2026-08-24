import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    timeout: 5000,
})
apiClient.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },(error)=>{
        return Promise.reject(error);
    }
        
)
apiClient.interceptors.response.use(
    (response)=>response ,
    (error)=>{
        if(error.response){
            const status=error.response.status
            const url=error.config.url
            const isAuthRequest=url.includes('/api/auth/login')||
            url.includes('/api/auth/register')
            if(status===401 && !isAuthRequest){
                localStorage.removeItem('token')
                window.location.href='/'
            }
            
        }
        return Promise.reject(error)
    }
)


export default apiClient