import { Form, useActionData } from "react-router-dom";

const Login: ()=> JSX.Element = () => {
    const data = useActionData();
    if(data&&(data as {password?: boolean}).password){
        return <Form method="post" action="/login">
        <label>Password:</label>
        <input type="password" name="password" />
        <button>Log in</button>
    </Form>
    }
    return <Form method="post" action="/login">
        <label>Username:</label>
        <input type="text" name="username" />
        <button>Continue</button>
    </Form>
}
 
export default Login;