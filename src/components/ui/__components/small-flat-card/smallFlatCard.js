import React from 'react'
import VideoThumbnail from 'react-video-thumbnail';
import { useNavigate } from 'react-router-dom'

import { getImageUrl } from '../../../../utility/helperFunctions'
import './style.scss'


export default function SmallFlatCard({ item }) {

    const navigate = useNavigate()
    const imageSrc = item?.blog ? getImageUrl(item.blog) : item?.image || <VideoThumbnail
        videoUrl={item?.video}
        thumbnailHandler={(thumbnail) => { }}
        width={160}
        height={70}
    />;
    const cardText = (item?.title?.length > 65) ? `${item?.title?.substring(0, 65)}....` : item?.title;

    const navigateHandler = () => {
        if (item?.blog) {
            navigate(`/read?i=${item?.id}`)
        } else {
            navigate(`/watch?i=${item?.id}`)
        }
    }

    return (
        <div onClick={navigateHandler} className='ui-small-flat-cards'>
            {item?.video && <span><i class="far fa-play-circle"></i></span>}
            <div className='ui-small-flat-cards-img'>
                <img src={imageSrc} alt={item.title} />
            </div>
            <div className='ui-small-flat-cards-items'>
                <aside>
                    <div>{item.topics?.map(item => <h6>{item}</h6>)}</div>
                    {/* <p>{item.createdAt?.toDate().toDateString()}</p> */}
                </aside>
                <p>{cardText}</p>
            </div>
        </div>
    )
}
