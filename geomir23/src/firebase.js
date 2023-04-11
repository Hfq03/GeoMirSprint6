// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3sPZHuJsWIVr-BzpLC2GsGJpuslEnXXk",
  authDomain: "marks-d3228.firebaseapp.com",
  projectId: "marks-d3228",
  storageBucket: "marks-d3228.appspot.com",
  messagingSenderId: "832845551217",
  appId: "1:832845551217:web:7cb4cc38d9a8355be4edd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

