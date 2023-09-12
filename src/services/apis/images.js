import { createApi } from 'unsplash-js';
import Axios from "axios";
import { GiphyFetch } from '@giphy/js-fetch-api'


const unsplash = createApi({
    accessKey: 'RO6llvp4lGR-bCS6L8JVoFbz7usa34-CQyIp8gno4ZI',
});

const gifFetch = new GiphyFetch('r9i3YLIwEUAAQij3pRvFjIibor5T7L5w');


export const getImagesByQuerySplash = (text, per_page) => {
    return new Promise((resolve, reject) => {
        unsplash.search.getPhotos({
            query: text,
            page: 1,
            perPage: per_page
        }).then(async (e) => {
            resolve(await Promise.all(e?.response?.results.map(async (data) => {
                return data?.urls.regular
            })));
        }).catch(e => {
            console.log("error in 1 : ", e)
            reject(e);
        })
    })
}


export const getImagesByQueryPexels = (text, per_page) => {
    return new Promise((resolve, reject) => {
        Axios.get(`https://api.pexels.com/v1/search?query=${text}&per_page=${per_page}&page=1`, {
            headers: {
                "Authorization": "563492ad6f917000010000011fb29e7c0da24aebb40b02b9bd1d57a1"
            }
        })
            .then(async (e) => {
                resolve(await Promise.all(e?.data?.photos.map(async (data) => {
                    return data?.src?.medium || data?.src?.original;
                })));
            })
            .catch(e => {
                console.log("error in 2 : ", e);
                reject(e);
            })
    })
}


export const getImagesByPixabay = (text, per_page) => {
    return new Promise((resolve, reject) => {
        Axios.get(`https://pixabay.com/api/?key=25710508-66fa4b848e6ed400958ff7392&q=${text}&image_type=photo&per_page=5&pretty=true`)
            .then(async (e) => {
                resolve(await Promise.all(e?.data?.hits.map(async (data) => {
                    return data?.largeImageURL || data?.previewURL;
                })));
            })
            .catch(e => {
                console.log("error in 3 : ", e);
                reject(e);
            })
    })
}


export const getGifsByGiphy = (text, per_page) => {
    return new Promise((resolve, reject) => {
        gifFetch.search(text, { limit: per_page })
            .then(async (e) => {
                resolve(await Promise.all(e?.data.map(async (data) => {
                    return data?.images?.original?.url || data?.images?.original_still?.url;
                })));
            })
            .catch((e) => {
                console.log("error in 4 : ", e);
                reject(e);
            })
    })
}



export const getGifsByTenor = (text, per_page) => {
    return new Promise((resolve, reject) => {
        fetch(`https://g.tenor.com/v1/search?q=${text}&key=RFO6M7JE1ZEJ&limit=${per_page}`)
            .then(e => e.json())
            .then(async (e) => {
                resolve(await Promise.all(e?.results.map(async (data) => {
                    return data?.media[0]?.gif?.url || data?.media[0]?.mediumgif?.url;
                })));
            })
            .catch(e => {
                console.log("error in 5 : ", e);
                reject(e);
            })
    })
}