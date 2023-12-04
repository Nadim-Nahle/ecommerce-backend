const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('../key.json');
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com',
  storageBucket: 'ecommerce-nadim.appspot.com'
});

const storage = admin.storage();
const bucket = storage.bucket();
let count = 0;
const db = admin.firestore();

var cosmetics = [
  {
    "ref": "POE006",
    "image": "https://i.ibb.co/vB5Zjtf/POE006.jpg"
  },
  {
    "ref": "J87",
    "image": "https://i.ibb.co/wBgH0BF/J87.jpg"
  },
  {
    "ref": "TER007",
    "image": "https://i.ibb.co/fqcC9kX/TER007.jpg"
  },
  {
    "ref": "J57",
    "image": "https://i.ibb.co/9p9GSRv/J57.jpg"
  },
  {
    "ref": "COU014",
    "image": "https://i.ibb.co/3hpGv6x/COU014.jpg"
  },
  {
    "ref": "CR005",
    "image": "https://i.ibb.co/5Mwm8Rh/CR005.jpg"
  },
  {
    "ref": "LIP011",
    "image": "https://i.ibb.co/G2Ls2Dk/LIP011.jpg"
  },
  {
    "ref": "CUI019",
    "image": "https://i.ibb.co/ZG5skfm/CUI019.jpg"
  },
  {
    "ref": "SAV12",
    "image": "https://i.ibb.co/2qsc4Wg/SAV12.jpg"
  },
  {
    "ref": "EDT004",
    "image": "https://i.ibb.co/cgRZPrr/EDT004.jpg"
  },
  {
    "ref": "J19",
    "image": "https://i.ibb.co/cw9BvMb/J19.jpg"
  },
  {
    "ref": "J135",
    "image": "https://i.ibb.co/zhz8FC2/J135.jpg"
  },
  {
    "ref": "SAC012",
    "image": "https://i.ibb.co/jkw2Qr0/SAC012.jpg"
  },
  {
    "ref": "J54",
    "image": "https://i.ibb.co/6mrK2NV/J54.jpg"
  },
  {
    "ref": "CHA028",
    "image": "https://i.ibb.co/10p4L5q/CHA028.jpg"
  },
  {
    "ref": "HUI003",
    "image": "https://i.ibb.co/9TygJFV/HUI003.jpg"
  },
  {
    "ref": "J117",
    "image": "https://i.ibb.co/vZbGQWX/J117.jpg"
  },
  {
    "ref": "CRE009",
    "image": "https://i.ibb.co/ZBxmDBB/CRE009.jpg"
  },
  {
    "ref": "TEN005",
    "image": "https://i.ibb.co/WDBH9vH/TEN005.jpg"
  },
  {
    "ref": "EG009",
    "image": "https://i.ibb.co/3B9hV5b/EG009.jpg"
  },
  {
    "ref": "VAS027",
    "image": "https://i.ibb.co/k8P0t7w/VAS027.jpg"
  },
  {
    "ref": "BAL003",
    "image": "https://i.ibb.co/h94WkfY/BAL003.jpg"
  },
  {
    "ref": "J90",
    "image": "https://i.ibb.co/xsKdfR7/J90.jpg"
  },
  {
    "ref": "MAR022",
    "image": "https://i.ibb.co/VqtqQSN/MAR022.jpg"
  },
  {
    "ref": "DEO021",
    "image": "https://i.ibb.co/9VgSvnr/DEO021.jpg"
  },
  {
    "ref": "ENS007",
    "image": "https://i.ibb.co/sK84njR/ENS007.jpg"
  },
  {
    "ref": "J50",
    "image": "https://i.ibb.co/sm4X26D/J50.jpg"
  },
  {
    "ref": "J125",
    "image": "https://i.ibb.co/rtFnk6Q/J125.jpg"
  },
  {
    "ref": "LIP010",
    "image": "https://i.ibb.co/w6bxdSN/LIP010.jpg"
  },
  {
    "ref": "COS001",
    "image": "https://i.ibb.co/Stt020T/COS001.jpg"
  },
  {
    "ref": "CAR015",
    "image": "https://i.ibb.co/60j4Skn/CAR015.jpg"
  },
  {
    "ref": "EDC016",
    "image": "https://i.ibb.co/hWGk1WQ/EDC016.jpg"
  },
  {
    "ref": "CRE022",
    "image": "https://i.ibb.co/CwnzPvH/CRE022.jpg"
  },
  {
    "ref": "ACR009",
    "image": "https://i.ibb.co/VWsXHCY/ACR009.jpg"
  },
  {
    "ref": "J63",
    "image": "https://i.ibb.co/1nBT9hS/J63.jpg"
  },
  {
    "ref": "GRA007",
    "image": "https://i.ibb.co/jMrbp93/GRA007.jpg"
  },
  {
    "ref": "BRS011",
    "image": "https://i.ibb.co/y5YKzqR/BRS011.jpg"
  },
  {
    "ref": "CAR018",
    "image": "https://i.ibb.co/y5v0zjB/CAR018.jpg"
  },
  {
    "ref": "J75",
    "image": "https://i.ibb.co/9tBmSm2/J75.jpg"
  },
  {
    "ref": "DEF005",
    "image": "https://i.ibb.co/GHmJ2DV/DEF005.jpg"
  },
  {
    "ref": "CRE018",
    "image": "https://i.ibb.co/Dr3RRx2/CRE018.jpg"
  },
  {
    "ref": "J68",
    "image": "https://i.ibb.co/1LzSyGY/J68.jpg"
  },
  {
    "ref": "ACR019",
    "image": "https://i.ibb.co/7v5yJD9/ACR019.jpg"
  },
  {
    "ref": "PAS005",
    "image": "https://i.ibb.co/2NFnmMd/PAS005.jpg"
  },
  {
    "ref": "LIP002",
    "image": "https://i.ibb.co/prj7MW6/LIP002.jpg"
  },
  {
    "ref": "PAN023",
    "image": "https://i.ibb.co/0FMF4F5/PAN023.jpg"
  },
  {
    "ref": "SHA007",
    "image": "https://i.ibb.co/4d558qN/SHA007.jpg"
  },
  {
    "ref": "COT008",
    "image": "https://i.ibb.co/XSsv4PR/COT008.jpg"
  },
  {
    "ref": "MOU003",
    "image": "https://i.ibb.co/R4Ydjp2/MOU003.jpg"
  },
  {
    "ref": "CUI006",
    "image": "https://i.ibb.co/V2VDgts/CUI006.jpg"
  }
 ]

async function downloadAndUploadImages() {
  try {
    for (const cosmetic of cosmetics) {
      const extractedValue = cosmetic.ref;
      if (extractedValue) {
        count++;
      }

      const existingImageUrl = cosmetic.image;
      const newStoragePath = `test/${extractedValue}.jpg`;

      try {
        const response = await axios.get(existingImageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const file = bucket.file(newStoragePath);
        await file.save(buffer);


        console.log('Image uploaded to Firebase Storage successfully!');

      if (file){
        const productsRef = db.collection('products');
        const querySnapshot = await productsRef.where('ref', '==', extractedValue).get();


        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: '03-09-2491' // Adjust expiration date as needed
            });
            await doc.ref.update({
              image: url, // Use the correct storage URL
            });
            console.log('New Image URL:', url)

            console.log('Product updated successfully!');
          });
        } else {
          console.error('No matching document found for the reference:', extractedValue);
        }
      }
        
        else {
          console.error('Image download failed. Database not updated.');
        }

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    console.log(count);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
}

function extractValueFromURL(url) {
  const startIndex = url.lastIndexOf('/') + 1;
  const endIndex = url.lastIndexOf('.jpg');

  if (startIndex !== -1 && endIndex !== -1) {
    return url.substring(startIndex, endIndex);
  } else {
    return null;
  }
}

// Call the function to download and upload images
downloadAndUploadImages();
