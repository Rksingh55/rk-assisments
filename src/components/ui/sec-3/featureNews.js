import React, { useRef, useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import OwlCarousel from "react-owl-carousel";
import VideoThumbnail from 'react-video-thumbnail';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { getLatestVideos } from '../../../services/functions/videos'


import './style.scss'

export default function FeatureNews() {
    const { i18n, t } = useTranslation();
    const ref = useRef(null);
    const [latestVideoList, setLatestVideoList] = useState(null)
    const navigate = useNavigate()
    const nextHandler = () => {
        if (ref.current) {
            ref.current.next();
        }
    };
    const prevHandler = () => {
        if (ref.current) {
            ref.current.prev();
        }
    };

    const options = {
        navContainer: false,
        lazyLoad: true,
        loop: true,
        dots: false,
        margin: 20,
        autoWidth: true
    }

    useEffect(() => {
        getLatestVideos(8, null, i18n.language)
            .then(e => {
                setLatestVideoList(e)
            }).catch((err) => {
                console.log("error : ", err)
                setLatestVideoList(null)
            })
    }, [i18n.language])

    const navigateHandler = (id) => {
        navigate(`/watch?i=${id}`)
    }

    if (!latestVideoList) {
        return <div style={{ margin: "20px 0px 10px" }}>
            <Skeleton variant="rectangular" animation="wave" height={300} />
        </div>
    }
    return (
        <div>
            <section className='sec-3-feature-title'>
                <p>{t("titles.recently-added")}</p>
                <aside>
                    <div style={{
                        border: '1.3px solid #000',
                        display: "flex",
                        alignItems: "center",
                        padding: 5
                    }}
                        onClick={prevHandler}>
                        <FiChevronLeft size={20} />
                    </div>
                    <div style={{
                        border: '1.3px solid #000',
                        display: "flex",
                        alignItems: "center",
                        padding: 5
                    }} onClick={nextHandler}>
                        <FiChevronRight size={20} />
                    </div>
                </aside>
            </section>

            <section>
                <OwlCarousel
                    ref={ref}
                    {...options}
                >
                    {latestVideoList.map((val) => {
                        const imgUrl = <img src={val?.image} alt="some" /> || <VideoThumbnail
                            videoUrl={val?.video}
                            thumbnailHandler={(thumbnail) => { }}
                            width={160}
                            height={70}
                        />;
                        return <div
                            onClick={() => { navigateHandler(val?.id) }}
                            className="sec-3-feature-cards">
                            {val?.video && <span><i class="far fa-play-circle"></i></span>}
                            {imgUrl}
                            <section>
                                <div />
                                <div>
                                    <div>{val.topics.map(item => <p>{item}</p>)}</div>
                                    <h3>{val.title}</h3>
                                </div>
                            </section>
                        </div>
                    })}
                </OwlCarousel>
            </section>
        </div>
    )
}
