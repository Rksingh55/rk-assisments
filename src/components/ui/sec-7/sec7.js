import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'


import BlogVideoLongCardList from '../__components/blog-video-long-cards-list/blogVideoLongCardList'
import { __CONTENT_TYPES, __MAIN_CATEGORIES } from '../../../DB'
import './style.scss'



export default function BestUsersCompo({

}) {

    const appState = useSelector(e => e.appState);
    const { t } = useTranslation();

    return (
        <div style={{
            marginBottom: "20px"
        }}>
            <Grid container spacing={2}>
                <Grid item lg="8" md="12" sm="12">
                    <BlogVideoLongCardList
                        title={t(`main-categories.${appState.tagFourTopic}`)}
                    />
                </Grid>
                <Grid item lg="4" md="12" sm="12">
                    <div className='ui-sec-7-titles'>
                        <p>{t("titles.categories")}</p>
                    </div>
                    <section className="ui-sec-7-categories">
                        {__CONTENT_TYPES.map(val => <Link to={`/filter/type-${val.title}`}>
                            <div>
                                <img src={val.img} alt={val.title} />
                                <aside>
                                    <p>{t(`content-types.${val.title}`)}</p>
                                    <span><i class="fas fa-chevron-right"></i></span>
                                </aside>
                            </div>
                        </Link>)}
                    </section>
                </Grid>
            </Grid>
        </div>
    )
}
