import {Button, message, Popconfirm} from 'antd'
import React, {FC} from 'react'

interface IProps{
    userID:number
    callback:(userID:number)=>void
}
const DeleteUser:FC<IProps> = (props:IProps)=> {

    const onConfirm = ()=>{
        props.callback(props.userID)
        message.success('删除成功!')
    }
    return (
        <Popconfirm
            title="确定删除吗?"
            onConfirm={onConfirm}
            onCancel={()=>message.warning('取消删除!')}
            okText="是"
            cancelText="否"
        >
            <Button type='primary' danger style={{marginLeft:'10px'}}>删除</Button>
        </Popconfirm>
    )
}

export default DeleteUser