//function to verify the otp code sent to a registering user


const bcrypt = require('bcrypt');
const enterOtpField = document.getElementById('enteredotp');
const dashboardUrl = 'https://tipster.digital/dashboard/';
const errorMessage = 'Incorrect OTP';
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
// your firebase config
};
firebase.initializeApp(firebaseConfig);
const otp_db = firebase.database().ref('otp_db');

function verifyOtp() {
    const enteredOtp = enterOtpField.value;
    //Get the hashed OTP from the Firebase database
    otp_db.once('value', function(snapshot) {
        let hashedOtp = snapshot.child('otp').val();
        // Compare the entered OTP with the hashed OTP from the database
        bcrypt.compare(enteredOtp, hashedOtp, function(err, res) {
            if (res) {
                window.location.href = 'https://tipster.digital/dashboard/';
            } else {
                alert(errorMessage);
            }
        });
    });
}
