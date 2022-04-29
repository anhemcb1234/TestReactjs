// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq5F2n-VNMkvfcs5rZDfLMBnE1taJYMMw",
    authDomain: "testractjs.firebaseapp.com",
    projectId: "testractjs",
    storageBucket: "testractjs.appspot.com",
    messagingSenderId: "440616751391",
    appId: "1:440616751391:web:3eac729e5d8399b42e602a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore database //lưu trữ CSDL
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};
