import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD4TmIbw8HDp9oUmAOX1ZgUc-1A9o0mYq0",
    authDomain: "prog3rnorsi.firebaseapp.com",
    projectId: "prog3rnorsi",
    storageBucket: "prog3rnorsi.firebasestorage.app",
    messagingSenderId: "185024383067",
    appId: "1:185024383067:web:a6992d60156620693b977e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();