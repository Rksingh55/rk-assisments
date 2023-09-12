import { useNavigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from "react"
import { __CONTENT_TYPES, __MAIN_CATEGORIES } from "../../../../DB";
import { Modal, Drawer, Box, CircularProgress, LinearProgress, Tooltip, Stack, Button, InputLabel, OutlinedInput, Grid, TextField, FormControl, Select, MenuItem, Checkbox, ListItemText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile, uploadVideo } from '../../../../services/functions/user'
import { appLoading, appMessage, appAlert } from "../../../../redux/slices/App-State";
import { AppNotification } from '../../../../components/ui/notification/notification'
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next';
import './style.scss'

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};






export default function UploadVideoPage() {

    const authData = useSelector(e => e.auth.data);
    const navigate = useNavigate()
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch()
    const [videoDetails, setVideoDetails] = useState({
        title: "",
        description: ""
    })
    useEffect(() => {
        !authData && navigate("/authorization", { replace: true });
    }, [])

    const [contentType, setContentType] = useState([]);
    const [contentTopic, setContentTopic] = useState([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [thumbnailUploadedPercentage, setThumbnailUploadedPercentage] = useState(0);
    const [videoUploadedPercentage, setVideoUploadedPercentage] = useState(0);

    const handleChangeForType = (event) => {
        const {
            target: { value },
        } = event;
        setContentType(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeForTopic = (event) => {
        const {
            target: { value },
        } = event;
        setContentTopic(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const formHandler = (key, value) => {
        setVideoDetails({
            ...videoDetails,
            [key]: value
        })
    }

    const uploadVideoFunc = async () => {
        try {
            setLoading(true);
            const imgUri = await uploadFile(selectedThumbnail, "image", (e) => {
                setThumbnailUploadedPercentage(e);
            });
            setThumbnailUploadedPercentage(100);
            const videoUri = await uploadFile(selectedVideo, "video", (e) => {
                setVideoUploadedPercentage(e);
            });
            setVideoUploadedPercentage(100);
            const tempData = {
                by: authData?.id,
                video: videoUri,
                image: imgUri,
                title: videoDetails.title,
                description: videoDetails.description,
                type: contentType,
                topics: contentTopic,
                language: i18n.language,
                payed: authData.subscription ? !(authData.subscription.toDate() <= new Date()) : false
            }
            await uploadVideo(tempData);
            setLoading(false);
            navigate("/record-analytics", { replace: true });

        } catch (error) {
            setLoading(false);
            dispatch(appAlert(<AppNotification
                message={t("messages.err-smth")}
                type="alert"
            />))
        }
    }





    return <div id="create-blog">
        <Modal
            open={loading}
        >
            <main id='upload-video-modal-loader'>
                <h3>{t("create-pages.thntrf")} : {thumbnailUploadedPercentage}%</h3>
                <h3>{t("create-pages.vidtrf")} : {videoUploadedPercentage}%</h3>
                <h2>{t("create-pages.dataUp")}</h2>
                <span>
                    <CircularProgress color='inherit' />
                </span>
                <div>
                    <LinearProgress color='inherit' style={{ height: 40 }} />
                </div>

            </main>
        </Modal>
        {authData && <>
            <main id='video-upload-page'>
                <Grid container rowGap={2}>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <h2>{t("create-pages.title-text")}</h2>
                    </Grid>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <TextField
                            id="outlined-textarea"
                            label={t("create-pages.ent-vid-title")}
                            placeholder={t("create-pages.ent-vid-pla")}
                            value={videoDetails.title}
                            fullWidth
                            size="small"
                            error={(videoDetails.title?.length < 20)}
                            helperText={(videoDetails.title?.length < 20) ? `${t("create-pages.ent-vid-pla")} ${videoDetails.title?.length}/20.` : ""}
                            onChange={e => formHandler("title", e.target.value)}
                        />
                    </Grid>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <TextField
                            id="outlined-textarea"
                            label={t("create-pages.ent-vid-desc")}
                            placeholder="..........."
                            fullWidth
                            value={videoDetails.description}
                            size="small"
                            onChange={e => formHandler("description", e.target.value)}
                            multiline
                            error={(videoDetails.description?.length < 40)}
                            helperText={(videoDetails.description?.length < 40) ? `${t("create-pages.ent-vid-pla")} ${videoDetails.description?.length}/40.` : ""}
                        />
                    </Grid>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel
                                id="outlined-textarea"
                                size="small"

                            >{t("create-pages.content-type")}</InputLabel>
                            <Select
                                size="small"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={contentType}
                                onChange={handleChangeForType}
                                input={<OutlinedInput label={t("create-pages.content-type")} />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                error={!(contentType[0])}
                            >
                                {__CONTENT_TYPES.map((item) => (
                                    <MenuItem key={item.title} value={item.title}>
                                        <Checkbox checked={contentType.indexOf(item.title) > -1} />
                                        <ListItemText primary={t(`content-types.${item.title}`)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel
                                id="outlined-textarea"
                                size="small"
                            >{t("create-pages.content-topic")}</InputLabel>
                            <Select
                                size="small"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={contentTopic}
                                onChange={handleChangeForTopic}
                                input={<OutlinedInput label={t("create-pages.content-topic")} />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                error={contentTopic[0] ? false : true}
                            >
                                {__MAIN_CATEGORIES.map((item) => (
                                    <MenuItem key={item.title} value={item.title}>
                                        <Checkbox checked={contentTopic.indexOf(item.title) > -1} />
                                        <ListItemText primary={t(`main-categories.${item.title}`)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <Stack
                            direction={{ md: 'column', lg: 'row', sm: 'column', xs: "column" }}
                            spacing={2}
                            gap={0}
                            alignItems="baseline"
                        >
                            <Tooltip
                                title={<p className='create-video-pg-btn-tool-tip'>{t(`messages.img-size`)}</p>}
                                arrow >
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<IoImageOutline />}
                                >
                                    {selectedThumbnail ?
                                        t(`create-pages.selected`) :
                                        t(`create-pages.select`)}
                                    {` ${t("create-pages.thm-nail")}`}
                                    <input
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        hidden
                                        onChange={e => {
                                            if (e.target.files[0]) {
                                                if (e.target.files[0].size > 1000000) {
                                                    return dispatch(appAlert(<AppNotification
                                                        message={`${e.target.files[0].name} ${t("messages.too-big")}`}
                                                        type="alert"
                                                    />));
                                                }
                                                setSelectedThumbnail(e.target.files[0])
                                            } else {
                                                return dispatch(appAlert(<AppNotification
                                                    message={t("messages.nothing-selected")}
                                                    type="alert"
                                                />));
                                            }
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                            {selectedThumbnail ?
                                <div>
                                    <h4>{selectedThumbnail.name}</h4>
                                </div> :
                                <div>
                                    <h4>{t("create-pages.thm-not-found")}</h4>
                                </div>}
                        </Stack>




                    </Grid>

                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <Stack
                            direction={{ md: 'column', lg: 'row', sm: 'column', xs: "column" }}
                            spacing={2}
                            gap={0}
                            alignItems="baseline"
                        >
                            <Tooltip title={<p className='create-video-pg-btn-tool-tip'>{t("create-pages.vid-1gb")}</p>} arrow >
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<IoVideocamOutline />}
                                >
                                    {selectedVideo ?
                                        t(`create-pages.selected`) :
                                        t(`create-pages.select`)}
                                    {` ${t("create-pages.video")}`}
                                    <input
                                        accept='video/mp4,video/x-m4v,video/*'
                                        type="file"
                                        hidden
                                        onChange={e => {
                                            if (e.target.files[0]) {
                                                if (e.target.files[0].size > 100000000) {
                                                    return dispatch(appAlert(<AppNotification
                                                        message={`${e.target.files[0].name} ${t("messages.vid-too-big")}`}
                                                        type="alert"
                                                    />));
                                                }
                                                setSelectedVideo(e.target.files[0])
                                            } else {
                                                return dispatch(appAlert(<AppNotification
                                                    message={t("messages.nothing-selected")}
                                                    type="alert"
                                                />));
                                            }
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                            {selectedVideo ?
                                <div>
                                    <h4>{selectedVideo.name}</h4>
                                </div> :
                                <div>
                                    <h4>{t("create-pages.vid-not-found")}</h4>
                                </div>
                            }
                        </Stack>
                    </Grid>

                    <Grid item lg="12" md="12" sm="12" xs="12">
                        <Stack
                            spacing={2}
                            alignItems="flex-end"
                        >
                            <Button
                                onClick={uploadVideoFunc}
                                disabled={
                                    !(contentTopic[0] &&
                                        contentType[0] &&
                                        selectedVideo &&
                                        selectedThumbnail &&
                                        (videoDetails.title?.length > 19) &&
                                        (videoDetails.description?.length > 39))
                                }
                                variant="outlined"
                            >{t("create-pages.upload")}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </main>
        </>
        }

    </div >
}
