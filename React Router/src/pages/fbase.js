import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyB1IE2hx4zICYYCbcARmxZ4J6SGMCi4q3Q",
    authDomain: "fir-project-30e96.firebaseapp.com",
    databaseURL: "https://fir-project-30e96-default-rtdb.firebaseio.com",
    projectId: "fir-project-30e96",
    storageBucket: "fir-project-30e96.appspot.com",
    messagingSenderId: "870780982251",
    appId: "1:870780982251:web:297ee63242dfaaf34b7fae",
    measurementId: "G-4TMT054HK7"
  };
// Firebase storage reference
const app = initializeApp(firebaseConfig);
var storage = getStorage(app);
export default storage;