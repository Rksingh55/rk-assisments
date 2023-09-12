import React from 'react';
import './style.scss';
import { HiSearch } from 'react-icons/hi'

export default function Left({
    imgSrc,
    search,
    setSearch
}) {
    return <div>
        <div className='chat-left-header'>
            <img src={imgSrc} />
            <div>
                <span><HiSearch /></span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            </div>
        </div>
    </div>;
}
