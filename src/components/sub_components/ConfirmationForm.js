import React, { useEffect, useState } from 'react'
import { requestDeleteMany } from '../utility/APICalls'

const ConfirmationForm = ({checkedLists, actionHandler_}) => {
    const [ids, setIds]  = useState([])
    
    const deleteHandler = () => {
        requestDeleteMany(ids)
        .then(data => {
            actionHandler_(true)
        })
    }

    useEffect(() => {
        let ids_ = []
        for (const prop in checkedLists) {
            if (checkedLists[prop] === true) {
                ids_.push(prop)
            }
        }
        setIds(ids_)
    }, [])

    return (
        <div className="confirmation-form" onClick={(event) => { event.stopPropagation() }}>
            <div className="row-center">
                { ids.length === 0 ? <span>You must select atleast one list.</span> : <span>Are you sure you wanna delete the lists?</span> }
            </div>
            <div className="row-center">
                {ids.length > 0 && <button className="danger" onClick={deleteHandler}>Yes, Delete</button>}
                <button onClick={() => actionHandler_(false)}>{ ids.length === 0 ? "Okay" : "Cancel" }</button>
            </div>
        </div>
    )
}

export default ConfirmationForm