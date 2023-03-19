import { Outlet, Link } from "react-router-dom";
import { urls } from "../helpers";

const BaseLayout: ()=>JSX.Element = () => {
    return <>
    <div className="base-layout">
        <Link to={urls.home}><h1>{(import.meta.env.VITE_APP_NAME).toUpperCase()}</h1></Link>
    </div>
    <Outlet />
    <div className="footer">
        footer
    </div>
    </>
}
 
export default BaseLayout;