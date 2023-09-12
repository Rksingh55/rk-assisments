import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import 'react-chat-elements/dist/main.css';
import { useSelector } from 'react-redux'

import RightHeaderCompo from './__components/headers/right';
import MessageListCompo from './__components/message-list/message-list';
import DivDrawerCompo from '../../components/elements/div-drawer/div-drawer'
import ChatLeftList from './__components/chat-left/chat-left'
import { useNavigate } from 'react-router-dom'
import './style.scss'



export default function Chats() {

    const auth = useSelector(state => state.auth);
    const [isDrawer, setIsDrawer] = useState(false);
    const [isMatched, setIsMatched] = useState((window.innerWidth <= 1200));
    const [selectedChat, setSelectedChat] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        !auth.id && navigate("/authorization", { replace: true });

        window.addEventListener("resize", (e) => {
            setIsMatched((window.innerWidth <= 1200))
        });

    }, [])

    return <div
        style={{
            // margin: "35px 35px 35px 35px",
            margin: "10px 12px 0px",
            height: "calc(100vh - 140px)",
            border: "1px solid #3333",
            borderRadius: "0.4em"
        }}>
        <Grid container>
            <Grid item lg={4} md={12} sm={12}>
                {!isMatched && <ChatLeftList
                    user={auth.data}
                    openUserChat={user => {
                        setSelectedChat(user)
                    }}
                />}
            </Grid>
            <Grid item lg={8} md={12} sm={12}>
                <DivDrawerCompo
                    side="left"
                    drawerContent={() => <div style={{
                        height: "calc(100vh - 140px)"
                    }}>
                        <ChatLeftList
                            user={auth.data}
                            openUserChat={user => {
                                setSelectedChat(user)
                            }}
                        />
                    </div>}
                    isDrawer={isDrawer}
                    setIsDrawer={setIsDrawer}
                >
                    <div style={{
                        height: "calc(100vh - 140px)",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        {selectedChat ?
                            <>
                                <RightHeaderCompo
                                    isDrawer={isDrawer}
                                    setIsDrawer={setIsDrawer}
                                    selectedChat={selectedChat}
                                    isMatched={isMatched}
                                />
                                <MessageListCompo chats={selectedChat} />
                            </>
                            :
                            <>
                                <h3>Select chat</h3>
                            </>}
                    </div>

                </DivDrawerCompo>
            </Grid>
        </Grid>
    </div>;
}