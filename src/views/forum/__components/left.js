import React, { useEffect, useState } from 'react';
import './style.scss'
import { __MAIN_CATEGORIES } from '../../../DB';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserListSec from '../../../components/elements/user-list-sec/userListSec'

export default function Left({
    selectedTag,
  //  setSelectedTag,
    userList,
    selectedUser,
    setSelectedUser
}) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const onTitleClick = (title) => {
   //     setSelectedTag(title);
        navigate(`/what?tag=${title}`);
    }

    const onUserClick = (userID) => {
        setSelectedUser(userID);
        navigate(`/what?user=${userID}`);
    }

    return <div className='forum-left-list'>
        <section className="forum-left-list_1">
            {[{ title: "Explore" }, ...__MAIN_CATEGORIES].map(val => {
                if (val.title == selectedTag) {
                    return <div id="forum-left-list-selected-tag">
                        <p>#{t(`main-categories.${val.title}`)}</p>
                    </div>
                }
                return <div onClick={() => { onTitleClick(val.title) }}>
                    <p>#{t(`main-categories.${val.title}`)}</p>
                </div>
            })}
        </section >
        <UserListSec
            userList={userList}
            onUserClick={onUserClick}
            selectedUser={selectedUser}
        />
    </div>
}
