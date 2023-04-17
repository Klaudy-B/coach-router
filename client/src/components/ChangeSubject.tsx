import { Form, useActionData, useLoaderData, Link } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const ChangeSubject = () => {
    setTitle('Change subject');
    const categories: any = useLoaderData();
    const data: any = useActionData();
    return <>
    <Form id="change-subject-form" method="post" action={`${urls.settings}${urls.changeSubject}`}>
        <label>Category:</label>
        <select name="category" id="category" required>
            {
                (categories as any[]).map((category, index)=>{
                    return <option key={index} value={category}>{category}</option>
                    }
                )
            }
        </select>
        <br />
        {data&&data.errorFields&&data.errorFields.category&& <div className="error">{data.errorFields.category}</div>}
        <br />
        <label>New subject name:</label>
        <input type="text" name="new-subject" required />
        {data&&data.errorFields&&data.errorFields.subject&& <div className="error">{data.errorFields.subject}</div>}
        <br />
        <label>Hourly price in US dollar:</label>
        <input type="number" name="price" required/>
        {data&&data.errorFields&&data.errorFields.price&& <div className="error">{data.errorFields.price}</div>}
        <br />
        <label>Your password:</label>
        <input type="password" name="password" required />
        {data&&data.errorFields&&data.errorFields.password&& <div className="error">{data.errorFields.password}</div>}
        <br />
        <button>Change subject</button>
        {data&&data.success&&<div className="success">{data.success}</div>}
    </Form>
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>

}
 
export default ChangeSubject;