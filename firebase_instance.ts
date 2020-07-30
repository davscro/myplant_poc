import * as firebase from "firebase";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebase_apiKey,
  authDomain: Constants.manifest.extra.firebase_authDomain,
  databaseURL: Constants.manifest.extra.firebase_databaseURL,
  projectId: Constants.manifest.extra.firebase_projectId,
};

console.log("FB_CONFIG", firebaseConfig);

// Get a reference to the database service
export const firebaseInstance = firebase.initializeApp(firebaseConfig);
