import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'

const TodoEdit = () => {
    //priorities enum
    const priorities = ["Low", "Moderate", "High"]
    const property = {
        TITLE: 'title',
        DESC: 'desc',
        PRIORITY: 'priority'
    }
    //local state, required for controlled components
    const [state, setState] = useState({
        title: "", desc: "", priority: "low"
    })   
    const history = useHistory()
    const [todoListId, setTodoListId] = useState(null)

    const saveTodo = () => {
        //transfer the todo as state to /list/todoListId
        history.push(`/list/${todoListId}`, {todo: {...state}})
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
            prev[property] = event.target.value
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
                    {state.title}
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