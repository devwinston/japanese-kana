import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "japanese-kana-11560.firebaseapp.com",
  projectId: "japanese-kana-11560",
  storageBucket: "japanese-kana-11560.appspot.com",
  messagingSenderId: "697704760778",
  appId: "1:697704760778:web:b4aa50fcfea1c38141fb33",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
