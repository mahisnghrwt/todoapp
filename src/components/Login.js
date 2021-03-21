import React, {useContext} from 'react'
import {GoogleLogin} from 'react-google-login'
import {AuthContext} from './Context'
import {useHistory} from 'react-router-dom'

const Login = _ => {
    const AUTH_ENDPOINT = "http://localhost:5001/api/auth/google"
    //const [data, setData] = useContext(DataContext)
    const [auth, setAuth] = useContext(AuthContext)

    const history = useHistory()
    //Verify idToken with the server, login user if green flagged, otherwise throw error
    const verifyToken = async googleLoginResponse => {
        const res = await fetch(AUTH_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
                idToken: googleLoginResponse.tokenId
            }),
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:3000/',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        //If authentication successful, mark user loggedIn in auth
        if (res.status == 200) {
            const userConfig = await res.json()
            setAuth((prev) => {
                return {
                    ...prev, ...userConfig, loggedIn: true
                }
            })
            //Redirect the user to Home
            var redirectPath = '/'
            if (history.location && history.location.state && history.location.state.from) {
                console.log(history.location.state)
                redirectPath = history.location.state.from
                history.replace('/login', null)
            }
            history.push({
                pathname: redirectPath
            })
        }
        else {
            //If authentication fails, notify the user!
            //!TODO! Create a Notification component 
            console.log("Authentication failed at back-end layer!")
        }
    }

    const onSuccess = async googleLoginResponse => {
        //Verify token with the server
        verifyToken(googleLoginResponse)
    }

    const onFailure = async _ => {
        setAuth(prev => {
            return {
                ...prev, loggedIn: false
            }
        })
    }
    
    return (
        <div className="login">
            <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                isSignedIn={true}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login