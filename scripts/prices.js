const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const pricesFile = '../assets/prices.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();

const firestore = admin.firestore();

async function convertPrices() {
    try {
      const productsCollection = firestore.collection('products');
      const querySnapshot = await productsCollection.get();
  
      const batch = firestore.batch();
  
      querySnapshot.forEach(doc => {
        const priceString = doc.data().price;
  
        if (typeof priceString === 'string') {
          const priceNumber = parseFloat(priceString.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
          batch.update(doc.ref, { price: priceNumber });
        } else {
          console.warn(`Skipping document with invalid priceString: ${priceString}`);
        }
      });
  
      await batch.commit();
  
      console.log('Prices converted successfully for products with ref EDC004.');
    } catch (error) {
      console.error('Error converting prices:', error);
    } finally {
      admin.app().delete(); // Ensure to close the Firebase app connection
    }
  }
  
  convertPrices();