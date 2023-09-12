import firebase, { FIRESTORE, STORAGE } from './firebaseConfig'
import shortid from 'shortid'

export const saveForumQuestion = (question, user) => {
    return new Promise((resolve, reject) => {
        const ID = shortid.generate();
        FIRESTORE.collection("FORUM").doc(ID).set({
            id: ID,
            by: user?.id,
            ...question,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            resolve(true)
        }).catch(() => {
            reject(false)
        })
    })
}







export const savePostReply = (postID, reply, user) => {
    return new Promise(async (resolve, reject) => {
        const ID = shortid.generate();
        await FIRESTORE.collection("FORUM")
            .doc(postID).update({
                replies: firebase.firestore.FieldValue.arrayUnion(ID)
            })

        FIRESTORE.collection("FORUM-REPLIES")
            .doc(ID).set({
                id: ID,
                by: {
                    id: user?.id,
                    name: user?.name
                },
                reply,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}

export const saveLikeToPost = (postID, userID) => {
    return new Promise(async (resolve, reject) => {
        await FIRESTORE
            .collection("USERS")
            .doc(userID)
            .update({
                "forum.likes": firebase.firestore.FieldValue.arrayUnion(postID)
            });


        FIRESTORE
            .collection("FORUM")
            .doc(postID)
            .update({
                claps: firebase.firestore.FieldValue.increment(1)
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}


export const saveLikePostReplyLevelTwo = (replyID) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("FORUM-REPLIES")
            .doc(replyID)
            .update({
                claps: firebase.firestore.FieldValue.increment(1)
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}


export const saveReplyToPostReply = (id, reply, user) => {
    const ID = shortid.generate();

    return new Promise((resolve, reject) => {
        FIRESTORE
            .collection("FORUM-REPLIES")
            .doc(id)
            .collection("subReply")
            .doc(ID)
            .set({
                id: ID,
                by: {
                    id: user?.id,
                    name: user?.name
                },
                reply,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}
 


export const saveSharedPost = (postID) => {
    return new Promise(async (resolve, reject) => {
        await FIRESTORE
            .collection("FORUM")
            .doc(postID)
            .update({
                shares: firebase.firestore.FieldValue.increment(1)
            })
    })
}



export const savePostToUserBookmarks = (postID, userID) => {
    return new Promise((resolve, reject) => {
        FIRESTORE
            .collection("USERS")
            .doc(userID)
            .update({
                "forum.bookmarks": firebase.firestore.FieldValue.arrayUnion(postID)
            })
            .then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}