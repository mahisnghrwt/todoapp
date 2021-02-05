import React from 'react'

const ContextMenuV2 = ({pos, data}) => {
    return (
        <div className="contextmenu-v2" style={{top: pos[1], left: pos[0]}}>
            <ul>
                {
                    data.map((x, index) => {
                        return <li>{x}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default ContextMenuV2