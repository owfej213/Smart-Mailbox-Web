import { GoogleLogin } from "@leecheuk/react-google-login"
import { Navigate } from "react-router-dom"
import { useState } from 'react'
import styled from 'styled-components'

const SignInButton = styled.div`
    margin: 0 15%;
    margin-top: 1em;
    display: flex;
    justify-content: center;
`

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false)

    const onSuccess = (res) => {
        if(res.profileObj){
            setLoggedIn(true)
        }
    }

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res)
    }

    if(isLoggedIn){
        return <Navigate to="/Home" />
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
    )
}

export default Login