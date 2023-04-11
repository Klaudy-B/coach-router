import { Form, useActionData, Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../contexts";
import { urls } from "../helpers";

const Search = () => {
    const data: any = useContext(userContext);
    const coaches: any = useActionData();


    return <section id="search">
        <Form id="search" method="post" action={urls.search}>
            <span className="material-symbols-outlined">search</span>
            <input type="text" id="search" name="search" placeholder="Search a coach" />
            <button>Search</button>
        </Form>

        {
            coaches&&coaches.error&&<p className="error">{coaches.error}</p>
        }
        {
            coaches&&(coaches.length > 0)&&
            <div className="coaches">
            {
                coaches.map(
                    (coach: any, index: number)=>{
                        if(data&&coach.username===data.user&&coaches.length>1){
                            return;
                        }
                        if(data&&coach.username===data.user&&coaches.length===1){
                            return <p>No match.</p>;
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
            (coaches&&coaches.length === 0)&&<div className="coaches"><p>No match.</p></div>
        }
    </section>
}
 
export default Search;