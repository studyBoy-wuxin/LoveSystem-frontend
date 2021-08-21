import React, {Component} from 'react';
import LinkIteration from '../Router/LinkIteration'
import {MyRouter} from '../../API/RouteIndex'
import {Avatar, Divider, Layout} from 'antd';
import './index.css'
import AppBreadcrumb from "../AppBreadcrumb/AppBreadcrumb";
import { UserOutlined } from '@ant-design/icons';
import {SiderTheme} from "antd/es/layout/Sider";
const { Header, Content, Footer, Sider } = Layout;


interface IState{
    collapsed:boolean,
    theme?:SiderTheme
}
class AppLayout extends Component<any,IState> {

    state = {
        collapsed: false,
        theme:'light' as SiderTheme
    };

    onCollapse = (collapsed:boolean) =>  this.setState({ collapsed })

    render() {
        const {collapsed,theme} = this.state
        return (
            <>
                <Layout className='components-AppLayout' style={{ minHeight: '100vh' }}>

                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme={theme}>
                        <div className="logo" />
                        <Divider/>
                        {/*放置路由链接信息*/}
                        <LinkIteration routeInfo={MyRouter} theme={theme}/>
                    </Sider>

                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{backgroundColor:theme==='light'?'#ffffff':' #001529' }} >
                            <div className='site-layout-Avatar'>
                                <Avatar size={50} icon={<UserOutlined/>} />
                                <span style={{color:theme==='light'?'black':'white'}}>欢迎您,邹泽世</span>
                            </div>
                        </Header>

                        <Content style={{ margin: '16px 16px'}}>
                            <AppBreadcrumb />
                            {/*children中存放的是Route路由信息*/}
                            {this.props.children}
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </>
        );
    }
}

export default AppLayout;