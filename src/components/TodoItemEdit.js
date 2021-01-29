import React from 'react'

const TodoItemEdit = (props) => {
    
    // const priorityListener = (event) => {
    //     console.log(event.target.value)
    // }

    const x = "moderate"

    return (
        <div className = "content">
            <div className = "main-content edit-content">
                <input type="text" value={props.data.name} />
                <textarea>{props.data.desc}</textarea>
                <select onChange={() => {}}>
                    <option value = "low">Low</option>
                    <option selected={x === "moderate" ? true: false} value = "moderate">Moderate</option>
                    <option value = "high">High</option>
                </select>
            </div>
            <div className="quick-buttons flex-right">
                <button onClick>
                    Save
                </button>
                <button className = "danger">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default TodoItemEdit