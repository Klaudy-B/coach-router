import { useActionData, Form, Link, useLoaderData } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const VerifyEmail = () => {
    setTitle('Verify email');
    const { verified, email } = (useLoaderData() as any);
    const data: any = useActionData();
    if(!data&&verified){
        return <p className="success">Your email is already verified.</p>
    }
    return <Form id="verify-email-form" method="post" action={`${urls.settings}${urls.verifyEmail}`}>
        {
        !data&&
        <p>
        We will send you a verification code to your email address, {email}.
        Once you recieve the code, you will be prompt to type it in.
        <button>Send me the code</button>
        </p>
        }
        {
        data&&data.codeSent&&
        <>
        <label>Type in the code we sent you:</label>
        <input type="text" name="verification-code" required />
        <br />
        <button>Submit</button>
        {data.noMatch&&<div className="error">{data.noMatch}</div>}
        </>
        }
        {
        data&&data.success&&
        <p className="success">
            {data.success}<br />
            <Link to={urls.home}>Done</Link>
        </p>
        }
        {data&&data.error&&<div className="error">{data.error}</div>}
    </Form>
}
 
export default VerifyEmail;