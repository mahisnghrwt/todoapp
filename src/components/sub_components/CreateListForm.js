import React, {useState} from 'react'
import { requestCreate } from '../APICalls'

export const CreateListForm = ({wasSuccess}) => {
    const [listName, setListName] = useState("")

    const _createHandler = (event) => {
        requestCreate(listName)
        .then(response => console.log(response))
        wasSuccess(true)
    }

    const _onChange = (event) => {
        setListName(event.target.value)
    }

    return (
        <div className="create-list-form">
            <input type="text" value={listName} onChange={_onChange} placeholder="name your list"/>
            <button onClick={_createHandler}>Done</button>
            <button className="danger" onClick={() => wasSuccess(false)}>Cancel</button>
        </div>
    )
}