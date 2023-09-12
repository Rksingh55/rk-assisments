import React, { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import OwlCarousel from "react-owl-carousel";

import MediumFlatCardCompo from '../medium-card/MediumCard';
import './style.scss'

export default function FeatureCarsel({
    title,
    DB
}) {
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
        margin: 30,
        autoWidth: true
    }

    return <div>

        <section className='sec-3-feature-title'>
            <p>{title}</p>
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
                {DB.map((val) => {
                    return <MediumFlatCardCompo
                        item={val}
                    />
                })}
            </OwlCarousel>
        </section>
    </div>;
}
