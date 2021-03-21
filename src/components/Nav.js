import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from './Context'
import { GoogleLogout } from 'react-google-login';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

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
                        render={renderProps => <button className='logout-button' onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button>}
                        onLogoutSuccess={logout}
                    />
                </span>
            }
        </div>
    )
}

export default Nav