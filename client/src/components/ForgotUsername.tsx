import { useActionData, Form } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const ForgotUsername = () => {
    setTitle('Forgot username');
    const data: any = useActionData();
    return <>
    <p>Type in the username you remember.</p>
    <Form id="forgot-username-form" method='post' action={urls.forgotUsername}>
        <label>Type in the username you remember:</label>
        <input type="text" name="username" required />
        <br />
        <button>Search for a match</button>
        {
        data&&<div className={data.length>=1?"success": "error"}>{data.length} Result{data.length>1?"s":""}{data.length?":": ""}<br />
                {data.map((username: any, index: number)=><div key={index}><b>{username.username}</b></div>)}
            </div>
        }
    </Form>
    </>
}
 
export default ForgotUsername;