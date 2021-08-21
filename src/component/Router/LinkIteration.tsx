import React, {FC, useEffect, useState} from 'react'
import {IRouter} from '../../API/RouteIndex'
import {Menu} from 'antd';
import {Link, withRouter,RouteComponentProps,matchPath} from "react-router-dom";

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps{
    routeInfo:IRouter[],
    theme?: 'light' | 'dark'
}

const LinkIteration:FC<IProps> = (props:IProps )=>{

    //初始展开的 SubMenu 菜单项 key 数组
    const [defaultOpenKeys,setDefaultOpenKeys] = useState<string[]>([]);
    //初始选中的菜单项 key 数组
    const [defaultSelectedKeys,setDefaultSelectedKeys] = useState<string[]>([]);

    //定义迭代方法
    const fn = (route:IRouter[])=>{
            return route.map((item)=>{
                //如果是存在子路由的,那么就使用subMenu
                if(item.children){
                    return (
                        <SubMenu key={`${item.key}`} title={item.title} icon={item.icon}>
                            {fn(item.children) }
                        </SubMenu>
                    )
                }else{          //如果不存在子路由
                    return(
                        <Menu.Item key={`${item.key}`} icon={item.icon}>
                            <Link to={item.path} style={{height:'100%',width:'100%'}}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )}})}

    //普通的点击路由之后，刷新就会导致没有高亮效果，现在的是根据路由路径来选择哪个高亮链接
    useEffect(()=>{
        //定义高亮方法
        const Highlight = (routes:IRouter[])=>{
            //获取到现在页面的路由路径
            let pathName = props.location.pathname
            //将当前的路径与路由信息中的全部路由进行一个匹配
            for(let i=0;i<routes.length;i++){
                //判断当前的路径是否与路由信息中的匹配
                let match = matchPath(pathName, routes[i].path)
                // console.log(matchPath('/users/123',{path:'/123/:id'}))
                //如果match存在，那么说明匹配上了，表明前一个参数包含后一个参数
                if(match){
                    //如果是精确匹配，说明就是这个地址
                    if(match.isExact){
                        setDefaultSelectedKeys([routes[i].key])
                    }else{                  //如果isExact为false，说明就是该路由的父路由，就让他展开
                        setDefaultOpenKeys([routes[i].key])
                    }
                }
                //如果有子路由，那么就继续递归
                if(routes[i].children) Highlight(routes[i].children as IRouter[])
            }
        }
        Highlight(props.routeInfo)
    },[props.location.pathname,props.routeInfo])

    return (
        <>
            {defaultSelectedKeys.length > 0?
                <Menu
                    style={{ width: '100%' }}
                    mode="inline"
                    //如果没有传入theme，默认是light
                    theme={props.theme === null ?'light' : props.theme}
                    defaultOpenKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                >
                    { fn(props.routeInfo) }
                </Menu>:''
            }
        </>
    )
};

export default withRouter(LinkIteration)