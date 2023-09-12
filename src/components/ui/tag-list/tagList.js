import React, { useRef, useState } from 'react';
import OwlCarousel from "react-owl-carousel";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { __MAIN_CATEGORIES, __CONTENT_TYPES } from '../../../DB'
import './style.scss'


export default function TagList() {

    const { t } = useTranslation();
    const ref = useRef(null);
    const navigate = useNavigate();
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
        loop: false,
        dots: false,
        margin: 10,
        autoWidth: true
    }

    const tagClickHander = (tag) => {
        // setSelectedTag(tag)
        navigate(`/filter/${tag}`);
    }

    return <div id="tag-list">
        <div className='tag-list-nav-bars-left'
            onClick={prevHandler}>
            <FiChevronLeft size={20} />
        </div>
        <div style={{
            overflow: "hidden",
            display: "flex",
        }}>
            <OwlCarousel
                ref={ref}
                {...options}
            >
                {[{ title: "Explore" }, ...__MAIN_CATEGORIES]
                    .map(item => {
                        if ("Explore" === item.title) {
                            return <div className='tag-list-item-selected'>
                                <p>{t("main-categories.Explore")}</p>
                            </div>
                        }
                        return <div
                            onClick={() => { tagClickHander(item.title); }}
                            className='tag-list-item'>
                            <p>{t(`main-categories.${item.title}`)}</p>
                        </div>
                    })}
            </OwlCarousel>
        </div>
        <div className='tag-list-nav-bars-right'
            onClick={nextHandler}>
            <FiChevronRight size={20} />
        </div>
    </div>
}
