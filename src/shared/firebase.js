import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB--th-iN_UBYpz2szadAOuHFipbEnmy_A",
  authDomain: "cucumber-market.firebaseapp.com",
  projectId: "cucumber-market",
  storageBucket: "cucumber-market.appspot.com",
  messagingSenderId: "483057034339",
  appId: "1:483057034339:web:7b237b6ae729341aa98456",
  measurementId: "G-RTCZL3HM52",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };
export default firebase;
