import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const TodoItem = ({data}) => {
    return (
        <li className="todo-item">
            <div className="todo-item-basic">
                <input type="checkbox" />
                <span className="item-title">{data.title}</span>
                <button className="small-button standard">
                    Show more
                </button>
                <div className ="item-quick-buttons">
                    <FontAwesomeIcon icon={faEdit} />
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
            <div className="todo-item-detailed">
                
            </div>
        </li>
    )
}

export default TodoItem