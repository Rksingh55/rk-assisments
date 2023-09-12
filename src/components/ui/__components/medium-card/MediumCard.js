import React from 'react'
import VideoThumbnail from 'react-video-thumbnail';
import { useNavigate } from 'react-router-dom'

import { getImageUrl, stringToHTML } from '../../../../utility/helperFunctions'
import './style.scss'


export default function MediumFlatCard({ item }) {
    const navigate = useNavigate()
    const cardImage = item?.blog ? getImageUrl(item.blog) : item?.image || <VideoThumbnail
        videoUrl={item?.video}
        thumbnailHandler={(thumbnail) => { }}
        width={160}
        height={70}
    />;
    const cardDesc = item?.blog ? `${stringToHTML(item?.blog).substring(0, 130)}....` : item?.description?.substring(0, 130)
    const navigateHandler = () => {
        if (item?.blog) {
            navigate(`/read?i=${item?.id}`)
        } else {
            navigate(`/watch?i=${item?.id}`)
        }
    }
    return (
        <div
            onClick={navigateHandler}
            className="ui-medium-card">
            {item?.video && <span><i class="far fa-play-circle"></i></span>}
            <img src={cardImage} alt="some" />
            <aside>
                <div>{item?.topics.map(topic => <p>{topic}</p>)}</div>
                {/* <h4>{item?.createdAt?.toDate().toDateString()}</h4> */}
            </aside>
            <h3>{item?.title}</h3>
            <p>{cardDesc}</p>
        </div>
    )
}
