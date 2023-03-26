import { useRouteError } from "react-router-dom";

const Oops: ()=>JSX.Element = () => {
    const error: any = useRouteError();
    return <div className="oops">
        <h1>Oops!</h1>
        <h2>Something went wrong.</h2>
        {error&&error.message&&<div className="error">{error.message}</div>}
    </div>
}
 
export default Oops;