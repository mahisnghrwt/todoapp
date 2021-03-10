import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import { requestTodoUpdate, requestTodoDelete } from '../utility/APICalls'

const LiTodo = ({todoListId, todo, reportParent}) => {
    const [state, setState] = useState({detailedView: false})
    const history = useHistory()
    const msInHours = 3600000
    const liTodoClass = `li-todo ${todo.priority}-priority`

    var age = (new Date() - new Date(todo.created_at)) / msInHours
    age = age.toFixed(2)
    if (age > 24 ) { 
        age /= 24
        age = age.toString() + " days"
    }
    else {
        age = age.toString() + " hours"
    }

    const toggleDetails = () => {
        setState((prev) => { return {...prev, detailedView: !prev.detailedView} })
    }

    const toggleCompelete = () => {
        requestTodoUpdate(todoListId, todo._id, { compeleted: !todo.compeleted })
    }

    return (
        <div className={liTodoClass} onClick={toggleDetails}>
            <div className="li-todo-basic">
                <input type="checkbox" checked={ todo.compeleted } onChange={toggleCompelete} />
                <span>
                    { todo.title }
                </span>
                <span className="li-todo-right">
                    <div className="indicator">
                        <FontAwesomeIcon className="fa-outline" icon={faClock} />
                        <span className="indicator-count">{age}</span>
                    </div>
                    <span className="indicator">
                        <FontAwesomeIcon icon={faEdit} onClick={null} />
                    </span>
                    <span className="indicator">
                        <FontAwesomeIcon icon={faTrash} onClick={null} />
                    </span>
                </span>
            </div>
            {state.detailedView && 
                <div className="li-todo-detailed">
                    { todo.desc }
                </div>
            }
        </div>
    )
}

export default LiTodo