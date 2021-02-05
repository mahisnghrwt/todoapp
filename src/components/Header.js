import React from 'react'

const Header = ({title, nav}) => {
    return (
        <header>
            <div className="title">
                {title}
            </div>
            <div className="navigation">
                root / {nav}
            </div>
        </header>
    )
}

export default React.memo(Header);