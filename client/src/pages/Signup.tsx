import { Form, useActionData, Link } from "react-router-dom";
import { placeHolders, urls } from "../helpers";

const Signup: ()=> JSX.Element = () => {
    const data: any = useActionData();
    if(data&&data.success){
        return <div className="success">
            <p>{data.success}</p>
            <Link to={urls.home}>Next</Link>
        </div>
    }
    return <Form method="post" action={urls.signup}>
        <label>Name:</label>
        <input type="text" name="name" required />
        {
        data&&
        data.errorFields&&
        data.errorFields.name&&
        <div className="error">{data.errorFields.name}</div>
        }
        <br />
        <label>Username:</label>
        <input type="text" name="username" required />
        {
        data&&
        data.errorFields&&
        data.errorFields.username&&
        <div className="error">{data.errorFields.username}</div>
        }
        <br />
        <label>Email:</label>
        <input type="email" name="email" placeholder={placeHolders.emailPlaceHolder} required />
        {
        data&&
        data.errorFields&&
        data.errorFields.email&&
        <div className="error">{data.errorFields.email}</div>
        }
        <br />
        <label>Password:</label>
        <input type="password" name="password" placeholder={placeHolders.password1PlaceHolder} required />
        {
        data&&
        data.errorFields&&
        data.errorFields.password1&&
        <div className="error">{data.errorFields.password1}</div>
        }
        <br />
        <label>Confirm password:</label>
        <input type="password" name="confirm-password" placeholder={placeHolders.password2PlaceHolder} required />
        {
        data&&
        data.errorFields&&
        data.errorFields.password2&&
        <div className="error">{data.errorFields.password2}</div>
        }
        <br />
        <button>Sign up</button>
    </Form>
}
 
export default Signup;