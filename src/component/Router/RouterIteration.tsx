import React, {FC, Fragment, ReactNode} from 'react'
import {IRouter} from "../../API/RouteIndex";
import {Route,Switch,Redirect} from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";

//定义props接口，指定包含IRouter[]类型的属性：routeInfo
interface IProps{
    routeInfo:IRouter[],
    // type:string
}

//返回路由组件，内部迭代
const RouterIteration:FC<IProps> = (props:IProps)=>{

    const arroundWithSwitch = (node:ReactNode)=>{
        return (
            <Switch>
                {node}
                <Redirect to='/PageNotFound'/>
            </Switch>
        )
    }

    //定义fn方法，为核心迭代方法,返回Route节点
    const fn = (route:IRouter[])=>{
        return route.map((item:IRouter)=>{
            if(item.children){
                //如果父路由的不需要Link，但是子路由又需要Link，那么就是需要把子路由用AppLayout包裹
                if(!item.IsLink && item.children.some((item)=> item.IsLink===true)){
                    if(!item.component){
                        return (
                            <Fragment key={item.key}>
                                <AppLayout>
                                    {arroundWithSwitch( fn(item.children))}
                                </AppLayout>
                            </Fragment>
                        )
                    }else{
                        return (
                            <Fragment key={item.key}>
                                <Route path={item.path} exact={item.exact}>
                                    {item.component}
                                </Route>
                                <AppLayout>
                                    {arroundWithSwitch( fn(item.children))}
                                </AppLayout>
                            </Fragment>
                        )
                    }
                }else if(item.IsLink && item.children.some((item)=> item.IsLink===true)){
                    //如果需要路由标签的，而且子路由也需要的，还有component组件的，就把组件渲染出来，再把子路由传进去
                    if(item.component){
                        return (
                            <Fragment key={item.key}>
                                <Route path={item.path} exact={item.exact}>
                                    {item.component}
                                </Route>
                                {arroundWithSwitch( fn(item.children))}
                            </Fragment>
                        )
                    }else{
                        //如果需要路由标签的，而且子路由也需要的，但是没有component组件的，就把子路由传进去即可
                        return (
                            <Fragment key={item.key}>
                                {arroundWithSwitch( fn(item.children))}
                            </Fragment>
                        )
                    }
                }else return null           //其他的就：1、不需要渲染Link的，而且子路由也不需要的(没有这种情况)；2、需要渲染Link的，但是子路由不需要(没有这种情况)
            }else{
                //没有children就得有个component
                return (
                    <Route key={item.path} path={item.path} exact={item.exact}>
                        {item.component}
                    </Route>
                )}
        })
    }
    return (
        //使用Switch包裹，匹配到第一个符合的路由就会停止
        <Switch>
            {fn(props.routeInfo)}
            <Redirect to='/admin'/>
            {/*<Redirect from={"localhost:3000"} to={"/admin"} />*/}
        </Switch>
    )
}

export default RouterIteration