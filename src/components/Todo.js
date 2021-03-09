import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import { requestTodoCreate, requestTodoUpdate } from './utility/APICalls'
import {reportType} from './utility/Definations'

const TodoEdit = ({reportParent}) => {
    //priorities enum
    const priorities = ["Low", "Moderate", "High"]
    const property = {
        TITLE: 'title',
        DESC: 'desc',
        PRIORITY: 'priority'
    }

    const history = useHistory()
    //local state, required for controlled components
    const [state, setState] = useState({
        title: "", desc: "", priority: "low"
    })   
    const [todoListId, setTodoListId] = useState(null)

    const saveTodo = () => {
        if (state._id) {
            //Make an update call here
            requestTodoUpdate(todoListId, state)
            .then(response => {
                if (response.status != 200) {
                    reportParent(reportType.UPDATE, {status: response.status})
                    throw new Error('While updating todo, response:', response)
                }
                return response.json()
            })
            .then(updatedTodo => {
                reportParent(reportType.UPDATE, {status: 200, json: updatedTodo})
            })
            .catch(err => {
                console.error(err)
            })
        }
        else {
            //Create call over here
            requestTodoCreate(todoListId, state)
            .then(response => {
                if (response.status != 200) {
                    reportParent(reportType.CREATE, {status: response.status})
                    throw new Error('While creating todo, response:', response)
                }
                return response.json()
            })
            .then(todo => {
                reportParent(reportType.CREATE, {status: 200, json: todo})
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    //Buttons for our form
    const buttons = [
        new ButtonC(state._id ? "Save" : "Create", null, saveTodo),
        new ButtonC("Cancel", null, () => history.go(-1))
    ]   

    useEffect(() => {
        //Extract todoListId from URL
        setTodoListId(() => history.location.search.split('=')[1])
        if (history.location.state && history.location.state.todo) {
            setState(() => history.location.state.todo)
        }
    }, [])

    const propertyChanged = (property, event) => {
        setState(prev => {
            // prev.title = event.target.value
            prev[property] = event.target.value
            // prev[property] = event.target.value
            // console.log(prev)
            return {
                ...prev
            }
        })
    }

    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    &lt;todo-title&gt;
                </div>
                <br />
                <div className="todo-form">
                    <div className="form-row">
                        <div className="input-group">
                            <label>Title</label>
                            <input type="text" value={state.title} onChange={(event) => propertyChanged(property.TITLE, event)} />
                        </div>
                        <div className="input-group">
                            <label>Priority</label>
                            <select value={state.priority} onChange={(event) => propertyChanged(property.PRIORITY, event)} >
                                {
                                    priorities.map((x, index) => {
                                        return <option key={index} value={x.toLowerCase()}>{x}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Desc</label>
                        <textarea onChange={(event) => propertyChanged(property.DESC, event)} value={state.desc} />
                    </div>
                    <QuickButtons buttons={buttons} />
                </div>
            </div>
        </div>
    )
}

export default TodoEdit