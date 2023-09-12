import { useNavigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from "react"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html';
import { __CONTENT_TYPES, __MAIN_CATEGORIES } from "../../../../DB";
import { AiOutlineDelete } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'
import { Modal } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { publishBlogToDB, updateBlogToDB, uploadIMG, saveBlogToDB } from "../../../../services/firebase/blogs";
import { useDispatch, useSelector } from 'react-redux'
import { appLoading, appMessage, appAlert } from "../../../../redux/slices/App-State";
import { AppNotification } from '../../../../components/ui/notification/notification';
import './style.scss'
import ImagePickerModal from '../../../../components/elements/image-picker-modal/image-picker-modal';
import { useTranslation } from 'react-i18next';
import SeoCheckerCompo from "../../../../components/elements/seo-checker/seo-checker";
import PublishingModalConfirm from '../../../../components/elements/publishing-modal/publishing-modal'



export default function CreateBlog() {

    const { state } = useLocation();

    const auth = useSelector(e => e.auth.data);
    const navigate = useNavigate()
    const { i18n, t } = useTranslation();
    const [editorState, setEditorState] = useState(() => {
        if (state?.html) {
            const contentBlock = htmlToDraft(state.html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                return editorState;
            }
            return EditorState.createEmpty();
        }
        return EditorState.createEmpty();
    });
    const [title, setTitle] = useState(() => {
        if (state?.title) {
            return state.title;
        }
        return "";
    });
    const [openSeoDetail, setOpenSeoDetail] = useState(false);
    const [openImagePicker, setOpenImagePicker] = useState(false);
    const dispatch = useDispatch();
    const [isToSaveModal, setIsToSaveModal] = useState(false);
    const [isBlogPreviewModal, setIsBlogPreviewModal] = useState(false);

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
    }

    const uploadImageCallBack = file => {
        dispatch(appLoading(true))
        return new Promise((resolve, reject) => {
            if (file?.size > 1000000) {
                dispatch(appLoading(false))
                dispatch(appAlert(<AppNotification
                    message={t("messages.img-size")}
                    type="alert"
                />));
                reject("error");
            }

            uploadIMG(file)
                .then(link => {
                    dispatch(appLoading(false))
                    resolve({
                        data: {
                            link
                        }
                    })
                })
                .catch(() => {
                    dispatch(appLoading(false))
                    dispatch(appAlert(<AppNotification
                        message={t("messages.err-smth")}
                        type="Alert"
                    />));
                    reject("error");
                })


        })
    }

    const CustomPublishButton = () => {
        return <div
            onClick={() => { setIsToSaveModal(true) }}
            style={{
                height: "100%",
                border: "2px solid black",
                padding: "1px 13px",
                fontSize: "0.9em",
                margin: '3px',
                borderRadius: "0.2em",
                cursor: "pointer"
            }}>
            <p>{state?.html ? t("create-pages.update") : t("create-pages.publish")}</p>
        </div>
    }

    const CustomSaveButton = () => {
        if (auth?.subscription && !(auth.subscription.toDate() <= new Date())) {
            return <div
                onClick={() => {
                    saveBlogToDB(auth?.id, {
                        title: title,
                        html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                    }).then(() => {
                        dispatch(appMessage(<AppNotification
                            message={t("messages.data-saved")}
                            type="message"
                        />))
                    }).catch(() => {
                        dispatch(appAlert(<AppNotification
                            message={t("messages.err-smth")}
                            type="alert"
                        />))
                    })
                }}
                style={{
                    height: "100%",
                    border: "2px solid black",
                    padding: "1px 13px",
                    fontSize: "0.9em",
                    margin: '3px',
                    borderRadius: "0.2em",
                    cursor: "pointer"
                }}>
                <p>{t("create-pages.save")}</p>
            </div>
        }
        return <></>

    }

    const onPublishClick = async (contentType, contentTopic) => {

        if (state?.id) {
            dispatch(appLoading(true));
            const Data = {
                title: title,
                blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                type: contentType,
                topics: contentTopic,
                language: i18n.language,
            }

            try {
                const tempResult = await updateBlogToDB(state?.id, Data);
                if (tempResult) {
                    dispatch(appLoading(false));
                    dispatch(appMessage(<AppNotification
                        message={t("messages.updated")}
                        type="message"
                    />));
                    navigate(-1);
                }
            } catch (error) {
                dispatch(appAlert(<AppNotification
                    message={t("messages.err-smth")}
                    type="alert"
                />))
                dispatch(appLoading(false))
            }
        } else {
            dispatch(appLoading(true));
            const Data = {
                by: auth.id,
                title: title,
                blog: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                type: contentType,
                topics: contentTopic,
                language: i18n.language,
                payed: auth.subscription ? !(auth.subscription.toDate() <= new Date()) : false
            }

            try {
                const tempResult = await publishBlogToDB(Data);
                if (tempResult) {
                    dispatch(appLoading(false));
                    dispatch(appMessage(<AppNotification
                        message={t("messages.data-saved")}
                        type="message"
                    />));
                    navigate(-1);
                }
            } catch (error) {
                dispatch(appAlert(<AppNotification
                    message={t("messages.err-smth")}
                    type="alert"
                />))
                dispatch(appLoading(false))
            }
        }


    }

    const CustomImagePreview = () => {
        return <div
            onClick={() => { setOpenImagePicker(true) }}
            style={{
                height: "100%",
                border: "2px solid black",
                padding: "1px 13px",
                fontSize: "0.9em",
                margin: '3px',
                borderRadius: "0.2em",
                cursor: "pointer"
            }}>
            <p>{t("create-pages.gallery")}</p>
        </div>
    }

    const CustomBlogPreview = () => {
        return <div
            onClick={() => {
                setIsBlogPreviewModal(true)
            }}
            style={{
                height: "100%",
                border: "2px solid black",
                padding: "1px 13px",
                fontSize: "0.9em",
                margin: '3px',
                borderRadius: "0.2em",
                cursor: "pointer"
            }}>
            <p>{t("create-pages.preview")}</p>
        </div>
    }

    useEffect(() => {
        !auth && navigate("/authorization", { replace: true });
    }, [])


    // function myBlockRenderer(contentBlock) {
    //     const type = contentBlock.getType();
    //     // Convert image type to mediaComponent
    //     // console.log("type : ", type)
    // }

    return <div id="create-blog">

        {auth && <>
            <div>

                <PublishingModalConfirm
                    isOpen={isToSaveModal}
                    title={title}
                    onPublishClick={(contentType, contentTopic) => {
                        onPublishClick(contentType, contentTopic)
                    }}
                    close={() => {
                        setIsToSaveModal(false)
                    }}
                />

                <Modal
                    open={isBlogPreviewModal}
                    onClose={() => { setIsBlogPreviewModal(false) }}
                >
                    <main id="preview-blog-modal">
                        <div
                            dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }}
                        />
                    </main>
                </Modal>

                <ImagePickerModal
                    isOpen={openImagePicker}
                    closeImgPicker={() => { setOpenImagePicker(false) }}
                />


                <div className="create-blog-textarea">
                    <textarea
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={t("create-pages.create-input")} />
                    {(title.length > 30) ? <div><p>{t("create-pages.good-length")}</p></div> : <div><p>{title.length}/30</p></div>}
                </div>
                <div
                    className={(title?.length > 30) ? "create-blog-editor" : "create-blog-editor-outOfScope"}
                >
                    <Editor
                        //  customBlockRenderFunc={myBlockRenderer}
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        placeholder={t("create-pages.how-i-start")}
                        editorClassName="demo-editor"
                        toolbarClassName="toolbarClassName"
                        onEditorStateChange={onEditorStateChange}
                        toolbarCustomButtons={[<CustomPublishButton />, <CustomImagePreview />, <CustomBlogPreview />, <CustomSaveButton />]}
                        toolbar={{
                            image: {
                                uploadCallback: uploadImageCallBack,
                                previewImage: true,
                                alt: { present: true, mandatory: true },
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                inputAccept: 'image/*',
                                defaultSize: {
                                    height: 'auto',
                                    width: 'auto',
                                },
                            },
                            fontFamily: {
                                options: ['Poppins', 'Montserrat', 'Open Sans', 'Lato', "Raleway", "Rubik"],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined
                            },
                            options: auth?.subscription &&
                                !(auth.subscription.toDate() <= new Date()) ?
                                ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                : ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'embedded', 'emoji', 'image', 'remove', 'history'],
                            inline: {
                                inDropdown: false,
                                options: ['bold', 'italic', 'underline']
                            },
                            blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H1', 'H2', 'H3']
                            },
                            fontSize: {
                                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48]
                            },
                            list: {
                                inDropdown: true,
                                options: ['unordered', 'ordered', 'indent', 'outdent']
                            },
                            textAlign: {
                                inDropdown: true,
                                options: ['left', 'center', 'justify']
                            }
                        }}
                    />
                </div>

                <Modal
                    open={openSeoDetail}
                    onClose={() => { setOpenSeoDetail(false) }}>
                    <main id="create-blg-pg-seo-modal">
                        <div
                            onClick={() => { setOpenSeoDetail(false) }}
                            id="create-blg-pg-seo">
                            <h3>{t("create-pages.close")}</h3>
                        </div>

                    </main>
                </Modal>

                <div
                    onClick={() => { setOpenSeoDetail(true) }}
                    id="create-blg-pg-seo">
                    <SeoCheckerCompo
                        text={t("create-pages.seo-score")}
                        title={title}
                        htmlBlog={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                </div>

            </div>
        </>}

    </div>
}