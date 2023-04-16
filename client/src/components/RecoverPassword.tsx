import { Form, useActionData } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const RecoverPassword = () => {
    setTitle('Recover password');
    const data: any = useActionData();
        return <Form id="recover-password-form" method="post" action={`${urls.settings}${urls.recoverPassword}`}>
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
        {data&&data.error&&<div className="error">{data.error}</div>}
    </Form>
}
 
export default RecoverPassword;