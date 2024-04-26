import * as React from 'react'
import './style.css'

export function Message({ type, msg }) {
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`message ${type}`} >
                    <p>{msg}</p>
                </div>
            )}

        </>
    )
}