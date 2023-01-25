//Function to mass register business shortcodes and obtain confirmation and validation URLs.


const mpesa = require('mpesa');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
// your firebase config
};
firebase.initializeApp(firebaseConfig);
const url_db = firebase.database().ref('urls');

// Get the registered till numbers from the firebase database
firebase.database().ref('registered_tills').once('value', function(snapshot) {
snapshot.forEach(function(childSnapshot) {
let tillNumber = childSnapshot.key;

    // Generate random URLs for confirmation and validation
    let confirmationUrl = 'https://tipster.digital/' + Math.random().toString(36).substring(2);
    let validationUrl = 'https://tipster.digital/' + Math.random().toString(36).substring(2);

    // Save the URLs to the firebase database
    url_db.child(tillNumber).set({
        confirmationUrl: confirmationUrl,
        validationUrl: validationUrl
    });

    // Register the till number with the MPESA API
    mpesa
      .c2bregister({
        ShortCode: tillNumber,
        ConfirmationURL: confirmationUrl,
        ValidationURL: validationUrl,
        ResponseType: "Completed",
      })
      .then((response) => {
        // Log the response
        console.log(response);
      })
      .catch((error) => {
        // Log any errors
        console.error(error);
      });
});


});

//
