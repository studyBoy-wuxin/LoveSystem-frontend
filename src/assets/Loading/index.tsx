import React,{FC} from 'react'
import {Spin} from "antd";
import './index.css'

const Loading:FC = ()=>{
    return (
        <div className='SpinDiv'>
            <Spin
                tip='正在加载中...'
                size='large'
            />
        </div>
    )
}
export default Loading
