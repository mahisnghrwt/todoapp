import React from 'react'

import Nav from './Nav'
import QuickButtons from './QuickButtons'
import UlList from './UlList/UlList'

const Home = _ => {
    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    My Lists
                </div>
                <QuickButtons />
                <br />
                <UlList />
            </div>
        </div>
    )
}

export default Home