import { request } from './api'
export const artc = params => request.get('/mp/v1_0/articles',{params})
export const chanl = () =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/channels'
    })
}
    export const dele = articleId =>{
    return request({
        method:'PUT',
        url:`/mp/v1_0/articles/${articleId}`
    })
}
    export const rr = (data, draft) => {
        return request({
            method:'POST',
            url:'/mp/v1_0/articles',
            params:{
                draft
            },
           data
           
        })
    }
    export const wz = activeid => request.get(`/mp/v1_0/articles/${activeid}`)
    export const xg = (activeid,draft,data) => {
        return request({
            url:`/mp/v1_0/articles/${activeid}`,
            method:'PUT',
            params:{
                draft
            },
            data
        })
    }
    export const zt = (articleid,allowcomment) =>{
        return request({
            url:'/mp/v1_0/comments/status',
            method:'PUT',
            params:{
                article_id:articleid
            },
            data:{
                allow_comment:allowcomment
            }
        })
    }