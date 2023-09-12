import React, { useState } from "react"
import { EditorState, convertToRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html';
import { useDispatch, useSelector } from "react-redux";
import { appAlert, appLoading, appMessage } from "../../../redux/slices/App-State";
import { AppNotification } from "../../ui/notification/notification";
import { uploadIMG } from "../../../services/firebase/blogs";
import ImagePickerModal from '../../../components/elements/image-picker-modal/image-picker-modal'
import { useTranslation } from "react-i18next";
import './editor.scss'



export default function WysiwgEditor({
    setText
}) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [openImagePicker, setOpenImagePicker] = useState(false)
    const onEditorStateChange = editorState => {
        setEditorState(editorState)
        setText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    const uploadImageCallBack = file => {
        dispatch(appLoading(true))
        return new Promise((resolve, reject) => {
            if (file?.size > 1000000) {
                dispatch(appLoading(false))
                dispatch(appMessage(<AppNotification
                    message={t("messages.img-size")}
                    type="message"
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
                        type="alert"
                    />));
                    reject("error");
                })


        })
    }

    const checkHtmlFunc = () => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
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

    return <div>
        <ImagePickerModal
            isOpen={openImagePicker}
            closeImgPicker={() => { setOpenImagePicker(false) }}
        />
        <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            placeholder={t("create-pages.how-i-start")}
            editorClassName="demo-editor--2"
            toolbarClassName="wysiwg-toolbar-class"
            toolbarCustomButtons={[<CustomImagePreview />]}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
                image: {
                    uploadCallback: uploadImageCallBack,
                    previewImage: true,
                    alt: { present: true, mandatory: true }
                },
                fontFamily: {
                    options: ['Poppins', 'Montserrat', 'Open Sans', 'Lato', "Raleway", "Rubik"],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined
                },
                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                inline: {
                    inDropdown: true,
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
        {/* <div
      dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }}
    /> */}
        {/* <button onClick={checkHtmlFunc}>Check html</button> */}
    </div>
}
