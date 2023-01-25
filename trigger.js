const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  // your firebase config
};
firebase.initializeApp(firebaseConfig);
const accountBalancesRef = firebase.database().ref('account_balances');

// function to trigger the tip prompt
const triggerTipPrompt = async (tillNumber) => {
  try {
    // get the current balance for the till from the database
    const tillRef = accountBalancesRef.child(tillNumber);
    const currentBalanceSnapshot = await tillRef.once('value');
    const currentBalance = currentBalanceSnapshot.val();

    // get the previous balance for the till from the database
    const previousBalanceSnapshot = await tillRef.child('firstBalance').once('value');
    const previousBalance = previousBalanceSnapshot.val();

    // check if the current balance is greater than the previous balance
    if (currentBalance > previousBalance) {
      // get the associated mobile number for the till
      const mobileNumberSnapshot = await tillRef.child('mobileNumber').once('value');
      const mobileNumber = mobileNumberSnapshot.val();

      // trigger the tip prompt to the mobile number
      // code to trigger the tip prompt

      // update the previous balance in the database
      await tillRef.update({ firstBalance: currentBalance });
    }
  } catch (error) {
    console.error(error)}
    }
//
