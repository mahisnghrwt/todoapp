import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock} from '@fortawesome/free-solid-svg-icons'

const LiTodo = _ => {
    return (
        <div className="li-todo high-priority">
            <input type="checkbox" />
            <span>
                Do maths Homework
            </span>
            <span className="li-todo-right">
                <div className="indicator">
                    <FontAwesomeIcon className="fa-outline" icon={faClock} />
                </div>
                <span className="li-todo-age">
                    23 hours old
                </span>
            </span>
        </div>
    )
}

export default LiTodo