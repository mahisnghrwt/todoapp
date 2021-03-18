import React, {useEffect, useState} from 'react'

const Notification = (prop) => {
    const [message, setMessage] = useState(null)

    const objectToString = (obj, preText = '') => {
        var msg = ''
        msg += `\t${preText}{${preText}\n`
        for (const key in obj) {
            var val = obj[key]
            if (typeof val === 'object') {
                val = '\n' + objectToString(val, preText + '\t')
            }
            msg += `\t${preText}${key}: ${val}\n`
        }
        msg += `\t${preText}}`
        return msg
    }

    useEffect(() => {
        var msg = prop.message
        if (typeof prop.message === 'object') {
            msg = objectToString(prop.message)
        }
        setMessage(() => msg)
        console.log(msg)
    }, [prop.message])

    if (message == null) return null

    return (
        <div className='notification'>
            {message}
            <img src='/loader.gif' height='32' width='32' />
        </div>
    )
}

export default Notification