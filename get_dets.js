//After registration of URLs, this periodically checks for transactions and acts as the listener for 

const axios = require('axios');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
    // your firebase config
};
firebase.initializeApp(firebaseConfig);
const url_db = firebase.database().ref('urls');

const getTransactionDetails = async () => {
    // Get the URLs for all registered tills from the Firebase database
    const urls = await url_db.once('value');

    // Loop through each URL and make a request to get the transactional details
    urls.forEach(async (url) => {
        try {
            const response = await axios.get(url);
            // Extract the phone number from the response data
            const phoneNumber = response.data.phoneNumber;
            
            // Pass the phone number to the trigger for tips
            triggerTip(phoneNumber);
        } catch (error) {
            console.error(error);
        }
    });
}

const triggerTip = (phoneNumber) => {
    // Code to send a tip prompt to the phone number
}

// Schedule the getTransactionDetails function to run periodically using a cron job
const CronJob = require('cron').CronJob;
const job = new CronJob('*/5 * * * * *', getTransactionDetails);
job.start();

//
