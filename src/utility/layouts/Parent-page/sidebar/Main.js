import React, { useEffect } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
import HeaderCompo from '../../components/header/header';
import { appMenuToggled } from '../../../../redux/slices/App-State'
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material'
import './style.scss'

const Main = ({ children }) => {

    const { pathname, search } = useLocation();
    const matches = useMediaQuery('(max-width:769px)');
    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector("#body-to-scroll").scroll(0, 0);
        matches && dispatch(appMenuToggled(false));
    }, [pathname, search])

    return (
        <main
            id="body-to-scroll"
            style={{
                position: "relative",
                height: "100vh",
                scrollBehavior: "smooth"
            }}>

            <div style={{
                position: "sticky",
                top: 0,
                zIndex: 99
            }}>
                <HeaderCompo />
            </div>

            <div id="main-body">
                {children}
            </div>
        </main>
    );
};

export default Main;
