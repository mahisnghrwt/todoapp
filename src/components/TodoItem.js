import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MenuContext } from './Context'

const TodoItem = ({data}) => {
    const [menuContext, setMenuContext] = useContext(MenuContext)

    const contextHandler = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setMenuContext((prev) => {
            return {
                ...prev, enabled: true, pos: [event.pageX, event.pageY], data: ["item A", "item B"]
            }
        })
    }

    return (
        
        <div className="todo-item standard-border completed" onContextMenu={contextHandler}>
            <div className="todo-item-basic">
                {console.log("rerendred")}
                <input type="checkbox" />
                <span className="item-title">{data.title}</span>
                <span className="item-created-on">{data.date_created}</span>
                <span className ="item-quick-buttons">
                    <button className="small-button info">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                    <button className="small-button danger">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                </span>
            </div>
            <div className="todo-item-detailed">
                <div className="item-desc">
                    {data.desc}
                </div>
                <div className="item-priority">
                    {data.priority}
                </div>
            </div>
        </div>
    )
}

export default React.memo(TodoItem, (prevPorps, props) => {
    console.log(prevPorps.data === props.data)
    console.log("prev")
    console.log(prevPorps.data)
    console.log("current")
    console.log(props.data)
    return true
})