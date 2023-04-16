import { useLocation, useRouteError, Link } from "react-router-dom";
import { setTitle } from "../helpers";

const Oops: ()=>JSX.Element = () => {
    setTitle('Oops');
    const error: any = useRouteError();
    console.log(error)
    return <div className="oops">
        <h1>Oops!</h1>
        <h2>Something went wrong.</h2>
        {error&&error.message&&<div className="error">{error.message}</div>}
        <Link to={useLocation().pathname}>Retry</Link>
    </div>
}
 
export default Oops;