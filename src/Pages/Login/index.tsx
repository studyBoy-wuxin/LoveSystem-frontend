import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form';
import {
    UserOutlined,
    MobileOutlined,
    LockOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {message, Tabs, Space} from 'antd';
import {FC, useEffect, useState} from 'react';
import './index.less'
import logo from '../../assets/Image/logo.svg'
import { WaterMark } from '@ant-design/pro-layout';

type LoginType = 'phone' | 'account';
interface IProps{}
const Login:FC<IProps> = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    useEffect(() => {
        const count = ()=>{
            const begin = new Date('2020-10-26 17:00:00')
            const now = new Date()
            const time = now.getTime() - begin.getTime()
            const d = Math.floor(time/(1000*60*60*24))
            setDay(d)
            const h =Math.floor ((time - d*(1000*60*60*24))/(1000*60*60))
            //如果是一位数，还要加个0
            setHour(h.toString().length === 1? ('0'+h) : (''+h))
            const m = Math.floor((((time - d*(1000*60*60*24))-h*(1000*60*60)))/(1000*60))
            setMinute(m.toString().length === 1? ('0'+m) : (''+m))
            const s = Math.floor((((time - d*(1000*60*60*24))-h*(1000*60*60)-m*(1000*60)))/(1000))
            setSecond(s.toString().length === 1? ('0'+s) : (''+s))
        }
        const Interval = setInterval(()=> count(),1000)
        return () => clearInterval(Interval)
    }, []);


    return (
        <WaterMark
            content={"I L❤ve you"}
            fontSize={25}
        >
            <div className={"login-container"}>
                <div className={'top'}>
                    <div className='header'>
                        <img className={'logo'} src={logo} alt={'logo'}/>
                        <span className={'title'}>LoveSystem</span>
                    </div>
                    <div className={'desc'}>
                        这是包子和橘妹相爱的第{day}天 {hour}小时 {minute}分钟 {second}秒
                    </div>
                </div>
                <LoginForm
                    className="Login-loginform"
                    actions={
                        <Space>
                            其他登录方式
                            <AlipayCircleOutlined className="iconStyles"></AlipayCircleOutlined>
                            <TaobaoCircleOutlined className="iconStyles"></TaobaoCircleOutlined>
                            <WeiboCircleOutlined className="iconStyles"></WeiboCircleOutlined>
                        </Space>
                    }
                >
                    <Tabs activeKey={loginType} onChange={(activeKey:string) => setLoginType(activeKey as LoginType)}>
                        <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                        <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                    </Tabs>
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className='prefixIcon' />,
                                }}
                                placeholder={'用户名: admin or user'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className='prefixIcon' />,
                                }}
                                placeholder={'密码: ant.design'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'} />,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                            href={"aaa"}
                        >
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
        </WaterMark>

    );
};
export default Login