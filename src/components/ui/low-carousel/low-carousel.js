import React, { useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import './style.scss'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { stringToHTML, getImageUrl } from "../../../utility/helperFunctions";
import { useNavigate } from "react-router-dom";
import { BlogCarouselLoader } from "../skeleton-loaders/Skeleton";

export default function LowCarousel({ latestBlogList }) {

    const navigate = useNavigate()
    const ref = useRef(null);
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
        margin: 10,
        autoWidth: true,
    }

    if (!latestBlogList) {
        return <div style={{ margin: "20px 0px" }}><BlogCarouselLoader Nos={4} height={80} /></div>
    }

    return (
        <>
            <div id='low-top-carousel'>
                <div style={{
                    backgroundColor: '#fff',
                    height: '80px',
                    display: "flex",
                    alignItems: "center",
                    padding: 3
                }}
                    onClick={prevHandler}>
                    <FiChevronLeft size={20} />
                </div>
                <div style={{
                    overflow: "hidden"
                }}>
                    <OwlCarousel
                        ref={ref}
                        {...options}
                    >
                        {latestBlogList.map((val) => {
                            const imgUrl = getImageUrl(val.blog)
                            const blogFirstP = stringToHTML(val.blog);
                            return <div
                                key={Math.random()}
                                onClick={() => {
                                    navigate(`/read?i=${val.id}`)
                                }}
                                className="low-top-carousel-items">
                                <img src={imgUrl} alt="some" />
                                <div>
                                    <p>{val.title}</p>
                                    <p>{blogFirstP}</p>
                                </div>
                            </div>
                        })}
                    </OwlCarousel>
                </div>
                <div style={{
                    backgroundColor: '#fff',
                    height: '80px',
                    display: "flex",
                    alignItems: "center",
                    padding: 3
                }} onClick={nextHandler}>
                    <FiChevronRight size={20} />
                </div>
            </div >
        </>
    )
}
