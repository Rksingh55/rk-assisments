import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux'
import Main from './Main';
import './style.scss'

const Aside = lazy(() => import("./Aside"));

function Layout({ children }) {

    const appState = useSelector(e => e.appState)

    return (
        <div
            className={`app ${appState.isMenuToggled ? 'toggled' : ''}`}
        >
            <Suspense fallback={<div />}>
                <div id="side-menu-left">
                    <Aside />
                </div>
            </Suspense>
            <Main
                children={children}
            />
        </div>
    );
}

export default Layout;