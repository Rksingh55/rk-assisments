import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CommentCard from './commen-card'
import './style.scss'



export default function Comments({
    list,
    onSubmitClick
}) {

    const { t } = useTranslation();
    const [commentText, setCommentText] = useState("");

    return <div className='comment-drawer'>
        <div className='comment-drawer-add-comment'>
            <p>{t("titles.add-comment")}</p>
            <textarea
                value={commentText}
                onChange={e => { setCommentText(e.target.value) }}
                placeholder={t("titles.write-some")} />
            <div>
                <button
                    onClick={() => { onSubmitClick(commentText) }}
                    disabled={(commentText.length < 8)}
                >{t("titles.submit")}</button>
            </div>
        </div>
        {
            (list && list.length)
            && list.map(commentID => {
                return <CommentCard id={commentID} />
            })}
    </div>;
}
