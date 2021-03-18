import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from './Context'
import { GoogleLogout } from 'react-google-login';

const Nav = () => {
    const history = useHistory()
    const [authContext, setAuthContext] = useContext(AuthContext)

    const logout = () => {
        setAuthContext(() => {
            return {
                loggedIn: false
            }
        })
        history.push('/')
    }

    return (
        <div className="nav">
            <span className="logo" onClick={() => history.push('/')}>
                todoapp
            </span>
            {authContext.loggedIn && 
                <span className="settings">
                    <GoogleLogout
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    />
                </span>
            }
        </div>
    )
}

export default Nav