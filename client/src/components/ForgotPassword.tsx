import { useActionData, Form, Link, Navigate, useLoaderData } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const ForgotPassword = () => {
    setTitle('Forgot password');
    const { email } = (useLoaderData() as any);
    const data: any = useActionData();

    if(data&&data.authorized){
        return <Navigate to={`${urls.settings}${urls.recoverPassword}`} />
    }
    return <Form id="forgot-password-form" method="post" action={`${urls.settings}${urls.forgotPassword}`}>
    {!data&&<p>
    We will send you a verification code to your email address, {email}.
    Once you recieve the code, you will be prompt to type it in.
    <button>Send me the code</button></p>}
    {data&&data.codeSent&&<>
    <label>Type in the code we sent you:</label>
    <input type="text" name="verification-code" required /><br />
    <button>Submit</button>
    {data.noMatch&&<div className="error">{data.noMatch}</div>}
    </>
    }
    {data&&data.error&&<div className="error">{data.error}</div>}
</Form>
}
 
export default ForgotPassword;