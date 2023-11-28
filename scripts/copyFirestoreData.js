const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

// Initialize Firebase Admin SDK for prod with app name 'prodApp'
const prodApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}, 'prodApp');

const prodFirestore = prodApp.firestore();

// Initialize Firebase Admin SDK for QA with app name 'qaApp'
const qaServiceAccount = require('../qa.json');
const qaApp = admin.initializeApp({
  credential: admin.credential.cert(qaServiceAccount),
}, 'qaApp');

const qaFirestore = qaApp.firestore();

// Function to copy data from prod to QA
const copyData = async () => {
  try {
    // Fetch data from the 'your-collection' collection in prod
    const prodData = await prodFirestore.collection('products').get();

    // Write data to the 'your-collection' collection in QA
    await Promise.all(
      prodData.docs.map(async (doc) => {
        const data = doc.data();
        await qaFirestore.collection('products').doc(doc.id).set(data);
      })
    );

    console.log('Data copied successfully from prod to QA.');
  } catch (error) {
    console.error('Error copying data:', error);
  } finally {
    // Do any necessary cleanup or additional logic here
    process.exit(); // Terminate the script
  }
};

// Run the copyData function
copyData();
