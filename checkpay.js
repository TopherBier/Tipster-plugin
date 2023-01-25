//check payments on a till number 


const schedule = require('node-schedule');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
// your firebase config
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// function to check account balance of registered tills
const checkBalance = async () => {
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer AGrnQbv1ACOYe1rweL2lLdYAyzwc"); //replace this with your valid access token

try {
// Get the list of registered tills
const registeredTills = await db.ref('registered_tills').once('value');

// Loop through the list of tills
registeredTills.forEach((till) => {
  const tillNumber = till.val().tillNumber;

  // Make the API call to check the account balance
  fetch("https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query", {
    method: 'POST',
    headers,
    body: JSON.stringify({
      "Initiator": "testapi",
      "SecurityCredential": "NwNjMK27W+fMoeeyNjhndCp4tfGa+IOJafn3yMBLGaf7StHWy2l7Er6+P15kUgg7HktHBgNRJz4BCVABrTnczTyAWo4LfX+mPw+NDD56FjwJokhgMflaGP0VjU/bwLFUROkGrdT1vNmczkGKMex38hBPV5vz3xmC6QhZGDcaScOGIQpyEUx/IQuBb8og8P4",
})}

    )

  //
