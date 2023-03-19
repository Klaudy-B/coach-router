import { Form, useActionData, Link } from "react-router-dom";

const Signup: ()=> JSX.Element = () => {
    const data = useActionData();
    if(data&&(data as {success?: boolean}).success){
        return <div className="success">
            <p>{(data as {success?: boolean}).success}</p>
            <Link to='/'>Next</Link>
        </div>
    }
    return <Form method="post" action="/login">
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Username:</label>
        <input type="text" name="username" />
        <label>Email:</label>
        <input type="email" name="email" placeholder="xyz@example.com" />
        <label>Password:</label>
        <input type="password" name="password" />
        <label>Confirm password:</label>
        <input type="password" name="confirm-password" />
        <button>Sign up</button>
    </Form>
}
 
export default Signup;