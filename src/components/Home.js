import React, {useEffect, useContext, useState} from 'react'
import {faFile, faSort, faSave} from '@fortawesome/free-solid-svg-icons'

import {DataContext} from './Context'
import {requestAll, requestCreate} from './utility/APICalls'

import Nav from './Nav'
import {QuickButtons, ButtonC, Button} from './QuickButtons'
import UlList from './UlList/UlList'

var arraySort = require('array-sort')

const CreateListForm = ({toggleSelf}) => {
    const [state, setState] = useState({listTitle: ""})
    const [data, setData] = useContext(DataContext)
    
    const createList = event => {
        requestCreate(state.listTitle)
        .then(todoLists => {
            console.log(todoLists)
            setData((prev) => {
                return {
                    ...prev,
                    userData: {
                        todoLists: todoLists
                    }
                }
            })
        })
        toggleSelf()
    }

    //Title input field value onChange handler.
    const titleChanged = event => {
        setState((prev) => {
            return {
                ...prev, listTitle: event.target.value
            }
        })
    }

    const buttonData = new ButtonC("Save", faSave, createList)

    return (
        <div className="create-list">
            <div className="form-title">Create a new list</div>
            <div className="input-group inline">
                <label>Title</label>
                <input type="text" value={state.listTitle} onChange={titleChanged} />
                <Button button={buttonData} />
            </div>
        </div>
    )
}

const Home = _ => {
    const [data, setData] = useContext(DataContext)
    const [state, setState] = useState({createListFormEnabled: false})
    const sortType = {
        ALPHABETICAL: "title",
        PENDING_ITEMS: "pendingCount",
        HIGH_PRIORITY_ITEMS: "highPriorityCount"
    }

    //Event handler for "New" list button
    const toggleForm = event => {
        setState((prev) => {
            return {
                ...prev, createListFormEnabled: !prev.createListFormEnabled
            }
        })
    }

    const sortList = param => {
        var listsCpy = data.userData.todoLists
        arraySort(listsCpy, param)
        setData(prev => {
            return (
                {
                    ...prev, userData: {
                        todoLists: listsCpy
                    }
                }
            )
        })
    }

    //Buttons, we will pass to "QuickButtons" component
    const buttons = [
                        new ButtonC("New", faFile, toggleForm),
                        new ButtonC("Sort", faSort, null, [
                            new ButtonC("Alphabetical", null, () => sortList(sortType.ALPHABETICAL)),
                            new ButtonC("Pending", null, () => sortList(sortType.PENDING_ITEMS)),
                            new ButtonC("High-priority items", null, () => sortList(sortType.HIGH_PRIORITY_ITEMS))
                        ])
                    ]

    //Fetch the user data from backend, and store inside "DataContext"
    useEffect(() => {
        requestAll()
        .then(todoLists => {
            //Add additional fields to it
            todoLists.forEach(list => {
                list.highPriorityCount = 0
                list.pendingCount = 0
                list.todo_items.forEach(x => {
                    if (x.priority === "high") list.highPriorityCount++
                    if (!x.compeleted) list.pendingCount++
                }) 
            })
            console.log(todoLists)
            setData((prev) => {
                return {
                    ...prev, userData: {
                        todoLists
                    }
                }
            })
        }) 
    }, [])

    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    My Lists
                </div>
                <QuickButtons buttons={buttons}/>
                <br />
                {state.createListFormEnabled && <CreateListForm toggleSelf={toggleForm}/>}
                <UlList />
            </div>
        </div>
    )
}

export default Home