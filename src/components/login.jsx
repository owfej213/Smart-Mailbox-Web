import { GoogleLogin } from "@leecheuk/react-google-login";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignInButton = styled.div`
    margin: 0 15%;
    margin-top: 1em;
    display: flex;
    justify-content: center;
`

function Login() {
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("Login Success!", res);
        navigate("/");
    }

    const onFailure = (res) => {
        console.log("Login Failed!", res);
    }

    return(
        <SignInButton>
            <GoogleLogin
                clientId={import.meta.env.VITE_CLIENT_ID}
                buttonText="Google 登入"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={true}
            />
        </SignInButton>
    );
}

export default Login;