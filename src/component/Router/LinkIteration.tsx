import React, {FC, Fragment, useEffect, useState} from 'react'
import {IRouter} from '../../API/RouteIndex'
import {Menu} from 'antd';
import {Link, withRouter,RouteComponentProps,matchPath} from "react-router-dom";

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps{
    routeInfo:IRouter[],
    theme?: 'light' | 'dark'
}

const LinkIteration:FC<IProps> = (props:IProps )=>{

    //控制展开的 SubMenu 菜单项 key 数组
    const [OpenKeys,setOpenKeys] = useState<string[]>(['a','b']);
    //控制选中的菜单项 key 数组
    const [selectedKeys,setSelectedKeys] = useState<string[]>([]);

    const test = (event:any)=>{
        //先判断一遍在OpenKeys数组中是否含有 与点击元素相同的key
        const flag = OpenKeys.some((value:string)=> value === event.key )
        /*
        * 如果flag为true，说明原数组中有点击元素的key值，那么把他过滤掉，让subMenu缩回
        * 如果flag为false，说明原数组没有点击元素的key值，只需要把他添加上，让subMenu展开即可
        * */
        const newOpenkeys = flag ? OpenKeys.filter((item:string)=> item !== event.key)
            : [...OpenKeys,event.key]

        setOpenKeys(newOpenkeys)
    }

    //定义迭代方法
    const fn = (route:IRouter[])=>{
        return route.map((item:IRouter)=>{
            if(item.children){
                if(item.IsLink === true){
                    //有子路由，但是还需要Link标签的，    那就是SubMenu
                    return (
                        <SubMenu key={item.key} title={item.title} icon={item.icon} onTitleClick={test}>
                            {fn(item.children) }
                        </SubMenu>
                    )
                }else {
                    //有子路由，但是不需要链接的，就是像admin路由一样的，只需要把children传进去递归即可
                    return (
                        <Fragment key={item.key}>
                            {fn(item.children)}
                        </Fragment>
                    )
                }
            }else{
                //没有子路由的，但是需要Link标签的，就是普通的导航路由，是需要渲染的
                if(item.IsLink === true){
                    return(
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.path} style={{height:'100%',width:'100%'}} >
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )}else return null          //没有子路由，而且不需要Link标签的，就是像login登录页一样的，不需要Link标签，但是需要渲染出route
                }

        })}

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
                        setSelectedKeys([routes[i].key])
                    }else{                  //如果isExact为false，说明就是该路由的父路由，就让他展开
                        setOpenKeys([routes[i].key])
                    }
                }
                //如果有子路由，那么就继续递归
                if(routes[i].children) Highlight(routes[i].children as IRouter[])
            }
        }
        Highlight(props.routeInfo)
    },[props])

    return (
        <Menu
            style={{ width: '100%' }}
            mode="inline"
            //如果没有传入theme，默认是light
            theme={props.theme === null ?'light' : props.theme}
            openKeys={OpenKeys}
            selectedKeys={selectedKeys}
        >
            { fn(props.routeInfo) }
        </Menu>
    )
};

export default withRouter(LinkIteration)