import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile, faSort} from '@fortawesome/free-solid-svg-icons'

const QuickButtons = _ => {
    return (
        <div className="quick-buttons">
            <button>
                <FontAwesomeIcon icon={faFile} /> New
            </button>
            <button>
                <FontAwesomeIcon icon={faSort} /> Sort
            </button>
        </div>
    )
}

export default QuickButtons