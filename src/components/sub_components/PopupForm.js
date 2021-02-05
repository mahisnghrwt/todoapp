import React from 'react'

const PopupForm = () => {
    const clickHandler = (event) => {
        event.stopPropagation()
    }

    return (
        <div className="popup-form" onClick={clickHandler}>
            <div className="popup-title">
                Create new Item
            </div>
            <div className="popup-indiv-form">
                <input type="text" placeholder="title" />
                <select>
                    <option>
                        High
                    </option>
                    <option>
                        Moderate
                    </option>
                    <option>
                        Low
                    </option>
                </select>
                <textarea placeholder="desc" />
            </div>
            <div className="popup-buttons">
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default PopupForm