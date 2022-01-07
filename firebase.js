// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { Firestore, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQkuwoOupma7JY2ngkDMv6AfAD3b1dyGc",
  authDomain: "rent-a-car-react-native.firebaseapp.com",
  projectId: "rent-a-car-react-native",
  storageBucket: "rent-a-car-react-native.appspot.com",
  messagingSenderId: "80027665184",
  appId: "1:80027665184:web:2159202beb1211587b4d45",
  measurementId: "G-BR7NLYPPDK"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}

const auth = firebase.auth()

const firestore = firebase.firestore();

export { auth };
export { firestore };

export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = firestore.collection('users').doc(user.uid);

  const snap = await userRef.get();

  if (!snap.exists) {
    try {
      userRef.set(user)
    } catch (error) {
      console.log("Error catching user", error);
    }
  }
}

export const createCarDocument = async (car) => {
  if (!car) return;

  const carRef = firestore.collection('cars').doc();

  try {
    carRef.set(car)
  } catch (error) {
    console.log("Error creator car", error)
  }
}