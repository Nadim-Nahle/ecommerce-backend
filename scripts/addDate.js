const admin = require('firebase-admin');
const serviceAccount =  require('../qa.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function addTimestampToProducts() {
    const productsRef = admin.firestore().collection('products');
  
    try {
      const productsSnapshot = await productsRef.get();
  
      const updatePromises = productsSnapshot.docs.map(async (doc) => {
        const data = doc.data();
  
        if (!data.createdAt) {
          // If createdAt doesn't exist, set it to a specific timestamp (e.g., '01/11/2023')
          const newTimestamp = {
            _seconds: 1641907200, // Replace with your desired timestamp in seconds
            _nanoseconds: 0, // You can set nanoseconds to 0 or any other value
          };
  
          await productsRef.doc(doc.id).update({ createdAt: newTimestamp });
        }
      });
  
      await Promise.all(updatePromises);
      console.log('Timestamps added successfully.');
    } catch (error) {
      console.error('Error adding timestamps:', error);
    } finally {
      // Remember to terminate the Firebase Admin SDK properly
      admin.app().delete();
    }
  }
  
  // Execute the function
  addTimestampToProducts();