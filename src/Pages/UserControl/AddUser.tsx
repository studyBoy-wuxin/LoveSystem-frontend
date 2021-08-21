import React, {FC, useRef} from 'react'
import {Button, Form, FormInstance, Input, Modal} from "antd";

interface IUser{
    id:number,
    name:string
}
interface IProps{
    AddVisible:boolean,
    callback:(visible:boolean,user?:IUser)=>void
}

const AddUser:FC<IProps> = (props:IProps)=>{

    //创建Form组件的ref
    const FormRef = useRef<FormInstance>(null);

    const handleSubmit = (values:IUser)=>{
        values.id = values.id * 1
        props.callback(false,values)
        //提交成功后重置表单
        FormRef && FormRef.current && FormRef.current.resetFields();
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <>
            <Button type='primary' onClick={()=>{props.callback(true)}}>添加用户</Button>
            <Modal
                visible={props.AddVisible}
                onCancel={()=>{props.callback(false)}}
                title='添加用户'
                footer={null}
            >
                <Form
                    ref={FormRef}
                    onFinish={handleSubmit}
                    {...layout}
                >
                    <Form.Item
                        label="id"
                        name="id"
                        rules={[{ required: true, message: '请输入添加用户的id!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[{ required: true, message: '请输入添加用户的姓名!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddUser