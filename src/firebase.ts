import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
 
const firebaseConfig = {
  apiKey: "AIzaSyAwP0GeVlR7Vlmd6kTUguL0nekn04Q3pGg",
  authDomain: "new-d5941.firebaseapp.com",
  databaseURL: "https://new-d5941-default-rtdb.firebaseio.com",
  projectId: "new-d5941",
  storageBucket: "new-d5941.appspot.com",
  messagingSenderId: "1059220921722",
  appId: "1:1059220921722:web:bd8181d607aef9125a8ac3",
};

const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
export const auth = getAuth(app);
const storage = getStorage(app);

export const authState = {
  auth,
  onAuthStateChanged,
};

export const db = {
  dataBase,
  update,
  ref,
  onValue,
};

export const st = {
  storage,
  uploadBytes,
  getDownloadURL
}
