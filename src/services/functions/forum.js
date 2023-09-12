import firebase, { FIRESTORE } from '../firebase/firebaseConfig'



export const getLatestPost = (count = 4, startAfter = null, language = "EN", tag = null) => {
    return new Promise((resolve, reject) => {
        try {
            var DBref = null;
            if (tag) {
                DBref = FIRESTORE.collection("FORUM")
                    .orderBy("createdAt", "desc")
                    .where("language", "==", language)
                    .where("topics", "array-contains", tag)
                    .limit(count);
            } else {
                DBref = FIRESTORE.collection("FORUM")
                    .orderBy("createdAt", "desc")
                    .where("language", "==", language)
                    .limit(count);
            }

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()));
                    }).catch(e => {
                        console.log("error : ", e)
                    })
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()));
                    }).catch(e => {
                        console.log("error : ", e)
                    })
            }
        } catch (error) {
            reject(error)
        }
    });

}



export const getPostOfSpecificUser = (count = 4, startAfter = null, language = "EN", userId) => {
    return new Promise((resolve, reject) => {
        try {
            var DBref = FIRESTORE.collection("FORUM")
                .orderBy("createdAt", "desc")
                .where("language", "==", language)
                .where("by", "==", userId)
                .limit(count);

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()));
                    }).catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()));
                    }).catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });

}

export const getMostLikedPost = (count = 10, language = "EN") => {
    return new Promise((resolve, reject) => {
        FIRESTORE.collection("FORUM")
            .orderBy("claps", "desc")
            .where("language", "==", language)
            .limit(count)
            .get()
            .then(document => {
                resolve(document.docs.map(item => item.data()));
            })
            .catch(reject)
    })
}

export const getMostLikedPostOnTagBasis = (count = 4, language = "EN", tag) => {
    return new Promise((resolve, reject) => {
        FIRESTORE.collection("FORUM")
            .orderBy("claps", "desc")
            .where("language", "==", language)
            .where("topics", "array-contains", tag)
            .limit(count)
            .get()
            .then(document => {
                resolve(document.docs.map(item => item.data()));
            })
            .catch(reject)
    })
}


export const getMostLikedPostOnTypeBasis = (count = 4, language = "EN", type, startAfter = null) => {
    return new Promise((resolve, reject) => {
        const DBref = FIRESTORE.collection("FORUM")
            .where("language", "==", language)
            .where("type", "array-contains", type)
            .orderBy("claps", "desc")
            .limit(count);

        if (startAfter) {
            DBref
                .startAfter(startAfter)
                .get()
                .then(document => {
                    resolve(document.docs.map(item => item.data()));
                }).catch(e => {
                    console.log("error : ", e)
                })
        } else {
            DBref
                .get()
                .then(document => {
                    resolve(document.docs.map(item => item.data()));
                }).catch(e => {
                    console.log("error : ", e)
                })
        }


    })
}

export const getPostById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("FORUM")
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

export const getPostReplyById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("FORUM-REPLIES")
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



export const getPostSubRepliesById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("FORUM-REPLIES")
                .doc(id)
                .collection("subReply")
                .get()
                .then(document => {
                    resolve(document.docs.map(item => item.data()));
                }).catch(e => {
                    console.log("error : ", e)
                })
        } catch (error) {
            reject(error)
        }
    });
}


export const incrementForumShareHandler = async (contentID, type) => {
    await FIRESTORE.collection(type).doc(contentID).update({
        "shares": firebase.firestore.FieldValue.increment(1)
    })
} 