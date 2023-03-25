import { useEffect, useReducer } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";
import { urls } from "../helpers";

const Home: ()=>JSX.Element = () => {
    const reducer = (state: any, action: any)=>{
        return action;
    }
    const data: any = useLoaderData();
    const [ coaches, dispatch ] = useReducer(reducer, {loading: true});
    useEffect(
        ()=>{
            fetch(`${import.meta.env.VITE_SERVER}/coaches`)
            .then(res=>res.json())
            .then(data=>dispatch(data))
            .catch(error=>{
                if(error.name === 'AbortError'){
                    console.log(error)
                    return;
                }
                dispatch({error: error.message})
            })
        },
        []
    )
    return <div className="home">
        {
            data&&data.error&&<div>{data.error}</div>
        }
        <p>Home text</p>
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
            coaches&&(coaches.length > 0)&&coaches.map(
                (coach: any, index: number)=>{
                    return <div key={index} className="coach">
                        <img src={`${import.meta.env.VITE_SERVER}/static/${coach.username}`} alt="profile-picture" /><br />
                        <div><b>{coach.name}</b></div>
                        <div><b>username: </b>{coach.username}</div>
                        <div><b>Email: </b>{coach.email}</div>
                        <div><b>Subject: </b>{coach.subject&&coach.subject.name}</div>
                        <div><b>Category: </b>{coach.subject&&coach.subject.category}</div>
                        <div><b>Monthly price: </b>{coach.subject&&coach.subject.price}</div>
                    </div>
                }
            )
        }
        {
            (coaches&&coaches.length === 0)&&<div>No coach.</div>
        }
    </div>
}
 
export default Home;