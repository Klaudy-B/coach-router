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
            data&&data.error&&<p className="error">{data.error}</p>
        }
        <p id="home">A website to find coaches for helping you with certain subjects.</p>
        {
            data&&data.name&&<div className="welcome">
                <p>Hi, {data.name}</p>
                <div>
                    <center><img id="profile" src={`${import.meta.env.VITE_SERVER}/static/${data.user}`} alt="profile-picture" /></center>
                </div>
                </div>
        }
        {
            coaches&&coaches.error&&<p className="error">{coaches.error}</p>
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
                        if(data&&coach.username===data.user){
                            return;
                        }
                        return <div key={index} className="coach">
                                <div><img src={`${import.meta.env.VITE_SERVER}/static/${coach.username}`} alt="profile-picture" /></div>
                                <div className="details">
                                    <Link to={`${urls.profile}/${coach.username}`}>
                                        <div><b>{coach.name}</b></div>
                                        <div><b>username: </b>{coach.username}</div>
                                        <div><b>Subject: </b>{coach.subject&&coach.subject.name}</div>
                                        <div><b>Hourly price: </b>${coach.subject&&coach.subject.price}</div>
                                    </Link>
                                </div>
                            </div>
                    }
                )
            }
            </div>
        }
        {
            (coaches&&coaches.length === 0)&&<p>No coach.</p>
        }
    </div>
}
 
export default Home;