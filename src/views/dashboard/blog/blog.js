import React, { useState, useRef, useEffect } from 'react';
import '../style.scss'
import { useNavigate } from 'react-router-dom'
import SecondHeader from '../_components/title'
import BlogsBlogBGJpeg from '../../../assets/backgrounds/blogs-blog.jpg'
import { IoIosAddCircleOutline, IoIosTimer } from 'react-icons/io'
import { ImBlog } from 'react-icons/im'
import { AiOutlineFundView } from 'react-icons/ai'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosOpen } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { BsPeople } from 'react-icons/bs'
import { Grid } from '@mui/material'
import TablesCompo from '../../../components/elements/tables/blog-tables'
import TopCardsCompo from '../_components/top-cards';
import { getAllBlogsOfSpecificUser } from '../../../services/firebase/user';
import { BlogPageLoader } from '../../../components/ui/skeleton-loaders/Skeleton';
import { calculateStats, calculateGraphStats } from '../../../Helper_function'
import { useTranslation } from 'react-i18next';
import moment from 'moment'
import GraphCompo from '../../../components/elements/graph/graph'

export default function BlogDashboard() {

  const { t } = useTranslation();
  const ref = useRef(0);
  const navigate = useNavigate();
  const authData = useSelector(state => state.auth.data);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsValue, setStatsValue] = useState({
    views: 0,
    watches: 0,
    spent: 0,
    users: 0,
    arrayForGraphs: []
  })

 

  const onRequestClickHandler = () => {
    window.alert("onRequestClickHandler")
  }

  const navigateToCreatePage = () => {
    navigate("/create-blog")
  }

  const IsUnpublishedBlog = () => {
    if (authData?.blog?.last_saved) {
      return <aside
        className="dashboard-add-content-card-unsaved"
        onClick={() => {
          navigate("/create-blog", {
            state: {
              ...authData?.blog?.last_saved
            }
          })
        }}
      >
        <p>Last saved</p>
        <span><IoIosOpen /></span>
      </aside>
    }

    return <></>
  }

  return <div ref={ref} id='dashboard---page'>
    {!loading ? <>
      <Grid container spacing={2}>
        <Grid item lg="12" md="12" sm="12" xs="12">
          <SecondHeader
            title={t("dashboard.your-stats")}
            revenue={23}
            focusTitle={t("dashboard.stay-focused.title")}
            focusInfo={t("dashboard.stay-focused.info")}
            onRequestClickHandler={onRequestClickHandler}
          />
        </Grid>
        <Grid item lg="2" md="4" sm="6" xs="6">
          <div
            className='dashboard-add-content-card'>
            <span onClick={navigateToCreatePage}><IoIosAddCircleOutline /></span>
            <h3 onClick={navigateToCreatePage}>{t("dashboard.create-new-blog")}</h3>
            <img src={BlogsBlogBGJpeg} />
            <IsUnpublishedBlog />
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
            numbers={userBlogs.length}
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
              type="Total user"
              title={t("dashboard.views")}
            />
          </Grid>}

        {(statsValue.arrayForGraphs.length > 0) &&
          <Grid item lg="6" md="12" sm="12" xs="12">
            <GraphCompo
              data={statsValue.arrayForGraphs}
              views={`${statsValue.spent.toFixed(2)}H`}
              dataKey="time"
              type="Total time"
              title={t("dashboard.spent")}
            />
          </Grid>}



        {(userBlogs && (userBlogs.length > 0)) &&
          <Grid item lg="12" md="12" sm="12" xs="12">
            <TablesCompo
              title={t("dashboard.my-diaries")}
              DataList={userBlogs}
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
