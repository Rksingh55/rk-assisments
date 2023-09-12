import React, { useState } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md'
import { TiArrowForward } from 'react-icons/ti'
import { IoIosSend } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { Modal, Button } from '@mui/material';
import WysiwgEditorCompo from '../../../components/elements/wysiwg-editor/wysiwg-editor';
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { appLoading, appMessage, appAlert } from '../../../redux/slices/App-State';
import { AppNotification } from '../../../components/ui/notification/notification';
import { saveForumQuestion } from '../../../services/firebase/forum';
import PublishingModalConfirm from '../../../components/elements/publishing-modal/publishing-modal'
import { useTranslation } from 'react-i18next';

export default function Right({
    isPostModal,
    setIsPostModal,
    questionList
}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.data);
    const handlerOnQuestionClick = (item) => {
        navigate(`/post?id=${item?.id}&post?=${item?.title}`)
    }
    const { i18n, t } = useTranslation();
    const [post, setPost] = useState("");
    const [title, setTitle] = useState("");
    const [isToSaveModal, setIsToSaveModal] = useState(false);
    const postSaveHandler = (contentType, contentTopic) => {
        if (auth) {
            dispatch(appLoading(true));
            saveForumQuestion({
                title,
                post,
                type: contentType,
                topics: contentTopic,
                language: i18n.language,
            }, auth)
                .then(res => {
                    dispatch(appLoading(false));
                    dispatch(appMessage(<AppNotification
                        message={t("messages.data-saved")}
                        type="message"
                    />));
                    setTitle("");
                    setIsToSaveModal(false);
                    setIsPostModal(false);
                })
                .catch(err => {
                    dispatch(appLoading(false));
                    dispatch(appAlert(<AppNotification
                        message={t("messages.err-smth")}
                        type="alert"
                    />));
                })
        } else {
            navigate("/authorization")
        }
    }




    return <>
        <PublishingModalConfirm
            isOpen={isToSaveModal}
            title={title}
            onPublishClick={(contentType, contentTopic) => {
                postSaveHandler(contentType, contentTopic)
            }}
            close={() => {
                setIsToSaveModal(false)
            }}
        />
        <Modal
            open={isPostModal}
        >
            <section className='forum-editor-modal'>
                <div className='forum-editor-modal-inner-div' >
                    <h1 style={{
                        color: "#fff",
                        marginBottom: 10
                    }}>{t("forum.cre-you-post")}</h1>
                    <textarea
                        className='forum-editor-modal-title-input'
                        placeholder={t("forum.ent-title")}
                        value={title}
                        onChange={e => { setTitle(e.target.value) }} />
                    <WysiwgEditorCompo
                        setText={setPost} />
                    <div className='forum-editor-modal-btns'>
                        <Button
                            endIcon={<IoCloseOutline />}
                            onClick={() => { setIsPostModal(false) }}
                            variant="inherit">{t("create-pages.close")}</Button>
                        <Button
                            endIcon={<IoIosSend />}
                            className={!((post.length > 60) && (title.length > 10)) && 'faded'}
                            disabled={!((post.length > 60) && (post.length > 10))}
                            onClick={() => { setIsToSaveModal(true) }}
                            variant="inherit">{t("create-pages.publish")}</Button>
                    </div>
                </div>
            </section>
        </Modal>
        <div className='forum-right'>
            <div
                onClick={() => {
                    if (auth) {
                        setIsPostModal(true)
                    } else {
                        navigate("/authorization")
                    }
                }}
                className="forum-right-1-add">
                <span><MdOutlinePostAdd /></span>
                <p>{t("forum.add-post")}</p>
            </div>
            <div className="forum-right-2-list">
                {questionList &&
                    questionList.map(val => {
                        return <div onClick={() => { handlerOnQuestionClick(val) }}>
                            <p>{val.title}<span><TiArrowForward /></span></p>
                        </div>
                    })}
            </div>
        </div>
    </>
}
