import './ModernApp.css';

import React, {useEffect, useRef, useState} from 'react'
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

const TestComponent = ({global: [global, setGlobal__]}) => {
  useEffect(() => {
    console.log('Hello World!')
  }, [])
  return (
    <div>
      {!global.todoLists ? "Please wait while we load your data!" : "Date loaded!"}
    </div>
  )
}

const App = _ => {
  const [auth, setAuth] = useState({loggedIn: false})
  const [global, setGlobal_] = useState({})
  const mounted = useRef(true)   

  //Always update todoLists using this function only.
  //It ensures todoLists always are tagged.
  const setGlobal__ = (cb, todoLists = null, makeDeepCopy = false) => {
    setGlobal_((prev) => {
      var temp = todoLists
      if (!temp)
          temp = prev.todoLists

      var todoLists_ = null
      if (makeDeepCopy)
          todoLists_ = JSON.parse(JSON.stringify(temp))
      else
          todoLists_ = temp

      //If we have callback, process todoLists in it
      cb(todoLists_)

      //tag lists
      tagLists(todoLists_)        
      
      //Update it in global
      return {
          ...prev, todoLists: todoLists_
      }
    })
  }

const setGlobal = (cb, todoLists = null, makeDeepCopy = false) => {
  if (mounted.current === true)
    setGlobal__(cb, todoLists, makeDeepCopy)
}

  //Fetch and store todoList for the current user
  useEffect(() => {
    if (!auth.loggedIn) return
    if (!global.todoLists) {
      console.log('Hello Universe!')
      requestAll()
      .then(response => {
          if (response.status != 200) { 
              //Notify the user about the error
              return
          }
          return response.json()
      })
      .then(todoLists => {
        console.log(todoLists)
        //take the todoLists received in response, sort it out and then save it in global state
        setGlobal(todoLists => todoLists, todoLists, false)
      })
      .catch(err => {
        console.error(err)
      })
    }
    return () => mounted.current = false
}, [auth.loggedIn])

  return (
      <div className="App">
          <AuthContext.Provider value={[auth, setAuth]}>
            <BrowserRouter>    
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <ProtectedRoute exact path='/'>
                  <Home global={[global, setGlobal__]} />
                </ProtectedRoute>
                <ProtectedRoute exact path='/list/:id'>
                  <List global={[global, setGlobal__]} />
                </ProtectedRoute>
                <ProtectedRoute exact path='/todo'>
                  <Todo />
                </ProtectedRoute>
                <ProtectedRoute exact path='/logout'>
                  <Logout />
                </ProtectedRoute>
                <ProtectedRoute exact path='/test'>
                  <TestComponent global={[global, setGlobal__]}/>
                </ProtectedRoute>
              </Switch>
            </BrowserRouter>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
