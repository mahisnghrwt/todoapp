import './ModernApp.css';
import React, {useEffect, useState, useContext} from 'react'
import {Route, HashRouter, Switch, Link, useParams, Redirect} from 'react-router-dom'
import Login from './components/Login'
import {AuthContext} from './components/Context'
import Home from './components/Home'
import List from './components/List'

const App = (props) => {
  const [auth, setAuth] = useState({})

  useEffect(() => {
    setAuth(() => {
      return {
        loggedIn: false
      }
    })
  }, [])

  return (
      <div className="App">       
        <AuthContext.Provider value={[auth, setAuth]}>
          <HashRouter>
            {!auth.loggedIn && <Redirect to="/login" />}
            <Switch>
              <Route exact path = "/login">
                <Login />
              </Route>
              <Route exact path = "/">
                <List />
              </Route>
              <Route exact path = "/list">
                <List />
              </Route>
            </Switch>
          </HashRouter>
        </AuthContext.Provider>
      </div>
  );
}

export default App;
