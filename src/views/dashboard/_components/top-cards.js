import React from 'react'
import './style.scss'

export default function TopCards({
    numbers,
    title,
    icon,
    time,
}) {

    return <div className='dashboard-cards'>
        <section>
            <h3>{numbers}</h3>
            <p>{title}</p>
        </section>
        <section>
            <aside>
                <span>{icon}</span>
            </aside>
            <h4>{time}</h4>
        </section>
    </div>
}
