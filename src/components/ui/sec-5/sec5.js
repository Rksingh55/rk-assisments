import React, { useEffect, useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import VideoThumbnail from 'react-video-thumbnail';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';

import { getSpecificTagsVideos } from "../../../services/functions/videos";
import { getSpecificTagsBlogs } from "../../../services/functions/blogs";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getImageUrl } from "../../../utility/helperFunctions";
import { __MAIN_CATEGORIES } from "../../../DB";
import './style.scss'



export default function Sec5({
    title
}) {

    const navigate = useNavigate()
    const { i18n, t } = useTranslation();
    const ref = useRef(null);
    const [specificTagTwoList, setSpecificTagTwoList] = useState(null);

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
        margin: 30,
        autoWidth: true
    }

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const [tempOneResult, tempTwoResult] = await Promise.all([
                    getSpecificTagsVideos(4, i18n.language, title),
                    getSpecificTagsBlogs(4, i18n.language, title)
                ])
                setSpecificTagTwoList([...tempOneResult, ...tempTwoResult]);
            } catch (error) {
                setSpecificTagTwoList(null);
            }
        }
        if (isMounted) {
            fetchData();
        }
        return () => { isMounted = false };
    }, [i18n.language])

    const navigateHandler = (item) => {
        if (item?.blog) {
            navigate(`/read?i=${item?.id}`)
        } else {
            navigate(`/watch?i=${item?.id}`)
        }
    }
    if (!specificTagTwoList) {
        return <div style={{ margin: "20px 0px 10px" }}>
            <Skeleton variant="rectangular" animation="wave" height={260} />
        </div>
    }
    return (
        <div id="ui-sec5-carousel">
            <section className='sec-3-feature-title'>
                <p>{t(`main-categories.${title}`)}</p>
            </section>
            <div className="ui-sec5-carousel-left-anchor"
                onClick={prevHandler}>
                <FiChevronLeft size={20} />
            </div>
            <div style={{
                overflow: "hidden",
                flex: 1
            }}>
                <OwlCarousel
                    ref={ref}
                    {...options}
                >
                    {specificTagTwoList &&
                        specificTagTwoList.map((val) => {
                            const imgUrl = val?.blog ? getImageUrl(val.blog) : val?.image || null;
                            return <div
                                onClick={() => { navigateHandler(val) }}
                                className="ui-sec5-carousel-card">
                                {val?.video && <span><i class="far fa-play-circle"></i></span>}
                                {imgUrl ? <img
                                    src={imgUrl}
                                    alt={`${val?.title}`}
                                    onError={() => {
                                        console.log("error in loading image")
                                    }}
                                /> : <VideoThumbnail
                                    videoUrl={val?.video}
                                    thumbnailHandler={(thumbnail) => { }}
                                    width={300}
                                    height={70}
                                />}
                                <section>
                                    <div>
                                        {val.topics.map(item => <p>{item}</p>)}
                                        {/* <p>{val.createdAt?.toDate.toDateString()}</p> */}
                                    </div>
                                    <p>{val.title}</p>
                                </section>
                            </div>
                        })}
                </OwlCarousel>
            </div>
            <div className="ui-sec5-carousel-right-anchor"
                onClick={nextHandler}>
                <FiChevronRight size={20} />
            </div>
        </div>
    )
}
