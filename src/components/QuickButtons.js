import React from 'react'
import uuid from './utility/uuid'

//array of objects containing value of buttons, className (default null), eventListeners
const QuickButtons = ({data}) => {
    if (data == null)
        return(null)

    return (
        <div className="quick-buttons">
            {
                data.map(({name, className_, eventListener}) => {
                    return (
                        <button key={uuid.get()} onClick={eventListener} className={className_ == null ? "" : className_}>
                            {name}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default QuickButtons