import { Form, Link, useActionData } from "react-router-dom";
import { urls } from "../helpers";

const ProfilePicture: ()=>JSX.Element = () => {
    const data: any = useActionData();
    if(data&&data.error){
        throw Error(data.error);
    }
    return <center>
    <Form id="profile-picture-form" method="post" action={urls.profilePicture} encType='multipart/form-data'>
        <label>Choose a profile picture:</label>
        <input type="file" name="picture" accept="image/*" required />
        <br />
        <button>Submit</button>
        {
            data&&
            data.success&&
            <div className="success">
                {data.success}
            </div>
        }
        {
            data&&
            data.noUpload&&
            <div className="error">
                {data.noUpload}
            </div>
        }
    </Form>
    {
        data&&data.success?
        <p><Link to={urls.home}>Done</Link></p>
        :
        <p><Link to={urls.home}>Skip</Link></p>
    }
    </center>
}
 
export default ProfilePicture;