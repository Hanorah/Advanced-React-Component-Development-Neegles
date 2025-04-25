// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjkbgB1G6dwggcPMwYAbcCi1skgWCVKnc',
  authDomain: 'dashboardauth-5f315.firebaseapp.com',
  projectId: 'dashboardauth-5f315',
  storageBucket: 'dashboardauth-5f315.firebasestorage.app',
  messagingSenderId: '204963027902',
  appId: '1:204963027902:web:356c916bde61756839b7ef',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
