import React, {useState} from 'react'
import { requestCreate } from '../utility/APICalls'

export const CreateListForm = ({wasSuccess}) => {
    const [listName, setListName] = useState("")

    const _createHandler = (event) => {
        requestCreate(listName)
        .then(response => console.log(response))
        wasSuccess(true)
    }

    //click handler for this component
    const clickHandler = event => {
        event.stopPropagation()
    }

    const _onChange = (event) => {
        setListName(event.target.value)
    }

    return (
        <div className="create-list-form" onClick={clickHandler}>
            <input type="text" value={listName} onChange={_onChange} placeholder="name your list"/>
            <button onClick={_createHandler}>Done</button>
            <button className="danger" onClick={() => wasSuccess(false)}>Cancel</button>
        </div>
    )
}

