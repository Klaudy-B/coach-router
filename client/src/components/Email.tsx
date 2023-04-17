import { useActionData, Form, Link } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const Email = () => {
    setTitle('Change email');
    const data: any = useActionData();
    return <>
    <Form id="email-form" method="post" action={`${urls.settings}${urls.changeEmail}`}>
        <label>Your new email:</label>
        <input type="email" name="email" required />
        {data&&data.errorFields&&data.errorFields.email&&<div className="error">{data.errorFields.email}</div>}
        <br />
        <label>Your password:</label>
        <input type="password" name="password" required />
        {data&&data.errorFields&&data.errorFields.password&&<div className="error">{data.errorFields.password}</div>}
        <br />
        <button>Change email</button>
        {data&&data.success&&
        <div className="success">
            <span>{data.success} Click <Link to={`${urls.settings}${urls.verifyEmail}`}>here</Link> to verify your email.</span>
        </div>}
    </Form>
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>

}
 
export default Email;