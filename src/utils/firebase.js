import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDphdpMlCaT6Um0OAf4szNEJFyQ9tgXcbM",
  authDomain: "tiktok-clone-e8997.firebaseapp.com",
  projectId: "tiktok-clone-e8997",
  storageBucket: "tiktok-clone-e8997.appspot.com",
  messagingSenderId: "1056343495365",
  appId: "1:1056343495365:web:8f82449fe17db2ce1b56ac"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();
export default storage