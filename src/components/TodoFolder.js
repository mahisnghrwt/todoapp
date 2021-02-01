import React, {useEffect, useState, useRef} from 'react'
import List from './List'
import {Context} from './Context'
import {requestDelete, requestAll} from './utility/APICalls'
import {CreateListForm} from './sub_components/CreateListForm'
import Header from './Header'
import ConfirmationForm from './sub_components/ConfirmationForm'

const TodoFolder = () => {
    //States
    const [state, setState] = useState([])
    const [mainState, setMainState] = useState({coreData: null, createListForm: false, contextMenuEnabled: false, clickId: 0})
    const [checkedLists, setCheckedLists] = useState({})
    const checkListRef = useRef(checkedLists)

    //Event handlers
    const onDeleteList = (id) => {
        //Request to delete an id on API
        requestDelete(id)
        .then(data => {
            //then update the state with new data returned from get request
            requestAll().then(data => { setState(data) })
        })
    }


    // onClick = "create List +" button
    const addListHandler = (event) => {
        event.stopPropagation()
        setMainState((prev) => {
            return {
                ...prev, createListForm: !prev.createListForm
            }
        })
    }
 
    //Fetch lists from the API
    useEffect(() => {
        const currentState = () => {
            setMainState((prev) => {
                return {
                    ...prev, clickId: prev.clickId + 1, createListForm: false, deleteListForm: false
                }
            })   
        }

        window.addEventListener("click", () => {
            currentState()
        })
       requestAll()
       .then((data) => {
           setState(data)

           //Init the 'chekedLists' map with false values
           let tempMap = {}
           data.map((x) => {
                tempMap[x._id] = false
           })
           setCheckedLists(tempMap) 
           checkListRef.current = tempMap
       })
    }, [])

    const EmptyDir = (props) => {
        return (
            <div className="background-instructions">Right click to create a new list</div>
        )
    }

    const checkListHandler = (id_) => {
        setCheckedLists((prevState) => {
            checkListRef.current = prevState
            return {
                ...prevState, [id_]: !prevState[id_]
            }
        })
    }

    useEffect(() => {
        // console.log(checkedLists)
    }, [checkedLists])

    const deleteListHandler = (event) => {
        event.stopPropagation()
        setMainState((prevState) => {
            return {
                ...prevState, deleteListForm: !prevState.deleteListForm
            }
        })
    }

    const actionHandler = (success) => {
        setMainState((prevState) => {
            return {...prevState, createListForm: false, deleteListForm: false}
        })

        if (success === false) {
            return
        }

        requestAll()
        .then((data) => setState(data))
    }
    
    return (
        <Context.Provider value={{mainState, setMainState}}>
            <div className="root">
                <Header />
                <div className = "content">
                    <div className="quick-buttons">
                        <button onClick = {addListHandler}>
                            New List +
                        </button>
                        <button className="danger" onClick={deleteListHandler}>
                            Delete List -
                        </button>
                    </div>
                    <hr />
                    <div className = {state.length !== 0 ? "main-content" : "main-content empty-container"}>
                        <ul className = "folder">
                            {
                                mainState.createListForm === true && <CreateListForm wasSuccess={actionHandler}/>
                            }
                            {
                                mainState.deleteListForm === true && <ConfirmationForm checkedLists={checkedLists} actionHandler_={actionHandler}/>
                            }
                            {
                                //if there are no list, display the message for the user
                                state.length === 0 && <EmptyDir />
                            }
                            {
                                state.map((x) => {
                                    return <List key={x._id} checkedToggler={checkListHandler} deleteHandler={onDeleteList} isChecked={checkedLists[x._id]} data={x}/>
                                }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}


export default TodoFolder