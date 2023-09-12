import React from 'react';
import './style.scss'
import PostCardCompo from '../../../components/elements/post-card/Post-card';

export default function List({
    __LIST
}) {
    return <section id='forum-post-list'>
        {__LIST.map(item => <PostCardCompo item={item} />)}
    </section>
}
