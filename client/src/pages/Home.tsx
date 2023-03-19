import { Link, useLoaderData } from "react-router-dom";
import { urls } from "../helpers";

const Home: ()=>JSX.Element = () => {
    const data: any = useLoaderData();
    return <div className="home">
        {
            data&&data.error&&<div>{data.error}</div>
        }
        <p>Home text</p>
        {
            data&&data.name&&<div className="welcome">Hi, {data.name}</div>
        }
        {
            (Object.keys(data).length === 0)&&<nav>
                    <Link to={urls.signup}>Become a coach</Link>
                    <Link to={urls.login}>Login</Link>
                </nav>
        }
        <ul>list of coaches.</ul>
    </div>
}
 
export default Home;