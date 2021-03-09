import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamation, faExclamationTriangle, faTrashAlt, faEdit, faSave} from '@fortawesome/free-solid-svg-icons'

import {requestDelete, requestUpdate} from '../utility/APICalls'
import {reportType} from '../utility/Definations'

const LiList = ({list, reportParent}) => {
    const history = useHistory()
    const [state, setState] = useState({rename: false, newTitle: ""})

    const clicked = _ => {
        history.push({
            state: list,
            pathname: `/list/${list._id}`
        })
    }

    const deleteSelf = event => {
        event.stopPropagation()
        requestDelete(list._id)
        .then(response => {
            if (response.status != 200) {
                reportParent(reportType.DELETE, {status: response.status})
            }
            else {
                reportParent(reportType.DELETE, {status: response.status, json: {id: list._id}})
            }
        })
    }

    const toggleRename = event => {
        //Check for event, because it is also called from renameSelf, which does not generates event
        if (event) event.stopPropagation()
        //state.newTitle has to be in sync with the current list.title
        setState((prev) => {
            return {
                ...prev, rename: !prev.rename, newTitle: list.title
            }
        })
    }

    //triggered by onChange handler of title <input>
    const titleChanged = event => {
        setState((prev) => {
            return {
                ...prev, newTitle: event.target.value
            }
        })
    }

    const renameSelf = event => {
        event.stopPropagation()
        requestUpdate(list._id, state.newTitle)
        .then(response => {
            if (response.status != 200) {
                reportParent(reportType.UPDATE, {status: response.status})
                throw new Error(`${response.text}`)
            }
            return response.json()
        })
        .then(todoList => {
            reportParent(reportType.UPDATE, {status: 200, json: todoList})
        })
        .catch(err => console.error(err))
        toggleRename()
    }

    return (
        <div className="li-list" onClick={clicked}>
            {state.rename ?
            <span onClick={event => event.stopPropagation()}>
                <input type="text" className="li-title-rename" onChange={titleChanged} value={state.newTitle} />
                <FontAwesomeIcon onClick={renameSelf} className="fa-rename" icon={faSave} />    
            </span> :
            <span onClick={event => event.stopPropagation()}>
                {list.title}     
                <FontAwesomeIcon onClick={toggleRename} className="fa-rename" icon={faEdit} />
            </span>}
            <span className="li-list-right">
                <span className="indicator-group">
                    <span className="indicator">
                        <FontAwesomeIcon className="danger-text indicator-fa" icon={faExclamation} />
                        <span className="indicator-count">{list.highPriorityCount}</span>
                    </span>
                    <span className="indicator">
                        <FontAwesomeIcon className="warning-text indicator-fa" icon={faExclamationTriangle} />
                        <span className="indicator-count">{list.pendingCount}</span>
                    </span>
                </span>
                <span className="indicator-group">
                    <span className="indicator">
                        <FontAwesomeIcon onClick={deleteSelf} className="indicator-fa" icon={faTrashAlt} />
                    </span>
                </span>
            </span>
        </div>
    )
}

export default LiList