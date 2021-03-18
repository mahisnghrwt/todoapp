import React, {useEffect, useState, useContext} from 'react'
import {faFile, faSort} from '@fortawesome/free-solid-svg-icons'
import {requestAll} from './utility/APICalls'
import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import LiList from './UlList/LiList'
import CreateListForm from './CreateListForm'
import {tagLists} from './utility/Utils'
import {reportType} from './utility/Definations'
import {requestUpdateListSortingConfig} from './utility/APICalls'
import {AuthContext} from './Context'
import Notification from './Notification'

const Home = ({global: [global, setGlobal]}) => {
    const [state, setState] = useState({createListFormEnabled: false})
    const sortType = {
        ALPHABETICAL: 'title',
        PENDING_ITEMS: 'pendingCount',
        HIGH_PRIORITY_ITEMS: 'highPriorityCount',
        CREATED_AT: 'created_at'
    }
    const sortingOrder = {
        ASC: 'asc',
        DESC: 'desc'
    }
    const [authContext, setAuthContext] = useContext(AuthContext)
    
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
    const tagAndUpdateTodoLists = (cb, todoLists = null, makeDeepCopy = false) => {
        setGlobal((prev) => {
            var temp = todoLists
            if (!temp)
                temp = prev.todoLists

            var todoLists_ = null
            if (makeDeepCopy)
                todoLists_ = JSON.parse(JSON.stringify(temp))
            else
                todoLists_ = temp

            //tag lists
            tagLists(todoLists_)

            //If we have callback, process todoLists in it
            cb(todoLists_)
            
            //Update it in global
            return {
                ...prev, todoLists: todoLists_
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
                    tagAndUpdateTodoLists(todoLists => {
                        todoLists.push(remoteResponse.json)
                        listSortingCallback(todoLists, authContext.sort)
                    })
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
                        listSortingCallback(todoLists, authContext.sort)
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

    //Just a wrapper function to compare todoLists based on the specified properpty
    const sortByProperty = (a, b, property) => {
        if (a[property] === b[property]) return 0
        if (a[property] > b[property]) return -1
        return 1
    }

    //Sorts the todoLists based on the sorting preference 'criteria'
    const listSortingCallback = (todoLists, criteria) => {
        const criteria_ = criteria.split('.')
        if (criteria_[1] === sortingOrder.DESC) {
            todoLists.sort((a, b) => sortByProperty(a, b, criteria_[0]))
        }
        else {
            todoLists.sort((a, b) => (-1 * sortByProperty(a, b, criteria_[0])))
        }
    } 

    //Sort the list, refer to sortType enum for available sorting options
    const sort = criteria => {
        const prevCriteria = authContext.sort.split('.')
        if (criteria === prevCriteria[0]) {
            //Opposite sorting order
            if (prevCriteria[1] === sortingOrder.DESC) {
                criteria += `.${sortingOrder.ASC}`
            }
            else {
                criteria += `.${sortingOrder.DESC}`
            }
        } else {
            //Otherwise default desc order
            criteria += `.${sortingOrder.DESC}`
        }

        requestUpdateListSortingConfig(criteria)
        .then(response => {
            if (response.status != 200) {
                //throw error over here
            }
            else {
                setAuthContext(prev => {
                    return {
                        ...prev, sort: criteria
                    }
                })

                tagAndUpdateTodoLists(todoLists => listSortingCallback(todoLists, criteria))
            }
        })
    }

    //Buttons, we will pass to "QuickButtons" component
    const buttons = [
                        new ButtonC("New", faFile, toggleForm),
                        new ButtonC("Sort", faSort, null, [
                            new ButtonC("Alphabetical", null, () => sort(sortType.ALPHABETICAL)),
                            new ButtonC("Pending items", null, () => sort(sortType.PENDING_ITEMS)),
                            new ButtonC("High-priority items", null, () => sort(sortType.HIGH_PRIORITY_ITEMS)),
                            new ButtonC("Date created", null, () => sort(sortType.CREATED_AT))
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
                //take the todoLists received in response, sort it out and then save it in global state
                tagAndUpdateTodoLists(todoLists => listSortingCallback(todoLists, authContext.sort), todoLists)
            }) 
        }
    }, [])

    return (
        <div className="home">
            {/* <Notification message={'small msg!'} /> */}
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