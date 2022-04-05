// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhisrYmZcvyCpiUMLAJoaJHOf0BogEnZc",
  authDomain: "salva-81798.firebaseapp.com",
  projectId: "salva-81798",
  storageBucket: "salva-81798.appspot.com",
  messagingSenderId: "479540577187",
  appId: "1:479540577187:web:52330c6fc8bdf17c6c9016",
  measurementId: "G-Y1MD7RG67D"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;