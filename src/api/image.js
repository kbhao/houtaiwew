import {request} from '@/api/api'
export const uploadImage = data =>{
    return request({
        method:'POST',
        url:'/mp/v1_0/user/images',
        data
    })
}
export const getImages = params =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/user/images',
        params
    })
}
export const acav = photo =>{
    return request({
        url:'/mp/v1_0/user/photo',
        method:'PATCH',
        photo
    })
}
export const gxyh = data => request.patch('/mp/v1_0/user/profile',data)