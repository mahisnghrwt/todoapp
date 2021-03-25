import React, {useEffect, useState, useContext, useRef} from 'react'
import {faFile, faSort} from '@fortawesome/free-solid-svg-icons'
import {requestAll} from './utility/APICalls'
import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import LiList from './UlList/LiList'
import CreateListForm from './CreateListForm'
import {reportType} from './utility/Definations'
import {requestUpdateListSortingConfig} from './utility/APICalls'
import {AuthContext} from './Context'
import Notification from './Notification'

const Home = ({global: [global, setGlobal__]}) => {
    const [state, setState] = useState({createListFormEnabled: false})
    const mounted = useRef(true)
    const [error, setError_] = useState('')
    const errorTimeout = 10000 //10 seconds
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
        if (!mounted.current) return
        setState((prev) => {
            return {
                ...prev, createListFormEnabled: !prev.createListFormEnabled
            }
        })
    }

    const setGlobal = (cb, todoLists = null, makeDeepCopy = false) => {
        if (mounted.current)
            setGlobal__(cb, todoLists, makeDeepCopy)
    }

    const setError = err => {
        if (mounted.current)
            setError_(() => err)
    }

    //Handles subcomponent response received from remote endpoint
    //for reportT, Refer to reportType
    //remoteResponse, {status: number, json: Obj}
    const subComponentReportHandler = (reportT, remoteResponse) => {
        if (remoteResponse.status != 200) {
            setError(`status code: ${remoteResponse.status}, error: ${remoteResponse.error}`)
            return
        }
        switch(reportT) {
            case reportType.CREATE:
                setGlobal(todoLists => {
                    todoLists.push(remoteResponse.json)
                    listSortingCallback(todoLists, authContext.sort)
                }, null, true)
                toggleForm()
                break
            case reportType.UPDATE:
                //remoteResponse.json is the updated list
                //Replace the todoList with the updated one in global
                setGlobal(todoLists => {
                    var index = todoLists.findIndex(x => x._id == remoteResponse.json._id)
                    if (index != -1)
                        todoLists[index] = remoteResponse.json
                    listSortingCallback(todoLists, authContext.sort)
                }, null, true)
                break
            case reportType.DELETE:
                //remoteResponse.json._id indicates id of the list to be deleted
                setGlobal(todoLists => {
                    const index = todoLists.findIndex(x => x._id === remoteResponse.json.id)
                    if (index != -1)
                        todoLists.splice(index, 1)
                }, null, true)
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
                setError(`status code: ${response.status}, error: ${response.error}`)

            }
            else {
                setAuthContext(prev => {
                    return {
                        ...prev, sort: criteria
                    }
                })

                setGlobal(todoLists => listSortingCallback(todoLists, criteria), null, false)
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
                // if (response.status != 200) { 
                //     throw new Error(`Error occured while fetching data! ${response.status}`)
                // }
                console.log(response.status)
                return response.json()
            })
            .then(todoLists => {
                //take the todoLists received in response, sort it out and then save it in global state
                setGlobal(todoLists => listSortingCallback(todoLists, authContext.sort), todoLists, false)
            }) 
            // .catch(err => {
            //     setError(err)
            //     return
            // })
        }
        else {
            var todoLists = global.todoLists
            setGlobal(todoLists => listSortingCallback(todoLists, authContext.sort), todoLists, false)
        }

        return () => mounted.current = false
    }, [])

    return (
        <div className="home">
            <Notification message={error} timeout={errorTimeout} />
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