import { Form, Link, useActionData } from "react-router-dom";
import { urls } from "../helpers";

const Bio: ()=>JSX.Element = () => {
    const data: any = useActionData();
    return <Form id="bio" method="post" action={`${urls.settings}${urls.bio}`}>
        <textarea name="bio" rows={20} placeholder="Say something about yourself"></textarea>
        <button>Submit</button>
        {data&&data.success&&<>
        <div className="success">{data.success}</div>
        <p><Link to={urls.settings}>Done</Link></p>
        </>
        }
        {data&&data.error&&<div className="error">{data.error}</div>}
    </Form>
}
 
export default Bio;