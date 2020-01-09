import firebaseConfig from './config.js';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const fire = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';

export default fire
