import React, { useState, useEffect } from "react";
import DummyImagePNG from '../../../../assets/png/dummy-user.png'
import LeftHeaderCompo from '../headers/left'
import ChatListCompo from '../list/list'


const ChatLeftList = ({
    user,
    openUserChat
}) => {
    const [searcText, setSearchText] = useState("")

    return <div
        style={{
            height: "calc(100vh - 140px)",
            display: "flex",
            flexDirection: "column"
        }}
    >
        <LeftHeaderCompo
            imgSrc={user?.basic?.image || DummyImagePNG}
            search={searcText}
            setSearch={setSearchText}
        />
        <ChatListCompo openUserChat={e => { openUserChat(e) }} chatID={user?.id} />
    </div>
}


export default ChatLeftList;