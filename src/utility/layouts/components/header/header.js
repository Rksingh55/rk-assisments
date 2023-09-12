import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
import { RiMenuUnfoldFill, RiMenuFoldLine } from 'react-icons/ri'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { appMenuCollapsed, appMenuToggled } from '../../../../redux/slices/App-State';
import { useNavigate } from 'react-router-dom'
import I18nFlagsCompo from './i18n-flags'
import { IoIosSearch } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import ShortcutsCompo from './shortcuts';
import NotificationCompo from './notification'
import BadgeImage from '../../../../components/ui/__components/badge-Image/badge-image'
import './header.scss'

export default function Header({ }) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const matches = useMediaQuery('(min-width:769px)');

    const appState = useSelector(e => e.appState)
    const authState = useSelector(e => e.auth.data)
    const dispatch = useDispatch()
    const [searchBar, setSearchBar] = useState(false);

    const toggleCollapsed = () => {
        dispatch(appMenuCollapsed(!appState.isMenuCollapsed))
    }

    const handleToggleSidebar = () => {
        dispatch(appMenuToggled(true))
    }

    const onLoginClick = () => {
        navigate('/authorization')
    }

    const onProfileClick = () => {
        navigate('/prefrences')
    }

    return <div >
        <div id='header'>
            <section className="header-left">

                <section className='header-left-1'>
                    {!matches ?
                        <div onClick={handleToggleSidebar}>
                            <span><FaBars size={25} /></span>
                        </div> :
                        <>
                            {appState.isMenuCollapsed ?
                                <div onClick={toggleCollapsed}>
                                    <span><RiMenuUnfoldFill size={25} /></span>
                                </div> : <div onClick={toggleCollapsed}>
                                    <span><RiMenuFoldLine size={25} /></span>
                                </div>}
                        </>}
                </section>
                <section className='header-left-2'>
                    <I18nFlagsCompo />
                </section>
                <section className='header-left-3'>
                    <ShortcutsCompo />
                </section>
            </section>

            <section className="header-right">
                {searchBar ?
                    <section className='header-right-1'>
                        <aside><IoIosSearch /></aside>
                        <input placeholder={t("header.search")} />
                        <aside onClick={() => { setSearchBar(false) }}><IoCloseOutline /></aside>
                    </section> :
                    <section onClick={() => { setSearchBar(true) }} className='header-right-1-collapsed'>
                        <aside><IoIosSearch /></aside>
                        <p>{t("header.search")}</p>
                    </section>}

                {/* <section>
                    <NotificationCompo />
                </section> */}

                <section className='header-right-3'>
                    {authState ?
                        <div onClick={onProfileClick}>
                            <BadgeImage
                                user={authState}
                            /> 
                            <h4>Hi, {authState?.basic?.name}</h4>
                        </div> :
                        <div onClick={onLoginClick}>
                            <h5>LOGIN <span>NOW</span></h5>
                        </div>}
                </section>

            </section>
        </div >
    </div >;
}
