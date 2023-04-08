import {  useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { userContext } from "../contexts";
import { urls, reducer } from "../helpers";
import { useFetch } from "../hooks";

const Home: ()=>JSX.Element = () => {
    const data: any = useContext(userContext);
    const [ coaches, dispatch ] = useReducer(reducer, {loading: true});
    useFetch(dispatch, `${import.meta.env.VITE_SERVER}/coaches`, undefined);
    return <div className="home">
        {
            data&&data.error&&<div className="error">{data.error}</div>
        }
        <p>A website to find coaches for helping you with certain subjects.</p>
        {
            data&&data.name&&<div className="welcome">
                <p>Hi, {data.name}</p>
                <div>
                    <center><img width="50%" src={`${import.meta.env.VITE_SERVER}/static/${data.user}`} alt="profile-picture" /></center>
                </div>
                </div>
        }
        {
            (Object.keys(data).length === 0)&&<nav>
                    <Link to={urls.signup}>Become a coach</Link>
                    <Link to={urls.login}>Login</Link>
                </nav>
        }
        {
            coaches&&coaches.error&&<div className="error">{coaches.error}</div>
        }
        {
            coaches&&coaches.loading&&<Loading />
        }
        {
            coaches&&(coaches.length > 0)&&
            <div className="coaches">
            {
                coaches.map(
                    (coach: any, index: number)=>{
                        if(data&&coach.name===data.name){
                            return;
                        }
                        return <div key={index} className="coach">
                            <center><Link to={`${urls.profile}/${coach.username}`}><img width="60%" src={`${import.meta.env.VITE_SERVER}/static/${coach.username}`} alt="profile-picture" /></Link></center><br />
                            <div className="details">
                            <div><b>{coach.name}</b></div>
                            <div><b>username: </b>{coach.username}</div>
                            <div><b>Subject: </b>{coach.subject&&coach.subject.name}</div>
                            <div><b>Hourly price: </b>${coach.subject&&coach.subject.price}</div>
                            </div>
                        </div>
                    }
                )
            }
            </div>
        }
        {
            (coaches&&coaches.length === 0)&&<div>No coach.</div>
        }
    </div>
}
 
export default Home;