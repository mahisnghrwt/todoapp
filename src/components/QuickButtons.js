import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export class ButtonC {
    constructor(title, faIcon, onClick, dropdowns = []) {
        this.title = title
        this.faIcon = faIcon
        this.dropdowns = dropdowns
        this.onClick = onClick
    }
}

const Button = ({ button }) => {
    return (
        <button onClick={button.onClick}>
            {button.faIcon != null && <FontAwesomeIcon icon={button.faIcon} />} {button.title}
        </button>
    )
}

export const QuickButtons = ({buttons}) => {
    return (
        <div className="quick-buttons">
            {buttons.map((x) => {
                if (x.dropdowns.length == 0) {
                    return <Button button={x} />
                }
                else {
                    return (
                        <div className="dropdown">
                            <Button button={x} />
                            <div className="dropdown-content">
                                {x.dropdowns.map((y) => {
                                    return <Button button={y} />
                                })}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}