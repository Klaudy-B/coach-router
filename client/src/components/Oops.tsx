import { useRouteError } from "react-router-dom";

const Oops: ()=>JSX.Element = () => {
    const error: any = useRouteError();
    return <div className="oops">
        <h1>Oops!</h1>
        <h2>Something went wrong.</h2>
        <div className="error">{error.toString()}</div>
    </div>
}
 
export default Oops;