import React, {useEffect, useContext} from 'react'
import {faFile, faSort} from '@fortawesome/free-solid-svg-icons'

import {DataContext} from './Context'
import {requestAll} from './utility/APICalls'

import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import UlList from './UlList/UlList'

const Home = _ => {
    const [data, setData] = useContext(DataContext)
    const buttons = [
                        new ButtonC("New", faFile, null),
                        new ButtonC("Sort", faSort, null, [
                            new ButtonC("Alphabetical", null, null)
                        ])
                    ]

    useEffect(() => {
        //Fetch all the user data
        requestAll()
        .then(userData => {
            console.log(userData)
            setData((prev) => {
                return {
                    ...prev, userData: {
                        todoLists: userData
                    }
                }
            })
        }) 
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
                <UlList />
            </div>
        </div>
    )
}

export default Home