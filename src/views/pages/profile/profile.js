import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ProfilePageLoader } from "../../../components/ui/skeleton-loaders/Skeleton"
import { getUserByID } from '../../../services/functions/user';
import { useTranslation } from 'react-i18next';
import { getAllBlogsOfSpecificUser, getAllVideosOfSpecificUser, fetchAllConnectionsByUserId } from '../../../services/firebase/user';
import BlogVideoCard from '../../../components/ui/__components/blog-video-card/blog-video-card';
import './style.scss'




export default function Profile() {

    const { id } = useParams();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [connections, setConnections] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);
    const [userVides, setUserVideos] = useState([]);

    useEffect(() => {

        id && getUserByID(id)
            .then(res => {
                setUser(res);
            })

        id && getAllBlogsOfSpecificUser(id)
            .then(res => {
                setUserBlogs(res);
            })

        id && getAllVideosOfSpecificUser(id)
            .then(res => {
                setUserVideos(res);
            })

        id && fetchAllConnectionsByUserId(id)
            .then(res => {
                setConnections(res);
            })

    }, [id])

    return <div>
        {user ?
            <>
                <main id="user-profile">
                    <Grid container spacing={2}>
                        <Grid item lg="3" md="4" sm="12" xs="12">
                            <main className="user-profile-left">
                                <div id="user-profile-left-img">
                                    <img src={user?.basic.image} />
                                </div>
                                <section>
                                    <div id="user-profile-left-details">
                                        <h3>{user?.basic.name}</h3>
                                        <p>{user?.basic.about || "..."}</p>
                                    </div>
                                    <div id="user-profile-numberss">
                                        <p>{t("profile.connections")} : {user?.connected?.length || 0}</p>
                                        <p>{t("profile.followers")} : {user?.connections?.length || 0}</p>
                                    </div>
                                    <div id="user-profile-left-socials">

                                        {connections ? <>
                                            {(connections.instagram && (connections.instagram.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={connections.instagram}
                                                >
                                                    <i class="fab fa-instagram"></i></a>}

                                            {(connections.linkdin && (connections.linkdin.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={connections.linkdin}
                                                >
                                                    <i class="fab fa-linkedin"></i></a>}

                                            {(connections.pinterest && (connections.pinterest.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={connections.pinterest}
                                                >
                                                    <i class="fab fa-pinterest"></i></a>}


                                            {(connections.facebook && (connections.facebook.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={connections.facebook}
                                                >
                                                    <i class="fab fa-facebook"></i></a>}

                                            {(connections.whatsapp && (connections.whatsapp.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={`https://wa.me/${connections.whatsapp}`}
                                                >
                                                    <i class="fab fa-whatsapp"></i></a>}

                                            {(connections.website && (connections.website.length > 0)) &&
                                                <a
                                                    target="_blank"
                                                    href={connections.website}
                                                ><i class="fas fa-globe"></i></a>}

                                        </> : <>
                                            <a className={'faded'}>
                                                <i class="fab fa-instagram"></i>
                                            </a>
                                            <a className='faded' >
                                                <i class="fab fa-linkedin"></i>
                                            </a>
                                            <a className='faded'>
                                                <i class="fab fa-pinterest"></i>
                                            </a>
                                            <a className='faded'>
                                                <i class="fab fa-facebook"></i>
                                            </a>
                                            <a className='faded'>
                                                <i class="fab fa-whatsapp"></i>
                                            </a>
                                            <a className='faded'>
                                                <i class="fas fa-globe"></i>
                                            </a>
                                        </>}
                                    </div>
                                </section>
                            </main>
                        </Grid>
                        <Grid item lg="9" md="8" sm="12" xs="12">
                            <Grid container spacing={2}>

                                {(userBlogs.length > 0)
                                    && userBlogs.map(blog => {
                                        return <Grid item lg="3" md="4" sm="6" xs="6">
                                            <BlogVideoCard
                                                route="read"
                                                item={blog}
                                                image={blog.image}
                                            />
                                        </Grid>
                                    })}

                                {(userVides.length > 0)
                                    && userVides.map(video => {
                                        return <Grid item lg="3" md="4" sm="6" xs="6">
                                            <BlogVideoCard
                                                route="watch"
                                                item={video}
                                                image={video.image}
                                            />
                                        </Grid>
                                    })}

                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </>
            :
            <>
                <div style={{ padding: "20px 12px" }}>
                    <ProfilePageLoader />
                </div>
            </>
        }
    </div >
}
