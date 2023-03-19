import { Form, Navigate, useActionData } from "react-router-dom";
import { placeHolders, urls } from "../helpers";

const Login: ()=> JSX.Element = () => {
    const data: any = useActionData();
    if(data&&data.sessionExpired){
        throw Error(data.sessionExpired);
    }
    if(data&&data.invalidToken){
        throw Error(data.invalidToken);
    }
    if(data&&data.user){
        return <Navigate to={urls.home} />
    }
    if(data&&data.password){
        return <Form method="post" action={urls.login}>
        <label>Password:</label>
        <input type="password" name="password" placeholder={placeHolders.password1PlaceHolder} required />
        {
        data.errorFields&&
        data.errorFields.password&&
        <div className="error">{data.errorFields.password}</div>
        }
        <br />
        {
        data.error&&
        <div className="error">{data.error}</div>
        }
        <button>Log in</button>
    </Form>
    }
    return <Form method="post" action={urls.login}>
        <label>Username:</label>
        <input type="text" name="username" required />
        {
        data&&
        data.errorFields&&
        data.errorFields.username&&
        <div className="error">{data.errorFields.username}</div>
        }
        <br />
        <button>Continue</button>
    </Form>
}
 
export default Login;