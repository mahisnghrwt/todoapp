import React from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered, faExclamation, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

const LiList = ({list}) => {
    const history = useHistory()
    let highPriorityCount = 0, uncompeleteCount = 0, compeletedCount = 0
    list.todo_items.forEach((x, i) => {
        if (x.priority === "high") highPriorityCount++
        if (!x.compeleted) uncompeleteCount++
    })
    compeletedCount = list.todo_items.length - uncompeleteCount


    const clicked = event => {
        history.push({
            pathname: `/list/${list._id}`
        })
    }

    return (
        <div className="li-list" onClick={clicked}>
            <span>
                {list.title}
            </span>
            <span className="li-list-right">
                <span className="indicator">
                    <FontAwesomeIcon className="danger-text" icon={faExclamation} />
                    <span className="indicator-count">{highPriorityCount}</span>
                </span>
                <span className="indicator">
                    <FontAwesomeIcon className="warning-text" icon={faExclamationTriangle} />
                    <span className="indicator-count">{uncompeleteCount}</span>
                </span>
                <span className="indicator">
                    <FontAwesomeIcon  icon={faFlagCheckered} />
                    <span className="indicator-count">{compeletedCount}</span>
                </span>
            </span>
        </div>
    )
}

export default LiList