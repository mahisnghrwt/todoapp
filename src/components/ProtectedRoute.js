import {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import { AuthContext } from './Context'

const ProtectedRoute = ({path, children, ...restProps}) => {
    const [auth, setAuth] = useContext(AuthContext)
    return (<>
        {auth.loggedIn ? 
        <Route path={path} {...restProps}>
            {children}
        </Route>
        :
        <Redirect to={{pathname: '/login', state: {from: path}}} />
        }
        </>
    )
}

export default ProtectedRoute