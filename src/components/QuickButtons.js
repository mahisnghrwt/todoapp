import React from 'react'

//array of objects containing value of buttons, className (default null), eventListeners
const QuickButtons = ({data}) => {
    if (data == null)
        return(null)

    return (
        <div className="quick-buttons">
            {
                data.map(({name, className_, eventListener}) => {
                    return (
                        <button onClick={eventListener} className={className_ == null ? "" : className_}>
                            {name}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default QuickButtons