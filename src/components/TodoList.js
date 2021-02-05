import React, { useEffect, useState, useContext } from 'react'
import QuickButtons from './QuickButtons'
import Header from './Header'
import TodoItem from './TodoItem'
import {useParams, useLocation} from 'react-router-dom'
import {requestTodo} from './utility/APICalls'
import uuid from './utility/uuid'
import PopupForm from './sub_components/PopupForm'
import ContextMenuV2 from './sub_components/ContextMenuV2'
import {MenuContext} from './Context'

const TodoList = (props) => {
    //list id
    const {id} = useParams()
    //get list data
    const [state, setState] = useState({})
    const [popup, setPopup] = useState({createItemFormEnabled: false})
    const locState = useLocation().state
    const [contextMenu, setContextMenu] = useState({enabled: false, pos: [0, 0], data: null})


    useEffect(() => {
        if (typeof locState === "undefined") {
            //if the todoItems array is not passed from the "navLink to", then use the "id" to fetch it from the database
            requestTodo(id)
            .then((data) => {
                setState(() => {
                    return data
                })
            })
        }
        else {
            console.log(locState)
            setState(() => {
                return locState.data
            })
        }
    }, [])

    useEffect(() => {
        window.addEventListener("click", () => {
            setContextMenu((prev) => {
                return {
                    ...prev, enabled: false
                }
            })  

            setPopup((prev) => {
                return {
                    createItemFormEnabled: false, 
                    delelteItemFormEnabled: false
                }
            })
        })

        window.addEventListener("contextmenu", (event) => {
            event.preventDefault()
            setContextMenu((prev) => {
                return {
                    ...prev, data: ["item 1", "item 2"], enabled: true, pos: [event.pageX, event.pageY]
                }
            })
        })

    }, [])

    const newItemHandler = () => {
        setPopup((prev) => {
            return {
                ...prev, createItemFormEnabled: true
            }
        }) 
    }

    const deleteItemHandler = () => {

    }

    return (
        <div className="root">
            <MenuContext.Provider value={[contextMenu, setContextMenu]}>
                {popup.createItemFormEnabled === true && <PopupForm />}
                {contextMenu.enabled === true && <ContextMenuV2 data={contextMenu.data} pos={contextMenu.pos}/>}
                <Header title={state.name} nav={state.name} />
                <div className="content">
                    <QuickButtons data={[
                        {
                            name: "New item  +",
                            className_: null,
                            eventListener: newItemHandler
                        },
                        {
                            name: "Delete item -",
                            className_: "danger",
                            eventListener: deleteItemHandler
                        }
                    ]}/>
                    <hr />
                    
                    <div className="main-content">
                        <div className="folder-v2">
                            {
                                typeof state.todoItems != "undefined" &&
                                state.todoItems.length !== 0 &&
                                state.todoItems.map((x, index) => {
                                    return <TodoItem key={index} data={x}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </MenuContext.Provider>
        </div>
    )
}

export default TodoList