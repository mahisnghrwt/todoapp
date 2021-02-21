import React from 'react'
import {Link} from 'react-router-dom'
const Nav = props => {
    return (
        <div className="nav">
            <span className="logo">
                TODOAPP
            </span>
            <span>
                <Link to="/">Home</Link>
            </span>
            <span>
                <Link to="/list">List</Link>
            </span>
            <span>
                <Link to="/todo">Todo</Link>
            </span>
            <span className="settings">
                Settings
            </span>
        </div>
    )
}

export default Nav