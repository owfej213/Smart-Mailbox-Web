import { GoogleLogout } from "@leecheuk/react-google-login"
import { Navigate } from "react-router-dom"
import { useState } from 'react'

function Logout() {
    const [isLoggedOut, setLoggedOut] = useState(false)
    
    const onSuccess = () => {
        setLoggedOut(true)
    }

    if(isLoggedOut){
        return <Navigate to="/" />
    }

    return(
        <div id="signInButton">
            <GoogleLogout
                clientId={import.meta.env.VITE_CLIENT_ID}
                buttonText="Google 登出"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout