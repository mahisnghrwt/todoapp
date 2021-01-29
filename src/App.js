import './App.css';
import React from 'react'
import {Route, HashRouter, NavLink, useParams, Switch} from 'react-router-dom'
import List from './components/List'
import list, { item } from './components/class/list'
import TodoItem from './components/TodoItem'
import Header from './components/Header'
import RootQuickButtons from './components/RootQuickButtons'
import ListQuickButtons from './components/ListQuickButtons'
import TodoItemEdit from './components/TodoItemEdit'

import TodoFolder from './components/TodoFolder'

class App extends React.Component {

  constructor(props) {
    super(props)

    //init the state
    this.state = {
      data: [new list("school work", [new item("sst", null, null), new item("maths", null, null), new item("sst", null, null), new item("maths", null, null), new item("sst", null, null), new item("maths", null, null), new item("sst", null, null), new item("maths", null, null),
      new item("sst", null, null), new item("maths", null, null), new item("sst", null, null), new item("maths", null, null)]), new list("hoemwork", null)],
      checked: new Map(),
      addFormEnabled: false,
      newListName: '',
      currentListId: -1
    }
    this.state.data.map((x) => {this.state.checked.set(x.id, false)})
  }

  //check for the selected list and delete them
  deleteListHandler = () => {
    let newData = this.state.data.filter((x) => {
      if (this.state.checked.get(x.id) === true) {
        this.setState((prevState) => {
          let newChecked = prevState.checked;
          newChecked.delete(x.id)
          return {
            checked: newChecked
          }
        })
        return false;
      }
      else {
        return true;
      }
    })

    this.setState((prevState) => {
      return {
        data: newData
      }
    }, () => console.log(this.state.data))
  }

  addListHandler = () => {
    if (this.state.addFormEnabled === true) {
      this.setState((prevState) => {
        let newData = [new list(prevState.newListName, null)]
        let newMap = new Map();
        newMap.set(newData.id, false)
        return {
          newListName: '',
          data: [...newData, ...prevState.data],
          checked: new Map([...newMap, ...prevState.checked])
        }
      }, () => console.log(this.state.data))
    }
    this.setState({addFormEnabled: !this.state.addFormEnabled})
  }

  selectListHandler = (id) => {
    this.setState((prevState) => {
      let temp = new Map();
      let val = !prevState.checked.get(id)
      temp.set(id, val)
      return {
        checked: new Map([...prevState.checked, ...temp]),
        currentListId: id
      }
    }, () => console.log("state has been updated!"))
  }

  listNameHandler = (value) => {
    this.setState({
      newListName: value
    })
  }

  ListDetailed = (props) => {
    //very naive approach :/
    let currentList;
    this.state.data.some((x) => {
      if (x.id === this.state.currentListId) {
        currentList = x;
        return true
      }
    })

    return (
      <div className="content">
        <ListQuickButtons />
        <hr />
        <div className = "main-content">
          <ul className = "folder">
            {currentList.items.map((x) => 
              <TodoItem clickListener = {this.onTodoItemClick} data = {x} isChecked = {false}/>
            )}
          </ul>
        </div>
      </div>
    )
  }

  Home = (props) => {
    return (
      <div className = "content">
        <RootQuickButtons
          addFormEnabled={this.state.addFormEnabled}
          newListName={this.state.newListName}
          addListHandler={this.addListHandler}
          deleteListHandler={this.deleteListHandler}
          listNameHandler={this.listNameHandler}
        />
        <hr />
        <div className = "main-content">
          <ul className = "folder">
            {this.state.data.map((x) => <List key = {x.id} isChecked = {this.state.checked.get(x.id) === true ? true: false} data = {x} onClick = {this.selectListHandler}/>)}
          </ul>
        </div>
      </div>
    );
  }

  extractData = (id) => {
    console.log(`id: ${id}`)
    let data
    this.state.data.some((x) => {
      if (Array.isArray(x.items)) {
        x.items.some((y) => {
          if (y.id == id) {
            data = y;
            return true;
          }
      })
    }
    })
    return data
  }

  ItemEdit = (props) => {
    let id = Cst()
    let data = this.extractData(id)
    return (
      <div className = "root">
        <Header />
        <TodoItemEdit data={data} />
      </div>
    )
  }

  render() {
    return (
        <div className="App">       
            <HashRouter>
              <Switch>
                <Route exact path = "/item/:id" component = {this.ItemEdit}/>
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
}

function Cst() {
  let {id} = useParams();
  return id;
}

export default App;
