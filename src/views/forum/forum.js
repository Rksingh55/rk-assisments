import React, { useState, useEffect } from 'react';
import { __MAIN_CATEGORIES, __CONTENT_TYPES } from '../../DB'
import ForumTopCompo from '../../components/elements/forum-top/forum-top';
import { getLatestPost, getMostLikedPost, getPostOfSpecificUser } from '../../services/functions/forum';
import LeftCompo from './__components/left'
import { useSearchParams } from 'react-router-dom'
import { AiOutlineReload } from 'react-icons/ai'
import { Grid } from '@mui/material';
import PostListShow from './__components/list'
import RightCompo from './__components/right'
import { useTranslation } from 'react-i18next';
import { ForumPageCenterLoader, ForumPageRightLoader } from '../../components/ui/skeleton-loaders/Skeleton'
import { useInView } from 'react-intersection-observer';
import './style.scss'

export default function Forum() {

    const { i18n, t } = useTranslation();
    const [selectedTag, setSelectedTag] = useState("Explore");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPostModal, setIsPostModal] = useState(false);
    const [searchParams] = useSearchParams();
    const [snapshot, setSnapshot] = useState([]);
    const [mostLikedQuestions, setMostLikedQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(true);


    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0
    });

    const errorHandler = (err) => {
        setLoading(false);
    }

    const onLoadMoreClick = () => {

        if (snapshot.length) {
            if (searchParams.get("tag") && !(selectedTag === "Explore")) {
                getLatestPost(3, snapshot[snapshot.length - 1].createdAt, i18n.language, selectedTag)
                    .then(onLoadMoreSuccessCallBack)
                    .catch(errorHandler);
            } else if (searchParams.get("user")) {
                setSelectedUser(searchParams.get("user"));
                getPostOfSpecificUser(3, snapshot[snapshot.length - 1].createdAt, i18n.language, searchParams.get("user"))
                    .then(onLoadMoreSuccessCallBack)
                    .catch(errorHandler);
            } else {
                getLatestPost(3, snapshot[snapshot.length - 1].createdAt, i18n.language, null)
                    .then(onLoadMoreSuccessCallBack)
                    .catch(errorHandler);
            }
        }

    }

    const onLoadMoreSuccessCallBack = (res) => {
        if (res.length === 0) {
            setLoadMore(null);
        }
        setSnapshot([...snapshot, ...res]);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        if (searchParams.get("tag")) {
            // setSelectedTag(searchParams.get("tag"));
            setSelectedTag([{ title: "Explore" }, ...__MAIN_CATEGORIES].find(e => e.title.includes(searchParams.get("tag"))).title)
            setSelectedUser(null);
            getLatestPost(3, null, i18n.language, (selectedTag === "Explore") ? null : selectedTag)
                .then(successCallback)
                .catch(errorHandler);

        } else if (searchParams.get("user")) {
            setSelectedUser(searchParams.get("user"));
            setSelectedTag("Explore");
            getPostOfSpecificUser(3, null, i18n.language, searchParams.get("user"))
                .then(successCallback)
                .catch(errorHandler);
        } else {
            getLatestPost(3, null, i18n.language, null)
                .then(successCallback)
                .catch(errorHandler);
        }
        getMostLikedPost(3, i18n.language)
            .then(setMostLikedQuestions)
            .catch(errorHandler);

    }, [searchParams, selectedTag, i18n.language]);

    useEffect(() => {
        if (inView) {
            onLoadMoreClick();
        }
    }, [inView]);

    const successCallback = (res) => {
        if (res.length === 0) {
            setLoadMore(null);
        }
        setSnapshot(res);
        setLoading(false);
    }


    return <div id="forum">
        <Grid container spacing={5}>
            <Grid item lg={3} md={4} sm={12}>
                <LeftCompo
                    selectedTag={selectedTag}
                    // setSelectedTag={setSelectedTag}
                    userList={((mostLikedQuestions.length > 0) && (snapshot.length > 0)) ? [...mostLikedQuestions.map(e => e?.by), ...snapshot.map(e => e?.by)] : null}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </Grid>
            <Grid item lg={6} md={8} sm={12}>
                {!loading ?
                    <>
                        <div  >
                            <ForumTopCompo
                                setIsPostModal={setIsPostModal}
                                text={t("forum.mid-title")}
                                textHello={t("forum.hello-there")}
                            />
                            {(snapshot.length > 0) && <PostListShow __LIST={snapshot} />}
                            {loadMore &&
                                <div ref={ref} className='forum-load-btn'>
                                    <ForumPageCenterLoader />
                                </div>}

                            {(loadMore === null) &&
                                <div className='forum-load-btn'>
                                    <h4>Oops! Reached end....</h4>
                                </div>}
                        </div>

                    </> :
                    <>
                        <ForumPageCenterLoader />
                    </>}
            </Grid>
            <Grid item lg={3} md={12} sm={12}>
                {!loading ?
                    <>
                        <RightCompo
                            isPostModal={isPostModal}
                            setIsPostModal={setIsPostModal}
                            questionList={(mostLikedQuestions.length > 0) ? mostLikedQuestions : null}
                        />
                    </> :
                    <>
                        <ForumPageRightLoader />
                    </>}

            </Grid>
        </Grid>
    </div>;
}