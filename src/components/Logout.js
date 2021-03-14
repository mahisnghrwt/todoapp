import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory()
    const logout = () => {
        history.push('/')
    }

    return (
        ""
    )
}

export default Logout