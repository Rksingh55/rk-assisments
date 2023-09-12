import React, { useEffect, useState } from 'react';
import { MessageList } from 'react-chat-elements'
import { getMessageByChatID } from '../../../../services/firebase/chats'
import './style.scss'
import { useSelector } from 'react-redux';

export default function MessageListCompo({ chats }) {
    const currentUserID = useSelector(state => state.auth?.id);
    const [messageList, setMessageList] = useState(null)
    useEffect(() => {
        getMessageByChatID(chats?.chatListId, currentUserID)
            .then(e => {
                setMessageList(e)
            })
            .catch(e => {
                console.log("error : ", e)
            })
    }, [chats])
    return <>
        <div className="chat-message-list-1">
            {messageList ?
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={messageList}
                /> :
                <>
                    <h3>Getting messages...</h3>
                </>}
        </div>
        <div className="chat-message-list-2">
            <input placeholder='Enter your message ' />
            <button>Send</button>
        </div>
    </>
}