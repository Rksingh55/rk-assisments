import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'
import { IoShareSocialOutline } from 'react-icons/io5'
import { RiMessage3Line } from 'react-icons/ri'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'


import DummyImagePNG from '../../../assets/png/dummy-user.png'
import { incrementForumShareHandler } from '../../../services/functions/forum'
import { getUserByID, followUserFunc } from '../../../services/functions/user'
import { appMessage, appAlert } from '../../../redux/slices/App-State';
import { AppNotification } from '../../ui/notification/notification';
import { saveLikeToPost, savePostToUserBookmarks } from '../../../services/firebase/forum'
import ReportCompo from '../../elements/report/report';
import BadgeImage from '../../ui/__components/badge-Image/badge-image';
import './style.scss'



export default function PostCard({ item }) {

    const { t } = useTranslation();
    const authState = useSelector(e => e.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reportModal, setReportModal] = useState(false);
    const [totalLikes, setTotalLikes] = useState(item?.claps || 0)
    const handleNavigator = () => {
        navigate(`/post?id=${item?.id}&post?=${item?.title}`)
    }
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserByID(item?.by)
            .then(res => {
                setUser(res);
            })
            .catch(err => {
                console.log('error : ', err)
            })
    }, []);

    const navigateToUser = () => {
        navigate(`/profile/${item?.by}`);
    }

    const onConnectClick = () => {
        if (authState.data) {
            followUserFunc(item?.by, authState.data?.id)
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

    const onLikeClick = () => {
        if (authState.data) {
            saveLikeToPost(item?.id, authState.data?.id)
                .then(e => {
                    setTotalLikes(totalLikes + 1);
                })
                .catch((e) => {
                    console.log('error : ', e);
                })
        } else {
            navigate("/authorization")
        }
    }

    const onShareClick = () => {
        if (navigator.canShare) {
            navigator.share({
                title: 'Assist mates',
                text: item?.title || "AM story",
                url: window.location.href
            })
                .then(() => {
                    incrementForumShareHandler(item?.id, "FORUM");
                })
                .catch((error) => console.log('Sharing failed', error));
        } else {
            window.alert("Sharing not working in your device");
        }
    }

    const bookmarkSaveHandler = () => {
        if (authState.data) {
            savePostToUserBookmarks(item?.id, authState?.data?.id)
                .then(() => {
                    dispatch(appMessage(<AppNotification
                        message={t("profile.bookmark-record")}
                        type="message"
                    />))
                })
                .catch(() => {
                    dispatch(appAlert(<AppNotification
                        message={t("messages.err-smth")}
                        type="alert"
                    />))
                })
        } else {
            navigate("/authorization")
        }
    }

    return <div className='forum-post-card'>
        <ReportCompo
            reportModal={reportModal}
            setReportModal={setReportModal}
            content={{
                id: item?.id,
                type: "post"
            }}
        />
        {user &&
            <div className='forum-post-card-1'>
                <div onClick={navigateToUser}>
                    <BadgeImage
                        user={user}
                    />
                    <h4>{user?.basic?.name}</h4>
                    <p>{item.createdAt?.toDate().toDateString()}</p>
                </div>
                {(authState.data &&
                    authState.data?.connected?.find(e => e == item?.by)) ?
                    <div>
                        <h5>{t("titles.connected")}</h5>
                    </div> :
                    <div onClick={onConnectClick}>
                        <h5>{t("titles.connect")}</h5>
                    </div>}
            </div>}

        <div onClick={handleNavigator} className='forum-post-card-2'>
            <h3>{item?.title}</h3>
            <div
                contentEditable='false'
                dangerouslySetInnerHTML={{ __html: item?.post }}
            />
        </div>

        <div className='forum-post-card-3'>
            {[...item?.type, ...item?.topics].map(val => <p>{val}</p>)}
        </div>

        <section className='forum-post-card-4'>
            <section>
                <div onClick={onLikeClick}>
                    <span><AiOutlineLike /></span>
                    <p>{totalLikes}</p>
                </div>

                <div >
                    <span onClick={onShareClick}><IoShareSocialOutline /></span>
                    <p>{item?.shares || 0}</p>
                </div>
                <div>
                    <span><RiMessage3Line /></span>
                    <p>{item?.replies?.length || 0}</p>
                </div>
            </section>

            <section>
                {(authState.data
                    && authState.data.forum
                    && authState.data.forum?.bookmarks.find(e => e == item.id)) ?
                    <span><MdOutlineBookmarkAdded /></span> :
                    <span onClick={bookmarkSaveHandler}><MdOutlineBookmarkAdd /></span>}
                <p onClick={() => { setReportModal(true) }}>{t("titles.report")}</p>
            </section>
        </section>
    </div>
}
