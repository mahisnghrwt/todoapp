import React, {useEffect, useState, useContext} from 'react'
import {faFile, faSort} from '@fortawesome/free-solid-svg-icons'

import {requestAll} from './utility/APICalls'
import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import LiList from './UlList/LiList'
import CreateListForm from './CreateListForm'
import {tagLists} from './utility/Utils'
import {reportType} from './utility/Definations'
var arraySort = require('array-sort')

const Home = ({global: [global, setGlobal]}) => {
    const [state, setState] = useState({createListFormEnabled: false})
    const sortType = {
        ALPHABETICAL: {
            param: 'title',
            desc: true
        },
        PENDING_ITEMS: {
            param: 'pendingCount',
            desc: true
        },
        HIGH_PRIORITY_ITEMS: {
            param: 'highPriorityCount',
            desc: true
        } 
    }
    
    //Event handler for "New" list button
    const toggleForm = _ => {
        setState((prev) => {
            return {
                ...prev, createListFormEnabled: !prev.createListFormEnabled
            }
        })
    }

    //Always update todoLists using this function only.
    //It ensures todoLists always are tagged.
    const tagAndUpdateTodoLists = cb => {
        setGlobal((prev) => {
            //If we have callback, process todoLists in it
            cb(prev.todoLists)
            //tag lists
            tagLists(prev.todoLists)
            //Update it in global
            return {
                ...prev, todoLists: prev.todoLists
            }
        })
    }

    //Handles subcomponent response received from remote endpoint
    //for reportT, Refer to reportType
    //remoteResponse, {status: number, json: Obj}
    const subComponentReportHandler = (reportT, remoteResponse) => {
        switch(reportT) {
            case reportType.CREATE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {
                    tagAndUpdateTodoLists(todoLists => todoLists.push(remoteResponse.json))
                }
                toggleForm()
                break
            case reportType.UPDATE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {
                    //remoteResponse.json is the updated list
                    //Replace the todoList with the updated one in global
                    tagAndUpdateTodoLists(todoLists => {
                        var index = todoLists.findIndex(x => x._id == remoteResponse.json._id)
                        if (index != -1)
                            todoLists[index] = remoteResponse.json
                    })
                }
                break
            case reportType.DELETE:
                if (remoteResponse.status != 200) {
                    //Error occured, do something here.
                }
                else {
                    //remoteResponse.json._id indicates id of the list to be deleted
                    tagAndUpdateTodoLists(todoLists => {
                        const index = todoLists.findIndex(x => x._id === remoteResponse.json.id)
                        if (index != -1)
                            todoLists.splice(index, 1)
                    })
                }
                break
        }
    }


    //Sort the list, refer to sortType enum for available sorting options
    const sortList = criteria => {
        var todoLists = global.todoLists
        arraySort(todoLists, criteria)
        setGlobal(prev => ({...prev, todoLists}))
    }

    //Buttons, we will pass to "QuickButtons" component
    const buttons = [
                        new ButtonC("New", faFile, toggleForm),
                        new ButtonC("Sort", faSort, null, [
                            new ButtonC("Alphabetical", null, () => sortList(sortType.ALPHABETICAL)),
                            new ButtonC("Pending", null, () => sortList(sortType.PENDING_ITEMS)),
                            new ButtonC("High-priority items", null, () => sortList(sortType.HIGH_PRIORITY_ITEMS))
                        ])
                    ]

    //Fetch and store todoList for the current user
    useEffect(() => {
        if (!global.todoLists) {
            requestAll()
            .then(response => {
                if (response.status != 200) { 
                    //Notify the user about the error
                    return
                }
                return response.json()
            })
            .then(todoLists => {
                todoLists = tagLists(todoLists)
                setGlobal(prev => ({...prev, todoLists}))
            }) 
        }
    }, [])

    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    My Lists
                </div>
                <QuickButtons buttons={buttons}/>
                <br />
                {state.createListFormEnabled && <CreateListForm reportParent={subComponentReportHandler}/>}
                <div className="ul-list">
                    {!global.todoLists ? 
                    <>Please wait while we are loading your data</> : 
                    global.todoLists.map((list) => <LiList key={list._id} list={list} reportParent={subComponentReportHandler} />)}
                </div>
            </div>
        </div>
    )
}

export default Home