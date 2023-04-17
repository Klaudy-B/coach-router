import { Form, Navigate, useActionData, Link } from "react-router-dom";
import { placeHolders, setTitle, urls } from "../helpers";

const Login: ()=> JSX.Element = () => {
    setTitle('Login');
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
        return <>
        <Form id="login-form" method="post" action={urls.login}>
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
    <div id="forgot"><Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link></div>
    </>
}
    return <>
    <Form id="login-form" method="post" action={urls.login}>
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
        <div>Don't have an account yet? <Link to={urls.signup}>Sign up</Link>.</div>
    </Form>
    <div id="forgot"><Link to={`${urls.forgotUsername}`}>I forgot my username</Link></div>
    </>
}
 
export default Login;