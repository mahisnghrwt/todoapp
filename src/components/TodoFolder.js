import React, {useEffect, useState} from 'react'
import List from './List'
import {Context} from './Context'
import {requestDelete, requestAll} from './APICalls'
import {CreateListForm} from './sub_components/CreateListForm'
import Header from './Header'
import ConfirmationForm from './sub_components/ConfirmationForm'

function idGenerator() {
    if (typeof idGenerator.counter == 'undefined') {
        idGenerator.counter = 1;
    }
    idGenerator.counter++;
    return idGenerator.counter;
}

const TodoFolder = (props) => {
    //States
    const [state, setState] = useState([])
    const [mainState, setMainState] = useState({coreData: null, contextMenuEnabled: false, contextPos: [0, 0], clickOwnerId: -1})
    const [checkedLists, setCheckedLists] = useState({})

    //Event handlers
    const onDeleteList = (id) => {
        //Request to delete an id on API
        requestDelete(id)
        .then(data => {
            //then update the state with new data returned from get request
            requestAll().then(data => { setState(data) })
        })
    }

    const onAddList = (event) => {
        setMainState((prevState) => {
            return {...prevState, addListFormEnabled: !prevState.addListFormEnabled}
        })
    }

    //Fetch lists from the API
    useEffect(() => {
       document.addEventListener("click", () => {
            console.log("document event listener triggered!")
            setMainState((prevState) => {
                return {
                    ...prevState, clickOwnerId: -1
                }
            })
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
           console.log(checkedLists)

       })
    }, [])

    const EmptyDir = (props) => {
        return (
            <div className="background-instructions">Right click to create a new list</div>
        )
    }

    const clickHandler = (id_) => {
        console.log(checkedLists)
        setCheckedLists((prevState) => {
            return {...prevState, [id_]: !prevState[id_]}
        })
    }

    const deleteListHandler = (event) => {
        if (mainState.clickOwnerId === -1) {
            event.stopPropagation()
        }
        setMainState((prevState) => {
            return {
                ...prevState, clickOwnerId: 100
            }
        })
    }
    
    return (
        <Context.Provider value={{mainState, setMainState}}>
            <div className="root">
                <Header />
                <div className = "content">
                    <div className="quick-buttons">
                        <button onClick = {onAddList}>
                            {mainState.addListFormEnabled === true ? "Create" : "New List +"}
                        </button>
                        <button className = "danger" onClick = {deleteListHandler}>
                            Delete List -
                        </button>
                    </div>
                    <hr />
                    <div className = {state.length !== 0 ? "main-content" : "main-content empty-container"}>
                        <ul className = "folder">
                            {mainState.addListFormEnabled === true && <CreateListForm wasSuccess={(success) => { 
                                setMainState((prevState) => {return {...prevState, addListFormEnabled: false}})
                                success === true && requestAll().then((data) => setState(data))
                            }}/>}
                            <ConfirmationForm id={100} checkedLists={checkedLists} actionHandler={(success) => {setMainState((prevState) => { return {...prevState, deleteListFormEnabled: false} })}}/>
                            {state.length === 0 && <EmptyDir />}
                            {state.map((x, index) => <List key = {index} checkedToggler={clickHandler} deleteHandler={onDeleteList} isChecked={checkedLists[x._id]} data = {x}/>)}
                        </ul>
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}


export default TodoFolder