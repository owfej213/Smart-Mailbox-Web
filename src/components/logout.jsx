import { GoogleLogout } from "@leecheuk/react-google-login";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const onSuccess = (res) => {
        console.log(res);
        navigate("/Login");
    }

    return(
        <div id="signInButton">
            <GoogleLogout
                clientId={import.meta.env.VITE_CLIENT_ID}
                buttonText="Google 登出"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;