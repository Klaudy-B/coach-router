import { Form, useActionData, Link } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const Username = () => {
    setTitle('Change username');
    const data: any = useActionData();
    return <>
    <Form id="username-form" method="post" action={`${urls.settings}${urls.username}`}>
        <label>New username:</label>
        <input type="text" name="new-username" required />
        {data&&data.errorFields&&data.errorFields.username&& <div className="error">{data.errorFields.username}</div>}
        <br />
        <label>Your password:</label>
        <input type="password" name="password" required />
        {data&&data.errorFields&&data.errorFields.password&& <div className="error">{data.errorFields.password}</div>}
        <br />
        <button>Change username</button>
        {data&&data.success&&<div className="success">{data.success}</div>}
    </Form>
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>

}
 
export default Username;