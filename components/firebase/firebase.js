import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPc3DuhhJExcakcddq0MqxWAywuL4SLy4",
  authDomain: "gasup-c156c.firebaseapp.com",
  databaseURL: "https://gasup-c156c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gasup-c156c",
  storageBucket: "gasup-c156c.appspot.com",
  messagingSenderId: "260393950000",
  appId: "1:260393950000:web:d95e14f8850c8caa7946f5",
  measurementId: "G-T6VVKJGY83"
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // if already initialized, use that one
}

export const auth = app.auth();
export default app;
