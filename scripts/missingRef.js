const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const productsFile = '../assets/new.json';
const missingRefsFile = '../assets/missing.json'; // Specify the path for the new file
let missingRefs = [];
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();



fs.readFile(productsFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    for (const item of jsonData) {
      const extractedValue = item.ref; // Assuming the URL is in the 'url' property

      try {
        const productRef = await db.collection('products').where('ref', '==', extractedValue).get();

        if (productRef.empty) {
          missingRefs.push(extractedValue);
        }
      } catch (error) {
        console.error(`Error checking product existence: ${error.message}`);
      }
    }

    fs.writeFile(missingRefsFile, JSON.stringify(missingRefs), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing missing refs file: ${writeErr}`);
      } else {
        console.log(`Missing refs written to ${missingRefsFile}`);
      }
    });

  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});

function extractValueFromURL(url) {
  const startIndex = url.lastIndexOf('/') + 1;
  const endIndex = url.lastIndexOf('.jpg');

  if (startIndex !== -1 && endIndex !== -1) {
    return url.substring(startIndex, endIndex);
  } else {
    return null;
  }
}
