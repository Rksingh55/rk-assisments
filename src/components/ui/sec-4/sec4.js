import React, { useEffect, useState } from 'react'
import { Grid, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SmallFlatCardCompo from '../__components/small-flat-card/smallFlatCard';
import FeatureCarsolCompo from '../__components/feature-carousel/featureCarousel';
import { getMostViewedBlogs } from '../../../services/functions/blogs';
import { getMostViewedVideos } from '../../../services/functions/videos';
import './style.scss'

export default function TrendingNewContent({
    tag
}) {

    const [mostViewedContent, setMostViewedContent] = useState(null);
    const { i18n, t } = useTranslation();
    const fetchData = async () => {
        try {
            const [resOne, resTwo] = await Promise.all([
                getMostViewedVideos(7, null, null, i18n.language),
                getMostViewedBlogs(6, null, null, i18n.language)]
            );
            setMostViewedContent([...resOne, ...resTwo]);
        } catch (error) {
            console.log("error : ", error)
            setMostViewedContent(null);
        }
    }
    const fetchDataOfTag = async () => {
        try {
            const [resOne, resTwo] = await Promise.all([
                getMostViewedVideos(7, null, tag, i18n.language),
                getMostViewedBlogs(6, null, tag, i18n.language)]
            );
            setMostViewedContent([...resOne, ...resTwo]);
        } catch (error) {
            console.log("error : ", error)
            setMostViewedContent(null);
        }
    }
    useEffect(() => {
        let isMounted = true;
        if (isMounted && !tag) {
            fetchData();
        }
        if (isMounted && tag) {
            fetchDataOfTag();
        }
        return () => { isMounted = false };
    }, [i18n.language])


    if (!mostViewedContent) {
        return <div style={{ margin: "20px 0px 10px" }}>
            <Skeleton variant="rectangular" animation="wave" height={300} />
        </div>
    }

    return (
        <div style={{
            marginTop: "35px"
        }}>
            <Grid container spacing={4}>
                <Grid item width="100%" lg={8} md={12} sm={12}>
                    <FeatureCarsolCompo
                        DB={mostViewedContent?.slice(0, 4)}
                        title={t("titles.most-viewed")}
                    />
                    <section className='sec-4-feature-grid-news'>
                        {mostViewedContent?.slice(4, 8).map(val => {
                            return <SmallFlatCardCompo item={val} />
                        })}
                    </section>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <div>
                        <SocailSectionShow
                            peopleTitle={t("titles.people")}
                            title={t("titles.connect-with-us")}
                        />

                        <section>
                            <div className='sec-two-titles'>
                                <p>{t("titles.you-may-like")}</p>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: "1fr",
                                gap: "5px"
                            }}>
                                {mostViewedContent?.slice(8).map(val => {
                                    return <SmallFlatCardCompo item={val} />
                                })}
                            </div>
                        </section>
                    </div>
                </Grid>
            </Grid>

        </div >
    )
}


const SocailSectionShow = ({ title, peopleTitle }) => {
    return <section className='sec-4-features-new-rights'>
        <h2>{title}</h2>
        <aside>
            <div style={{
                backgroundColor: "#1DA1F2"
            }}>
                <i class="fab fa-instagram"></i>
                <span>
                    <p>1,031</p>
                    <h6>{peopleTitle}</h6>
                </span>
            </div>
            <div style={{
                backgroundColor: "#0AAA47"
            }}>
                <i class="fab fa-whatsapp"></i>
                <span>
                    <p>3,252</p>
                    <h6>{peopleTitle}</h6>
                </span>
            </div>
            <div style={{
                backgroundColor: "#CC6966"
            }}>
                <i class="fab fa-quora"></i>
                <span>
                    <p>2,315</p>
                    <h6>{peopleTitle}</h6>
                </span>
            </div>
        </aside>
    </section>
}