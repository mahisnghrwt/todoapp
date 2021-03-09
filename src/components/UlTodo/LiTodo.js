import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import { requestTodoUpdate, requestTodoDelete } from '../utility/APICalls'
import {DataContext} from '../Context'

const LiTodo = ({todoListId, todo, deleteItem}) => {
    const [state, setState] = useState({detailedView: false})
    const [data, setData] = useContext(DataContext)
    const history = useHistory()
    const msInHours = 3600000
    const liTodoClass = `li-todo ${todo.priority}-priority`
    console.log(liTodoClass)

    var age = (new Date() - new Date(todo.created_at)) / msInHours
    age = age.toFixed(2)
    if (age > 24 ) { 
        age /= 24
        age = age.toString() + " days"
    }
    else {
        age = age.toString() + " hours"
    }

    const toggleDetails = _ => {
        setState((prev) => { return {...prev, detailedView: !prev.detailedView} })
    }

    const toggleCompelete = event => {
        requestTodoUpdate(todoListId, todo._id, { compeleted: !todo.compeleted })
        .then(responseTodoLists => setData((prev) => {
            return {
                ...prev, userData: { todoLists: responseTodoLists }
            }
        }))
    }

    const deleteSelf = event => {
        event.stopPropagation()
        deleteItem(todo._id)

        
    }

    const editSelf = event => {
        event.stopPropagation()
        history.push({ pathname: "/todo/" + todo._id }, {todoListId: todoListId, todo: todo})
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
                        <FontAwesomeIcon icon={faEdit} onClick={editSelf} />
                    </span>
                    <span className="indicator">
                        <FontAwesomeIcon icon={faTrash} onClick={deleteSelf} />
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