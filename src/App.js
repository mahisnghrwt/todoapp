import './App.css';
import React from 'react'
import {Route, HashRouter, useParams, Switch} from 'react-router-dom'
import TodoFolder from './components/TodoFolder'
import TodoList from './components/TodoList'

const App = (props) => {

  return (
      <div className="App">       
          <HashRouter>
            <Switch>
              <Route exact path = "/">
                <TodoFolder />
              </Route>
              <Route path = "/list/:id">
                <TodoList />
              </Route>
            </Switch>
          </HashRouter>
      </div>
  );
}

function GetId() {
  let {id} = useParams();
  return id;
}

export default App;
