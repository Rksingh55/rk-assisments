import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'

import { onlyUnique } from '../../../Helper_function'
import { getUserByID } from '../../../services/functions/user'
import './style.scss'

export default function userListSec({
    title,
    userList,
    onUserClick,
    selectedUser
}) {

    return <section className="forum-left-list_2">
        <h3>{title}</h3>
        <section>
            {userList && userList
                .filter(onlyUnique)
                .slice(0, 14)
                .map(id => <UserImageCompo
                    key={id}
                    id={id}
                    onClick={onUserClick}
                    selectedUser={selectedUser}
                />)}
        </section>
    </section>
}



const UserImageCompo = ({ id, onClick, selectedUser }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserByID(id)
            .then(setUser)
            .catch(console.log);
    }, []);

    if (user) {
        return <div onClick={() => { onClick(user.id) }}>
            {user.basic?.image &&
                <Avatar
                    style={{ margin: "0px", padding: "0px" }}
                    className={(selectedUser == id) ? 'user-image selected' : "user-image"}
                    //alt={user.basic.name}
                    src={user.basic.image}
                />}
            {(selectedUser == id) && <aside></aside>}
        </div>
    }

    return <div>
        <Avatar>U</Avatar>
    </div>

}