import React, {useContext} from 'react'
import {GoogleLogin} from 'react-google-login'
import {AuthContext} from './Context'
import {useHistory} from 'react-router-dom'

const Login = props => {
    const [auth, setAuth] = useContext(AuthContext)
    let history = useHistory()
    //Verify idToken with the server, login user if green flagged, otherwise throw error
    const verifyToken = async response => {
        const res = await fetch("http://localhost:5001/api/auth/google", {
            method: "POST",
            body: JSON.stringify({
                idToken: response.tokenId
            }),
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:3000/',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        console.log("response status", res.status)
        if (res.status === 200) {
            console.log("Authentication suucessful!")
            setAuth((prev) => {
                return {
                    ...prev, loggedIn: true
                }
            })
            history.push("/")
        }
        else {
            console.log("Authentication failed at back-end layer!")
        }
    }

    const onSuccess = async response => {
        //Verify token with the server
        //If expired ask them to login again, else set user as loggedIn
        verifyToken(response)
    }

    const onFailure = async response => {
        console.log("Authentication failed at front-end layer.")
        console.log(response)
        setAuth((prev) => {
            return {
                ...prev, loggedIn: false
            }
        })
    }
    
    return (
        <div className="login">
            <GoogleLogin
                render={ props => (<button onClick={props.onClick} disabled={props.disabled}>Login with Google</button>) }
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login