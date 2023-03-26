import { useReducer } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { reducer } from "../helpers";
import { useFetch } from "../hooks";

const Profile: () => JSX.Element = () => {
    const username = useParams().username;
    const [ coach, dispatch ] = useReducer(reducer, {loading: true});
    useFetch(dispatch, `${import.meta.env.VITE_SERVER}/coaches/${username}`);
    if(coach&&coach.loading){
        return <Loading />
    }
    if(coach&&coach.error){
        return <div className="error">{coach.error}</div>
    }
    if(coach&&coach.name){
    return <>
        <center>
            <img src={`${import.meta.env.VITE_SERVER}/static/${username}`} alt="profile-picture" /><br />
        </center>
        <div className="details">
        <div><b>{coach.name}</b></div>
        <div><b>username: </b>{coach.username}</div>
        <div><b>Email: </b>{coach.email}</div>
        <div><b>Subject: </b>{coach.subject&&coach.subject.name}</div>
        <div><b>Category: </b>{coach.subject&&coach.subject.category}</div>
        <div><b>Hourly price: </b>${coach.subject&&coach.subject.price}</div>
        </div>
        </>
    }else{
        return <div className="error">No result.</div>
    }
}
 
export default Profile;