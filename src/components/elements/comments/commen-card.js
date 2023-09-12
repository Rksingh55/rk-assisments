import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineLike } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';

import { getCommentById } from '../../../services/functions/user';
import { saveCommentLike, replyToComment } from '../../../services/functions/user'
import { appMessage, appLoading, appAlert } from '../../../redux/slices/App-State'
import { AppNotification } from '../../../components/ui/notification/notification'
import ReportCompo from '../../../components/elements/report/report'
import { getRandomColor } from '../../../Helper_function'
import './card.scss'

export default function CommentCard({
    id
}) {

    const { t } = useTranslation();
    const authState = useSelector(e => e.auth.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState(null);
    const [likes, setLikes] = useState(0);
    const [replyText, setReplyText] = useState('');
    const [reportModal, setReportModal] = useState(false);

    useEffect(() => {
        getCommentById(id)
            .then(res => {
                setComment(res);
                setLikes(res?.claps || 0);
            })
            .catch(err => {
                console.log("error : ", err)
            })
    }, []);

    const onCommentLikeClick = () => {
        !authState && navigate("/authorization");
        saveCommentLike(id)
            .then(e => {
                setLikes(likes + 1);
            })
            .catch(e => {

            });
    }

    const saveReplyHandler = () => {
        !authState && navigate("/authorization");
        dispatch(appLoading(true));
        replyToComment(id, {
            id: authState?.id,
            name: authState?.basic?.name
        }, replyText)
            .then(e => {
                dispatch(appMessage(<AppNotification
                    message={t("messages.data-saved")}
                    type="message"
                />));
                dispatch(appLoading(false));
            })
            .catch(e => {
                dispatch(appLoading(false));
                dispatch(appAlert(<AppNotification
                    message={t("messages.err-smth")}
                    type="alert"
                />));
            });
    }

    const onReportClick = () => {
        setReportModal(true);
    }


    return <div>
        <ReportCompo
            reportModal={reportModal}
            setReportModal={setReportModal}
            content={{
                id: id,
                type: "comment"
            }}
        />
        {comment && <div className="comment-card">
            <div className="comment-card-1">
                <div>
                    <span><FaUserCircle color={getRandomColor()} /></span>
                    <Link to={`/profile/${comment?.by.id}`}>
                        <h4>{comment?.by?.name}</h4>
                    </Link>
                    <p>{comment?.createdAt?.toDate().toDateString()}</p>
                </div>
                <h5 onClick={onReportClick}>Report</h5>
            </div>
            <p className="comment-card-2">
                {comment?.comment}
            </p>
            <div className="comment-card-3">
                <p>{likes}</p>
                <span onClick={onCommentLikeClick}><AiOutlineLike /></span>
            </div>
            <div className="comment-card-4">
                <input
                    value={replyText}
                    placeholder={`reply to ${comment?.by?.name}`}
                    onChange={e => { setReplyText(e.target.value) }}
                />
                <button
                    disabled={!(replyText.length > 7)}
                    onClick={saveReplyHandler}
                >Submit</button>
            </div>

            {(comment?.replies && comment?.replies?.length) &&
                <div className="comment-card-5">
                    {comment?.replies.map(reply => {

                        return <div>
                            <div className="comment-card-5-1">
                                <div>
                                    <span><FaUserCircle color={getRandomColor()} /></span>
                                    <Link to={`/profile/${reply?.by.id}`}>
                                        <h4>{reply?.by?.name}</h4>
                                    </Link>
                                    <p>{reply?.createdAt?.toDate().toDateString()}</p>
                                </div>
                                <h5 onClick={onReportClick}>Report</h5>
                            </div>
                            <p className="comment-card-5-2">
                                {reply?.reply}
                            </p>
                        </div>
                    })}
                </div>}

        </div>}
    </div>;
}
