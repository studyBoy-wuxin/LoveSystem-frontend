import {ReactNode,lazy} from "react";
import {
    DesktopOutlined,
    PieChartOutlined
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
    children ?:IRouter[],
    IsLink?:boolean             //是否展示路由链接
}

export const MyRouter:IRouter[] = [
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
    {
        key:'/PageNotFound',
        path:'/PageNotFound',
        component:<PageNotFound/>,
    },
    {
        key:'/admin',
        path:'/admin',
        title:'admin',
        IsLink:false,
        component:<></>,
        children:[
            {
                key:'/admin/AppUser',
                path:'/admin/AppUser',
                title:'AppUser',
                component:<AppUser/>,
                IsLink:true,
                icon:<DesktopOutlined/>,
            },
            {
                key:'/admin/Test',
                path:'/admin/Test',
                title:'Test',
                component:<Test/>,
                IsLink:true,
                children:[
                    {
                        key:'/admin/Test/AppUser',
                        path:'/admin/Test/AppUser',
                        title:'AppUser',
                        component:<AppUser/>,
                        IsLink:true,
                        icon:<DesktopOutlined/>,
                    },
                ],
                icon:<PieChartOutlined/>,
            },
        ]
    },
]
