import React from 'react'
import QuickButtons from './QuickButtons'
import Header from './Header'
import TodoItem from './TodoItem'
import {useParams, useLocation} from 'react-router-dom'

const TodoList = (props) => {
    //list id
    const {id} = useParams()
    //get list data
    const data = useLocation()

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
                        
                        <TodoItem />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList