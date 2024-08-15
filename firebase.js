// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDs6bP9B6hMyM3w9W4_i1N6Xkq0RJxhJwg',
  authDomain: 'fir-saas-c0627.firebaseapp.com',
  projectId: 'fir-saas-c0627',
  storageBucket: 'fir-saas-c0627.appspot.com',
  messagingSenderId: '320859408358',
  appId: '1:320859408358:web:0651f2b24c7aff04253827',
  measurementId: 'G-LFH6PPDX24',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
