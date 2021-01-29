import React from 'react'

//Pass items array for context-menu-options, and a listener method that will be invoked on click of item
const ContextMenu = ({items, listener, contextPos}) => {
    return (
        <ul className="context-menu" style = {{top: contextPos[1], left: contextPos[0]}}>
            {items.map((x, index) => {
                return <li onClick={() => {listener[index]()}}>{x}</li>
            })}
        </ul>
    )
}

export default ContextMenu