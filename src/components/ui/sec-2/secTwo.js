import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';


import { getImageUrl, stringToHTML } from '../../../utility/helperFunctions';
import SmallFlatCardCompo from '../__components/small-flat-card/smallFlatCard';
import { BlogCarouselLoader } from '../skeleton-loaders/Skeleton';
import './style.scss'

export default function SecTwo({ latestBlogList }) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    if (!latestBlogList) {
        return <BlogCarouselLoader Nos={2} height={400} />;
    }

    return (
        <div style={{
            margin: "20px 0px"
        }}>
            <Grid container spacing={2}>
                <Grid item width="100%" lg={8} md={12} sm={12}>
                    <div onClick={() => {
                        navigate(`/read?i=${latestBlogList[0].id}`)
                    }} className='sec-two-img-overlay-blog'>
                        <img alt={`${latestBlogList[0]?.title}`} src={getImageUrl(latestBlogList[0].blog)} />
                        <main>
                            <section />
                            <section>
                                <div>
                                    {latestBlogList[0].topics?.map(item => <p>{item}</p>)}
                                    <p>{latestBlogList[0].createdAt?.toDate().toDateString()}</p>
                                </div>
                                <h1>{latestBlogList[0].title}</h1>
                                <h3>{stringToHTML(latestBlogList[0].blog).substring(0, 120)}.........</h3>
                            </section>
                        </main>
                    </div>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <div className='sec-two-titles'>
                        <p>{t("titles.recent")}</p>
                    </div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: '5px'
                    }}>
                        {latestBlogList?.slice(1).map(val => {

                            return <SmallFlatCardCompo key={Math.random()} item={val} />
                        })}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
