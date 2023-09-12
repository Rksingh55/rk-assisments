

import React, { useState, useEffect } from 'react';
import { ChatList } from 'react-chat-elements'
import { getChatListByID } from '../../../../services/firebase/chats'
import './style.scss'

export default function Chats({ chatID, openUserChat }) {

    const [fetchList, setFectchList] = useState([])
    useEffect(() => {
        getChatListByID(chatID)
            .then(e => {
                setFectchList(e);
            })
            .catch(e => {
                console.log("error : ", e)
            })
    }, [chatID])

    return <div className='chat-user-list'>
        {(fetchList && fetchList.length) ?
            <ChatList
                className='chat-list'
                onClick={(e) => { openUserChat(e) }}
                dataSource={fetchList} />
            :
            <div>
                <h1>Loading...</h1>
            </div>}
    </div>;
}
 