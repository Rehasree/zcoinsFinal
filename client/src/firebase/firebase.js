import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig =  {
    apiKey: "AIzaSyBV9vVcvs8u1WMH3_HHAZP9RNyqV6XLIv8",
    authDomain: "z-coins.firebaseapp.com",
    projectId: "z-coins",
    storageBucket: "z-coins.appspot.com",
    messagingSenderId: "125582257854",
    appId: "1:125582257854:web:2c22d2ff2fa89dfb2138ef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
