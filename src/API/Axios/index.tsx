import request from './axiosBox'

export const getA = ()=> request('/a')

export const refreshToken = (params:{token:string})=> request('/refreshToken',params)