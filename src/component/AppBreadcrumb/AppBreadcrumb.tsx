import React, {Component, ReactNode,Fragment} from 'react';
import {matchPath, RouteComponentProps, withRouter,Link} from "react-router-dom";
import {Breadcrumb} from "antd";
import {IRouter,MyRouter} from "../../API/RouteIndex";

//获取路由组件的属性
interface IProps extends RouteComponentProps{}

class AppBreadcrumb extends Component<IProps,any> {

    getBreadcrumb = (routeInfo:IRouter[]):ReactNode=>{
        let pathName = this.props.location.pathname
        return  (
            <>
                {
                    routeInfo.map(item=>{
                        //每次循环的时候，将当前页面路径与路由信息匹配
                        let match = matchPath(pathName,item.path)
                        //如果match存在，既当前路径包含路由信息
                        //刚开始肯定是它父级路由先匹配上的
                        if(match){
                            return (
                                <Fragment key={item.key}>
                                    <Breadcrumb.Item >
                                        {item.component?<Link to={item.path}>{item.title}</Link>:item.title}
                                    </Breadcrumb.Item>
                                    {/*如果存在子路由，那么就继续完成迭代*/}
                                    {item.children ? this.getBreadcrumb(item.children) : null}
                                </Fragment>
                            )
                        }else{
                            return null
                        }
                    })
                }
            </>
        )
    };
    render() {
        return (
            <Breadcrumb>
                {this.getBreadcrumb(MyRouter)}
            </Breadcrumb>
        );
    }
}

export default withRouter(AppBreadcrumb);