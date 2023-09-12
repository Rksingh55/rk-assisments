import React, { useState, useEffect } from 'react'
import { getLatestBlogs } from '../../../../services/functions/blogs';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'

export default function Blogs() {
    const navigate = useNavigate()
    const [blogsList, setBlogsList] = useState([]);
    useEffect(() => {
        getLatestBlogs(10, null)
            .then(res => {
                setBlogsList(res);
            })
            .catch(er => {
                console.log("error : ", er)
            })
    }, []);

    const AddmoreBlogsToList = () => {
        getLatestBlogs(10, blogsList[blogsList.length - 1].createdAt)
            .then(res => {
                setBlogsList([...blogsList, ...res]);
            })
            .catch(er => {
                console.log("error : ", er)
            })
    }
    return <div style={{ width: "70vw" }}>
        {(blogsList.length > 0)
            && blogsList.map((val, index) => {
                return <Grid container>
                    <Grid item lg="8" sm="12">
                        <h4>{index+1}.) {val.title}</h4>
                    </Grid>
                    <Grid item lg="4" sm="12">
                        <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
                            <a target="_blank" href={`/read?i=${val.id}`}>Read</a>
                            <p onClick={() => {
                                navigate("/create-blog", {
                                    state: {
                                        id: val.id,
                                        html: val.blog,
                                        title: val.title
                                    }
                                })
                            }}>Edit</p>
                        </div>
                    </Grid>
                </Grid>
            })}
        <button onClick={AddmoreBlogsToList}>Fetch more</button>
    </div>
}
