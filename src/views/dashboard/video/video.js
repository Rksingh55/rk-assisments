import React, { useState, useRef, useEffect } from 'react';
import '../style.scss'
import { useNavigate } from 'react-router-dom'
import SecondHeader from '../_components/title'
import BlogsBlogBGJpeg from '../../../assets/backgrounds/blogs-blog.jpg'
import { IoIosAddCircleOutline, IoIosTimer } from 'react-icons/io'
import { ImBlog } from 'react-icons/im'
import { AiOutlineFundView } from 'react-icons/ai'
import { IoEyeOutline } from 'react-icons/io5'
import { BsPeople } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import TablesCompo from '../../../components/elements/tables/video-tables'
import TopCardsCompo from '../_components/top-cards';
import { BlogPageLoader } from '../../../components/ui/skeleton-loaders/Skeleton';
import { getAllVideosOfSpecificUser } from '../../../services/firebase/user';
import { calculateStats, calculateGraphStats } from '../../../Helper_function'
import { useTranslation } from 'react-i18next';
import GraphCompo from '../../../components/elements/graph/graph';
import moment from 'moment'


export default function VideoDashboard() {

    const { t } = useTranslation();
    const ref = useRef(0);
    const navigate = useNavigate();
    const authData = useSelector(state => state.auth.data);
    const [loading, setLoading] = useState(false);
    const [statsValue, setStatsValue] = useState({
        views: 0,
        watches: 0,
        spent: 0,
        users: 0,
        arrayForGraphs: []
    })
    const [userVideos, setUserVideos] = useState([]);

     

    const onRequestClickHandler = () => {
        window.alert("onRequestClickHandler")
    }

    const navigateToCreatePage = () => {
        navigate("/create-video")
    }



    return <div
        ref={ref}
        id='dashboard---page'>
        {!loading ? <>
            <Grid container spacing={2}>
                <Grid item lg="12" md="12" sm="12" xs="12">
                    <SecondHeader
                        title={t("dashboard.your-stats")}
                        focusTitle={t("dashboard.stay-focused.title")}
                        focusInfo={t("dashboard.stay-focused.info")}
                        revenue={23}
                        onRequestClickHandler={onRequestClickHandler}
                    />
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <div onClick={navigateToCreatePage}
                        className='dashboard-add-content-card'>
                        <span><IoIosAddCircleOutline /></span>
                        <h3>{t("dashboard.create-new-video")}</h3>
                        <img src={BlogsBlogBGJpeg} />
                    </div>
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <TopCardsCompo
                        numbers={statsValue.views}
                        title={t("dashboard.views")}
                        icon={<IoEyeOutline />}
                        time={`30 ${t("dashboard.days")}`}
                    />
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <TopCardsCompo
                        numbers={statsValue.watches}
                        title={t("dashboard.watches")}
                        icon={<AiOutlineFundView />}
                        time={`30 ${t("dashboard.days")}`}
                    />
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <TopCardsCompo
                        numbers={`${statsValue.spent.toFixed(2)}H`}
                        title={t("dashboard.spent")}
                        icon={<IoIosTimer />}
                        time={`30 ${t("dashboard.days")}`}
                    />
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <TopCardsCompo
                        numbers={statsValue.users}
                        title={t("dashboard.users")}
                        icon={<BsPeople />}
                        time={`30 ${t("dashboard.days")}`}
                    />
                </Grid>
                <Grid item lg="2" md="4" sm="6" xs="6">
                    <TopCardsCompo
                        numbers={userVideos.length}
                        title={t("dashboard.stories")}
                        icon={<ImBlog />}
                        time={t("dashboard.all-time")}
                    />
                </Grid>

                {(statsValue.arrayForGraphs.length > 0) &&
                    <Grid item lg="6" md="12" sm="12" xs="12">
                        <GraphCompo
                            data={statsValue.arrayForGraphs}
                            views={statsValue.views}
                            dataKey="users"
                            title={t("dashboard.views")}
                            type="Total user"
                        />
                    </Grid>}


                {(statsValue.arrayForGraphs.length > 0) &&
                    <Grid item lg="6" md="12" sm="12" xs="12">
                        <GraphCompo
                            data={statsValue.arrayForGraphs}
                            views={`${statsValue.spent.toFixed(2)}H`}
                            dataKey="time"
                            title={t("dashboard.spent")}
                            type="Total time"
                        />
                    </Grid>}




                {(userVideos.length > 0)
                    && <Grid item lg="12" md="12" sm="12" xs="12">
                        <TablesCompo
                            title="My Records"
                            title={t("dashboard.my-records")}
                            DataList={userVideos}
                            text={{
                                title: t("dashboard.title"),
                                views: t("dashboard.views"),
                                likes: t("dashboard.likes"),
                                shares: t("dashboard.shares"),
                                options: t("dashboard.options")
                            }}
                        />
                    </Grid>}


            </Grid>
        </> : <>
            <BlogPageLoader />
        </>}

    </div>
}
