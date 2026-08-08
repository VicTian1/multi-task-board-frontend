import axios from "axios"

const apiClient = axios.create({
    baseURL:"http://localhost:8080",
    auth:{
        username:"userdemo",
        password:"test123"
    },
    timeout:5000,
})

export default apiClient