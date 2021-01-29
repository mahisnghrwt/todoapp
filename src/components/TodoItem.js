import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faClock, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {NavLink} from 'react-router-dom'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDetailed: false,
            isCompleted: false
        }
    }

    onClick_ = (event) => {
        this.setState((prevState) => {
            return {
                isCompleted: !prevState.isCompleted
            }
        })
    }

    onDoubleClick_ = (event) => {
        this.setState((prevState) => {
            return {
                isDetailed: !prevState.isDetailed
            }
        })
    }

    ItemDetails = (props) => {
        return (
            <div className = "item-details">
                <div className = "item-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod semper ullamcorper. Morbi et nulla bibendum, tristique risus auctor, ultricies odio.
                </div>
                <div className = "item-tags">
                    <a href = "">#something</a>
                    <a href = "">#nothing</a>
                    <a href = "">#something</a>
                    <a href = "">#nothing</a>
                    <a href = "">#something</a>
                    <a href = "">#nothing</a>
                    <a href = "">#something</a>
                    <a href = "">#nothing</a>
                </div>
            </div>
        );
    }

    render() {
        console.log(`todoItem: `)
        console.log(this.props.data)
        return (
            <li onClick = {this.onClick_} onDoubleClick = {this.onDoubleClick_}>
                <div className = "item-content">
                    <input type = "checkbox" checked = {this.props.isChecked === true ? true: false } readOnly />
                    <div className = {this.state.isCompleted === true ? "item-name item-completed" : "item-name"}>
                        {" " + this.props.data.name}
                    </div>
                    <div className = "item-tools">
                        <div className = "item-lifetime">
                            <FontAwesomeIcon icon = {faClock} /> 8 hours old
                        </div>
                        <div className = "item-buttons">
                            <NavLink to={"/item/" + this.props.data.id}><FontAwesomeIcon className = "fa-button" icon = {faEdit} /></NavLink>
                            <FontAwesomeIcon className = "fa-button" icon = {faTrashAlt} />
                        </div>
                    </div>
                </div>
                {this.state.isDetailed === true && <this.ItemDetails />}
            </li>
        )
    }
}

export default TodoItem;