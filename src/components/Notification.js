import React, {useEffect, useState, useRef} from 'react'

const Notification = (prop) => {
    const mounted = useRef(true)
    const [message, setMessage_] = useState(null)
    const [hide, setHide_] = useState(false)

    const setMessage = (msg) => {
        if (mounted.current === true)
            setMessage_(() => msg)
    }

    const setHide = (shouldHide) => {
        if (mounted.current === true)
            setHide_(() => shouldHide)
    }

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
        setMessage(msg)
        console.log(msg)
        setTimeout(() => {
            setHide(true)
        }, prop.timeout)

        return () => mounted.current = false
    }, [prop.message])

    if (!message) return null
    if (hide) return null

    return (
        <div className='notification'>
            {message}
            <img src='/loader.gif' height='32' width='32' />
        </div>
    )
}

export default Notification