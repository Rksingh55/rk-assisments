import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyDfIiWQ3uIPcQzS69IWZDrQw5sbCw5r1-s",
  authDomain: "assistmates.firebaseapp.com",
  databaseURL: "https://assistmates-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assistmates",
  storageBucket: "assistmates.appspot.com",
  messagingSenderId: "24130028344",
  appId: "1:24130028344:web:56e9cc95ddd539f9ee37cd",
  measurementId: "G-J8HW98NN70"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()

export const FIRESTORE = firebase.firestore()
export const STORAGE = firebase.storage()
export const AUTH = firebase.auth()

export default firebase;