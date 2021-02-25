import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamation, faExclamationTriangle, faTrashAlt, faEdit, faSave} from '@fortawesome/free-solid-svg-icons'

import {requestDelete, requestUpdate} from '../utility/APICalls'
import { DataContext } from '../Context'

const LiList = ({list}) => {
    const [data, setData] = useContext(DataContext)
    const history = useHistory()
    let highPriorityCount = 0, uncompeleteCount = 0
    list.todo_items.forEach((x, i) => {
        if (x.priority === "high") highPriorityCount++
        if (!x.compeleted) uncompeleteCount++
    })

    const [state, setState] = useState({rename: false, newTitle: ""})

    const clicked = event => {
        history.push({
            pathname: `/list/${list._id}`
        })
    }

    //"delete" button listener
    const deleteSelf = event => {
        event.stopPropagation()
        requestDelete(list._id)
        .then(todoLists => {
            setData((prev) => {
                return {
                    ...prev, userData: {
                        todoLists: todoLists
                    }
                }
            })
        })
    }

    const toggleRename = event => {
        if (event) event.stopPropagation()
        setState((prev) => {
            return {
                ...prev, rename: !prev.rename, newTitle: list.title
            }
        })
    }

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
            console.log(response)
            setData((prev) => {
                return {
                    ...prev, userData: {
                        todoLists: response
                    }
                }
            })
        })
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
                        <span className="indicator-count">{highPriorityCount}</span>
                    </span>
                    <span className="indicator">
                        <FontAwesomeIcon className="warning-text indicator-fa" icon={faExclamationTriangle} />
                        <span className="indicator-count">{uncompeleteCount}</span>
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