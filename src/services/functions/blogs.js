import firebase, { FIRESTORE } from '../firebase/firebaseConfig'

export const getBlogByID = (id) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("BLOGS")
                .doc(id)
                .get()
                .then(document => {
                    resolve(document.data());
                }).catch(reject)

        } catch (error) {
            reject(error)
        }
    })
}

export const getLatestBlogs = (count = 4, startAfter = null, language = "EN") => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
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

export const getMostViewedBlogs = (count = 4, startAfter = null, tag = null, language = "EN") => {
    return new Promise((resolve, reject) => {
        try {
            var DBref = null;
            if (tag) {
                DBref = FIRESTORE.collection("BLOGS")
                    .orderBy("totalViews", "desc")
                    .orderBy("createdAt", "desc")
                    .where("topics", "array-contains", tag)
                    .where("language", "==", language)
                    .where("payed", "==", true)
                    .limit(count);
            } else {
                DBref = FIRESTORE.collection("BLOGS")
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
                        resolve(document.docs.map(i => i.data()));
                    }).catch(reject)
            } else {
                DBref
                    .get()
                    .then(document => {
                        resolve(document.docs.map(i => i.data()));
                    }).catch(reject)
            }
        } catch (error) {
            reject(error)
        }
    });
}


export const getMostLikedBlogs = (count = 4, startAfter = null, language = "EN") => {

    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
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

export const getMostSharedBlogs = (count = 4, startAfter = null, language = "EN") => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
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

// export const getSpecificTagsBlogs = (count = 4, language = "EN", tag) => {
//     return new Promise((resolve, reject) => {
//         try {
//             FIRESTORE.collection("BLOGS")
//                 .where("topics", "array-contains", tag)
//                 .where("language", "==", language)
//                 .where("payed", "==", true)
//                 .orderBy("createdAt", "desc")
//                 .limit(count)
//                 .get()
//                 .then(document => {
//                     resolve(document.docs.map(item => item.data()));
//                 })
//                 .catch(reject);
//         } catch (error) {
//             reject(error)
//         }
//     });
// }


export const getSpecificTagsBlogs = (count = 4, language = "EN", tag, startAfter = null) => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
                .where("payed", "==", true)
                .where("topics", "array-contains", tag)
                .where("language", "==", language)
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


export const getSpecificTypeBlogs = (count = 4, language = "EN", type, startAfter = null) => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
                .where("payed", "==", true)
                .where("type", "array-contains", type)
                .where("language", "==", language)
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