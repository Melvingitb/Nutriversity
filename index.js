// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, onSnapshot, query, where } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// Your web app's Firebase configuration
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

console.log("hello");
const db = getFirestore(app);

console.log("hi");

const food = await collection(db, 'food');
//const snapshot = await getDocs(food);

const datatable = document.querySelector('#datatable');
/*
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

    //printing stuff to console for debugging
    let keys = Object.keys(doc.data());
    console.log(doc.id, '=>', doc.data());
    for (let i = 0; i < keys.length; i++){
        console.log(keys[i]);
    }

});
*/

//function to be called when submit button is clicked
async function onSubmit(){
  let data = {name: document.getElementById("foodname").value, calories: document.getElementById("calories").value,
              protein: document.getElementById("protein").value, carbs: document.getElementById("carbs").value, 
            sugar: document.getElementById("sugar").value, price: document.getElementById("price").value};
  
  console.log(data["calories"]);

  const newFood = doc(collection(db, 'food'));
  await setDoc(newFood, data);

  renderData(data);
  console.log("submitted");
  document.getElementById("foodname").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("protein").value = "";
  document.getElementById("carbs").value = "";
  document.getElementById("sugar").value = "";
  document.getElementById("price").value = "";
}

//sets the form to do the onSubmit function when the button is clicked
document.getElementById("sub").onclick = onSubmit;

//renders a new doc into the table
function renderDoc(doc){
  const table = document.querySelector('#datatable');

  let r = document.createElement("tr");
  table.appendChild(r);

  //add food name to table
  let tdname = document.createElement("td");
    tdname.appendChild(document.createTextNode(doc.data()['name']));
    r.appendChild(tdname);

  //create array of hardcoded keys to use in for loop
  var values = ["calories", "protein", "carbs", "sugar", "price"];

  //for loop that appends each key and value onto the table
  for (let i = 0; i < values.length; i++){
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(doc.data()[values[i]]));
    r.appendChild(td);
  }
}

//renders a new data into the table
function renderData(data){
  const table = document.querySelector('#datatable');

  let r = document.createElement("tr");
  table.appendChild(r);

  //add food name to table
  let tdname = document.createElement("td");
    tdname.appendChild(document.createTextNode(data['name']));
    r.appendChild(tdname);

  //create array of hardcoded keys to use in for loop
  var values = ["calories", "protein", "carbs", "sugar", "price"];

  //for loop that appends each key and value onto the table
  for (let i = 0; i < values.length; i++){
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(data[values[i]]));
    r.appendChild(td);
  }
}

//real time listener
const querySnapshot = await getDocs(collection(db, 'food'));
//querySnapshot.forEach((doc) => {
  let changes = querySnapshot.docChanges();
  console.log(changes);
  changes.forEach(change => {
    if (change.type == 'added'){
      renderDoc(change.doc);
    }
  })
//})

/*
await getDocs(food)(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == 'added'){
      renderDoc(change.doc);
    }
  })
})
*/