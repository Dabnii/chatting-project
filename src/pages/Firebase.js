import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtO51ugPGLhoUJ5NP0zs2FK1DnIojAjSo',
  authDomain: 'private-cho.firebaseapp.com',
  projectId: 'private-cho',
  storageBucket: 'private-cho.appspot.com',
  messagingSenderId: '1059406804141',
  appId: '1:1059406804141:web:b95449ba59dcbbc1360224',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
