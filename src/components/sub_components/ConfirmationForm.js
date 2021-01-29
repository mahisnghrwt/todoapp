import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import {requestDeleteMany} from '../APICalls'
import { Context } from '../Context'

const ConfirmationForm = ({id, checkedLists, actionHandler}) => {
    const deleteHandler = () => {
        let ids = []
        console.log(checkedLists)
        for (const prop in checkedLists) {
            if (checkedLists[prop] === true) {
                ids.push(prop)
            }
        }
        console.log(requestDeleteMany(ids))
        actionHandler(true)
    }

    const {mainState} = useContext(Context)
    if (mainState.clickOwnerId != id) {
        return (null)
    }

    return (
        <div className="confirmation-form" onClick={(event) => {event.stopPropagation(); console.log("ConfirmationForm has been clicked!")}}>
            <div className="row-center">
                <span>Are you sure you wanna delete the lists?</span>
            </div>
            <div className="row-center">
                <button className="danger" onClick={deleteHandler}>Yes, Delete</button>
                <button onClick={() => actionHandler(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmationForm