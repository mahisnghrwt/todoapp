import React, {useState} from 'react'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {requestCreate} from './utility/APICalls'
import {reportType} from './utility/Definations'
import {ButtonC, Button} from './QuickButtons'
import {isAlphaNumeric} from './utility/Utils'

//reportParent => check out the func defination
const CreateListForm = ({reportParent}) => {
    const [state, setState] = useState({title: ""})
    
    const createList = () => {
        if (!isAlphaNumeric(state.title)) {
            //Notify the user!
            return
        }
        requestCreate(state.title)
        .then(response => {
            if (response.status != 200) {
                //Notify the user of error
                reportParent(reportType.CREATE, {status: response.status}) 
                throw new Error(`${response.text}`)
            }
            return response.json()
        })
        .then((todoList) => {
            //Pass this todoList back to the Home component
            //Global will be updated there
            //Reasoning behind this is, CreateListForm is kind of a 'sub-component', it must report to its Parent component in case of any global update
            console.log(todoList)
            reportParent(reportType.CREATE, {status: 200, json: todoList}) 
        })
        .catch(err => {
            console.error(err)
        })
    }

    //On title input change update the state, since the input field is a Controlled Component
    const titleChanged = event => {
        setState((prev) => ({ ...prev, title: event.target.value }))
    }

    const buttonData = new ButtonC("Save", faSave, createList)

    return (
        <div className="create-list">
            <div className="form-title">Create a new list</div>
            <div className="input-group inline">
                <label>Title</label>
                <input type="text" value={state.title} onChange={titleChanged} />
                <Button button={buttonData} />
            </div>
        </div>
    )
}

export default CreateListForm