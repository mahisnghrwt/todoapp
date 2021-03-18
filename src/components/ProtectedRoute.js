import {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import { AuthContext } from './Context'
import {useHistory} from 'react-router-dom'

const ProtectedRoute = ({path, children, ...restProps}) => {
    const [auth, setAuth] = useContext(AuthContext)
    const history = useHistory()
    const pathname = history.location.pathname

    return (<>
        {auth.loggedIn ? 
        <Route path={pathname} {...restProps}>
            {children}
        </Route>
        :
        <Redirect to={{pathname: '/login', state: {from: pathname}}} />
        }
        </>
    )
}

export default ProtectedRoute