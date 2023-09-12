import { FIRESTORE } from '../firebase/firebaseConfig'

export const getVideoByID = (id) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("VIDEOS")
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
    })
}

export const getLatestVideos = (count = 4, startAfter = null, language = "EN") => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("VIDEOS")
                .where("language", "==", language)
                .where("payed", "==", true)
                .orderBy("createdAt", "desc")
                .limit(count);

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });

}

export const getMostViewedVideos = (count = 4, startAfter = null, tag = null, language = "EN") => {
    return new Promise((resolve, reject) => {
        try {
            var DBref = null;
            if (tag) {
                DBref = FIRESTORE.collection("VIDEOS")
                    .orderBy("totalViews", "desc")
                    .orderBy("createdAt", "desc")
                    .where("payed", "==", true)
                    .where("language", "==", language)
                    .where("topics", "array-contains", tag)
                    .limit(count);
            } else {
                DBref = FIRESTORE.collection("VIDEOS")
                    .orderBy("totalViews", "desc")
                    .orderBy("createdAt", "desc")
                    .where("payed", "==", true)
                    .where("language", "==", language)
                    .limit(count);
            }

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()))
                    }).catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(item => item.data()))
                    }).catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });
}

export const getMostLikedVideos = (count = 4, startAfter = null, language = "EN") => {

    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("VIDEOS")
                .where("language", "==", language)
                .orderBy("claps", "desc")
                .limit(count);

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });
}

export const getMostSharedVideos = (count = 4, startAfter = null, language = "EN") => {

    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("VIDEOS")
                .where("language", "==", language)
                .orderBy("shares", "desc")
                .limit(count);

            if (startAfter) {
                DBref
                    .startAfter(startAfter)
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    })
                    .catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });
}


export const getSpecificTagsVideos = (count = 4, language = "EN", tag) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("VIDEOS")
                .orderBy("createdAt", "desc")
                .where("topics", "array-contains", tag)
                .where("language", "==", language)
                .where("payed", "==", true)
                .limit(count)
                .get()
                .then(document => {
                    resolve(document.docs.map(item => item.data()));
                }).catch(reject)
        } catch (error) {
            reject(error)
        }
    });
}




export const getSpecificTypeVideos = (count = 4, language = "EN", type) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("VIDEOS")
                .orderBy("createdAt", "desc")
                .where("type", "array-contains", type)
                .where("language", "==", language)
                .where("payed", "==", true)
                .limit(count)
                .get()
                .then(document => {
                    resolve(document.docs.map(item => item.data()));
                }).catch(reject)
        } catch (error) {
            reject(error)
        }
    });
}