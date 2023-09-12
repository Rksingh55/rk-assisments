import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineShareAlt, AiOutlineComment, AiFillPlayCircle } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'
import { IoIosCreate } from 'react-icons/io'

import './style.scss'

export default function BlogVideoCard({ route, item, image }) {

    return <Link
        style={{ color: "#000", textDecoration: "none" }}
        key={item.title}
        to={`/${route}?i=${item?.id}`}>
        <div
            className='user-profile-blogs-item'>
            {route === "watch" && <aside className='play-icon'>
                <AiFillPlayCircle />
            </aside>}
            <img src={image} />
            <h3>{item.title} <span><HiExternalLink /></span></h3>
            <section>
                <div>
                    <aside><AiFillHeart /></aside>
                    <p>{item?.claps || 0}</p>
                </div>
                <div>
                    <aside><AiOutlineShareAlt /></aside>
                    <p>{item?.shares || 0}</p>
                </div>
                <div>
                    <aside><AiOutlineComment /></aside>
                    <p>{item.comments?.length || 0}</p>
                </div>
                <div>
                    <aside><IoIosCreate /></aside>
                    <p>{item.createdAt.toDate().toDateString()}</p>
                </div>
            </section>

        </div>
    </Link>
}
