import request from './axiosBox'
//登录的请求
export const login = (params:any)=>request('/login',params,'post')

export const getA = ()=> request('/a')

export const refreshToken = (params:{token:string})=> request('/refreshToken',params)