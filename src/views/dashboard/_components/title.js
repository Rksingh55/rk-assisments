import React from 'react';
import './style.scss'
import { Tooltip as MUITootip } from '@mui/material';
import { IoIosInformationCircleOutline } from 'react-icons/io'

export default function Title({
    title,
    focusTitle,
    focusInfo,
    revenue,
    onRequestClickHandler
}) {


    return <div className='blog-dash-title'>
        <h1>{title}</h1>
        <div>
            {/* <h2>Revenue : ${revenue}</h2> */}
            <aside>
                <p onClick={onRequestClickHandler}>{focusTitle}</p>
                <MUITootip
                    arrow
                    title={<p className="blog-dash-header-tooltip">
                        {/* For requesting revenue there should be minimum 50$ avaiable in your wallet, Thank you. */}
                        {focusInfo}
                    </p>}
                    placement='left' >
                    <span><IoIosInformationCircleOutline size={17} /></span>
                </MUITootip>
            </aside>
        </div>
    </div>
}
