import './ModernApp.css';

import React, {useEffect, useState, useContext} from 'react'
import {Route, HashRouter, Switch, Link, useParams, Redirect} from 'react-router-dom'
import {DataContext} from './components/Context'

import Login from './components/Login'
import Home from './components/Home'
import List from './components/List'
import Todo from './components/Todo'

const App = _ => {
  const [data, setData] = useState({auth: {loggedIn: false}, userData: {todoLists: []}})

  // useEffect(() => {
  //   setAuth(() => {
  //     return {
  //       loggedIn: false
  //     }
  //   })
  // }, [])

  return (
      <div className="App">       
        <DataContext.Provider value={[data, setData]}>
          <HashRouter>
            {!data.auth.loggedIn && <Redirect to="/login" />}
            <Switch>
              <Route exact path = "/login">
                <Login />
              </Route>
              <Route exact path = "/">
                <Home />
              </Route>
              <Route exact path = "/list">
                <List />
              </Route>
              <Route path = "/todo">
                <Todo />
              </Route>
            </Switch>
          </HashRouter>
        </DataContext.Provider>
      </div>
  );
}

export default App;
