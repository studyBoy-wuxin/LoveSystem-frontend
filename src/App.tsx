import React, { FC, Suspense, useEffect} from 'react';
import Loading from "./assets/Loading";
import RouterIteration from "./component/Router/RouterIteration";
import {MyRouter} from "./API/RouteIndex";
import {RouteComponentProps, withRouter} from "react-router-dom";
import storageUtils from './util/storageUtil'
import {message} from "antd";
import {refreshToken} from "./API/Axios";

interface IProps extends RouteComponentProps{}
const App:FC<IProps> = (props:IProps)=>{


    useEffect(() => {
        (async ()=>{
            //返回一个对象则更新state，null则不操作
            const user = storageUtils.getUser()
            const {pathname} = props.location
            //路由信息是admin页面，需要验证的
            // if(pathname.indexOf('/admin') !== -1 && !user.token){
            //     //并不处在login页面而且storage中没有token
            //     message.error("用户尚未登录")
            //     props.history.push("/login")
            // }
            // if(user.token){
            //     const data = await refreshToken({token:user.token})
            //     if(data.flag === 'fail'){
            //         storageUtils.removeUser()
            //         storageUtils.saveUser({token:data.token})
            //     }
            // }
        })()
    }, [props]);
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <RouterIteration routeInfo={MyRouter}/>
            </Suspense>
        </>
    );
}

export default withRouter(App);
