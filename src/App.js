import './ModernApp.css';

import React, {useEffect, useState} from 'react'
import {Route, BrowserRouter, Switch, Redirect, useHistory} from 'react-router-dom'
import {AuthContext} from './components/Context'
import Notification from './components/Notification'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import List from './components/List'
import Todo from './components/Todo'
import {requestAll} from './components/utility/APICalls'
import {tagLists} from './components/utility/Utils'

const App = _ => {
  const [auth, setAuth] = useState({loggedIn: false})
  const [global, setGlobal] = useState({})

    //Always update todoLists using this function only.
    //It ensures todoLists always are tagged.
    const tagAndUpdateTodoLists = (cb, todoLists = null, makeDeepCopy = false) => {
      setGlobal((prev) => {
          var temp = todoLists
          if (!temp)
              temp = prev.todoLists

          var todoLists_ = null
          if (makeDeepCopy)
              todoLists_ = JSON.parse(JSON.stringify(temp))
          else
              todoLists_ = temp

          //tag lists
          tagLists(todoLists_)

          //If we have callback, process todoLists in it
          cb(todoLists_)
          
          //Update it in global
          return {
              ...prev, todoLists: todoLists_
          }
      })
  }

  //Fetch and store todoList for the current user
  useEffect(() => {
    if (!global.todoLists) {
        requestAll()
        .then(response => {
            if (response.status != 200) { 
                //Notify the user about the error
                return
            }
            return response.json()
        })
        .then(todoLists => {
            //take the todoLists received in response, sort it out and then save it in global state
            tagAndUpdateTodoLists(todoLists => {}, todoLists)
        })
        .catch(err => {
          console.error(err)
        })
    }
}, [])

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
