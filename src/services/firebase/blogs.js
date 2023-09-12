import firebase, { FIRESTORE, STORAGE } from './firebaseConfig'
import shortid from 'shortid'
import Axios from 'axios'
import { setCookie, assistMatesUserCookieKey, __PRIVATE_KEY } from '../../Helper_function';
import CryptoJS from 'crypto-js'



export const publishBlogToDB = (blog) => {
    return new Promise((resolve, reject) => {
        const ID = shortid.generate()
        FIRESTORE.collection("BLOGS").doc(ID).set({
            ...blog,
            id: ID,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            resolve(true)
        }).catch(() => {
            reject(false)
        })
    });
}


export const saveBlogToDB = (userID, HTML) => {
    return new Promise((resolve, reject) => {
        FIRESTORE.collection("USERS")
            .doc(userID)
            .update({
                "blog.last_saved": HTML
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    });
}


export const uploadIMG = (file) => {
    return new Promise((resolve, reject) => {
        const ref = STORAGE.ref(`/blogs/${shortid.generate()}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    resolve(url)
                })
                .catch(e => {
                    console.log("error : ", e)
                    reject(null)
                })
        });
    })

}


export const updateBlogToDB = (ID, blog) => {
    return new Promise((resolve, reject) => {
        FIRESTORE.collection("BLOGS")
            .doc(ID)
            .update({
                ...blog
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    });
}