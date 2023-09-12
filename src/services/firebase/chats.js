import firebase, { FIRESTORE, STORAGE } from './firebaseConfig' 
import shortid from 'shortid'
import Axios from 'axios'
import { setCookie, assistMatesUserCookieKey, __PRIVATE_KEY } from '../../Helper_function';
import CryptoJS from 'crypto-js'

import { getUserNameAndImageByID } from './user';
import DummyImageUserPng from '../../assets/png/dummy-user.png'

import { __CHATS, __MESSAGES_DB } from '../../DB'

// id: "1",
// avatar: 'https://facebook.github.io/react/img/logo.svg',
// alt: 'Reactjs',
// title: 'Facebook',
// subtitle: 'What are you doing?',
// date: new Date(),
// unread: 1,


/*
  resolve(await Promise.all(e?.response?.results.map(async (data) => {
                return data?.urls.regular
            })));
*/
export const getChatListByID = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const chat = __CHATS.find(e => e.id == id);
            if (chat) {
                const __LIST = await Promise.all(chat?.list.map(async (data) => {
                    const userInfo = await getUserNameAndImageByID(data?.userID);
                    return {
                        id: data?.userID,
                        avatar: userInfo?.image || DummyImageUserPng,
                        alt: userInfo?.name || "image",
                        title: userInfo?.name,
                        subtitle: data?.lastMessage?.text || "",
                        date: data?.lastMessage?.createdAt,
                        unread: data?.lastMessage?.isSeen && 1 || 0,
                        chatListId: data?.chatID
                    }
                }))
                resolve(__LIST);
            }

        } catch (error) {
            reject({ error })
        }
    })
}



export const getMessageByChatID = (chatId, userID) => {
    return new Promise((resolve, reject) => {
        try {
            const messagesList = __MESSAGES_DB.find(e => e.id == chatId).messages//__MESSAGES_DB[0].messages;

            if (messagesList) {
                const __LIST = Promise.all(messagesList.map(async (message) => {
                    return {
                        position: (message?.by == userID) ? "right" : "left",
                        type: "text",
                        text: message?.text,
                        date: message?.date
                    }
                }))
                resolve(__LIST);
            }
        } catch (error) {
            reject({ error })
        }
    })
}