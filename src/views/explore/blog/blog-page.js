import React, { useState, useEffect } from 'react'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Grid } from '@mui/material';
import publicIp from 'public-ip';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';
import { TiArrowForward } from 'react-icons/ti'

import { getBlogByID, getSpecificTagsBlogs, getSpecificTypeBlogs } from '../../../services/functions/blogs';
import { getUserByID, saveBlogLike, incrementShareHandler, bookmarkSaveFunc, followUserFunc, saveCommentHandler } from '../../../services/functions/user'
import { getImageUrl } from '../../../utility/helperFunctions';
import { appMessage, appLoading, appAlert } from '../../../redux/slices/App-State'
import { AppNotification } from '../../../components/ui/notification/notification';
import { BlogParamPageLoader, ForumPageRightLoader } from '../../../components/ui/skeleton-loaders/Skeleton';
import UserListSec from '../../../components/elements/user-list-sec/userListSec'
import ChatCompo from '../../../components/elements/chat/chat'
import { useInView } from 'react-intersection-observer';
import CommentsCompo from '../../../components/elements/comments/comments';
import BadgeImage from '../../../components/ui/__components/badge-Image/badge-image';
import BlogCompoCards from '../../../components/ui/__components/blog-video-long-cards-list/card'
import './blog-page.scss'




export default function BlogPage() {

    const [searchParams] = useSearchParams();
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const [isCommentDrawer, setIsCommentDrawer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [similarBlogs, setSimilarBlogs] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const authState = useSelector(e => e.auth);
    const [sameTypeBlogList, setSameTypeBlogList] = useState([]);
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0
    });
    const [loadMore, setLoadMore] = useState(true);

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
    const shareBlogHandler = async () => {

        if (navigator.canShare) {
            navigator.share({
                title: 'Assist mates',
                text: blog?.title || "AM story",
                url: window.location.href
            })
                .then(() => {
                    incrementShareHandler(blog?.id, "BLOGS");
                })
                .catch((error) => console.log('Sharing failed', error));
        } else {
            window.alert("Sharing not working in your device ");
        }

    }
    const goToUserProfile = (id) => {
        navigate(`/profile/${id}`)
    }
    const bookmarkSaveHandler = () => {
        if (authState.data) {
            bookmarkSaveFunc(blog?.id, authState.data?.id)
                .then(e => {
                    notificationHandler("Saved!", "message");
                })
                .catch((e) => {
                    console.log('error : ', e)
                    notificationHandler("Something went wrong!", "alert");
                })
        } else {
            navigate("/authorization")
        }
    }
    const followUserHandler = () => {
        if (authState.data) {
            followUserFunc(blog?.by, authState.data?.id)
                .then(e => {
                    notificationHandler("Connected!", "message");
                })
                .catch((e) => {
                    console.log('error : ', e);
                    notificationHandler("Something went wrong!", "alert");
                })
        } else {
            navigate("/authorization")
        }
    }
    const likeBlogHandler = () => {
        if (authState.data) {
            saveBlogLike(blog?.id, authState.data?.id)
                .then(e => {
                    setTotalLikes(totalLikes + 1);
                    notificationHandler("Greeted!", "message");
                })
                .catch((e) => {
                    console.log('error : ', e);
                    notificationHandler("Something went wrong!", "alert");
                })
        } else {
            navigate("/authorization")
        }
    }
    const onTagClickHandler = (tag) => {
        navigate(`/filter/${tag}`)
    }
    const saveCommentFunc = async (comment) => {
        dispatch(appLoading(true));
        if (authState.data) {
            saveCommentHandler(blog?.id, {
                id: authState.data?.id,
                name: authState.data?.basic?.name
            }, comment, "BLOGS")
                .then(e => {
                    notificationHandler("Comment saved!", "message");
                    setIsCommentDrawer(false);
                    dispatch(appLoading(false));
                })
                .catch((e) => {
                    dispatch(appLoading(false));
                    notificationHandler("Error something went wrong!", "alert");
                })
        } else {
            navigate("/authorization")
        }
    }

    useEffect(() => {
        if (searchParams.get("i")) {
            setLoading(true);
            getBlogByID(searchParams.get("i"))
                .then(e => {
                    setBlog(e);
                    // .catch(console)
                    setLoading(false);
                })
                .catch(e => {
                    console.log("error : ", e)
                    setLoading(false);
                })
        }
    }, [searchParams]);



    useEffect(() => {
        try {
            if (blog?.by) {
                setTotalLikes(blog?.claps || 0);
                getUserByID(blog?.by)
                    .then(setUser)
                    .catch(console.log)
            }

            if (blog?.topics) {
                getSpecificTagsBlogs(7, i18n.language, blog?.topics[0])
                    .then(setSimilarBlogs)
                    .catch(console.log);
            }

            if (blog?.type) {
                getSpecificTypeBlogs(1, i18n.language, blog?.type[0], null)
                    .then(setSameTypeBlogList)
                    .catch(console.log);
            }

        } catch (error) {
            console.log("error : ", error)
        }
    }, [blog])

    useEffect(() => {
        if (inView) {
            try {
                getSpecificTypeBlogs(4, i18n.language, blog?.type[0], sameTypeBlogList[sameTypeBlogList.length - 1].createdAt)
                    .then(res => {
                        if (res.length === 0) setLoadMore(null);
                        setSameTypeBlogList(sameTypeBlogList.concat(res))
                    })
                    .catch(err => {
                        setLoadMore(null);
                    });
            } catch (err) {
                setLoadMore(null);
            }
        }
    }, [inView]);

    return <>
        <main>
            <Drawer
                anchor="right"
                open={isCommentDrawer}
                onClose={() => setIsCommentDrawer(false)}
            >
                <CommentsCompo onSubmitClick={(e) => { saveCommentFunc(e) }} list={blog?.comments} />
            </Drawer>
        </main>

        <div
            className='body-content'
        >
            <div id='blog-page'>
                <Grid container spacing={4}>
                    <Grid item lg={9} md={12} sm={12}>
                        <>
                            {(loading || !blog) ? <>
                                <BlogParamPageLoader />
                            </> : <>
                                <MetaTags>
                                    <title>{blog?.title}</title>
                                    <meta name="description" content={blog?.blog} />
                                    <meta property="og:title" content={blog?.title} />
                                    <meta property="og:image" content={getImageUrl(blog?.blog)} />
                                </MetaTags>
                                <div className='blog-main-content'>
                                    <section className="blog-page-title">
                                        <h1>{blog?.title}</h1>
                                        {user && <div>
                                            <aside>
                                                <BadgeImage
                                                    user={user}
                                                    onClick={() => { goToUserProfile(blog?.by) }}
                                                />
                                                <p onClick={() => { goToUserProfile(blog?.by) }}>{user?.basic?.name}</p>
                                                <p>{blog?.createdAt?.toDate().toDateString()}</p>

                                                {(
                                                    authState?.data?.blog &&
                                                    authState?.data?.blog?.bookmarkedBlogs &&
                                                    authState?.data?.blog?.bookmarkedBlogs.find(e => e == blog?.id)) ?
                                                    <span>
                                                        <MdOutlineBookmarkAdded />
                                                    </span> :
                                                    <span onClick={bookmarkSaveHandler}>
                                                        <MdOutlineBookmarkAdd />
                                                    </span>}

                                            </aside>
                                            <aside>
                                                <>{user?.basic?.socials?.map(socialLinks =>
                                                    <span><a style={{ color: "#000" }} href={`${socialLinks?.link}`} target="_blank" rel="noopener noreferrer"><i class={`fab fa-${socialLinks?.social}`}></i></a></span>
                                                )}</>

                                            </aside>
                                        </div>}
                                    </section>
                                    <div
                                        className='blog-page-blog'
                                        contentEditable='false'
                                        dangerouslySetInnerHTML={{ __html: blog?.blog }}
                                    />
                                    <div className="blog-page-additional-blog">
                                        <aside>
                                            {blog?.type.map(val => <p
                                                onClick={() => {
                                                    navigate(`/filter/type-${val}`);
                                                }}>{t(`content-types.${val}`)}</p>)}
                                            {blog?.topics.map(val => <p
                                                onClick={() => onTagClickHandler(val)}
                                            >{t(`main-categories.${val}`)}</p>)}
                                        </aside>
                                        <aside>
                                            <div>
                                                <span onClick={likeBlogHandler}>
                                                    <i class="far fa-thumbs-up"></i>
                                                    <p>{totalLikes}</p>
                                                </span>
                                                <span onClick={() => setIsCommentDrawer(true)}>
                                                    <i class="far fa-comment"></i>
                                                    <p>{blog?.comments?.length}</p>
                                                </span>
                                            </div>
                                            <div>
                                                <p onClick={shareBlogHandler}>{t("titles.share")}</p>

                                                {(
                                                    authState?.data?.blog &&
                                                    authState?.data?.blog?.bookmarkedBlogs &&
                                                    authState?.data?.blog?.bookmarkedBlogs.find(e => e == blog?.id)) ?
                                                    <span>
                                                        <MdOutlineBookmarkAdded />
                                                    </span> :
                                                    <span onClick={bookmarkSaveHandler}>
                                                        <MdOutlineBookmarkAdd />
                                                    </span>}
                                            </div>
                                        </aside>
                                        <aside>
                                            <div onClick={() => { goToUserProfile(user?.id) }}>
                                                <p>{user?.basic?.name}</p>
                                                <p>{user?.basic?.about}</p>
                                            </div>
                                            <div>
                                                {authState?.data?.connected ?
                                                    authState?.data?.connected?.find(e => e == user?.id) &&
                                                    <span>{t("titles.connected")}</span> : <span onClick={followUserHandler}>{t("titles.connect")}</span>}
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </>}
                        </>
                    </Grid>
                    <Grid item lg={3} md={12} sm={12}>
                        <main className="blog-page-right-content">
                            <h3>{t("titles.you-may-like-to-read")}</h3>
                            <section className='blog-page-right-2-list'>
                                {(similarBlogs.length > 0) && similarBlogs.map(blog =>
                                    <Link style={{ color: "#000" }} to={`/read?i=${blog.id}`}>
                                        <div>
                                            <p>{blog.title}<span><TiArrowForward /></span></p>
                                        </div>
                                    </Link>)}
                            </section>
                            <UserListSec
                                title={t("titles.top-creators")}
                                userList={(similarBlogs.length > 0) ? similarBlogs.map(e => e.by) : null}
                                onUserClick={goToUserProfile}
                            //  selectedUser={selectedUser}
                            />
                        </main>
                    </Grid>
                </Grid>
            </div>

            {(!loading && blog && (sameTypeBlogList.length > 0)) &&
                <div style={{ margin: "80px 0px" }}>
                    {sameTypeBlogList.map((val) => <BlogCompoCards val={val} />)}
                </div>}

            {loadMore &&
                <div style={{ margin: "30px 10px" }} ref={ref}>
                    <ForumPageRightLoader />
                </div>}
            {(loadMore === null) &&
                <div style={{ margin: "30px 10px" }}>
                    <h4>Oops! Reached end....</h4>
                </div>}

        </div>

        <ChatCompo />
    </>
}



