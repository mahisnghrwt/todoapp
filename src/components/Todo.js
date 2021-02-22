import React from 'react'

import Nav from './Nav'
import {QuickButtons, ButtonC} from './QuickButtons'

const TodoEdit = _ => {
    return (
        <div className="home">
            <Nav />
            <div className="content">
                <div className="title">
                    &lt;todo-title&gt;
                </div>
                <br />
                <div className="todo-form">
                    <div className="form-row">
                        <div className="input-group">
                            <label>Title</label>
                            <input type="text" />
                        </div>
                        <div className="input-group">
                            <label>Priority</label>
                            <select>
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Desc</label>
                        <textarea />
                    </div>
                    <QuickButtons />
                </div>
            </div>
        </div>
    )
}

export default TodoEdit