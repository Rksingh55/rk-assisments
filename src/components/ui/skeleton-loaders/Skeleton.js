import React from 'react'
import { Grid, Stack, Skeleton } from '@mui/material';


export const BlogPageLoader = () => {
    return <Grid container spacing={2}>
        <Grid item lg="12" md="12" sm="12" xs="12">
            <Stack flexDirection="column"
                justifyContent="space-between"
                spacing={1}>
                {[50, 50]
                    .map(i => <Skeleton
                        variant="rectangular"
                        height={i}
                    />)}
            </Stack>
        </Grid>
        {[1, 2, 3, 4, 5, 6].map(i =>
            <Grid item lg="2" md="4" sm="6" xs="6">
                <Skeleton
                    variant="rectangular"
                    height={90}
                />
            </Grid>)}
        {[1, 2].map(i =>
            <Grid item lg="6" md="12" sm="12" xs="12">
                <Skeleton
                    variant="rectangular"
                    height={200}
                />
            </Grid>)}

        <Grid item lg="12" md="12" sm="12" xs="12">
            <Skeleton
                variant="rectangular"
                height={200}
            />
        </Grid>


    </Grid>
}


export const BlogParamPageLoader = () => {
    return <Stack direction="column" spacing={2}>
        <Skeleton variant="rectangular" height={50} />
        <Stack direction="row" spacing={2}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="rectangular" height={30} width={120} />
        </Stack>
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
    </Stack>
}

export const BlogCarouselLoader = ({ Nos, height }) => {
    return <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, Nos)
            .map((val) =>
                <Grid item xs={(12 / Nos)}>
                    <Skeleton
                        variant="rectangular"
                        height={height}
                    />
                </Grid>)}
    </Grid>
}

export const VideoParamPageLoader = () => {
    return <Stack direction="column" spacing={2}>
        <Skeleton variant="rectangular" height={500} />
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}>
            <Stack direction="row" spacing={2}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="rectangular" height={30} width={120} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width={30} height={30} />
                <Skeleton variant="rectangular" width={30} height={30} />
                <Skeleton variant="rectangular" height={30} width={120} />
            </Stack>
        </Stack>

    </Stack>
}

export const ForumPageCenterLoader = () => {
    return <Stack spacing={5}>
        {[1, 2, 3]
            .map(i => <Stack spacing={1}>
                <Stack
                    justifyContent="space-between"
                    flexDirection="row">
                    <Stack
                        gap={2}
                        flexDirection="row">
                        <Skeleton
                            variant="circular"
                            height={40}
                            width={40}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={30}
                            width={70}
                        />
                    </Stack>
                    <Skeleton
                        variant="rectangular"
                        height={30}
                        width={80}
                    />
                </Stack>
                <Skeleton
                    variant="rectangular"
                    height={40}
                />
                <Skeleton
                    variant="rectangular"
                    height={40}
                />
                <Skeleton
                    variant="rectangular"
                    height={240}
                />
            </Stack>)}
    </Stack>
}


export const ForumPageRightLoader = () => {
    return <Stack spacing={1}>
        {[10, 10, 20, 40, 40, 40, 40, 40, 40, 40, 40, 40]
            .map(i => <Skeleton
                variant="rectangular"
                height={i}
            />)}
    </Stack>
}


export const ForumPostPageLoader = () => {
    return <Grid container spacing={8}>
        <Grid item lg="2" md="12" sm="12">
            <Stack flexDirection="column" spacing={1}>
                {[180, 20, 30, 10, 10].map(i => <Skeleton
                    variant="rectangular"
                    height={i}
                />)}
            </Stack>
        </Grid>
        <Grid item lg="6" md="12" sm="12">
            <Stack flexDirection="column" spacing={1}>
                {[10, 10, 30, 600]
                    .map(i => <Skeleton
                        variant="rectangular"
                        height={i}
                    />)}
            </Stack>
        </Grid>
        <Grid item lg="4" md="12" sm="12">
            <Stack flexDirection="column" spacing={1}>
                {[50, 50, 20, 20, 20, 20, 20, 20, 20, 20]
                    .map(i => <Skeleton
                        variant="rectangular"
                        height={i}
                    />)}
            </Stack>
        </Grid>
    </Grid>
}

export const ProfilePageLoader = () => {

    return <Grid container spacing={2}>
        <Grid item lg="6" md="12" sm="12">
            <Skeleton variant="rectangular" height={600} />
        </Grid>
        <Grid item lg="6" md="12" sm="12">
            <Grid container spacing={2}>
                <Grid item lg="12" md="12" sm="12">
                    <Skeleton variant="rectangular" height={290} />
                </Grid>
                <Grid item lg="12" md="12" sm="12">
                    <Skeleton variant="rectangular" height={290} />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}



export const MasterPageLoader = () => {

    return <Grid container spacing={2}>
        <Grid item lg="12" md="12" sm="12">
            <Skeleton variant="rectangular" height={100} />
        </Grid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i =>
            <Grid item lg="3" md="4" sm="6" xs="6">
                <Skeleton variant="rectangular" height={290} />
            </Grid>)}

    </Grid>
}