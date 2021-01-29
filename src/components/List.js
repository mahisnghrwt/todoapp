import React, {useState, useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu'
import {Context} from './Context'

const List = ({data, deleteHandler, checkedToggler, isChecked}) =>  {    
    const [contextPos, setContextPos] = useState([0, 0], (pos) => pos)
    const {mainState, setMainState} = useContext(Context)
    
    //Context menu props object
    const contextMenuProps = {
        items: ["delete"], //string value
        listener: [() => deleteHandler(data._id)],   // listener
    }

    //Checks whether the context menu belongs to this component
    const enableContextMenuLocally = () => {
        return (contextPos[0] === mainState.contextPos[0] && contextPos[1] === mainState.contextPos[1] && (contextPos[0] !== 0 || contextPos[1] !== 0) && mainState.contextMenuEnabled === true)
    }

    const clickHandler = (event) => {
        setMainState((prevState) => {
            return {...prevState, contextMenuEnabled: false}
        })
        checkedToggler(data._id)
    }

    const contextMenuHandler = (event) => {
        const pos = [event.pageX, event.pageY]
        event.preventDefault()
        setContextPos(pos)
        //Toggle on the current context menu
        setMainState((prevState) => {
            return {
                ...prevState, contextMenuEnabled: true, contextPos: pos
            }
        })
    }

    return (
        <NavLink className = "navLink" to = "">
            {enableContextMenuLocally() === true && <ContextMenu items={contextMenuProps.items} listener={contextMenuProps.listener} contextPos={contextPos}/>}
            <li className="list-li" onContextMenu={contextMenuHandler}
            onClick={clickHandler}>
                <input type="checkbox" readOnly checked={isChecked}/>
                {data.name}
            </li>
        </NavLink>
    )
}

export default List;