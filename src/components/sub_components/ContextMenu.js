import React, {useState, useContext} from 'react'
import { Context } from '../Context'

//Pass items array for context-menu-options, and a listener method that will be invoked on click of item
const ContextMenu = ({children, items, listener}) => {
    //pos of contextMenu
    const [pos, setPos] = useState([0, 0])
    // unique id
    const [id, setId] = useState(-1)

    // we will use mainState.clickId for enabling the contextMenu
    const {mainState, setMainState} = useContext(Context)

    //contextMenuHandler, use localState id and mainState.clickId, to identify whether the context menu needs to be enabled or not
    const contextMenuHandler = (event) => {
        //prevent default
        event.preventDefault()
        setPos([event.pageX, event.pageY])
        // set localId as mainState.clickId + 1
        setId(mainState.clickId + 1)
        setMainState((prevState) => {
            return {
                ...prevState, clickId: prevState.clickId + 1
            }
        })
    }

    //If mainState.clickId !== id, this contextMenu is disabled.
    if (mainState.clickId !== id) {
        return (
            <div onContextMenu={contextMenuHandler}>
                {children}
            </div>
        )
    }
    
    //contextMenu is enabled.
    return (
        <div onContextMenu={contextMenuHandler}>
            <ul className="context-menu" style = {{top: pos[1], left: pos[0]}} onContextMenu={contextMenuHandler}>
                {items.map((x, index) => {
                    return <li onClick={() => {listener[index]()}}>{x}</li>
                })}
            </ul>
            {children}
        </div>
    )
}

export default ContextMenu