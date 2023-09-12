import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { Modal } from "@mui/material"

import { appMessage, appAlert, appLoading } from '../../../redux/slices/App-State';
import { AppNotification } from '../../ui/notification/notification';
import "./report.scss"

export default function Report({
    reportModal,
    setReportModal,
    content
}) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(e => e.auth.data);
    const [reportedTopics, setReportedTopics] = useState([])
    const reportedTopicHandler = (topic) => {
        if (reportedTopics.find(e => e == topic)) {
            setReportedTopics(reportedTopics.filter(e => e != topic));
        } else {
            setReportedTopics([...reportedTopics, topic]);
        }
    }

    const onReportSubmit = () => {
        dispatch(appLoading(true))
        !authState && navigate("/authorization");
    }

    return <Modal open={reportModal} onClose={() => { setReportModal(false) }}>
        <div className='report-modal'>
            <div className='report-modal-1'>
                <h3>{t("titles.report")}</h3>
                <aside onClick={() => { setReportModal(false) }}><AiOutlineClose /></aside>
            </div>
            <section className='report-modal-2'>
                <div onClick={() => { reportedTopicHandler("Harassment") }}>
                    <span className={reportedTopics.find(e => e == "Harassment") && "active"}></span>
                    <aside>
                        <h4>{t("report.one.title")}</h4>
                        <p>{t("report.one.desc")}</p>
                    </aside>
                </div>
                <div onClick={() => { reportedTopicHandler("Spam") }}>
                    <span className={reportedTopics.find(e => e == "Spam") && "active"}></span>
                    <aside>
                        <h4>{t("report.two.title")}</h4>
                        <p>{t("report.two.desc")}</p>
                    </aside>
                </div>
                <div onClick={() => { reportedTopicHandler("Bad image") }}>
                    <span className={reportedTopics.find(e => e == "Bad image") && "active"}></span>
                    <aside>
                        <h4>{t("report.three.title")}</h4>
                        <p>{t("report.three.desc")}</p>
                    </aside>
                </div>
                <div onClick={() => { reportedTopicHandler("Factually incorrect") }}>
                    <span className={reportedTopics.find(e => e == "Factually incorrect") && "active"}></span>
                    <aside>
                        <h4>{t("report.four.title")}</h4>
                        <p>{t("report.four.desc")}</p>
                    </aside>
                </div>
                <div onClick={() => { reportedTopicHandler("Adult content") }}>
                    <span className={reportedTopics.find(e => e == "Adult content") && "active"}></span>
                    <aside>
                        <h4>{t("report.five.title")}</h4>
                        <p>{t("report.five.desc")}</p>
                    </aside>
                </div>
            </section>
            <section className='report-modal-3'>
                <button onClick={() => { setReportModal(false) }}>{t("create-pages.close")}</button>
                <button
                    disabled={(reportedTopics.length === 0)}
                    onClick={onReportSubmit}>{t("titles.submit")}</button>
            </section>
        </div>
    </Modal>
}
