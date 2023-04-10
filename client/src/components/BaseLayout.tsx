import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { userContext } from "../contexts";
import { reducer, urls } from "../helpers";
import { logoutAction } from "../actions";
import { useReducer } from "react";

const BaseLayout: ()=>JSX.Element = () => {
    const data: any = useLoaderData();

    return <>
    <div className="base-layout">
        <h1 id="home"><Link to={urls.home}>{(import.meta.env.VITE_APP_NAME).toUpperCase()}</Link></h1>
        <nav>
        {
            (data&&data.name)?
                <>
                <Form id="logout" method="post" action={`${urls.home}`}>
                    <button>Log out</button>
                </Form>
                <Link to={`${urls.profile}/${data.user}`}>My profile</Link>
                </>
            :
                <>
                <Link to={urls.signup}>Become a coach</Link>
                <Link to={urls.login}>Login</Link>
                </>
        }
        </nav>
    </div>
    <userContext.Provider value={data}>
    <Outlet />
    </userContext.Provider>
    <footer>
        <h1><a href="#home">COACH ROUTER</a></h1>
        <p>&copy; copyright {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}</p>
    </footer>
    </>
}
 
export default BaseLayout;