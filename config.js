const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCt48XuM9w6JGfy8Dg0qiKdIgg8tVlhEo8",
  authDomain: "restaurant-39f91.firebaseapp.com",
  projectId: "restaurant-39f91",
  storageBucket: "restaurant-39f91.appspot.com",
  messagingSenderId: "917965916340",
  appId: "1:917965916340:web:cf60ce4147e09ac5a06fe1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const Dishes = db.collection("dishes");
const Tables = db.collection("tables");
const Bills = db.collection("bills");
const Waiters = db.collection("bills");

module.exports = { Dishes, Waiters, Tables, Bills };
