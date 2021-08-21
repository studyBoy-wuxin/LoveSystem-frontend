import React, {Component} from 'react';
import {Button, Result} from "antd";
import {withRouter} from 'react-router-dom'

class PageNotFound extends Component<any,any> {

    onBack = ()=>{
        this.props.history.goBack()
    }
    render() {
        return (
            <>
                <Result
                    status="404"
                    title="404"
                    subTitle="所访问的页面不存在."
                    extra={<Button type="primary" onClick={this.onBack}>返回</Button>}
                />,
            </>
        );
    }
}

export default withRouter(PageNotFound)