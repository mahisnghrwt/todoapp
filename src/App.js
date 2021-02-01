import './App.css';
import React from 'react'
import {Route, HashRouter, useParams, Switch} from 'react-router-dom'
import TodoFolder from './components/TodoFolder'

const App = (props) => {

  return (
      <div className="App">       
          <HashRouter>
            <Switch>
              <Route path = "/">
                <TodoFolder />
              </Route>
              <Route path = "/somethingnew">
                This is the new URL
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
