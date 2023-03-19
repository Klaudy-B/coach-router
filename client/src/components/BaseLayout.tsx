import { Outlet } from "react-router-dom";

const BaseLayout: ()=>JSX.Element = () => {
    return <>
    <div className="base-layout">
        <h1>COACH ROUTER</h1>
    </div>
    <Outlet />
    <div className="footer">
        footer
    </div>
    </>
}
 
export default BaseLayout;