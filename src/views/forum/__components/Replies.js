import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'
import { AiTwotoneLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getPostReplyById, getPostSubRepliesById } from '../../../services/functions/forum'
import { saveReplyToPostReply, saveLikePostReplyLevelTwo } from '../../../services/firebase/forum';
import { Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ReportCompo from '../../../components/elements/report/report'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function Replies({
    id,
    authState,
    successCallBack,
    errorCallBack,
    navigateToLogin,
    makeLoad
}) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [reply, setReply] = useState(null);
    const [replyInput, setReplyInput] = useState('');
    const [subReplies, setSubReplies] = useState([]);
    const [likes, setLikes] = useState(0);
    const [reportModal, setReportModal] = useState(false);

    useEffect(() => {
        getPostReplyById(id)
            .then(res => {
                setReply(res);
                setLikes(res?.claps || 0);
                getPostSubRepliesById(id)
                    .then(subRes => {
                        setSubReplies(subRes);
                    })
            })
    }, [])


    const onSubmit = () => {
        if (authState) {
            makeLoad();
            saveReplyToPostReply(id, replyInput, {
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

    const onReplyLikeClick = () => {
        if (authState) {
            makeLoad();
            saveLikePostReplyLevelTwo(id)
                .then(() => {
                    successCallBack(t("messages.liked"));
                    setLikes(likes + 1);
                }).catch(err => {
                    errorCallBack(err);
                })
        } else {
            navigateToLogin()
        }
    }

    return <div>
        <ReportCompo
            reportModal={reportModal}
            setReportModal={setReportModal}
            content={{
                id: id,
                type: "forum-post-reply"
            }}
        />
        {reply ?
            <>
                <section className='post-reply-compo'>
                    <span className='post-reply-compo-1'>
                        <FaUserCircle color={getRandomColor()} />
                    </span>
                    <div className='post-reply-compo-2'>
                        <div className='post-reply-compo-2-1'>
                            <aside>
                                <h4 onClick={() => {
                                    navigate(`/profile/${reply?.by?.id}`);
                                }}>{reply?.by?.name}</h4>
                                <h5>{reply?.createdAt?.toDate().toDateString()}</h5>
                            </aside>
                            <p>{reply?.reply}</p>
                        </div>

                        <div className='post-reply-compo-3'>
                            <div onClick={onReplyLikeClick}>
                                <p>{likes}</p>
                                <span><AiTwotoneLike /></span>
                            </div>
                            <h5 onClick={() => { setReportModal(true); }}>{t("titles.report")}</h5>
                        </div>
                        <div className='post-reply-compo-4'>
                            <input
                                value={replyInput}
                                onChange={e => { setReplyInput(e.target.value) }}
                                placeholder={`${t("titles.say-som-to")} ${reply?.by?.name}`} />
                            <button
                                className={(replyInput.length < 7) && "disabled"}
                                disabled={(replyInput.length < 7)}
                                onClick={onSubmit}
                            >{t("titles.submit")}</button>
                        </div>
                        <div className='post-reply-compo-5'>
                            {(subReplies?.length > 0) &&
                                subReplies?.map(subreply => {

                                    return <div className="post-reply-compo-5-1">
                                        <span className="post-reply-compo-5-2">
                                            <FaUserCircle color={getRandomColor()} />
                                        </span>
                                        <div className="post-reply-compo-5-3">
                                            <aside>
                                                <h4 onClick={() => {
                                                    navigate(`/profile/${subreply?.by?.id}`);
                                                }}>{subreply?.by?.name}</h4>
                                                <h5>{subreply?.createdAt?.toDate().toDateString()}</h5>
                                                <h6 onClick={() => { setReportModal(true); }}>{t("titles.report")}</h6>
                                            </aside>
                                            <p>{subreply?.reply}</p>
                                        </div>
                                    </div>
                                })}
                        </div>
                    </div>
                </section>
            </> :
            <>
                <div style={{ margin: "14px 0px", borderRadius: '0.3em' }}>
                    <Skeleton
                        variant='rectangular'
                        height={200}
                    />
                </div>
            </>
        }
    </div>;
}
