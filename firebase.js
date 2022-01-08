// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, Firestore, getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
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

export const createUserDocument = async (user, uid) => {
  if (!user) return;

  const userRef = firestore.collection('users').doc(uid);

  const snap = await userRef.get();

  if (!snap.exists) {
    try {
      userRef.set(user)
    } catch (error) {
      console.log("Error creating user", error);
    }
  }
}

export const createCarDocument = async (car) => {
  if (!car) return;

  const carRef = firestore.collection('cars').doc();

  try {
    carRef.set(car, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    console.log("Error creating car", error)
  }
}

export const readCarDocuments = async () => {
  var carList = [];

  const snapshot = await firestore
    .collection('cars')
    .orderBy('createdAt')
    .get();
  
  snapshot.forEach((document) => {
    carList.push(document.data())
  });

  return carList;
}

export const uploadPhotoAsync = async (uri, imageName) => {
  const storage = getStorage();
  const reference = ref(storage, imageName);

  const img = await fetch(uri);
  const bytes = await img.blob();

  await uploadBytes(reference, bytes);

  return getDownloadURL(reference);
}