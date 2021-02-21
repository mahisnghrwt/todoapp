import React, {useEffect, useState, useContext} from 'react'
import LiList from './LiList'

import {DataContext} from '../Context'

const UlList = _ => {
    const [data] = useContext(DataContext)

    return (
        <div className="ul-list">
            {data.userData.todoLists.length > 0 && data.userData.todoLists.map((x) => {
                return <LiList key={x._id} list={x}/>
            })}
        </div>
    )
}

export default UlList