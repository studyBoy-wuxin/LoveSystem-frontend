import React, { FC, Suspense, useEffect, useState} from 'react';
import AppLayout from "./component/AppLayout/AppLayout";
import Loading from "./assets/Loading";
import RouterIteration from "./component/Router/RouterIteration";
import {MyRouter,OtherRouter} from "./API/RouteIndex";
import {RouteComponentProps, withRouter} from "react-router-dom";
import storageUtils from './util/storageUtil'
import {message} from "antd";
import {refreshToken} from "./API/Axios";

interface IProps extends RouteComponentProps{}
const App:FC<IProps> = (props:IProps)=>{

    const [isLogin,setIsLogin] = useState(false)

    useEffect(() => {
        (async ()=>{
            //返回一个对象则更新state，null则不操作
            const user = storageUtils.getUser()
            const {pathname} = props.location
            if(pathname !== '/login' && pathname !== '/register'){
                if(user.token){
                    setIsLogin(true)
                }else{
                    //并不处在login页面而且storage中没有token
                    message.error("用户尚未登录")
                    setIsLogin(false)
                    props.history.push("/login")
                }
            }
            if(user.token){
                const data = await refreshToken({token:user.token})
                if(data.flag === 'fail'){
                    storageUtils.removeUser()
                    storageUtils.saveUser({token:data.token})
                }
            }
        })()

    }, [props]);
    return (
        <>
            <Suspense fallback={<Loading/>}>
            {
                isLogin?(
                    <AppLayout>
                            <RouterIteration routeInfo={MyRouter}/>
                    </AppLayout>
                ):<RouterIteration routeInfo={OtherRouter}/>
            }
            </Suspense>
        </>
    );
}

export default withRouter(App);
