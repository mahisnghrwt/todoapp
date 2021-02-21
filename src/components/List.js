import React from 'react'

import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'
import UlTodo from './UlTodo/UlTodo'

const List = _ => {
    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    &lt;list-name&gt;
                </div>
                <QuickButtons />
                <br />
                <UlTodo />
            </div>
        </div>
    )
}

export default List