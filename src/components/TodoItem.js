import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const TodoItem = () => {
    return (
        <li className="todo-item">
            <input type="checkbox" />
            <span className="item-title">Item title</span>
            <button className="small-button standard">
                Show more
            </button>
            <div className ="item-quick-buttons">
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </li>
    )
}

export default TodoItem