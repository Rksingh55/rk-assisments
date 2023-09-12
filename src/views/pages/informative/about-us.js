import React from 'react';
import { useTranslation } from 'react-i18next'
import { ABOUT_US } from '../../../DB' 
import './style.scss'

export default function AboutUs() {

    const { i18n } = useTranslation();

    return <>
        <div className='informative-pgs'>
            <h1 className='title'>{ABOUT_US(i18n.language, 1)} 1</h1>
            <p className='content margin-top-40'>{ABOUT_US(i18n.language, 2)}</p>
            <p className='content margin-top-40'>{ABOUT_US(i18n.language, 3)}</p>
            <p className='weight-500 margin-top-40'>{ABOUT_US(i18n.language, 4)}</p>
        </div>
    </>;
}
