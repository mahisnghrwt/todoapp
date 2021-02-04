import React, {useState, useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './sub_components/ContextMenu'
import {Context} from './Context'

const List = ({data, deleteHandler, checkedToggler, isChecked}) =>  {    
    const {mainState, setMainState} = useContext(Context)
    
    //Context menu props object
    const contextMenuProps = {
        items: ["delete"], //string value
        listener: [() => deleteHandler(data._id)],   // listener
    }

    const clickHandler = (event) => {
        setMainState((prevState) => {
            return {...prevState, contextMenuEnabled: false}
        })
        checkedToggler(data._id)
    }

    const destination = {
        pathname: '/list/' + data._id,
        state: {
            name: "state from navlink to"
        }
    }

    return (
        <NavLink to={destination}>
            <ContextMenu items={contextMenuProps.items} listener={contextMenuProps.listener}>
                <li className="list-li" onClick={clickHandler}>
                    <input type="checkbox" checked={isChecked} readOnly/>
                    {data.name}
                </li>
            </ContextMenu>
        </NavLink>
    )
}

export default List;