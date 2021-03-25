import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEdit, faTrash, faCheckCircle, faTimesCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
// import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import {requestTodoUpdate, requestTodoDelete, requestTodoRecurringUpdate} from '../utility/APICalls'
import {reportType, todoType, todoRecurringActivity} from '../utility/Definations'

const LiTodo = ({todoListId, todo, reportParent}) => {
    const [state, setState] = useState({detailedView: false})
    const history = useHistory()
    const msInHours = 3600000
    const liTodoClass = `li-todo ${todo.priority}-priority`

    var age = (new Date() - new Date(todo.created_at)) / msInHours
    if (age > 24 ) { 
        age /= 24
        age = age.toFixed(2)
        age = age.toString() + " days"
    }
    else {
        age = age.toFixed(2)
        age = age.toString() + " hours"
    }

    const toggleDetails = () => {
        setState((prev) => { return {...prev, detailedView: !prev.detailedView} })
    }

    const done = (event) => {
        event.stopPropagation()
        requestTodoUpdate(todoListId, {...todo, compeleted: !todo.compeleted})
        .then(response => {
            if (response.status != 200) {
                reportParent(reportType.UPDATE, {status: response.status})
                throw new Error('Error occured while updating Todo!')
            }
            return response.json()
        })
        .then(updatedTodo => {
            reportParent(reportType.UPDATE, {status: 200, json: updatedTodo})
        })
    }

    const deleteSelf = event => {
        event.stopPropagation()
        requestTodoDelete(todoListId, todo._id)
        .then(response => {
            if (response.status != 200) {
                reportParent(reportType.DELETE, {status: response.status})
                throw new Error('Error occured while deleteing Todo!')
            }
            else {
                reportParent(reportType.DELETE, {status: 200, json: {_id: todo._id}})
            }
        })
    }

    const updateRecurringActivity = (event, recurringActivity) => {
        event.stopPropagation()
        const todo_ = JSON.parse(JSON.stringify(todo))
        todo_.recurring_activity.push(recurringActivity)
        requestTodoUpdate(todoListId, todo_)
        .then(response => {
            if (response.status != 200) {
                reportParent(reportType.UPDATE, {status: response.status})
                throw new Error('Error occured while updating Todo!')
            }
            else {
                reportParent(reportType.UPDATE, {status: 200, json: {...todo_}})
            }
        })
    }

    const editSelf = event => {
        event.stopPropagation()
        history.push(`/todo?listId=${todoListId}`, {todo})
    }

    return (
        <div className={liTodoClass} onDoubleClick={toggleDetails}>
            <div className="li-todo-basic">
                <span>
                    <input type="checkbox" checked={todo.compeleted} onClick={done} readOnly/>
                    <span className='li-todo-title' style={todo.compeleted ? {textDecoration: 'line-through'} : {}}>
                        { todo.title }
                    </span>
                </span>

                {/* Recurring todo only! ---START--- */}
                {todo.type === todoType.RECURRING && todo.recurring_activity &&
                    <span className='recurring-todo-status'>
                        {todo.recurring_activity.map((x, index) => x === true ? <FontAwesomeIcon key={index} className='success-text' icon={faCheckCircle} /> : <FontAwesomeIcon className='danger-text' icon={faTimesCircle} />)}
                    </span>
                }
                {/* Recurring todo only! ---END--- */}

                <span className="li-todo-right">
                    <span className="indicator">
                        <FontAwesomeIcon className="fa-outline" icon={faClock} />
                        <span className="indicator-count">{age}</span>
                    </span>
                    {/* Recurring todo only! ---START--- */}
                    {todo.type === todoType.RECURRING &&
                        <span className='indicator'>
                            <button className='recurring-todo-button success' onClick={(event) => updateRecurringActivity(event, todoRecurringActivity.POSITIVE)}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </button>
                            <button className='recurring-todo-button danger' onClick={(event) => updateRecurringActivity(event, todoRecurringActivity.NEGATIVE)}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        </span>
                    }
                    {/* Recurring todo only! ---END--- */}
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
                    {todo.desc}
                </div>
            }
        </div>
    )
}

export default LiTodo