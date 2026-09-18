// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj65RM91KmaoARYOfSH1hs-6TY5Qo2SzA",
  authDomain: "neuron-blood-foundation.firebaseapp.com",
  databaseURL: "https://neuron-blood-foundation-default-rtdb.firebaseio.com",
  projectId: "neuron-blood-foundation",
  storageBucket: "neuron-blood-foundation.firebasestorage.app",
  messagingSenderId: "160902995293",
  appId: "1:160902995293:web:cb9a42dfa4b61d593e5cb4",
  measurementId: "G-90P3HEZLPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
