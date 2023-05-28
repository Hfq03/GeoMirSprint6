import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6LkoJlLgd-_g2ajWqUIr9OiBfoNYv2kg",
  authDomain: "fitcook-90894.firebaseapp.com",
  projectId: "fitcook-90894",
  storageBucket: "fitcook-90894.appspot.com",
  messagingSenderId: "687609825192",
  appId: "1:687609825192:web:b543d417a65363e5387f9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

