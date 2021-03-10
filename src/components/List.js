import { faClock, faExpandAlt, faFile, faSort, faHandRock } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import {request, requestTodoCreate, requestTodoUpdate, requestTodoDelete} from './utility/APICalls'
import {reportType, todoSortType} from './utility/Definations'
import LiTodo from './UlTodo/LiTodo'
var arraySort = require('array-sort')

const List = ({global: [global, setGlobal]}) => {
    const history = useHistory()
    const {id} = useParams()
    const [state, setState] = useState(null)
    
    const buttons = [
        new ButtonC("New", faFile, _ => { history.push({pathname: '/todo', search: `?listId=${id}`}) }),
        new ButtonC("Sort", faSort, null, [
            new ButtonC("Age", faClock, _ => sort(todoSortType.AGE)),
            new ButtonC("Priority", faHandRock, _ => sort(todoSortType.PRIORITY))
        ]),
        new ButtonC("Expand all", faExpandAlt, null)
    ]

    //Handles subcomponent response received from remote endpoint
    //for reportT, Refer to reportType
    //remoteResponse, {status: number, json: Obj}
    const subComponentReportHandler = (reportT, remoteResponse) => {
        switch(reportT) {
            case reportType.CREATE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {
                    setGlobal((prev) => {
                        var todoList = prev.todoLists.find(x => x._id == id)
                        todoList.todo_items.push(remoteResponse.json)
                        return {
                            ...prev, todoLists: [todoList]
                        }
                    })
                }
                break
            case reportType.UPDATE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {
                    
                    setGlobal((prev) => {
                        var todoListIndex = prev.todoLists.findIndex(x => x._id == id)
                        var todoItemIndex = prev.todoLists[todoListIndex].todo_items.findIndex(x => x._id == remoteResponse.json._id)
                        prev.todoLists[todoListIndex].todo_items[todoItemIndex] = {... prev.todoLists[todoListIndex].todo_items[todoItemIndex], ...remoteResponse.json}
                        return {
                            ...prev
                        }
                    })
                }
                break
            case reportType.DELETE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {

                }
                break
        }
    }

    const handleReceivedTodo = todo => {
        //Update
        if (todo._id) {
            requestTodoUpdate(id, todo)
            .then(response => {
                if (response.status != 200) {
                    //throw notification to user
                    subComponentReportHandler(reportType.UPDATE, {status: response.status})
                    throw new Error(`Error occured while updating todo.`)
                }
                return response.json()
            })
            .then(updatedTodo => {
                subComponentReportHandler(reportType.UPDATE, {status: 200, json: updatedTodo})
            })
        }
        else {
            //create
            requestTodoCreate(id, todo)
            .then(response => {
                if (response.status != 200) {
                    subComponentReportHandler(reportType.CREATE, {status: response.status})
                    throw new Error(`Error occured while creating todo.`)
                }
                return response.json()
            })
            .then(newTodo => {
                subComponentReportHandler(reportType.CREATE, {status: 200, json: newTodo})
            })
        }
    }

    const sort = (criteria) => {
        const compare = (a, b) => {
            if (a.priority === b.priority) return 0
            if (a.priority === 'high') return -1
            if (a.priority === 'moderate' && b.priority === 'low') return -1
            return 1
        }

        if (criteria === todoSortType.PRIORITY)
            arraySort(state.todo_items, compare)
        else
            arraySort(state.todo_items, criteria)
    }

     useEffect(() => {
        //In case we do not have list id passed in as url params, redirect user back to the Home page
        if (!id || !global.todoLists) {
            history.push({pathname: '/'})
        }
        else {
            setState(() => global.todoLists.find(x => x._id === id) )

            //If the user is redirected to this page from the /todo, then check for the state received to add or update todo
            if (history.location.state && history.location.state.todo) {
                handleReceivedTodo(history.location.state.todo)
                //clear history.location.state
                history.replace(`/list/${id}`)
            }
        }
     }, [])

    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    {state && state.title}
                </div>
                <>
                    <QuickButtons buttons={buttons} />
                    <br />
                    {!state ? <p>Please wait while we load your data...</p> :  
                    <div className="ul-list">
                        {state.todo_items.map((x) => <LiTodo key={x._id} todoListId={state._id} todo={x} reportParent={subComponentReportHandler} />)}
                    </div>
                    }   
                </>
            </div>
        </div>
    )
}

export default List