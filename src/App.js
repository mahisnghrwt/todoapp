import './ModernApp.css';

import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import {AuthContext} from './components/Context'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import List from './components/List'
import Todo from './components/Todo'

const App = _ => {
  const [auth, setAuth] = useState({loggedIn: false})
  const [global, setGlobal] = useState({})

  return (
      <div className="App">       
          <AuthContext.Provider value={[auth, setAuth]}>
            <BrowserRouter>    
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <ProtectedRoute exact path='/'>
                  <Home global={[global, setGlobal]} />
                </ProtectedRoute>
                <ProtectedRoute exact path='/list/:id'>
                  <List global={[global, setGlobal]} />
                </ProtectedRoute>
                <ProtectedRoute exact path='/todo'>
                  <Todo />
                </ProtectedRoute>
                <ProtectedRoute exact path='/logout'>
                  <Logout />
                </ProtectedRoute>
              </Switch>
            </BrowserRouter>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
