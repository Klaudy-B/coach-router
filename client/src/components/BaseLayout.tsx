import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { userContext } from "../contexts";
import { reducer, urls } from "../helpers";
import { logoutAction } from "../actions";
import { useReducer } from "react";

const BaseLayout: ()=>JSX.Element = () => {
    const data: any = useLoaderData();
    const [ logout, dispatch ] = useReducer(reducer, {ok: false});
    if(logout&&logout.error){
        throw Error(logout.error);
    }
    return <>
    <div className="base-layout">
        <Link to={urls.home}><h1>{(import.meta.env.VITE_APP_NAME).toUpperCase()}</h1></Link>
        {
        data&&data.name&&
        <center>
            <button onClick={()=>{logoutAction(dispatch)}}>Log out</button>
            <Link to={`/${urls.profile}/${data.user}`}>My profile</Link>
        </center>
        }
    </div>
    <userContext.Provider value={data}>
    <Outlet />
    </userContext.Provider>
    <footer>
        COACH ROUTER
    </footer>
    </>
}
 
export default BaseLayout;