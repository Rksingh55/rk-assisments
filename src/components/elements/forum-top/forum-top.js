import React from 'react';
import './style.scss'
import { RiUserStarLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function ForumTop({
    setIsPostModal,
    text,
    textHello
}) {

    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.data);

    return <div className='forum-top'>
        <div onClick={() => {
            if (auth) {
                setIsPostModal(true)
            } else {
                navigate("/authorization")
            }
        }} className="forum-top-1">
            <div>
                <span><RiUserStarLine /></span>
                <h3>{auth ? auth?.basic.name : textHello}</h3>
            </div>
            <p>{text}</p>
        </div>
        <div>

        </div>
    </div>
}
