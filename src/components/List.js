import { faClock, faExpandAlt, faFile, faSort, faHandRock } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import {requestTodoCreate, requestTodoUpdate, requestUpdateSortingConfig} from './utility/APICalls'
import {reportType} from './utility/Definations'
import LiTodo from './UlTodo/LiTodo'
import Notification from './Notification'

const todoSortType = {
    AGE: 'created_at',
    PRIORITY: 'priority'
}

const List = ({global: [global, setGlobal__]}) => {
    const history = useHistory()
    const {id} = useParams()
    var mounted = useRef(true)
    const [error, setError_] = useState('')
    const errorTimeout = 10000 //10 seconds

    //Grab the latest state for this list from global
    //We are mantaining single source of truth, state refers to global.todoLists
    //It is updated on every single render
    var state = null
    if (global && global.todoLists) {
        state = global.todoLists.find(x => x._id == id)
    }
    
    const buttons = [
        new ButtonC("New", faFile, _ => { history.push({pathname: '/todo', search: `?listId=${id}`}) }),
        new ButtonC("Sort", faSort, null, [
            new ButtonC("Age", faClock, _ => sort(todoSortType.AGE)),
            new ButtonC("Priority", faHandRock, _ => sort(todoSortType.PRIORITY))
        ]),
        new ButtonC("Expand all", faExpandAlt, null)
    ]

    const setGlobal = (cb, todoLists = null, makeDeepCopy = false) => {
        if (mounted.current)
            setGlobal__(cb, todoLists, makeDeepCopy)
    }

    const setError = err => {
        if (mounted.current)
            setError_(() => err)
    }

    //Handles subcomponent response received from remote endpoint
    //for reportT, Refer to reportType
    //remoteResponse, {status: number, json: Obj}
    const subComponentReportHandler = (reportT, remoteResponse) => {
        if (remoteResponse.status != 200) {
            setError(`status code: ${remoteResponse.status}, error: ${remoteResponse.error}`)
            return
        }
        switch(reportT) {
            case reportType.CREATE:
                const createTodoCallback = (todoLists) => {
                    var todoList = todoLists.find(x => x._id == id)
                    todoList.todo_items.push(remoteResponse.json)
                }
                setGlobal(createTodoCallback, null, true)
                break
            case reportType.UPDATE:
                const updateTodoCallback = (todoLists) => {
                    var todoListIndex = todoLists.findIndex(x => x._id == id)
                    var todoItemIndex = todoLists[todoListIndex].todo_items.findIndex(x => x._id == remoteResponse.json._id)
                    todoLists[todoListIndex].todo_items[todoItemIndex] = {... todoLists[todoListIndex].todo_items[todoItemIndex], ...remoteResponse.json}
                }
                setGlobal(updateTodoCallback, null, true)
                break
            case reportType.DELETE:
                const deleteTodoCallback = (todoLists) => {
                    var todoListIndex = todoLists.findIndex(x => x._id == id)
                    var todoItemIndex = todoLists[todoListIndex].todo_items.findIndex(x => x._id == remoteResponse.json._id)
                    todoLists[todoListIndex].todo_items.splice(todoItemIndex, 1)
                }
                setGlobal(deleteTodoCallback, null, true)
                break
        }
    }

    //Request server to create/update todo
    const processTodo = todo => {
        //If the todo has '_id' property, it indicates that it already exists and its an update call, else create new one.
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
            .catch(err => {
                setError(err)
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
            .catch(err => {
                setError(err)
            })
        }
    }

    //If criteria is passed as a parameter, it compares with the previous criteria, and appends the sorting order('asc' or 'desc')
    //keyword accordingly.
    //Else, returns the current criteria.
    const generateCriteria = (criteria = null) => {
        if (criteria == null) return state.sort
        const prevCriteria = state.sort.split('.')

        if (criteria === prevCriteria[0]) {
            //Opposite sorting order
            if (prevCriteria[1] === 'desc') {
                criteria += '.asc'
            }
            else {
                criteria += '.desc'
            }
        } else {
            //Otherwise default desc order
            criteria += '.desc'
        }

        return criteria
    }

    const sortTodosCallback = (todoLists, criteria) => {
        var i = todoLists.findIndex(x => x._id == state._id)
        //Sort the todo_items inplace according to the todoList.sort
        //Right now we are only sorting if the criteria is 'priorirty'
        const criteria_ = criteria.split('.')
        if (criteria_[0] === todoSortType.PRIORITY) {
            if (criteria_[1] === 'asc') {
                todoLists[i].todo_items.sort(priorityCompare)
            }
            else {
                todoLists[i].todo_items.sort((a, b) => (-1 * priorityCompare(a, b)))
            }
        }
        else if (criteria_[0] === todoSortType.AGE) {
            if (criteria_[1] === 'asc') {
                todoLists[i].todo_items.sort(createdAtCompare)
            }
            else {
                todoLists[i].todo_items.sort((a, b) => (-1 * createdAtCompare(a, b)))
            }
        }
        todoLists[i] = {
            ...todoLists[i], sort: criteria
        }
    }

    const sort = (criteria) => {
        criteria = generateCriteria(criteria)
        requestUpdateSortingConfig(state._id, criteria)
        .then(response => {
            if (response.status != 200) {
                setError(`status code: ${response.status}, error: ${response.error}`)
            }
            else {
                setGlobal((todoLists) => sortTodosCallback(todoLists, criteria), null, false)
            }
        })
    }

    //It is callback function to compare todos based on priority
    //Orders them in descending order
    //multiply the result by -1, for ascending order
    const priorityCompare = (a, b) => {
        if (a.priority === b.priority) return 0
        if (a.priority === 'high') return -1
        if (a.priority === 'moderate' && b.priority !== 'high') return -1
        return 1
    }

    const createdAtCompare = (a, b) => {
        if (a.created_at === b.created_at) return 0
        if (a.created_at > b.created_at) return -1
        return 1
    }

    useEffect(() => {
        //Mark the component as unmounted
        return () => mounted.current = false
    }, [])

    useEffect(() => {
        //In case we do not have list id passed in as url params, redirect user back to the Home page
        if (!id) {
            history.push({
                pathname: '/'
            })
        }

        if (!global.todoLists) return

        //Checks if the a todoList with the specified exists
        var ind = global.todoLists.findIndex(x => x._id === id)
        if (ind === -1)
            history.push({
                pathname: '/'
            })

        //If the user is redirected to this page from the /todo, then check for the state received to add or update todo
        if (history.location.state && history.location.state.todo) {
            processTodo(history.location.state.todo)
            //clear history.location.state
            history.replace(`/list/${id}`)
        }

        //Sort the todoList
        setGlobal((todoLists) => sortTodosCallback(todoLists, state.sort), null, false)        
    }, [global.todoLists])
    
    return (
        <div className="home">
            <Notification message={error} timeout={errorTimeout} />
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