import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, Stack, TextField, Button, Box, Switch, useMediaQuery } from '@mui/material'
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook, AiFillInfoCircle } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { RiEditCircleFill, RiWhatsappFill } from 'react-icons/ri'
import { FaGlobeAmericas } from 'react-icons/fa'
import { BsLink45Deg, BsPhoneFill } from 'react-icons/bs'
import { IoPersonCircleOutline, IoLogoPinterest } from 'react-icons/io5'
import { fetchAllUserBookmarkedBlogs, fetchAllUserBookmarkedVideos, fetchAllConnectionsByUserId } from '../../../services/firebase/user'
import { uploadFile, updateUserBasicInfo, updateUserConnections } from '../../../services/functions/user'
import { appAlert, appLoading, appMessage } from '../../../redux/slices/App-State'
import { AppNotification } from '../../../components/ui/notification/notification'
import ParticlesBg from 'particles-bg'
import { useTranslation } from 'react-i18next';
import './style.scss';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const boxGapStyle = (gap = 14, align = 'flex-end') => ({ display: 'flex', alignItems: align, gap: `${gap}px` });


export default function AccountSettings() {

  const matches = useMediaQuery('(min-width:900px)');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(e => e.auth.data);
  const [userformState, setUserFormState] = useState({
    name: userData?.basic?.name || "",
    phoneNo: userData?.basic?.phoneNo || "",
    image: userData?.basic?.image || "",
    about: userData?.basic?.about || ""
  });
  const [formHandler, setFormHandler] = useState(userformState);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [selectedImage, setselectedImage] = useState(null);

  const [socialConnections, setSocialConnections] = useState(null);
  const [socialConnectionHandler, setSocialConnectionHandler] = useState(null);

  const [notificationState, setNotificationState] = useState(null);
  const [notificationStateHandler, setNotificationStateHandler] = useState(null);

  const notificationHandler = (message, type) => {
    if (type === "message") {
      dispatch(appMessage(<AppNotification
        message={message}
        type="message"
      />))
    } else {
      dispatch(appAlert(<AppNotification
        message={message}
        type="alert"
      />))
    }
  }

  useEffect(() => {
    !userData && navigate("/authorization");
    (userData && userData?.blog && userData.blog?.bookmarkedBlogs && (userData.blog?.bookmarkedBlogs.length > 0))
      && fetchAllUserBookmarkedBlogs(userData.blog?.bookmarkedBlogs)
        .then(setBookmarkedBlogs)
        .catch(console.log);

    (userData && userData?.video && userData.video?.bookmarkedVideos && (userData.video?.bookmarkedVideos.length > 0))
      && fetchAllUserBookmarkedVideos(userData.video?.bookmarkedVideos)
        .then(setBookmarkedVideos)
        .catch(console.log);

  }, []);

  const updateSocialAndNotificationHandler = (data1, data2) => {
    setSocialConnections(data1);
    setSocialConnectionHandler(data1);
    setNotificationState(data2);
    setNotificationStateHandler(data2);
  }

  useEffect(() => {

    if (userData) {
      fetchAllConnectionsByUserId(userData?.id)
        .then(res => {

          const tempData = {
            whatsapp: res.whatsapp || "",
            linkdin: res.linkdin || "",
            facebook: res.facebook || "",
            instagram: res.instagram || "",
            pinterest: res.pinterest || "",
            website: res.website || ""
          }

          const tempData2 = {
            email: res?.notification?.email || false,
            sms: res?.notification?.sms || false,
            website: res?.notification?.website || false,
            whatsapp: res?.notification?.whatsapp || false
          }

          updateSocialAndNotificationHandler(tempData, tempData2);
        })
        .catch(err => {

          const tempData = {
            whatsapp: "",
            linkdin: "",
            facebook: "",
            instagram: "",
            pinterest: "",
            website: ""
          }

          const tempData2 = {
            email: false,
            sms: false,
            website: false,
            whatsapp: false
          }

          updateSocialAndNotificationHandler(tempData, tempData2);

        });
    }


  }, [userData])


  const onBlogTitleClick = (id) => {
    navigate(`/read?i=${id}`);
  }

  const onVideoTitleClick = (id) => {
    navigate(`/watch?i=${id}`);
  }

  const onBasicInfoHandler = async () => {
    dispatch(appLoading(true));
    if (userformState.image === formHandler.image) {
      updateUserBasicInfo(userData?.id, {
        ...userData.basic,
        ...formHandler
      })
        .then(() => {
          dispatch(appLoading(false));
          notificationHandler(t("messages.updated"), "message");

          setUserFormState({
            ...userData.basic,
            ...formHandler
          });
          setFormHandler({
            ...userData.basic,
            ...formHandler
          });
        })
        .catch(errorCallBackHandler);
    } else {
      const imageUri = await uploadFile(selectedImage, "image", per => {
        console.log("uploaded : ", per)
      });
      updateUserBasicInfo(userData?.id, {
        ...userData.basic,
        ...formHandler,
        image: imageUri
      })
        .then(() => {
          dispatch(appLoading(false));
          notificationHandler(t("messages.updated"), "message");

          setUserFormState({
            ...userData.basic,
            ...formHandler,
            image: imageUri
          });
          setFormHandler({
            ...userData.basic,
            ...formHandler,
            image: imageUri
          });
        })
        .catch(errorCallBackHandler);
    }
  }

  const onSocialConnHandler = () => {
    dispatch(appLoading(true));
    updateUserConnections(userData?.id, {
      userId: userData?.id,
      ...socialConnectionHandler
    })
      .then(() => {
        dispatch(appLoading(false));
        notificationHandler(t("messages.updated"), "message");
        setSocialConnections(socialConnectionHandler);
        setSocialConnectionHandler(socialConnectionHandler);
      })
      .catch(errorCallBackHandler);
  }

  const onNotificationHandler = () => {
    dispatch(appLoading(true));
    updateUserConnections(userData?.id, {
      userId: userData?.id,
      notification: {
        ...notificationStateHandler
      }
    }).then(() => {
      dispatch(appLoading(false));
      notificationHandler(t("messages.updated"), "message");
      setNotificationState(notificationStateHandler);
      setNotificationStateHandler(notificationStateHandler);
    }).catch(errorCallBackHandler);

  }

  useEffect(() => {
    if (selectedImage) {
      setFormHandler({ ...formHandler, image: URL.createObjectURL(selectedImage) })
    }
  }, [selectedImage]);

  const errorCallBackHandler = (err) => {
    dispatch(appLoading(false));
    notificationHandler(t("messages.err-smth"), "alert");
  }


  const onInputChangeHandler = (key, value) => {
    setSocialConnectionHandler({ ...socialConnectionHandler, [key]: value })
  }

  return <div>
    {userData &&
      <>
        <ParticlesBg type="circle" bg={true} />

        <main id="account-setting-pg">

          <Grid container spacing={!matches ? 2 : 4}>
            <Grid item lg="4" md="6" sm="12" xs="12">
              <section className='acc-sett-sec-1'>
                <div className='acc-sett-sec-img'>

                  <img src={formHandler?.image} />
                  <aside>
                    <Button
                      variant="contained"
                      component="label"
                      variant="inherit"
                      startIcon={<RiEditCircleFill />}
                    >
                      {t("profile.change")}
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                        onChange={e => {
                          if (e.target.files[0]) {
                            if (e.target.files[0].size > 1000000) {
                              return notificationHandler(`${e.target.files[0].name} is too big. Should be less than 1MB`, "alert");
                            }
                            setselectedImage(e.target.files[0]);
                          } else {
                            return notificationHandler(t("messages.nothing-selected"), "alert");
                          }
                        }}
                      />
                    </Button>
                  </aside>
                </div>

                <div className="acc-sett-sec-1__1">
                  <Box sx={boxGapStyle(8)}>
                    <IoPersonCircleOutline size={26} />
                    <TextField
                      value={formHandler?.name}
                      onChange={e => setFormHandler({ ...formHandler, name: e.target.value })}
                      fullWidth size="small" id="input-with-sx" label={t("profile.name")} variant="standard" />
                  </Box>
                  <Box sx={boxGapStyle(8)}>
                    <BsPhoneFill size={26} />
                    <TextField
                      value={formHandler?.phoneNo}
                      onChange={e => setFormHandler({ ...formHandler, phoneNo: e.target.value })}
                      fullWidth size="small" id="input-with-sx" label={t("profile.phon-no")} variant="standard" />
                  </Box>
                  <Box sx={boxGapStyle(8)}>
                    <MdEmail size={26} />
                    <TextField fullWidth size="small" id="input-with-sx" disabled value={userData?.basic?.email} label={t("profile.email")} variant="standard" />
                  </Box>
                  <Box sx={boxGapStyle(8)}>
                    <AiFillInfoCircle size={26} />
                    <TextField
                      // rows={2} maxRows={4}
                      fullWidth
                      value={formHandler?.about}
                      onChange={e => setFormHandler({ ...formHandler, about: e.target.value })}
                      size="small" id="input-with-sx" multiline label={t("profile.abt")} variant="standard" />
                  </Box>
                </div>
                <div className="acc-sett-sec-1__2">
                  <Button
                    disabled={(JSON.stringify(formHandler) === JSON.stringify(userformState))}
                    variant="outlined"
                    onClick={onBasicInfoHandler}
                    color="inherit">{t("create-pages.update")}</Button>
                </div>
              </section>
            </Grid>

            <Grid item lg="8" md="6" sm="12" xs="12">
              <Stack direction="column" spacing={!matches ? 2 : 4}>
                {socialConnectionHandler &&
                  <section className='acc-sett-sec-2'>

                    <div className='acc-sett-sec-2__1'>
                      <h3>{t("profile.soci-conn")}</h3>
                    </div>
                    <div className='acc-sett-sec-2__2'>
                      <Box sx={boxGapStyle(14)}>
                        <RiWhatsappFill size={26} />
                        <TextField
                          value={socialConnectionHandler.whatsapp}
                          onChange={e => { onInputChangeHandler("whatsapp", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.whatsapp")} variant="standard" />
                      </Box>
                      <Box sx={boxGapStyle(14)}>
                        <AiFillLinkedin size={26} />
                        <TextField
                          value={socialConnectionHandler.linkdin}
                          onChange={e => { onInputChangeHandler("linkdin", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.linkdin")} variant="standard" />
                      </Box>
                      <Box sx={boxGapStyle(14)}>
                        <AiFillFacebook size={26} />
                        <TextField
                          value={socialConnectionHandler.facebook}
                          onChange={e => { onInputChangeHandler("facebook", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.fb")} variant="standard" />
                      </Box>
                      <Box sx={boxGapStyle(14)}>
                        <AiFillInstagram size={26} />
                        <TextField
                          value={socialConnectionHandler.instagram}
                          onChange={e => { onInputChangeHandler("instagram", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.insta")} variant="standard" />
                      </Box>
                      <Box sx={boxGapStyle(14)}>
                        <IoLogoPinterest size={26} />
                        <TextField
                          value={socialConnectionHandler.pinterest}
                          onChange={e => { onInputChangeHandler("pinterest", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.pinterest")} variant="standard" />
                      </Box>
                      <Box sx={boxGapStyle(14)}>
                        <FaGlobeAmericas size={22} />
                        <TextField
                          value={socialConnectionHandler.website}
                          onChange={e => { onInputChangeHandler("website", e.target.value) }}
                          fullWidth size="small" id="input-with-sx" label={t("profile.website")} variant="standard" />
                      </Box>
                    </div>
                    <div className="acc-sett-sec-2__3">
                      <Button
                        disabled={(JSON.stringify(socialConnectionHandler) === JSON.stringify(socialConnections))}
                        variant="outlined"
                        onClick={onSocialConnHandler}
                        color="inherit">{t("create-pages.update")}</Button>
                    </div>
                  </section>}


                {notificationStateHandler &&
                  <section className='acc-sett-sec-3'>
                    <div className='acc-sett-sec-3__1'>
                      <h3>{t("profile.notification")}</h3>
                    </div>
                    <div className='acc-sett-sec-3__2'>

                      <Box sx={boxGapStyle(8, "center")}>
                        <Switch {...label}
                          defaultChecked={notificationStateHandler.email}
                          value={notificationStateHandler.email}
                          onChange={e => setNotificationStateHandler({ ...notificationStateHandler, email: e.target.checked })}
                        />
                        <p>{t("profile.email-noti")}</p>
                      </Box>
                      <Box sx={boxGapStyle(8, "center")}>
                        <Switch {...label}
                          defaultChecked={notificationStateHandler.sms}
                          value={notificationStateHandler.sms}
                          onChange={e => setNotificationStateHandler({ ...notificationStateHandler, sms: e.target.checked })}
                        />
                        <p>{t("profile.sms-noti")}</p>
                      </Box>
                      <Box sx={boxGapStyle(8, "center")}>
                        <Switch {...label}
                          defaultChecked={notificationStateHandler.website}
                          value={notificationStateHandler.website}
                          onChange={e => setNotificationStateHandler({ ...notificationStateHandler, website: e.target.checked })}
                        />
                        <p>{t("profile.web-noti")}</p>
                      </Box>
                      <Box sx={boxGapStyle(8, "center")}>
                        <Switch {...label}
                          defaultChecked={notificationStateHandler.whatsapp}
                          value={notificationStateHandler.whatsapp}
                          onChange={e => setNotificationStateHandler({ ...notificationStateHandler, whatsapp: e.target.checked })}
                        />
                        <p>{t("profile.whats-noti")}</p>
                      </Box>
                    </div>
                    <div className="acc-sett-sec-3__3">
                      <Button
                        disabled={(JSON.stringify(notificationState) === JSON.stringify(notificationStateHandler))}
                        variant="outlined"
                        onClick={onNotificationHandler}
                        color="inherit">{t("create-pages.update")}</Button>
                    </div>

                  </section>}
              </Stack>
            </Grid>

            <Grid item lg="6" md="6" sm="12" xs="12">
              <section className='acc-sett-sec-4'>

                <div className='acc-sett-sec-4__1'>
                  <h3>{t("profile.bookmark-stories")}</h3>
                </div>

                <div className='acc-sett-sec-4__2'>
                  {(bookmarkedBlogs.length > 0) ?
                    <div className="acc-sett-sec-4__3">
                      {bookmarkedBlogs.map(blog => <p
                        onClick={() => { onBlogTitleClick(blog.id) }}
                      >{blog.title} <span><BsLink45Deg /></span></p>)}
                    </div> :
                    <div className="acc-sett-sec-4__not-found">
                      <h3>{t('profile.no-bookmark-fnd')}</h3>
                    </div>}
                </div>

              </section>
            </Grid>

            <Grid item lg="6" md="6" sm="12" xs="12">
              <section className='acc-sett-sec-4'>

                <div className='acc-sett-sec-4__1'>
                  <h3>{t("profile.bookmark-record")}</h3>
                </div>

                <div className='acc-sett-sec-4__2'>
                  {(bookmarkedVideos.length > 0) ?
                    <div className="acc-sett-sec-4__3">
                      {bookmarkedVideos.map(blog => <p
                        onClick={() => { onVideoTitleClick(blog.id) }}
                      >{blog.title} <span><BsLink45Deg /></span></p>)}
                    </div> :
                    <div className="acc-sett-sec-4__not-found">
                      <h3>{t('profile.no-bookmark-fnd')}</h3>
                    </div>}
                </div>

              </section>
            </Grid>
          </Grid>

        </main>
      </>
    }
  </div >
}
