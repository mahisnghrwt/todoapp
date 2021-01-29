import React from 'react'

class ListQuickButtons extends React.Component {
    constructor(props) {
        super(props)
    }

    newItemHandler = (event) => {
        this.props.newItemHandler()
    }

    deleteItemHandler = (event) => {
        this.props.deleteItemHandler()
    }

    render() {
        return (
        <div className="quick-buttons">
            {/* {(this.props.addFormEnabled === true && 
                <input type = "text" value = {this.props.newListName} onChange = {this.onListNameChange} />  
            )}                 */}
            <button onClick = {this.newItemHandler}>
                New item
            </button>
            <button className = "danger" onClick = {this.deleteItemHandler}>
                Delete item
            </button>
            <button className="info">
                Sort by: Priority
            </button>
        </div>
        )
    }
}

export default ListQuickButtons;