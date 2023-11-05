const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const pricesFile = '../assets/prices.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();

fs.readFile(pricesFile, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    try {
        const priceData = JSON.parse(data);
        for (const priceInfo of priceData) {
            const { ref, price } = priceInfo;
            
            // Update the price of the product with the matching 'ref' in Firestore
            const productRef = db.collection('products').where('ref', '==', ref);

            productRef.get().then((snapshot) => {
                if (snapshot.empty) {
                    console.log(`No product found with ref: ${ref}`);
                } else {
                    snapshot.forEach((doc) => {
                        // Update the price of the product
                        db.collection('products').doc(doc.id).update({ price: price })
                            .then(() => {
                                console.log(`Updated price for product with ref ${ref} to ${price}`);
                            })
                            .catch((error) => {
                                console.error('Error updating product:', error);
                            });
                    });
                }
            }).catch((error) => {
                console.error('Error fetching product:', error);
            });
        }
    } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
    }
});
