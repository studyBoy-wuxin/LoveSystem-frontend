import axios from 'axios'

type IMethod = 'get'|'post'|'delete'|'PATCH'

//封装一个异步请求处理的组件
//URL就是访问的地址
//deps就是需要监听的属性，默认是[]，没有的话就如componentDidMount一样调用一次
const axiosBox = (url :string, params?:{[name:string]:any}, method:IMethod = 'get' )=>{
    return axios({
        baseURL:'http://localhost:8080/LoveSystem',
        timeout:5000,
        url,
        method,
        params
    }).then(resp=>Promise.resolve(resp.data))
        .catch(err=>Promise.reject(err.message))
}
export  default  axiosBox