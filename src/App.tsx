import React, { FC, Suspense} from 'react';
import Loading from "./assets/Loading";
import RouterIteration from "./component/Router/RouterIteration";
import {MyRouter} from "./API/RouteIndex";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface IProps extends RouteComponentProps{}
const App:FC<IProps> = (props:IProps)=>{
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <RouterIteration routeInfo={MyRouter}/>
            </Suspense>
        </>
    );
}

export default withRouter(App);
