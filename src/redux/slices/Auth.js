import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie, eraseCookie, assistMatesUserCookieKey, __PRIVATE_KEY } from '../../Helper_function';
import Axios from 'axios'
import CryptoJS from 'crypto-js'
import { FIRESTORE } from '../../services/firebase/firebaseConfig';


// const authData = {
//     token: null,
//     isLoading: false,
//     id: "1893941c-82b0-4ea1-a8b3-81bc5b775c2e",
//     data: {
//         id: "1893941c-82b0-4ea1-a8b3-81bc5b775c2e",
//         basic: {
//             email: 'rahulkashyap2870@gmail.com',
//             image: "https://firebasestorage.googleapis.com/v0/b/assistmates.appspot.com/o/thumbnails%2Fi4OTsGiQY?alt=media&token=66c3b64c-feda-40dc-b2e8-1c187f05b0b1",
//             about: 'Hello, mates',
//             phoneNo: '+918448443892',
//             name: 'Rahul kashyap'
//         },
//         blog: {
//             bookmarkedBlogs: ['6dc5a6b3-4a08-4650-90f8-44b710ee3c6b', 'U2ALB6n1Y', 'eWwSugJgf', 'yP1nNXHRR', 'kY6Xt_TGC']
//         },
//         video: {
//             bookmarkedVideos: ['e30f9853-f0f1-4c3d-b5c8-763e892e8278', 'Vr2dHNjLC']
//         }
//     }
// }



const authData = {
    token: null,
    isLoading: false,
    id: null,
    data: null
}

export const checkUser = createAsyncThunk(
    "auth/checkUser",
    async (payload) => {
        const token = getCookie(assistMatesUserCookieKey)
        if (token) {
            var bytes = CryptoJS.AES.decrypt(token, __PRIVATE_KEY);
            var decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (decoded?.id) {
                const response = (await FIRESTORE.collection("USERS").where("id", "==", decoded?.id).get()).docs;
                //   console.log('repsne : ', response)
                if (response) {
                    return response[0].data()
                }
            } else {
                // make him logout
            }
        } else {

        }
    }
)

export const auth = createSlice({
    name: 'auth',
    initialState: authData,
    reducers: {
        saveUserID: (state, { payload }) => {
            const { id } = payload;
            state.id = id;
        },
        isUserExist: (state, { payload }) => {
            console.log("i am in redux : ")
            if (payload.props == 'success') {
                payload.success("success retured!")
            } else {
                payload.error("error retured!")
            }
        },
        logout: (state, { payload }) => {
            const { success, error } = payload;
            try {
                state.id = null
                state.isLoading = false
                state.token = null
                state.data = null
                eraseCookie(assistMatesUserCookieKey)
                success("success")
            } catch (err) {
                error("error")
            }
        }
    },
    extraReducers: {
        [checkUser.fulfilled]: (state, { payload }) => {
            // console.log("payload id : ", Object.keys(payload)[0])
            if (payload) {
                state.id = payload.id;
                state.data = payload;
                //    console.log("payload :", payload)
            }

        },
        [checkUser.rejected]: (state, action) => {
            // state.status = "failed";
            console.log("rejected")
        },
        [checkUser.pending]: (state, action) => {
            // state.status = "loading";
            //   console.log("pending")
        },
    }
})

// Action creators are generated for each case reducer function
export const { isUserExist, saveUserID, logout } = auth.actions

export default auth.reducer