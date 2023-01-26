//Exists to handle the commissioning of 10% off each tip transaction

const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  // your firebase config
};
firebase.initializeApp(firebaseConfig);
const accountBalancesRef = firebase.database().ref('account_balances');
const commsRef = firebase.database().ref('comms');

// function to handle tip transaction
const handleTipTransaction = async (tillNumber, tipAmount) => {
  try {
    // get the second till number
    const secondTillNumber = 'secondTillNumber';

    // calculate the commission amount
    const commissionAmount = tipAmount * 0.1;

    // update the balance for the first till number
    const tillRef = accountBalancesRef.child(tillNumber);
    await tillRef.update({ balance: firebase.database.ServerValue.increment(tipAmount - commissionAmount) });

    // update the balance for the second till number
    const secondTillRef = accountBalancesRef.child(secondTillNumber);
    await secondTillRef.update({ balance: firebase.database.ServerValue.increment(commissionAmount) });

    // store the transaction details in the 'comms' collection
    const newTransactionRef = commsRef.push();
    await newTransactionRef.set({
      tillNumber: tillNumber,
      secondTillNumber: secondTillNumber,
      tipAmount: tipAmount,
      commissionAmount: commissionAmount,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  } catch (error)
