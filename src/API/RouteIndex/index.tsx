import {ReactNode,lazy} from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
const PageNotFound = lazy(()=>import('../../Pages/PageNotFound/PageNotFound'));
const AppUser = lazy(()=>import('../../Pages/UserControl'))
const Test = lazy(()=>import('../../Pages/test'));
const Login = lazy(()=>import('../../Pages/Login'))
const Register = lazy(()=>import('../../Pages/Register'))
export interface IRouter{
    key:string,
    path:string,
    title?:string,
    exact?:boolean,
    component?:ReactNode,
    icon?:ReactNode,
    children ?:IRouter[]
}

export const MyRouter:IRouter[] = [
    {
        key:'/AppUser',
        path:'/AppUser',
        title:'AppUser',
        component:<AppUser/>,
        icon:<DesktopOutlined/>
    },
    {
        key:'/a',
        path:'/a',
        title:'a',
        component:<Test/>,
        icon:<PieChartOutlined/>,
    },
    {
        //路由匹配规则是从上往下，如果遇到路径找不到，那么就404
        key:'/PageNotFound',
        path:'/PageNotFound',
        title:'PageNotFound',
        component:<PageNotFound/>,
        icon:<FileOutlined/>
    }
]

export const OtherRouter:IRouter[] = [
    {
        key:'/login',
        path:'/login',
        component:<Login/>,
    },
    {
        key:'/register',
        path:'/register',
        component:<Register/>,
    },
]