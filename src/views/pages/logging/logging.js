import React, { useEffect, useState } from 'react';
import './style.scss'
import BGImage from '../../../assets/backgrounds/background-loggin2.jpg'
import firebase, { AUTH } from '../../../services/firebase/firebaseConfig';
import { SocialLoginHandler } from '../../../services/firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { LOGGIN_LIST } from '../../../DB';
import { saveUserID } from '../../../redux/slices/Auth'
import { useNavigate } from 'react-router-dom'
import { appLoading, appMessage, appAlert } from '../../../redux/slices/App-State'
import { AppNotification } from '../../../components/ui/notification/notification'
import { useTranslation } from 'react-i18next';

export default function Logging() {

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(e => e.auth.data)


    const setTokenHandler = (user) => {
        SocialLoginHandler(user).then(e => {
            dispatch(saveUserID({ id: e }))
        }).catch(e => {
            // setLoading(false)
            //  setError({ text: JSON.stringify("Error something went wrong"), visible: true, isLoading: false })
        })
    }

    const loginWithGoogle = () => {
        dispatch(appLoading(true))
        let provider = new firebase.auth.GoogleAuthProvider();
        AUTH.signInWithPopup(provider)
            .then(function (result) {
                let user = {
                    email: result.user.email,
                    name: result.user.displayName,
                    image: result.user.photoURL
                }
                setTokenHandler(user)
                dispatch(appLoading(false))
                dispatch(appMessage(<AppNotification
                    message={t("messages.logg-per")}
                    type="message"
                />))

            })
            .catch(function (error) {
                dispatch(appAlert(<AppNotification
                    message={t("messages.err-smth")}
                    type="alert"
                />))
                dispatch(appLoading(false))
            })
    }


    useEffect(() => {
        userData && navigate("/", { replace: true })
    }, [userData])

    return <div id='loggin-page'>
        <img src={BGImage} alt='background img' />

        <main>
            <h1>{t("titles.logg-title")}</h1>
            <section>
                {LOGGIN_LIST(i18n.language)
                    .map(i => <div>
                        <span><i class="far fa-dot-circle"></i></span>
                        <p>{i}</p>
                    </div>)}
            </section>
            <div id="loggin-page-button">
                <div onClick={loginWithGoogle}>
                    <span><i class="fab fa-google-plus"></i></span>
                    <p>{t("titles.con-google")}</p>
                </div>
            </div>
        </main>
    </div>
}
