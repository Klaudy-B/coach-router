import { Form, useActionData, Link } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const Password: ()=>JSX.Element = () => {
    setTitle('Change password');
    const data: any = useActionData();
    return <>
    <Form id="password-form" method="post" action={`${urls.settings}${urls.password}`}>
        <label>Your current password:</label>
        <input type="password" name="current-password" required />
        {data&&data.errorFields&&data.errorFields.password1&& <div className="error">{data.errorFields.password1}</div>}
        <br />
        <label>Your new password:</label>
        <input type="password" name="new-password" required />
        {data&&data.errorFields&&data.errorFields.password2&& <div className="error">{data.errorFields.password2}</div>}
        <br />
        <label>Confirm your new password:</label>
        <input type="password" name="new-password-confirmation" required />
        {data&&data.errorFields&&data.errorFields.password3&& <div className="error">{data.errorFields.password3}</div>}
        <br />
        <button>Change password</button>
        {data&&data.success&&<div className="success">{data.success}</div>}
    </Form>
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>
}
 
export default Password;