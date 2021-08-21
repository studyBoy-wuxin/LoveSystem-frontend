import React, {FC,Fragment} from 'react'
import {IRouter} from "../../API/RouteIndex";
import {Route,Switch,Redirect} from "react-router-dom";

//定义props接口，指定包含IRouter[]类型的属性：routeInfo
interface IProps{
    routeInfo:IRouter[]
}

//返回路由组件，内部迭代
const RouterIteration:FC<IProps> = (props:IProps)=>{

    //定义fn方法，为核心迭代方法
    const fn:any = (route:IRouter[])=>{
        return route.map((item)=>{
            if(item.children){
                if(item.component){
                    return (
                        <Fragment>
                            <Route key={item.path} path={item.path} exact={item.exact}>
                                {item.component}
                            </Route>
                            {//如果包含子组件，那么就将子组件代入继续迭代
                                fn(item.children)}
                        </Fragment>
                    )
                }else{
                    return fn(item.children)
                }
            }else{
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
            {/*<Redirect to='/PageNotFound'/>*/}
        </Switch>
    )
}

export default RouterIteration