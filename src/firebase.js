// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtoyHu2aqgx_wxbOv2ZeM0C9Qju25rQhA",
  authDomain: "mended-1e5fc.firebaseapp.com",
  databaseURL: "https://mended-1e5fc-default-rtdb.firebaseio.com",
  projectId: "mended-1e5fc",
  storageBucket: "mended-1e5fc.appspot.com",
  messagingSenderId: "672572535230",
  appId: "1:672572535230:web:3cec907304ff475e3049ef"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth }; // Export the auth object

// -------------------------------NEW-----------------------------------

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCtoyHu2aqgx_wxbOv2ZeM0C9Qju25rQhA",
//   authDomain: "mended-1e5fc.firebaseapp.com",
//   databaseURL: "https://mended-1e5fc-default-rtdb.firebaseio.com",
//   projectId: "mended-1e5fc",
//   storageBucket: "mended-1e5fc.appspot.com",
//   messagingSenderId: "672572535230",
//   appId: "1:672572535230:web:3cec907304ff475e3049ef"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
