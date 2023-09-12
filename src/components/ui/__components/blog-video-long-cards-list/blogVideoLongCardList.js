import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';

import CardCompo from './card';

import { getSpecificTagsBlogs } from '../../../../services/functions/blogs';
import { getSpecificTagsVideos } from '../../../../services/functions/videos';
import './style.scss'



export default function BlogVideoLongCard({
    title
}) {

    const { i18n } = useTranslation();
    const [specificTagOneList, setSpecificTagOneList] = useState([])
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (isMounted) {
                try {
                    const [tempOneResult, tempTwoResult] = await Promise.all([
                        getSpecificTagsVideos(2, i18n.language, title),
                        getSpecificTagsBlogs(2, i18n.language, title)
                    ])
                    setSpecificTagOneList([...tempOneResult, ...tempTwoResult])
                } catch (error) {
                    setSpecificTagOneList([])
                }
            }
        }

        fetchData();
        return () => { isMounted = false };
    }, [title, i18n.language])

    return <div>
        {(specificTagOneList.length > 0) ? <>
            <div className='ui-sec-7-titles'>
                <p>{title}</p>
            </div>
            <section>
                {specificTagOneList.map((val) => <CardCompo val={val} />)}
            </section>
        </> : <>
            <div style={{ margin: "20px 0px 10px" }}>
                <Skeleton variant="rectangular" animation="wave" height={260} />
            </div>
        </>}
    </div>;
}

