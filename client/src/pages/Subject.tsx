import { Form, useActionData, useLoaderData, Link } from "react-router-dom";
import { serverError, urls } from "../helpers";

const Subject: ()=>JSX.Element = () => {
    const data: any = useLoaderData();
    const actionData: any = useActionData();
    if(data&&!data.length){
        throw Error(serverError);
    }
    if(actionData&&actionData.error){
        throw Error(data.error);
    }
    return <>
    <Form id="subject-form" method="post" action={urls.subject}>
        <label>Category:</label>
        <select name="category" id="category" required>
            {
                (data as any[]).map((category, index)=>{
                    return <option key={index} value={category}>{category}</option>
                    }
                )
            }
        </select>
        <br />
        <label>Subject name:</label>
        <input type="text" name="name" required/>
        <br />
        <label>Hourly price in dollar:</label>
        <input type="number" name="price" required/>
        <br />
        {
        actionData&&
        actionData.success&&
        <div className="success">
            {actionData.success}
        </div>
        }
        <button>Submit</button>
    </Form>
    {
        actionData&&
        actionData.success&&
        <center><button><Link to={urls.profilePicture}>Done</Link></button></center>
    }
    </>
}
 
export default Subject;