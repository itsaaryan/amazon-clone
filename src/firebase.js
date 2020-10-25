import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAfIn6GW4Y6kwG-qOZxWgptMJkmJ9WV_Ic",
  authDomain: "clone-byaaryan.firebaseapp.com",
  databaseURL: "https://clone-byaaryan.firebaseio.com",
  projectId: "clone-byaaryan",
  storageBucket: "clone-byaaryan.appspot.com",
  messagingSenderId: "489773865175",
  appId: "1:489773865175:web:1cddffeef3f3eaf1223892",
  measurementId: "G-Z9GMRD575E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
