import React from 'react'

class RootQuickButtons extends React.Component {
    constructor(props) {
        super(props)
    }

    onListNameChange = (event) => {
        this.props.listNameHandler(event.target.value)
    }

    onAddList = (event) => {
        this.props.addListHandler()
    }

    onDeleteList = (event) => {
        this.props.deleteListHandler()
    }

    render() {
        return (
        <div className="quick-buttons">
            {(this.props.addFormEnabled === true && 
                <input type = "text" value = {this.props.newListName} onChange = {this.onListNameChange} />  
            )}                
            <button onClick = {this.onAddList}>
                {this.props.addFormEnabled === true ? "Create" : "New List +"}
            </button>
            <button className = "danger" onClick = {this.onDeleteList}>
                Delete List -
            </button>
        </div>
        )
    }
}

export default RootQuickButtons;