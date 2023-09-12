import React from 'react'
import './style.scss'

export function AppNotification({ message, type }) {

    return (
        <div className={type === "message" ?
            "app-message-notification" : "app-alert-notification"}>
            <h4>{type}</h4>
            <p>{message}</p>
        </div>
    )
}