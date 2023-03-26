import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { userContext } from "../contexts";
import { urls } from "../helpers";

const BaseLayout: ()=>JSX.Element = () => {
    const data: any = useLoaderData();
    return <>
    <div className="base-layout">
        <Link to={urls.home}><h1>{(import.meta.env.VITE_APP_NAME).toUpperCase()}</h1></Link>
        {
        data&&data.name&&<center>
        <Form method="post" action={urls.home}>
            <button>Log out</button>
        </Form>
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