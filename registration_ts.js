//Registration onto Tipster
//the process occurs by means of storage of a till number and verification of a user id using an OTP. The user is identified by their phone number entered


const axios = require('axios');
const uuidv4 = require('uuid/v4');
const firebase = require('firebase');
const bcrypt = require('bcrypt');

// Initialize Firebase
const firebaseConfig = {
  // your firebase config
};
firebase.initializeApp(firebaseConfig);
const otp_db = firebase.database().ref('otp_db');

const phoneNumberField = document.getElementById('phone-number');
const otpMessage = 'Your OTP for Tipster registration is: ';

const sendOTP = async () => {
  const phoneNumber = phoneNumberField.value;
  const otp = generateOTP();
  const saltRounds = 10;
  const hashedOtp = await bcrypt.hash(otp, saltRounds);
  let sentOtp = hashedOtp;
  const message = `${otpMessage}${otp}`;

  //save the hashed OTP to the Firebase database
  otp_db.push().set({
    phoneNumber: phoneNumber,
    otp: sentOtp
  });

  const payload = {
    profile_code: '12345',
    messages: [
      {
        mobile_number: phoneNumber,
        message: message,
        message_ref: uuidv4(),
        link_id: '12340000'
      }
    ],
    dlr_callback_url: 'https://tipster.digital/regcallback/'
  };

  try {
    const response = await axios.post('https://crossgate.com/api/send-sms', payload);
    console.log(response);
  } catch (error) {
