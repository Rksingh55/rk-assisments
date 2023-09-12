import React, { useState, useEffect } from 'react'
import { getSpecificTagsBlogs, getSpecificTypeBlogs } from '../../../services/functions/blogs';
import { getSpecificTagsVideos, getSpecificTypeVideos } from '../../../services/functions/videos';
import { getMostLikedPostOnTagBasis, getMostLikedPostOnTypeBasis } from '../../../services/functions/forum'
import { __MAIN_CATEGORIES } from '../../../DB';
import { getImageUrl } from '../../../utility/helperFunctions';
import { useParams, Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import BlogVideoCard from '../../../components/ui/__components/blog-video-card/blog-video-card';
import { useTranslation } from 'react-i18next';
import { MasterPageLoader } from '../../../components/ui/skeleton-loaders/Skeleton'
import './style.scss'

export default function MasterPage() {

    const { i18n, t } = useTranslation()
    const [blogList, setBlogList] = useState(null);
    const [videoList, setVideoList] = useState(null);
    const [forumList, setForumList] = useState(null);
    const [loading, setLoading] = useState(true);
    const param = useParams();

    const errorHandler = (err) => {
        console.log("error : ", err);
        setLoading(false);
    }
    useEffect(() => {

        if (param.for) {
            setLoading(true);
            if (param.for.includes("type-")) {
                const type = param.for.replace('type-', '');
                getSpecificTypeBlogs(10, i18n.language, type)
                    .then(res => {
                        setBlogList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                getSpecificTypeVideos(10, i18n.language, type)
                    .then(res => {
                        setVideoList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                getMostLikedPostOnTypeBasis(10, i18n.language, type)
                    .then(res => {
                        setForumList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                window.document.title = type;
            } else {
                getSpecificTagsBlogs(10, i18n.language, param.for)
                    .then(res => {
                        setBlogList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                getSpecificTagsVideos(10, i18n.language, param.for)
                    .then(res => {
                        setVideoList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                getMostLikedPostOnTagBasis(10, i18n.language, param.for)
                    .then(res => {
                        setForumList(res);
                        setLoading(false);
                    })
                    .catch(errorHandler)
                window.document.title = t(`main-categories-info.${param.for}`) || "Filtered data";
            }
        }
    }, [i18n.language]);

    return <div id="master-page">
        <Grid container spacing={2}>
            <Grid item lg="12" md="12" sm="12" xs="12">
                <h1 className="master-page-main-title">
                    {param.for && param.for.includes("type-") ?
                        t(`content-types.${param.for.replace('type-', '')}`) :
                        t(`main-categories-info.${param.for}`)}
                </h1>
            </Grid>
            {loading && <MasterPageLoader />}
            {(!loading && blogList && blogList.length > 0)
                && <>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <div className="master-page-title">
                            <h3>{t("titles.stories")}</h3>
                            <aside></aside>
                        </div>
                    </Grid>
                    {blogList.map(blog => {
                        return <Grid item lg="3" md="4" sm="6" xs="6">
                            <BlogVideoCard
                                route="read"
                                item={blog}
                                image={getImageUrl(blog.blog)}
                            />
                        </Grid>
                    })}
                </>}

            {(!loading && videoList && videoList.length > 0)
                && <>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <div className="master-page-title">
                            <h3>{t("titles.records")}</h3>
                            <aside></aside>
                        </div>
                    </Grid>
                    {videoList.map(video => {
                        return <Grid item lg="3" md="4" sm="6" xs="6">
                            <BlogVideoCard
                                route="watch"
                                item={video}
                                image={video.image}
                            />
                        </Grid>
                    })}
                </>}

            {(!loading && forumList && forumList.length > 0)
                && <>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <div className="master-page-title">
                            <h3>{t("titles.discussions")}</h3>
                            <aside></aside>
                        </div>
                    </Grid>

                    {forumList.map(question => {
                        return <Grid item lg="6" md="6" sm="6" xs="6">
                            <Link className='link' to={`/post?id=${question.id}`}>
                                <p>{question.title}</p>
                            </Link>
                        </Grid>
                    })}
                </>}

        </Grid>
    </div >
}
