import { useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const DeleteAccount = () => {
    setTitle('Delete account');
    const data: any = useActionData();
    const [rerender, setRerender] = useState(false);
    if(rerender){
        return <>
        <Form id="delete-account-form" method="post" action={`${urls.settings}${urls.deleteAccount}`}>
        <label>Your password:</label>
        <input type="password" name="password" required />
        <br />
        {data&&data.errorFields&&<div className="error">{data.errorFields.password}</div>}
        <button>Delete my account</button>
        {data&&data.success&&<div className="success">
            {data.success}<br />
            <Link to='/'>Done</Link>
            </div>
        }
        {(!data||data&&!data.success)&&<Link to={urls.settings}>Back</Link>}
    </Form>
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>

    }
    return<p className="delete-account">
        If you do this you will lose all your data. Do you want to delete your account?<br />
        <button onClick={()=>{setRerender(true)}}>I want to delete my account</button>
    </p>
}
 
export default DeleteAccount;