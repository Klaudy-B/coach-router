import { Link } from "react-router-dom";

const Home: ()=>JSX.Element = () => {
    return <div className="home">
        <p>Home text</p>
        <Link to='signup'>Become a coach</Link>
        <ul>list of coaches.</ul>
    </div>
}
 
export default Home;