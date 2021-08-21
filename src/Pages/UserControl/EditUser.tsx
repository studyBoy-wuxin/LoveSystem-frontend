import React, { useEffect, useRef} from 'react'
import {Button, Form, FormInstance, Input, Modal} from "antd";

interface IUser{
    id:number,
    name:string
}
interface IProps{
    visible:boolean,
    callback:(v:boolean,u?:IUser)=>void,
    user?:IUser
}
const EditUser:React.FC<IProps> = (props:IProps)=>{

    const [form] = Form.useForm();
    const FormRef = useRef<FormInstance>(null);

    useEffect(()=>{
        //如果FormRef不为null
        FormRef && FormRef.current && FormRef.current.resetFields();
    },[props.user])

    function handleCancel(){
        props.callback(false)
    }

    function onFinish(values:IUser){
        //属性不同的就添加上，不一样的就覆盖
        const user = {...props.user,...values}
        console.log(user)
        props.callback(false,user)
    }
    return (
        <div>
            <Modal
                title="修改用户信息"
                visible={props.visible}
                footer={null}
                onCancel={handleCancel}
                forceRender
            >
                <Form
                    initialValues={{...props.user}}
                    form={form}
                    ref={FormRef}
                    onFinish={onFinish}
                >
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        label="用户名"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default  EditUser