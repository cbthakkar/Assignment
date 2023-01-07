import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB8qr9C4v1TtnIsskpp9J4JlkZWUay8sz0",
    authDomain: "topstask.firebaseapp.com",
    databaseURL: "https://topstask-default-rtdb.firebaseio.com",
    projectId: "topstask",
    storageBucket: "topstask.appspot.com",
    messagingSenderId: "668358173231",
    appId: "1:668358173231:web:583571b8d7930b735e5cda",
    measurementId: "G-K44P6BEKVH"
  };

  const app = initializeApp(firebaseConfig);
  var storage = getStorage(app);
  export default storage;