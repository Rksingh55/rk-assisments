import firebase, { FIRESTORE, STORAGE } from '../firebase/firebaseConfig'
import shortid from 'shortid' 

export const getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        try {

            FIRESTORE.collection("USERS")
                .doc(id)
                .get()
                .then(document => {
                    resolve(document.data());
                }).catch(e => {
                    console.log("error : ", e)
                })

        } catch (error) {
            reject(error)
        }
    });
}


export const uploadFile = (file, fileType, percentageCB) => {
    return new Promise((resolve, reject) => {
        const ref = STORAGE.ref(`/${fileType === "image" ? "thumbnails" : "videos"}/${shortid.generate()}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", function (snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            percentageCB(percent)
        }, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    resolve(url)
                })
                .catch(e => {
                    console.log("error : ", e)
                    reject(e)
                })
        });
    })
}



export const followUserFunc = (toFollowUser, userId) => {
    return new Promise(async (resolve, reject) => {
        await FIRESTORE.collection("USERS").doc(toFollowUser).update({
            "connections": firebase.firestore.FieldValue.arrayUnion(userId)
        });
        FIRESTORE.collection("USERS").doc(userId).update({
            "connected": firebase.firestore.FieldValue.arrayUnion(toFollowUser)
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}

export const incrementShareHandler = async (contentID, type) => {
    await FIRESTORE.collection(type).doc(contentID).update({
        "shares": firebase.firestore.FieldValue.increment(1)
    })
}


// blogs

export const saveBlogLike = (blogId, userId) => {
    return new Promise(async (resolve, reject) => {
        await FIRESTORE.collection("USERS").doc(userId).update({
            "blog.likedBlogs": firebase.firestore.FieldValue.arrayUnion(blogId)
        })
        FIRESTORE.collection("BLOGS").doc(blogId).update({
            claps: firebase.firestore.FieldValue.increment(1)
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}


export const bookmarkSaveFunc = (blogId, userId) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("USERS").doc(userId).update({
            "blog.bookmarkedBlogs": firebase.firestore.FieldValue.arrayUnion(blogId)
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}








// video

export const saveVideoLike = (videoID, userId) => {
    return new Promise(async (resolve, reject) => {
        await FIRESTORE.collection("USERS").doc(userId).update({
            "video.likedVideos": firebase.firestore.FieldValue.arrayUnion(videoID)
        })
        FIRESTORE.collection("VIDEOS").doc(videoID).update({
            claps: firebase.firestore.FieldValue.increment(1)
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}


export const videoBookmarkSaveFunc = (videoId, userId) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("USERS").doc(userId).update({
            "video.bookmarkedVideos": firebase.firestore.FieldValue.arrayUnion(videoId)
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}




export const uploadVideo = (videoDetail) => {
    return new Promise((resolve, reject) => {
        const ID = shortid.generate()
        FIRESTORE.collection("VIDEOS")
            .doc(ID).set({
                ...videoDetail,
                id: ID,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
    })
}









// commments 
export const saveCommentHandler = (blogOrVideoId, user, commentText, commentFor) => {
    return new Promise(async (resolve, reject) => {
        const ID = shortid.generate();
        await FIRESTORE.collection(commentFor).doc(blogOrVideoId).update({
            "comments": firebase.firestore.FieldValue.arrayUnion(ID)
        });
        FIRESTORE.collection("COMMENTS").doc(ID).set({
            id: ID,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            by: user,
            comment: commentText
        })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}


export const getCommentById = (commentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const replyRef = await FIRESTORE.collection(`COMMENTS/${commentId}/replies`).get()
            const commentSnapshot = await FIRESTORE.collection("COMMENTS").where("id", "==", commentId).get();
            const comment = commentSnapshot.docs[0].data();
            if (replyRef.docs.length) {
                return resolve({
                    ...comment,
                    replies: replyRef.docs.map(item => item.data())
                });
            }
            resolve(comment);

        } catch (error) {
            console.log("error : ", error)
            reject(error)
        }
    })
}



export const saveCommentLike = (commentId) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE
            .collection("COMMENTS")
            .doc(commentId)
            .update({
                "claps": firebase.firestore.FieldValue.increment(1)
            })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}


export const replyToComment = (commentId, user, reply) => {
    const ID = shortid.generate()
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("COMMENTS")
            .doc(commentId)
            .collection("replies")
            .doc(ID)
            .set({
                id: ID,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                by: user,
                claps: 0,
                reply: reply
            })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}














// account setting 

export const updateUserBasicInfo = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("USERS")
            .doc(userId).update({
                "basic": data
            })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject("error : ", e);
            })
    })
}

export const updateUserConnections = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        FIRESTORE.collection("CONNECTIONS")
            .doc(userId)
            .set(data, { merge: true })
            .then(() => {
                resolve("saved");
            })
            .catch((e) => {
                reject(e);
            })
    })
}