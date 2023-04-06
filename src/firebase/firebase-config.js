// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC56hJ6ZCyjV8QFqATthZIOxwWiMItjo5k",
    authDomain: "kaali-app.firebaseapp.com",
    projectId: "kaali-app",
    storageBucket: "kaali-app.appspot.com",
    messagingSenderId: "577821509391",
    appId: "1:577821509391:web:8ac1cc7196f3c0cc78607a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LfZTR4lAAAAAGrUEq-d41ZGKb3GhcimB35_uLWl'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});
