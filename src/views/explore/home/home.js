import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { __MAIN_CATEGORIES, __CONTENT_TYPES } from '../../../DB'
import LowCarouselCompo from '../../../components/ui/low-carousel/low-carousel'
import TopContentAndTabsCompo from '../../../components/ui/sec-2/secTwo'
import FeatureNewsCompo from '../../../components/ui/sec-3/featureNews'
import TrendingNewCompo from '../../../components/ui/sec-4/sec4'
import BigBlogCarouselCompo from '../../../components/ui/sec-5/sec5'
import BestUsersCompo from '../../../components/ui/sec-7/sec7'
import TagListCompo from '../../../components/ui/tag-list/tagList'
import { getLatestBlogs } from '../../../services/functions/blogs'
import ChatsCompo from '../../../components/elements/chat/chat'
import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';

export default function Home() {

    const { i18n } = useTranslation();
    const [latestBlogList, setLatestBlogList] = useState(null);
    const appState = useSelector(e => e.appState);
    const [isVisible, setIsVisible] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false
    })
    useEffect(() => {
        getLatestBlogs(12, null, i18n.language)
            .then(e => {
                setLatestBlogList(e);
            }).catch((err) => {
                console.log("error : ", err)
                setLatestBlogList(null);
            })
    }, [i18n.language]);

    return <div className='body-content'>

        <InView as="div" onChange={(inView, entry) => {
            if (inView) setIsVisible({ ...isVisible, one: true });
        }}>
            <TagListCompo />
        </InView>

        {isVisible.one && <InView as="div" onChange={(inView, entry) => {
            if (inView) setIsVisible({ ...isVisible, two: true });
        }}>
            <LowCarouselCompo latestBlogList={latestBlogList?.slice(0, 6) || null} />
        </InView>}

        {(isVisible.two && (latestBlogList && (latestBlogList.length > 6))) &&
            <InView as="div" onChange={(inView, entry) => {
                if (inView) setIsVisible({ ...isVisible, three: true });
            }}>
                <TopContentAndTabsCompo latestBlogList={latestBlogList?.slice(6) || null} />
            </InView>}


        {isVisible.three && <InView as="div" onChange={(inView, entry) => {
            if (inView) setIsVisible({ ...isVisible, four: true });
        }}>
            <FeatureNewsCompo />
        </InView>}

        {isVisible.four && <InView as="div" onChange={(inView, entry) => {
            if (inView) setIsVisible({ ...isVisible, five: true });
        }}>
            <TrendingNewCompo />
        </InView>}

        {isVisible.five &&
            <InView as="div" onChange={(inView, entry) => {
                if (inView) setIsVisible({ ...isVisible, six: true });
            }}>
                <BigBlogCarouselCompo title={appState.tagOneTopic} />
            </InView>}

        {isVisible.six &&
            <InView as="div" onChange={(inView, entry) => {
                if (inView) setIsVisible({ ...isVisible, seven: true });
            }}>
                <BigBlogCarouselCompo title={appState.tagTwoTopic} />
            </InView>}

        {isVisible.seven &&
            <InView as="div" onChange={(inView, entry) => {
                if (inView) setIsVisible({ ...isVisible, eight: true });
            }}>
                <BigBlogCarouselCompo title={appState.tagThreeTopic} />
            </InView>}


        {isVisible.eight && <BestUsersCompo />}

        <ChatsCompo />
    </div >
}

