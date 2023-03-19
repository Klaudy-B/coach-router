import { Link } from "react-router-dom";

const NotFound: ()=>JSX.Element = () => {
    return <div className="not-found">
        <h1>Page not found.</h1>
        Back to the <Link to='/'>Home page</Link>.
    </div>
}
 
export default NotFound;