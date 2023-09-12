import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail';
import { stringToHTML, getImageUrl } from '../../../../utility/helperFunctions';
import './style.scss'

export default function CardCompo({ val }) {
    const navigate = useNavigate();
    const img = val?.blog ? getImageUrl(val.blog) : val?.image || null;
    const itemTitle = val?.blog ? stringToHTML(val.blog) : val?.description;
    const handleNavigate = (item) => {
        if (item?.blog) {
            navigate(`/read?i=${item?.id}`)
        } else {
            navigate(`/watch?i=${item?.id}`)
        }
    }

    const onUserClick = (id) => {
        navigate(`/profile/${id}`)
    }

    return <div onClick={() => { handleNavigate(val) }} className='blogs-video-long-card'>
        {val?.video && <span className='blogs-video-long-card-video-icon'><i class="far fa-play-circle"></i></span>}
        {img ? <img src={img} alt={val.title} /> : <VideoThumbnail
            videoUrl={val?.video}
            thumbnailHandler={(thumbnail) => { }}
            width={160}
            height={70}
        />}
        <aside>
            <div onClick={() => { onUserClick(val?.by) }}>
                <p>{val.createdAt?.toDate().toDateString()}</p>
            </div>
            <h3>{val.title}</h3>
            <p>{itemTitle}</p>
            <div>
                <span>{val?.blog ?
                    "Read more" :
                    "View now"
                }</span>
            </div>
        </aside>
    </div>
}
