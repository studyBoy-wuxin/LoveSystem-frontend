import React, {Component} from 'react';
import {Table, Button, Divider} from "antd";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import {ColumnsType} from "antd/es/table";
import SearchUser from "./SearchUser";

interface IUser{
    id:number,
    name:string
}
//定义state的接口
interface IState{
    UserList:IUser[],
    EditVisible:boolean,
    AddVisible:boolean,
    user?:IUser,
    searchText:string,
    searchedColumn:string
}

class Index extends Component<any,IState> {

    constructor(props:any) {
        super(props);
        let UserList:IUser[] = []
        for(let i=1;i<=10;i++){
            UserList.push({
                id:i,
                name:`user${i}`
            })
        }
        this.state={
            UserList,
            EditVisible:false,
            AddVisible:false,
            searchText: '',
            searchedColumn: '',
        }
    }

    //修改的回调
    EditCallback = (EditVisible:boolean,user?:IUser)=>{
        //如果传入的参数中有user，那么就说明有修改的，就修改好原UserList中的数据，否则就是没改就使用之前的UserList
        const UserList = user ?  this.state.UserList.map((item)=> {
            //id不一样说明不是修改的user，需要直接返回
            if(item.id !== user.id) return item
            else return user
        }) : this.state.UserList

        this.setState({EditVisible,user,UserList})
    }

    //新增用户的回调
    AddCallback = (AddVisible:boolean,user?:IUser)=>{
        //如果user存在的话，根据新增的ID插入到对应位置
        const UserList = user?[user,...this.state.UserList]:this.state.UserList

        this.setState({AddVisible,UserList})
    }

    //删除用户的回调
    DeleteCallback = (userID:number)=>{
        const UserList = this.state.UserList.filter(item=>item.id !== userID)
        console.log(UserList)
        this.setState({UserList})
    }
    //搜索的回调
    SearchCallback = (searchText:string, Column?:string)=>{
        const searchedColumn = Column ? Column:this.state.searchedColumn
        this.setState({searchText,searchedColumn})
    }
    render() {
        const {EditVisible,AddVisible,searchText,searchedColumn} = this.state
        //定义column
        const columns: ColumnsType<IUser> = [
            {
                key:'a',
                title: '编号',
                dataIndex: 'id',
                // ...this.getColumnSearchProps('id'),
                ...SearchUser({searchText,searchedColumn,dataIndex:'id',callback:this.SearchCallback})
            },
            {
                key:'b',
                title: '姓名',
                dataIndex: 'name',
                ...SearchUser({searchText,searchedColumn,dataIndex:'name',callback:this.SearchCallback})
            },
            {
                title: '操作',
                render:(user:IUser)=>(<span>
                <Button type='primary' onClick={()=>this.setState({EditVisible:true,user})}>修改</Button>
                    <DeleteUser userID={user.id} callback={this.DeleteCallback}/>
        </span>)
            },
        ];
        return (
            <div style={{margin:'auto 100px'}}>

                <AddUser
                    AddVisible={AddVisible}
                    callback={this.AddCallback}
                />
                <Divider/>
                <EditUser
                    visible={EditVisible}
                    callback={this.EditCallback}
                    user={this.state.user}
                />
                <Table<IUser>
                    columns={columns}
                    dataSource={this.state.UserList}
                    pagination={false}
                    rowKey={'id'}
                />
            </div>
        );
    }
}

export default Index;

