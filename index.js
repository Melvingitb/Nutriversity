import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBuqhqpdBEQ6UuMLMjHhMDA52jlvRRDvWY",
    authDomain: "nutriversity-37b51.firebaseapp.com",
    projectId: "nutriversity-37b51",
    storageBucket: "nutriversity-37b51.appspot.com",
    messagingSenderId: "471285232650",
    appId: "1:471285232650:web:3b42cc24a8f6caee3a9bf3",
    measurementId: "G-22L18SLLGQ"
  };

const app = initializeApp(firebaseConfig);

console.log("hello");
const db = getFirestore(app);

console.log("hi");

const food = await collection(db, 'food');
const snapshot = await getDocs(food);

const datatable = document.querySelector('#datatable');

//document.getElementById("calories").value = 500;

snapshot.forEach((doc) => {
    //creates new header element in html 
    let h = document.createElement("HEADER");
    document.body.appendChild(h);
    
    //append to table
    let r = document.createElement("tr");
    datatable.appendChild(r);

    //let td = document.createElement("td");
    //let tex = document.createTextNode(doc.data())

    //creates h2 element in html and adds text to it
    let h2 = document.createElement("H2");
    let txt = document.createTextNode(doc.data()['name']);
    h2.appendChild(txt);
    h.appendChild(h2);

    //Add food name to table
    let tdname = document.createElement("td");
    tdname.appendChild(document.createTextNode(doc.data()['name']));
    r.appendChild(tdname);

    //creates unordered list
    var ul = document.createElement('ul');
    document.body.appendChild(ul);

    //create array of hardcoded keys to use in for loop
    var values = ["calories", "protein", "carbs", "sugar", "price"];

    //for loop that appends each key and value onto the unordered list and table
    for (let i = 0; i < values.length; i++){
      var li = document.createElement('li');
      let td = document.createElement("td");
      td.appendChild(document.createTextNode(doc.data()[values[i]]));
      r.appendChild(td);

      li.appendChild(document.createTextNode(values[i] + ': ' + doc.data()[values[i]]));
      ul.appendChild(li);
    }


    //appends list element to unordered list
    
    /*
    var li = document.createElement('li');
    li.appendChild(document.createTextNode('calories: ' + doc.data()['calories']));
    ul.appendChild(li);
    var li2 = document.createElement('li');
    li2.appendChild(document.createTextNode('protein: ' + doc.data()['protein']));
    ul.appendChild(li2);
    li.appendChild(document.createTextNode('carbs: ' + doc.data()['carbs']));
    ul.appendChild(li);
    li.appendChild(document.createTextNode('sugar: ' + doc.data()['sugar']));
    ul.appendChild(li);
    li.appendChild(document.createTextNode('price: ' + doc.data()['price']));
    ul.appendChild(li);
    */

    //printing stuff to console for debugging
    let keys = Object.keys(doc.data());
    console.log(doc.id, '=>', doc.data());
    for (let i = 0; i < keys.length; i++){
        console.log(keys[i]);
    }

    //document.write(doc.data()['calories']);

});

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuqhqpdBEQ6UuMLMjHhMDA52jlvRRDvWY",
  authDomain: "nutriversity-37b51.firebaseapp.com",
  projectId: "nutriversity-37b51",
  storageBucket: "nutriversity-37b51.appspot.com",
  messagingSenderId: "471285232650",
  appId: "1:471285232650:web:3b42cc24a8f6caee3a9bf3",
  measurementId: "G-22L18SLLGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const todosCol = collection(db, 'todos');
const snapshot = await getDocs(todosCol);
*/