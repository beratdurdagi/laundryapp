// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhSDnSX98H_rwoLsi5H5x8Kq2mjsNY4bk",
  authDomain: "laundry-application-ccbbf.firebaseapp.com",
  projectId: "laundry-application-ccbbf",
  storageBucket: "laundry-application-ccbbf.appspot.com",
  messagingSenderId: "961908587782",
  appId: "1:961908587782:web:04381a3296ded66388b287",
  measurementId: "G-M2JE18P1GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth=getAuth(app);

const db=getFirestore();

export {auth,db};