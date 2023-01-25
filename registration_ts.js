// Import the required modules
const axios = require('axios');
const uuidv4 = require('uuid/v4');

// Define the phone number field and the OTP message
const phoneNumberField = document.getElementById('phone-number');
const otpMessage = 'Your OTP for Tipster registration is: ';

// Define the function to send the OTP
const sendOTP = async () => {
    // Get the phone number from the field
    const phoneNumber = phoneNumberField.value;

    // Generate the OTP
    const otp = generateOTP();

    // Construct the message to send
    const message = `${otpMessage}${otp}`;

    // Construct the payload for the Crossgate API
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
        // Send the OTP via the Crossgate API
        const response = await axios.post('https://crossgate.com/api/send-sms', payload);

        // Handle the response
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

// Define the function to generate the OTP
const generateOTP = () => {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
};

// Attach the function to the form submission event
const registrationForm = document.getElementById('registration-form');
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendOTP();
});

