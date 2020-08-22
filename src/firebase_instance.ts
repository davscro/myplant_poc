import * as firebase from "firebase";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebase_apiKey,
  authDomain: Constants.manifest.extra.firebase_authDomain,
  databaseURL: Constants.manifest.extra.firebase_databaseURL,
  projectId: Constants.manifest.extra.firebase_projectId,
};

// Get a reference to the database service
const fbInstance = firebase.initializeApp(firebaseConfig);
fbInstance.auth().signInAnonymously();

export const firebaseInstance = fbInstance;
