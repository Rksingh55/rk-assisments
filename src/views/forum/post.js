import React, { useState, useEffect } from 'react';
import './style.scss'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AiOutlineLike } from 'react-icons/ai'
import { IoShareSocialOutline } from 'react-icons/io5'
import { RiMessage3Line } from 'react-icons/ri'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md'
import RepliesCompo from './__components/Replies';
import { getPostById } from '../../services/functions/forum'
import { savePostReply, saveLikeToPost, saveSharedPost, savePostToUserBookmarks } from '../../services/firebase/forum'
import { getUserByID, followUserFunc } from '../../services/functions/user';
import { getMostLikedPostOnTagBasis, getMostLikedPostOnTypeBasis } from '../../services/functions/forum';
import { useDispatch, useSelector } from 'react-redux';
import { appLoading, appMessage, appAlert } from '../../redux/slices/App-State';
import { AppNotification } from '../../components/ui/notification/notification';
import { Grid } from '@mui/material'
import { ForumPostPageLoader } from '../../components/ui/skeleton-loaders/Skeleton';
import RightCompo from './__components/right';
import { useTranslation } from 'react-i18next';
// import PostListShow from './__components/list'
// import { ForumPageCenterLoader, ForumPageRightLoader } from '../../components/ui/skeleton-loaders/Skeleton'
// import { useInView } from 'react-intersection-observer';
import ReportCompo from '../../components/elements/report/report'
import BadgeImage from '../../components/ui/__components/badge-Image/badge-image';
import publicIp from 'public-ip';


export default function Post() {

    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth.data);
    const [searchParams] = useSearchParams();
    const [likes, setLikes] = useState(0)
    const [snapshot, setSnapshot] = useState(null);
    const [sameTopicsQuestions, setSameTopicsQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPostModal, setIsPostModal] = useState(false);
    const [replyInput, setReplyInput] = useState('');
    const [reportModal, setReportModal] = useState(false);
    const [user, setUser] = useState(null);

    // const [similarTypePostList, setSimilarTypePostList] = useState([]);
    // const [loadMore, setLoadMore] = useState(true);
    // const { ref, inView } = useInView({
    //     /* Optional options */
    //     threshold: 0
    // }); 

    const notificationHandler = (message, type) => {
        if (type === "message") {
            dispatch(appMessage(<AppNotification
                message={message}
                type="message"
            />))
        } else {
            dispatch(appAlert(<AppNotification
                message={message}
                type="alert"
            />))
        }
    }

    useEffect(() => {
        if (searchParams.get("id")) {
            setLoading(true);
            getPostById(searchParams.get("id"))
                .then(res => {
                    setSnapshot(res);
                    setLikes(res?.claps || 0);
                    setLoading(false);
                    getMostLikedPostOnTagBasis(10, i18n.language, res?.topics[0])
                        .then(setSameTopicsQuestions)
                        .catch(catchHandler);

                    getUserByID(res?.by)
                        .then(setUser)
                        .catch(catchHandler);

                    // getMostLikedPostOnTypeBasis(2, i18n.language, res?.type[0], null)
                    //     .then(setSimilarTypePostList)
                    //     .catch(catchHandler);

                })
                .catch(catchHandler)
        }
    }, [searchParams, i18n.language]);

    const catchHandler = (err) => {
        console.log("error : ", err);
        setLoading(false);
    }
    const onSubmit = () => {
        //savePostReply()
        if (authState) {
            makeLoad();
            savePostReply(searchParams.get("id"), replyInput, {
                id: authState?.id,
                name: authState?.basic?.name
            }).then(() => {
                successCallBack();
            }).catch(err => {
                errorCallBack(err);
            })
        } else {
            navigateToLogin()
        }

    }
    const makeLoad = () => {
        dispatch(appLoading(true));
    }

    const onConnectClick = () => {
        if (authState && snapshot) {
            followUserFunc(snapshot?.by, authState?.id)
                .then(e => {
                    dispatch(appMessage(<AppNotification
                        message={t("messages.connected")}
                        type="message"
                    />));
                })
                .catch((e) => {
                    dispatch(appAlert(<AppNotification
                        message={t("messages.err-smth")}
                        type="alert"
                    />));
                })
        } else {
            navigate("/authorization")
        }
    }

    const navigateToLogin = () => {
        navigate("/authorization")
    }

    const onLikeClick = () => {
        if (authState) {
            saveLikeToPost(searchParams.get("id"), authState?.id)
                .then(() => {
                    setLikes(likes + 1);
                    notificationHandler(t("messages.liked"), "message");
                })
                .catch(() => {

                })
        } else {
            navigateToLogin()
        }
    }
    const successCallBack = (message) => {
        dispatch(appLoading(false));
        notificationHandler(message || t("messages.data-saved"), "message");
        setReplyInput("")
    }
    const errorCallBack = (err) => {
        dispatch(appLoading(false));
        notificationHandler(t("messages.err-smth"), "alert");
    }

    const onShareClick = () => {
        if (navigator.canShare) {
            navigator.share({
                title: snapshot?.title || 'Assist mates',
                text: snapshot?.title || "AM discussion",
                url: window.location.href
            })
                .then(() => {
                    saveSharedPost(searchParams.get("id"));
                })
                .catch((error) => console.log('Sharing failed', error));
        } else {
            notificationHandler("Sharing not available for this device!", "alert")
        }
    }

    const onBookmarkClick = () => {

        if (authState) {
            savePostToUserBookmarks(searchParams.get("id"), authState?.id)
                .then(() => {
                    notificationHandler(t("messages.data-saved"), "message");
                })
                .catch(() => {
                    notificationHandler(t("messages.err-smth"), "alert");
                })
        } else {
            navigateToLogin()
        }
    }

   


    // useEffect(() => {
    //     if (inView && snapshot && (similarTypePostList.length > 0)) {
    //         getMostLikedPostOnTypeBasis(2, i18n.language, snapshot?.type[0], similarTypePostList[similarTypePostList.length - 1].createdAt)
    //             .then(res => {
    //                 if (res.length === 0) {
    //                     setLoadMore(null);
    //                 }
    //                 setSimilarTypePostList(similarTypePostList.concat(res));
    //             })
    //             .catch(catchHandler);
    //     }
    // }, [inView]);


    return <div id="post-page">

        {snapshot &&
            <ReportCompo
                reportModal={reportModal}
                setReportModal={setReportModal}
                content={{
                    id: snapshot?.id,
                    type: "forum-post"
                }}
            />}

        {(snapshot && !loading) ? <>



            <Grid container spacing={8}>
                <Grid item lg="8" md="12" sm="12" xs="12">
                    <>
                        <div className='post-page-post-2'>
                            <h1>{snapshot?.title}</h1>
                            {user &&
                                <div className='post-page-post-2-1'>
                                    <div onClick={() => {
                                        navigate(`/profile/${user?.id}`);
                                    }}>
                                        <BadgeImage
                                            user={user}
                                        />
                                        <h4>{user?.basic?.name}</h4>
                                        <p>{snapshot.createdAt?.toDate().toDateString()}</p>
                                    </div>
                                    {(authState &&
                                        authState?.connected?.find(e => e == snapshot?.by)) ?
                                        <div>
                                            <h5>{t("titles.connected")}</h5>
                                        </div> :
                                        <div onClick={onConnectClick}>
                                            <h5>{t("titles.connect")}</h5>
                                        </div>}
                                </div>}
                            <div
                                className='post-page-post-2-2'
                                contentEditable='false'
                                dangerouslySetInnerHTML={{ __html: snapshot?.post }}
                            />
                        </div>

                        <div className='post-page-post-3'>
                            {snapshot?.topics.map(val => <p onClick={() => {
                                navigate(`/what?tag=${val}`);
                            }}>{val}</p>)}
                        </div>

                        <section className='post-page-post-4'>
                            <section>
                                <div onClick={onLikeClick}>
                                    <span><AiOutlineLike /></span>
                                    <p>{likes}</p>
                                </div>
                                <div onClick={onShareClick}>
                                    <span><IoShareSocialOutline /></span>
                                    <p>{snapshot?.shares}</p>
                                </div>
                                <div>
                                    <span><RiMessage3Line /></span>
                                    <p>{snapshot?.replies?.length}</p>
                                </div>
                            </section>

                            <section>
                                {(authState && authState?.forum &&
                                    authState.forum?.bookmarks &&
                                    authState.forum?.bookmarks.find(e => e == snapshot.id)) ?
                                    <span><MdOutlineBookmarkAdded /></span> :
                                    <span onClick={onBookmarkClick}><MdOutlineBookmarkAdd /></span>}
                                <p onClick={() => { setReportModal(true); }}>{t("titles.report")}</p>
                            </section>
                        </section>

                        <section className='post-page-post-6'>
                            <h3>{t("forum.add-you-viw")}</h3>
                            <textarea
                                value={replyInput}
                                onChange={e => { setReplyInput(e.target.value) }}
                                placeholder={t("titles.write-some")}
                            />
                            <div>
                                <button
                                    className={(replyInput.length < 7) && "disabled"}
                                    disabled={(replyInput.length < 7)}
                                    onClick={onSubmit}
                                >{t("titles.submit")}</button>
                            </div>
                        </section>

                        <section className='post-page-post-5'>
                            {(snapshot?.replies && snapshot?.replies?.length) && snapshot?.replies.map(reply => {

                                return <RepliesCompo
                                    id={reply}
                                    authState={authState}
                                    successCallBack={successCallBack}
                                    errorCallBack={errorCallBack}
                                    navigateToLogin={navigateToLogin}
                                    makeLoad={makeLoad}
                                />
                            })}
                        </section>
                    </>

                    {/* <>
                        {(similarTypePostList.length > 0) &&
                            <PostListShow __LIST={similarTypePostList} />}

                        {loadMore &&
                            <div ref={ref} className='forum-load-btn'>
                                <ForumPageCenterLoader />
                            </div>}

                        {(loadMore === null) &&
                            <div className='forum-load-btn'>
                                <h4>Oops! Reached end....</h4>
                            </div>}
                    </> */}


                </Grid>
                <Grid item lg="4" md="12" sm="12" xs="12">
                    <RightCompo
                        isPostModal={isPostModal}
                        setIsPostModal={setIsPostModal}
                        questionList={(sameTopicsQuestions.length > 0) ? sameTopicsQuestions : null}
                    />
                </Grid>
            </Grid>

        </> : <>
            <ForumPostPageLoader />
        </>}
    </div>;
}
