import { FIRESTORE } from './firebaseConfig'
import shortid from 'shortid' 
import { setCookie, assistMatesUserCookieKey, __PRIVATE_KEY } from '../../Helper_function';
import CryptoJS from 'crypto-js'


const createToken = (id) => {
    var token = CryptoJS.AES.encrypt(JSON.stringify({ id }), __PRIVATE_KEY).toString();
    return token;
}


export const SocialLoginHandler = ({ email, name, image }) => {
    return new Promise(async (resolve, reject) => {
        const testAccount = (await FIRESTORE.collection("USERS").where("basic.email", "==", email).get()).docs;

        if (testAccount && testAccount.length) {
            const token = createToken(testAccount[0].data().id)
            setCookie(assistMatesUserCookieKey, token, 30)
            resolve(testAccount[0].data().id)  // resolve id
        } else {
            // create account 
            const ID = shortid.generate();
            FIRESTORE.collection(`USERS`).doc(ID).set({
                id: ID,
                basic: {
                    name,
                    email,
                    image
                }
            }).then(() => {
                const token = createToken(ID)
                setCookie(assistMatesUserCookieKey, token, 30)
                resolve(ID)
            }).catch(e => {
                reject(e)
            })

        }
    })

}



export const updateUserHandler = (data) => {
    return new Promise((resolve, reject) => {

        // DATABASE.ref(`USERS/${data.id}`).update({
        //     ...data
        // })
        //     .then(() => {
        //         resolve("done")
        //     })
        //     .catch((e) => {
        //         reject(e)
        //     })
    })

}