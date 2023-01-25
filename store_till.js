//Store till Numbers to Firebase Database

const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
// your firebase config
};
firebase.initializeApp(firebaseConfig);
const registered_tills = firebase.database().ref('registered_tills');

const tillNumberField = document.getElementById('till_no');

function store_till() {
    const enteredTillNumber = tillNumberField.value;
    //save the till number to the Firebase database
    registered_tills.push().set({
        till_number: enteredTillNumber
    });
}

// Attach the function to the form submission event
const registrationForm = document.getElementById('registration-form');
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    store_till();
});
