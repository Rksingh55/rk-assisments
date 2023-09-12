import React, { useState, useEffect } from 'react'
import { Modal, CircularProgress, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'

import { appMessage } from '../../../redux/slices/App-State';
import { AppNotification } from '../../../components/ui/notification/notification'
import { getGifsByGiphy, getImagesByQueryPexels, getImagesByQuerySplash, getGifsByTenor, getImagesByPixabay } from '../../../services/apis/images';
import "./style.scss"



export default function ImagePickerModal({
    isOpen,
    closeImgPicker
}) {

    const { t } = useTranslation()
    const dispatch = useDispatch();
    const [searchingImage, setSearchingImage] = useState({
        text: "Excited",
        list: [],
        loading: false
    });

    const FetchImageList = async (text) => {
        try {
            const [resOne, resTwo, resThree, resFour, resFive] = await Promise.all([
                getImagesByQuerySplash(text, 4),
                getImagesByQueryPexels(text, 4),
                getImagesByPixabay(text, 4),
                getGifsByTenor(text, 10),
                getGifsByGiphy(text, 15)]);
            setSearchingImage({ ...searchingImage, list: [...resOne, ...resTwo, ...resThree, ...resFour, ...resFive], loading: false });
        } catch (error) {
            console.log("error : ", error);
            setSearchingImage({ ...searchingImage, loading: false });
        }
    }

    useEffect(() => {
        FetchImageList(searchingImage.text);
    }, [])

    return <Modal
        open={isOpen}
        onClose={() => { closeImgPicker() }}
    >
        <main id="create-blog--gallery">
            <main>
                <div className="create-blog--gallery--1">
                    <input onKeyUp={e => {
                        if (searchingImage.text.length > 3 && e.keyCode === 13) {
                            setSearchingImage({ ...searchingImage, loading: true, list: [] });
                            FetchImageList(searchingImage.text);
                        }
                    }}
                        value={searchingImage.text}
                        onChange={e => { setSearchingImage({ ...searchingImage, text: e.target.value }) }}
                        placeholder="Fire"
                    />
                    <Button
                        endIcon={<IoIosSearch />}
                        onClick={() => {
                            if (searchingImage.text.length > 3) {
                                FetchImageList(searchingImage.text);
                                setSearchingImage({ ...searchingImage, loading: true, list: [] });
                            }
                        }}
                        variant="outlined"
                        size="small"
                    >{t("header.search")}</Button>
                    <Button
                        size="small"
                        endIcon={<IoCloseOutline />}
                        onClick={() => { closeImgPicker() }}
                        variant="outlined">{t("create-pages.close")}</Button>
                </div>
                <section className="create-blog--gallery--2">
                    <section className="create-blog--gallery--2-1">
                        <Grid container>
                            {(searchingImage.list
                                && searchingImage.list.length)
                                && searchingImage.list.map((url, index) => {
                                    return <Grid item lg="3" md="4" sm="4" xs="6">
                                        <div onClick={() => {
                                            navigator.clipboard.writeText(url);
                                            dispatch(appMessage(<AppNotification
                                                message={t("create-pages.copied")}
                                                type="message"
                                            />))
                                        }}>
                                            <img src={url} />
                                            <aside>{t("create-pages.copy-url")}</aside>
                                        </div>
                                    </Grid>
                                })}
                        </Grid>
                    </section>

                    {searchingImage.loading &&
                        <div className="create-blog--gallery--loader">
                            <span> <CircularProgress /></span>
                        </div>}
                </section>
            </main>
        </main>
    </Modal >
}