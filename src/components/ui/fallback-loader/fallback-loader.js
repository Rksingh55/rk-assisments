import React from 'react'
import { CircularProgress } from '@mui/material'

import logoIconPng from '../../../assets/png/logo-icon.png'
import './style.scss'

export default function FallbackLoader() {
    return (
        <div className="fallback-spinner">
            <img src={logoIconPng} alt="assistmates logo" />
            <div className="loading">
                <CircularProgress color='inherit' />
            </div>
        </div>
    )
}