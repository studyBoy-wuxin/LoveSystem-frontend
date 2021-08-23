import React, {FC, useState} from 'react';
import LinkIteration from '../../component/Router/LinkIteration'
import {MyRouter} from '../../API/RouteIndex'
import {Avatar, Layout} from 'antd';
import './index.css'
import AppBreadcrumb from "../AppBreadcrumb/AppBreadcrumb";
import { UserOutlined } from '@ant-design/icons';
import {RouteComponentProps, withRouter} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;

interface IProps extends RouteComponentProps{children?:any }

const AppLayout:FC<IProps> = (props:IProps)=>{
    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = (newCollapsed:boolean) =>  setCollapsed(newCollapsed)

    return (
        <>
            <Layout className='components-AppLayout' style={{ minHeight: '100vh' }}>

                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    {/*放置路由链接信息*/}
                    <LinkIteration routeInfo={MyRouter} theme={'dark'}/>
                </Sider>

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className='site-layout-Avatar'>
                            <Avatar size={50} icon={<UserOutlined/>} />
                            <span>欢迎您,邹泽世</span>
                        </div>
                    </Header>

                    <Content style={{ margin: '16px 16px'}}>
                        <AppBreadcrumb />
                        {/*children中存放的是Route路由信息*/}
                        {props.children}
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}


export default withRouter(AppLayout);