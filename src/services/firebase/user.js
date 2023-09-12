import { FIRESTORE } from './firebaseConfig'
import { __PRIVATE_KEY } from '../../Helper_function';
import { getImageUrl } from '../../utility/helperFunctions';
import { getBlogByID } from '../functions/blogs'
import { getVideoByID } from '../functions/videos'


export const getUserNameAndImageByID = (id) => {
    return new Promise((resolve, reject) => {
        resolve(null);
    })
}


export const getAllBlogsOfSpecificUser = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("BLOGS")
                .where("by", "==", id)
                .orderBy("createdAt", "desc");

            DBref
                .get()
                .then(document => {
                    resolve(document.docs.map(item => ({
                        id: item.data().id,
                        title: item.data().title,
                        createdAt: item.data().createdAt,
                        claps: item.data()?.claps || 0,
                        comments: item.data()?.comments?.length || 0,
                        shares: item.data()?.shares || 0,
                        image: getImageUrl(item.data().blog),
                        payed: item.data()?.payed || false,
                        blog: item.data()?.blog,
                        totalViews: item.data()?.totalViews || 0
                    })));
                }).catch(e => {
                    console.log("error : ", e)
                })
        } catch (error) {
            reject(error)
        }
    });

}




export const getAllVideosOfSpecificUser = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const DBref = FIRESTORE.collection("VIDEOS")
                .where("by", "==", id)
                .orderBy("createdAt", "desc")

            DBref
                .get()
                .then(document => {
                    resolve(document.docs.map(item => ({
                        id: item.data().id,
                        title: item.data().title,
                        createdAt: item.data().createdAt,
                        claps: item.data()?.claps || 0,
                        comments: item.data()?.comments?.length || 0,
                        shares: item.data()?.shares || 0,
                        image: item.data()?.image,
                        totalViews: item.data()?.totalViews || 0
                    })));
                }).catch(e => {
                    console.log("error : ", e)
                })
        } catch (error) {
            reject(error)
        }
    });

}




export const fetchAllUserBookmarkedBlogs = (blogIDArray) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogList = await Promise.all(blogIDArray.map(async (id) => {
                return await getBlogByID(id);
            }));
            resolve(blogList);
        } catch (error) {
            reject(error)
        }
    });
}


export const fetchAllUserBookmarkedVideos = (videoIDArray) => {
    return new Promise(async (resolve, reject) => {
        try {
            const videoList = await Promise.all(videoIDArray.map(async (id) => {
                return await getVideoByID(id);
            }));
            resolve(videoList);
        } catch (error) {
            reject(error)
        }
    });
}




export const fetchAllConnectionsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            FIRESTORE.collection("CONNECTIONS")
                .doc(userId)
                .get()
                .then(document => {
                    if (document.data()) {
                        resolve(document.data());
                    }
                    reject("Data not found!")
                })
                .catch(reject)
        } catch (error) {
            reject(error)
        }
    })
}


