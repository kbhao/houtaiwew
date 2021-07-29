import axios from 'axios'

export const request = axios.create({
    baseURL:'http://api-toutiao-web.itheima.net',
 
})
request.interceptors.request.use(
    function(config){
        const user = JSON.parse(localStorage.getItem('token'))
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    },
    function (error){
        return Promise.reject(error)
    }
)