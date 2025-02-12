import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  off,
  get,
  onChildChanged,
} from 'firebase/database';

// 🔥 Your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAw4aWIgsCJvc9zoISFLiZDMokjJZ2HK_8',
  authDomain: 'sino-72f9d.firebaseapp.com',
  databaseURL: 'https://sino-72f9d.firebaseio.com',
  projectId: 'sino-72f9d',
  storageBucket: '',
  messagingSenderId: '997737582322',
  appId: '1:997737582322:web:3dd501ac304df1570c8a6b',
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Database (Realtime Database)
const database = getDatabase(firebaseApp);

export { firebaseApp, database, ref, onValue, off, get, onChildChanged };
