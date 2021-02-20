import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered, faExclamation, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

const LiList = _ => {
    return (
        <div className="li-list">
            <span>
                Homework List
            </span>
            <span className="li-list-right">
                <span className="indicator">
                    <FontAwesomeIcon className="danger-text" icon={faExclamation} />
                    <span className="indicator-count">5</span>
                </span>
                <span className="indicator">
                    <FontAwesomeIcon className="warning-text" icon={faExclamationTriangle} />
                    <span className="indicator-count">5</span>
                </span>
                <span className="indicator">
                    <FontAwesomeIcon  icon={faFlagCheckered} />
                    <span className="indicator-count">10</span>
                </span>
            </span>
        </div>
    )
}

export default LiList