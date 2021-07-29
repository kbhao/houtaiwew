import { request } from './api'
export const user = () => {
    return request({
        method:'GET',
        url:'/mp/v1_0/user/profile'
    })
}