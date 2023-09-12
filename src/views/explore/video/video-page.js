import React, { useState, useEffect, useRef } from 'react'
import './video-page.scss'
import { Grid, Drawer, Tooltip, tooltipClasses, styled } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail';
import { useSelector, useDispatch } from 'react-redux';
import { appMessage, appLoading, appAlert } from '../../../redux/slices/App-State';
import { AppNotification } from '../../../components/ui/notification/notification';
import { getUserByID, saveVideoLike, followUserFunc, saveCommentHandler, incrementShareHandler, videoBookmarkSaveFunc } from '../../../services/functions/user';
import { getVideoByID, getSpecificTagsVideos, getMostViewedVideos } from '../../../services/functions/videos'
import VideoPlayer from './video-player';
import CommentsCompo from '../../../components/elements/comments/comments';
import DummyUserPng from '../../../assets/png/dummy-user.png'
import { nFormatter } from '../../../Helper_function'
import { VideoParamPageLoader } from '../../../components/ui/skeleton-loaders/Skeleton';
import publicIp from 'public-ip';
import { IoIosHeartEmpty } from 'react-icons/io'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
import { HiShare } from 'react-icons/hi'
import { MdBookmarkAdded, MdOutlineBookmarkAdd, MdPlayCircleFilled } from 'react-icons/md'
import { BsDot } from 'react-icons/bs'
import { useTranslation } from 'react-i18next';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: '#000',
        fontSize: theme.typography.pxToRem(12),
        boxShadow: "0px 0px 4px #000"
    },
}));

// ****** Use library hls.js for different quality levels

export default function VideoPage() {

    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null)
    const [searchParams] = useSearchParams()
    const [isCommentDrawer, setIsCommentDrawer] = useState(false)
    const [loading, setLoading] = useState(false)
    const [changedVideo, setChangedVideo] = useState(null);
    const [similarTopicVideos, setSimilarTopicsVideos] = useState([]);
    const [topsVideoList, setTopsVideoList] = useState([]);
    const [currentLikes, setCurrentLikes] = useState(0);
    const authState = useSelector(e => e.auth);

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
        getMostViewedVideos(20, null, null, i18n.language)
            .then(setTopsVideoList)
            .catch(console.log)
    }, [i18n.language])

    const onLikeClickHandler = () => {
        if (authState.data) {
            saveVideoLike(changedVideo?.id, authState.data?.id)
                .then(e => {
                    setCurrentLikes(currentLikes + 1);
                    notificationHandler(t("messages.liked"), "message");
                })
                .catch((e) => {
                    console.log('error : ', e)
                })
        } else {
            navigate("/authorization")
        }
    }
    const onShareHandler = () => {
        if (navigator.canShare) {
            navigator.share({
                title: 'Assist mates',
                text: changedVideo ? changedVideo?.title : "Video",
                url: window.location.href
            })
                .then(async () => {
                    incrementShareHandler(changedVideo?.id, "VIDEOS");
                })
                .catch((error) => console.log('Sharing failed', error));
        } else {
            window.alert("Sharing not working in your device ");
        }
    }
    const onBookmarkHandler = () => {
        if (authState.data) {
            videoBookmarkSaveFunc(changedVideo?.id, authState.data?.id)
                .then(e => {
                    notificationHandler(t("messages.data-saved"), "message");
                })
                .catch((e) => {
                    notificationHandler(t("messages.err-smth"), "alert");
                })
        } else {
            navigate("/authorization");
        }
    }
    const onProfileClickHandler = (id) => {
        navigate(`/profile/${id}`)
    }
    const followerClickHandler = () => {
        if (authState.data) {
            followUserFunc(changedVideo?.by, authState.data?.id)
                .then(e => {
                    notificationHandler(t("messages.connected"), "message");
                })
                .catch((e) => {
                    console.log('error : ', e);
                    notificationHandler(t("messages.err-smth"), "alert");
                })
        } else {
            navigate("/authorization")
        }
    }
    const saveCommentFunc = async (comment) => {
        dispatch(appLoading(true));
        if (authState.data && changedVideo) {
            saveCommentHandler(changedVideo?.id, {
                id: authState.data?.id,
                name: authState.data?.basic?.name
            }, comment, "VIDEOS")
                .then(e => {
                    setIsCommentDrawer(false);
                    dispatch(appLoading(false));
                    notificationHandler(t("messages.liked"), "message");
                })
                .catch((e) => {
                    dispatch(appLoading(false));
                    notificationHandler(t("messages.err-smth"), "alert");
                })
        } else {
            navigate("/authorization")
        }
    }

    useEffect(() => {
        if (searchParams.get("i")) {
            setLoading(true);
            getVideoByID(searchParams.get("i"))
                .then(e => {
                    setChangedVideo(e);
                    setCurrentLikes(e?.claps || 0);
                    fetchSimilarVideosHandler(e?.topics);
                    setLoading(false);
                })
                .catch(() => {
                    setChangedVideo(null);
                    setCurrentLikes(0);
                    setLoading(false);
                })
        }

    }, [searchParams, i18n.language])

    const fetchSimilarVideosHandler = async (topics) => {
        // fetch all topics videos than filter uniques
        getSpecificTagsVideos(20, i18n.language, topics[0])
            .then(setSimilarTopicsVideos)
            .catch(console.log);
    }
 

    return <>
        <main ref={ref}>
            <Drawer
                anchor="right"
                open={isCommentDrawer}
                onClose={() => setIsCommentDrawer(false)}
            >
                <CommentsCompo onSubmitClick={(e) => { saveCommentFunc(e) }} list={changedVideo?.comments} />
            </Drawer>
        </main>




        <div className='body-content'>
            <div id='video-page'>

                <Grid container spacing={2}>
                    <Grid item lg="8" md="12" sm="12" xs="12">
                        {(loading || !changedVideo) ? <>
                            <VideoParamPageLoader />
                        </> :
                            <>
                                <div className='video-page-video-data'>
                                    <h3>{changedVideo?.title}</h3>
                                    <VideoPlayer
                                        imageURL={changedVideo.image}
                                        videoSrc={changedVideo.video}
                                    />
                                    <section>
                                        <div className='video-page-video-data-1'>
                                            <p>{changedVideo?.totalViews || 0} {t("dashboard.views")}</p>
                                            <span><BsDot /></span>
                                            <p>{changedVideo?.createdAt?.toDate().toDateString()}</p>
                                        </div>
                                        <div className='video-page-video-data-2'>

                                            <span onClick={onLikeClickHandler}>
                                                <i class="far fa-thumbs-up"></i>
                                            </span>
                                            <p>{nFormatter(currentLikes, 2)}</p>

                                            <span onClick={onShareHandler}><HiShare /></span>
                                            <p>{nFormatter(changedVideo?.shares || 0, 2)}</p>


                                            {(
                                                authState?.data?.video &&
                                                authState?.data?.video?.bookmarkedVideos &&
                                                authState?.data?.video?.bookmarkedVideos.find(e => e == changedVideo?.id)) ?
                                                <span>
                                                    <MdBookmarkAdded />
                                                </span> :
                                                <span onClick={onBookmarkHandler}>
                                                    <MdOutlineBookmarkAdd />
                                                </span>}

                                        </div>
                                    </section>
                                </div>
                                <div className='video-page-user-comments'>
                                    <section>
                                        <UserNameAndImageShow
                                            userID={changedVideo?.by}
                                            onProfileClick={() => onProfileClickHandler(changedVideo?.by)}
                                        />
                                        <span><i class="fas fa-ellipsis-h"></i></span>

                                        {(authState?.data?.connected &&
                                            authState?.data?.connected?.find(e => e == changedVideo?.by)) ?
                                            <p>{t("titles.connected")}</p> : <p onClick={followerClickHandler}>{t("titles.connect")}</p>}

                                    </section>
                                    <section onClick={() => setIsCommentDrawer(true)}>
                                        <span><i class="far fa-comment"></i></span>
                                        <p>{changedVideo?.comments?.length || 0}</p>
                                    </section>
                                </div>
                            </>}
                    </Grid>
                    <Grid item lg="3" md="8" sm="8" xs="9">
                        <h3>{t("titles.you-may-like")}</h3>
                        <section className='video-playlist'>
                            {(similarTopicVideos.length > 0) &&
                                similarTopicVideos
                                    .map(val => (changedVideo?.id !== val?.id) &&
                                        <div
                                            key={val.id}
                                            onClick={() => {
                                                navigate(`/watch?i=${val.id}`)
                                            }}
                                            className='video-cards'>
                                            {val?.image ?
                                                <aside>
                                                    <img src={val?.image} />
                                                </aside> :
                                                <aside>
                                                    <VideoThumbnail
                                                        videoUrl={val.video}
                                                        thumbnailHandler={(thumbnail) => { }}
                                                        width={160}
                                                        height={70}
                                                    />
                                                </aside>}

                                            <aside>
                                                <p>{val.title}</p>
                                                <div>
                                                    <span className='video-cards-user'>
                                                        <UserNameAndImageShow
                                                            userID={val.by}
                                                        />
                                                    </span>
                                                    <section className="video-cards-icons-sec">
                                                        <div>
                                                            <span><AiOutlineEye /></span>
                                                            <h5>{nFormatter(val.totalViews || 0, 1)}</h5>
                                                        </div>
                                                        <div>
                                                            <span><IoIosHeartEmpty /></span>
                                                            <h5>{nFormatter(val.claps || 0, 1)}</h5>
                                                        </div>
                                                        <div>
                                                            <span><AiOutlineShareAlt /></span>
                                                            <h5>{nFormatter(val.shares || 0, 1)}</h5>
                                                        </div>
                                                    </section>

                                                </div>
                                            </aside>

                                        </div>)}
                        </section>
                    </Grid>

                    <Grid item lg="1" md="4" sm="4" xs="3">
                        <h3>{t("titles.tops")}</h3>
                        <div className='video-page-videos-list'>
                            {(topsVideoList.length > 0) &&
                                topsVideoList
                                    .map(val => !(changedVideo?.id === val?.id) &&
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <div>
                                                        <h5 style={{ fontWeight: "300", fontSize: "1.3em", marginBottom: "4px" }}>{val.title}</h5>
                                                        <img style={{ objectFit: "cover", width: "300px", height: "180px", borderRadius: "0.2em" }} src={val.image} />
                                                    </div>
                                                </React.Fragment>
                                            }
                                            placement="right"
                                        >
                                            <div onClick={() => {
                                                navigate(`/watch?i=${val.id}`)
                                            }}>
                                                <img src={val.image} alt={val.title} />
                                                <span><MdPlayCircleFilled /></span>
                                            </div>
                                        </HtmlTooltip>
                                    )}
                        </div>
                    </Grid>

                    {/* <Grid item lg="0.55" md="1.5" sm="2" xs="2">
                        <h3>.</h3>
                        <div className='video-page-user-list'>

                            {userlist.map(val => {
                                return <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <img style={{ width: 150, height: 170, objectFit: "cover" }} src={val} alt={val} />
                                        </React.Fragment>
                                    }
                                    placement="right"
                                >
                                    <img src={val} alt={val} />
                                </HtmlTooltip>
                            })}
                        </div>
                    </Grid> */}


                </Grid>
            </div>
        </div>



    </>
}






const UserNameAndImageShow = ({ userID, onProfileClick, onlyName }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserByID(userID)
            .then(res => {
                setUser(res);
            })
            .catch(err => {
                console.log("error : ", err)
            })
    }, [userID]);

    if (onlyName) {
        return <>{user?.basic?.name}</>
    }

    if (user) {
        return <>
            <img
                onClick={onProfileClick}
                src={user?.basic.image || DummyUserPng}
                alt={user?.basic?.name}
            />
            <h3 onClick={onProfileClick}>{user?.basic?.name}</h3>
        </>
    }

    return <>
        <img
            onClick={() => { }}
            src={DummyUserPng}
            alt="Unkown"
        />
        <h3 onClick={() => { }}>Unkown</h3>
    </>

}