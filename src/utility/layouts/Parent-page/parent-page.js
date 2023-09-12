import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import './style.scss'
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './sidebar/layout';

export default function ParentPage({
    children,
    loading,
    alert,
    message
}) {

    useEffect(() => {
        if (message) {
            toast(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [message])

    useEffect(() => {
        if (alert) {
            toast(alert, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [alert])

    return <div>
        <ToastContainer />
        <Modal
            open={loading}
            onClose={() => { }}
        >
            <div id="parent-loader">
                <CircularProgress />
            </div>
        </Modal>

        <Layout>
            {children}
        </Layout>

    </div >;
}

