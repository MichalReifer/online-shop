import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDN7QN-pYleDYL4Eijfyur95PAnWunP974",
    authDomain: "cake-shop-19256.firebaseapp.com",
    projectId: "cake-shop-19256",
    storageBucket: "cake-shop-19256.appspot.com",
    messagingSenderId: "271534601212",
    appId: "1:271534601212:web:43598b02370b05d7253879",
    measurementId: "G-CNC4RRS7SG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
//   const db = firebase.firestore();
//   db.settings({ timestampsInSnapshots: true });

  export default firebase;