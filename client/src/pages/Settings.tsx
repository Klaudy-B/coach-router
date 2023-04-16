import { Link, Outlet } from "react-router-dom";
import { setTitle, urls } from "../helpers";

const Settings: ()=>JSX.Element = () => {
    setTitle('Settings');
    return <>
        <ul>
            <li><Link to={urls.profilePicture}>Change my profile picture</Link></li>
            <li><Link to={`${urls.settings}${urls.username}`}>Change my username</Link></li>
            <li><Link to={`${urls.settings}${urls.password}`}>Change my password</Link></li>
            <li><Link to={`${urls.settings}${urls.verifyEmail}`}>Verify my email</Link></li>
            <li><Link to={`${urls.settings}${urls.changeEmail}`}>Change my email</Link></li>
            <li><Link to={`${urls.settings}${urls.changeSubject}`}>Change Subject</Link></li>
            <li><Link to={`${urls.settings}${urls.deleteAccount}`}>Delete my account</Link></li>
        </ul>
        <Outlet />
    </>
}
 
export default Settings;