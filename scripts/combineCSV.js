const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const productsFile = '../assets/cos-new.json';
let count =0;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
  storageBucket: 'ecommerce-nadim.appspot.com'
});

const db = admin.firestore();

var cosmetics = [
  {
    "link": "https://i.ibb.co/KmHHTtk/LAI049.jpg"
  },
  {
    "link": "https://i.ibb.co/R0kWKdt/LAI050.jpg"
  },
  {
    "link": "https://i.ibb.co/gtTY69n/PAR019.jpg"
  },
  {
    "link": "https://i.ibb.co/K9Sxnt5/POM002.jpg"
  },
  {
    "link": "https://i.ibb.co/RCgq9mB/POM012.jpg"
  },
  {
    "link": "https://i.ibb.co/qr4pn8z/SA017.jpg"
  },
  {
    "link": "https://i.ibb.co/YDmjwRT/SAV-002.jpg"
  },
  {
    "link": "https://i.ibb.co/0nCXS2j/SAV-003.jpg"
  },
  {
    "link": "https://i.ibb.co/J5ZXyfv/SAV-004.jpg"
  },
  {
    "link": "https://i.ibb.co/tQ2wHzB/SAV16.jpg"
  },
  {
    "link": "https://i.ibb.co/ZdSbtD3/SAV026.jpg"
  },
  {
    "link": "https://i.ibb.co/mJQNBqq/SAV027.jpg"
  },
  {
    "link": "https://i.ibb.co/drJgLd7/SHA001.jpg"
  },
  {
    "link": "https://i.ibb.co/5F68pZL/SHA002.jpg"
  },
  {
    "link": "https://i.ibb.co/sRgpmwL/TAL001.jpg"
  },
  {
    "link": "https://i.ibb.co/0f5xXMr/BAU006.jpg"
  },
  {
    "link": "https://i.ibb.co/yB0TM5z/BAU007.jpg"
  },
  {
    "link": "https://i.ibb.co/hDvJVmk/BAU008.jpg"
  },
  {
    "link": "https://i.ibb.co/rQQDRyp/BAU009.jpg"
  },
  {
    "link": "https://i.ibb.co/mGLnKg1/CR001.jpg"
  },
  {
    "link": "https://i.ibb.co/m9z1wmb/CR002.jpg"
  },
  {
    "link": "https://i.ibb.co/1MwpMyN/CR009.jpg"
  },
  {
    "link": "https://i.ibb.co/VNncJMt/CR010.jpg"
  },
  {
    "link": "https://i.ibb.co/QvFdw7y/CR011.jpg"
  },
  {
    "link": "https://i.ibb.co/RCQ56SL/CR012.jpg"
  },
  {
    "link": "https://i.ibb.co/QdVbxwP/CRE018.jpg"
  },
  {
    "link": "https://i.ibb.co/0CzDvKF/CRE035.jpg"
  },
  {
    "link": "https://i.ibb.co/VCcGfv8/GDO006.jpg"
  },
  {
    "link": "https://i.ibb.co/D7VXYXC/GDO007.jpg"
  },
  {
    "link": "https://i.ibb.co/y443Khd/GDO023.jpg"
  },
  {
    "link": "https://i.ibb.co/d5fPXNq/GDO024.jpg"
  },
  {
    "link": "https://i.ibb.co/G2vJzyZ/GDO025.jpg"
  },
  {
    "link": "https://i.ibb.co/Xt9d54g/GDO026.jpg"
  },
  {
    "link": "https://i.ibb.co/JQnHv0g/GDO027.jpg"
  },
  {
    "link": "https://i.ibb.co/Wt8JrsV/GDO028.jpg"
  },
  {
    "link": "https://i.ibb.co/Bs6MH8d/LAI-001.jpg"
  },
  {
    "link": "https://i.ibb.co/FwvZsDt/LAI-002.jpg"
  },
  {
    "link": "https://i.ibb.co/JBsVDzN/LAI-003.jpg"
  },
  {
    "link": "https://i.ibb.co/mSz5RV0/LAI-004.jpg"
  },
  {
    "link": "https://i.ibb.co/19hBB66/LAI-005.jpg"
  },
  {
    "link": "https://i.ibb.co/T0m9TrP/LAI-006.jpg"
  },
  {
    "link": "https://i.ibb.co/yqdgrCs/LAI-008.jpg"
  },
  {
    "link": "https://i.ibb.co/Cs72Ss4/LAI-009.jpg"
  },
  {
    "link": "https://i.ibb.co/6m16Xp5/LAI-010.jpg"
  },
  {
    "link": "https://i.ibb.co/nkS8sKB/LAI-011.jpg"
  },
  {
    "link": "https://i.ibb.co/yY2zNdY/LAI-012.jpg"
  },
  {
    "link": "https://i.ibb.co/KVSZpc0/LAI-013.jpg"
  },
  {
    "link": "https://i.ibb.co/ZHqkt8v/LAI-014.jpg"
  },
  {
    "link": "https://i.ibb.co/8mCfGzb/LAI-015.jpg"
  },
  {
    "link": "https://i.ibb.co/rxFmBv7/LAI-017.jpg"
  },
  {
    "link": "https://i.ibb.co/mGh3ppY/LAI-018.jpg"
  },
  {
    "link": "https://i.ibb.co/FgXsGF6/LAI011.jpg"
  },
  {
    "link": "https://i.ibb.co/wcsfdZj/LAI028.jpg"
  },
  {
    "link": "https://i.ibb.co/WyMjYmh/LAI029.jpg"
  },
  {
    "link": "https://i.ibb.co/tbqkxSd/LAI043.jpg"
  },
  {
    "link": "https://i.ibb.co/q9kHc9k/LAI044.jpg"
  },
  {
    "link": "https://i.ibb.co/r59HNF8/LAI045.jpg"
  },
  {
    "link": "https://i.ibb.co/4YQ8tvC/LAI046.jpg"
  },
  {
    "link": "https://i.ibb.co/L0mG8Fd/ACR026.jpg"
  },
  {
    "link": "https://i.ibb.co/Yd7jGKF/BIB009.jpg"
  },
  {
    "link": "https://i.ibb.co/P9CLsbd/BL022.jpg"
  },
  {
    "link": "https://i.ibb.co/G36H3Kn/BOI016.jpg"
  },
  {
    "link": "https://i.ibb.co/L1GkYpn/BOU003.jpg"
  },
  {
    "link": "https://i.ibb.co/bKqRpm9/CAR020.jpg"
  },
  {
    "link": "https://i.ibb.co/gttSfnW/CAR022.jpg"
  },
  {
    "link": "https://i.ibb.co/pXDvVxZ/CHA030.jpg"
  },
  {
    "link": "https://i.ibb.co/tY9YzmP/CHA060.jpg"
  },
  {
    "link": "https://i.ibb.co/8jT1YwN/CIN003.jpg"
  },
  {
    "link": "https://i.ibb.co/6PDH2qj/COU002.jpg"
  },
  {
    "link": "https://i.ibb.co/smJpb3t/COU028.jpg"
  },
  {
    "link": "https://i.ibb.co/bJkNGqX/COU029.jpg"
  },
  {
    "link": "https://i.ibb.co/Lg9kvzz/CRE026.jpg"
  },
  {
    "link": "https://i.ibb.co/12xvpJJ/CUI012.jpg"
  },
  {
    "link": "https://i.ibb.co/vQv8hHj/CUV011.jpg"
  },
  {
    "link": "https://i.ibb.co/LNhDbTt/DEC012.jpg"
  },
  {
    "link": "https://i.ibb.co/cr10BDG/EDT020.jpg"
  },
  {
    "link": "https://i.ibb.co/0J2F248/FER007.jpg"
  },
  {
    "link": "https://i.ibb.co/C0RRwT1/FL014.jpg"
  },
  {
    "link": "https://i.ibb.co/nsTp8gP/GAN007.jpg"
  },
  {
    "link": "https://i.ibb.co/Lk87xCD/LP001.jpg"
  },
  {
    "link": "https://i.ibb.co/p0SNjhK/PAS010.jpg"
  },
  {
    "link": "https://i.ibb.co/N777N1K/PIN007.jpg"
  },
  {
    "link": "https://i.ibb.co/W3cRTBj/SAV047.jpg"
  },
  {
    "link": "https://i.ibb.co/5n79W24/SIZ004.jpg"
  },
  {
    "link": "https://i.ibb.co/JRDT4MR/SPR002.jpg"
  },
  {
    "link": "https://i.ibb.co/8K9fw5j/TU001.jpg"
  },
  {
    "link": "https://i.ibb.co/P90CkRZ/VEI003.jpg"
  },
  {
    "link": "https://i.ibb.co/vH4PgJh/LAI047.jpg"
  },
  {
    "link": "https://i.ibb.co/XznTdX8/LAI048.jpg"
  }
 ]

fs.readFile(productsFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return; 
  }
  try {
    const jsonData = JSON.parse(data);
    for (const item of jsonData) {
      for (const cosmetic of cosmetics) {
        const extractedValue = extractValueFromURL(cosmetic.link);
        // console.log("value", extractedValue)
        if (item.ref === extractedValue) {
          // Check if a document with the same reference already exists
          db.collection('products')
            .where('ref', '==', item.ref)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.empty) {
                const priceWithoutCommas = item.price.replace(/,/g, '');

                // Create a new document in the "products" collection in Firestore
                const productData = {
                  ref: item.ref,
                  name: item.name,
                  quantity: 100000,
                  category: "cosmetique",
                  image: cosmetic.link,
                  price: parseFloat(priceWithoutCommas),
                  createdAt: admin.firestore.FieldValue.serverTimestamp()
                };

                db.collection('products')
                  .add(productData)
                  .then((docRef) => {
                    console.log('Document written with ID:', docRef.id);
                    count ++;
                  })
                  .catch((error) => {
                    console.error('Error adding document:', error);
                  });
              } else {
                console.log(`Product with ref ${item.ref} already exists. Skipping...`);
              }
            })
            .catch((error) => {
              console.error('Error checking for existing document:', error);
            });
        }
      }
    }
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
