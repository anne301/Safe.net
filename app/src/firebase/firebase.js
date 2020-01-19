import * as Firebase from 'firebase';
import firebaseConfig from './../config';

Firebase.initializeApp(firebaseConfig);
const databaseRef = Firebase.database().ref();
export const websitesRef = databaseRef.child('websites');