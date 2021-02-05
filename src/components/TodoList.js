import React, { useEffect, useState } from 'react'
import QuickButtons from './QuickButtons'
import Header from './Header'
import TodoItem from './TodoItem'
import {useParams, useLocation} from 'react-router-dom'
import {requestTodo} from './utility/APICalls'

const TodoList = (props) => {
    //list id
    const {id} = useParams()
    //get list data
    const [todoItems, setTodoItems] = useState([])
    const locState = useLocation().state

    useEffect(() => {
        if (typeof locState === "undefined") {
            //if the todoItems array is not passed from the "navLink to", then use the "id" to fetch it from the database
            requestTodo(id)
            .then((data) => {
                setTodoItems(() => {
                    return data.todoItems
                })
            })
        }
        else {
            setTodoItems(() => {
                return locState.data
            })
        }
    }, [])

    const newItemHandler = () => {

    }

    const deleteItemHandler = () => {

    }

    return (
        <div className="root">
            <Header title={id} nav="root/mylist/" />
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
                    <ul className="folder">
                        {
                            typeof todoItems != "undefined" &&
                            todoItems.length !== 0 &&
                            todoItems.map((x) => {
                                return <TodoItem data={x}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList