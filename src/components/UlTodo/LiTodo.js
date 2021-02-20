import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEdit} from '@fortawesome/free-solid-svg-icons'

const LiTodo = _ => {
    return (
        <div className="li-todo high-priority">
            <div className="li-todo-basic">
                <input type="checkbox" />
                <span>
                    Do maths Homework
                </span>
                <span className="li-todo-right">
                    <div className="indicator">
                        <FontAwesomeIcon className="fa-outline" icon={faClock} />
                        <span className="indicator-count">23 hours old</span>
                    </div>
                    <span className="indicator">
                        <FontAwesomeIcon icon={faEdit} />
                        <span className="indicator-count">Edit</span>
                    </span>
                </span>
            </div>
            <div className="li-todo-detailed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies egestas mauris vitae auctor. Vestibulum nec turpis leo. Mauris molestie.
            </div>
        </div>
    )
}

export default LiTodo