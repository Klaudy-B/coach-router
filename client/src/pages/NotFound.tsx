import { Link } from "react-router-dom";
import { urls } from "../helpers";

const NotFound: ()=>JSX.Element = () => {
    return <div className="not-found">
        <h1>Page not found.</h1>
        <p>Back to the <Link to={urls.home}>Home page</Link>.</p>
    </div>
}
 
export default NotFound;