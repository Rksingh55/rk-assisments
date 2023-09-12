import React from 'react'
import notFoundImage from '../../../assets/pages/404.jpg'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './style.scss'

export default function NotFoundPage() {
    return <main id="not-found-page">
        <Grid container spacing={4}>
            <Grid item lg="6" md="6" sm="12" xs="12">
                <img src={notFoundImage} />
            </Grid>
            <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item lg="6" md="6" sm="12" xs="12">
                <section className='not-found-page-links'>
                    <Link to="/"><p>Explore</p></Link>
                    <Link to="/authorization"><p>Log in</p></Link>
                    <Link to="/about-us"><p>About us</p></Link>
                    <Link to="/sitemap"><p>Sitemap</p></Link>
                    <Link to="/what"><p>Discussion</p></Link>
                    <Link to="/faq"><p>Frequently asked question</p></Link>
                </section>
            </Grid>
        </Grid>
    </main>
}
