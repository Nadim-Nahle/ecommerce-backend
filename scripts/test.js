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
        "id": "4ywuQkTga6E0x1ryNVBq",
        "ref": "GDO027",
        "name": "Gel de douche GOLD SKIN  ESCARGOT 500ML (24)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/JQnHv0g/GDO027.jpg",
        "price": 1200,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 28000000
        }
    },
    {
        "id": "8vJ76NKFhULcSf1a9a2s",
        "ref": "SHA001",
        "name": "Shampoing SULFUR 18-200 ml (60)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/drJgLd7/SHA001.jpg",
        "price": 550,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 35000000
        }
    },
    {
        "id": "V90PrxyD6R0jph5AaycO",
        "ref": "LAI046",
        "name": "Lait FAMILIA AMANDE 300ML (48)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/4YQ8tvC/LAI046.jpg",
        "price": 750,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 94000000
        }
    },
    {
        "id": "jl1doBtykuZq5t2pAeKk",
        "ref": "PAR019",
        "name": "parfum MARQUISE BLEU 100ML (72)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/gtTY69n/PAR019.jpg",
        "price": 2100,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 75000000
        }
    },
    {
        "id": "oJzhLIseq9Tn6v1qVwz6",
        "ref": "LAI050",
        "name": "Lait FAMILIA H. INTENSE 500ML (48)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/R0kWKdt/LAI050.jpg",
        "price": 1150,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 180000000
        }
    },
    {
        "id": "qPwsN0I39D8XNCqg0JUl",
        "ref": "GDO025",
        "name": "Gel de douche CLAIR LISS 500ML (24)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/G2vJzyZ/GDO025.jpg",
        "price": 1150,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 19000000
        }
    },
    {
        "id": "trlTg6ML7Qs9BqsfuycT",
        "ref": "POM012",
        "name": "Pommade FAMILIA 220ML (96)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/RCgq9mB/POM012.jpg",
        "price": 850,
        "createdAt": {
            "_seconds": 1713700513,
            "_nanoseconds": 20000000
        }
    },
    {
        "id": "HeKUxkwSlhtUZfwbZS73",
        "ref": "LAI047",
        "name": "lait FAMILIA VT E 300ML (48)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/vH4PgJh/LAI047.jpg",
        "price": 750,
        "createdAt": {
            "_seconds": 1713700512,
            "_nanoseconds": 491000000
        }
    },
    {
        "id": "rYBlTnK6Ijv48DQuomzx",
        "ref": "LAI048",
        "name": "Lait FAMILIA AMANDE 500ML (48)",
        "category": "cosmetique",
        "quantity": 100000,
        "image": "https://i.ibb.co/XznTdX8/LAI048.jpg",
        "price": 1150,
        "createdAt": {
            "_seconds": 1713700512,
            "_nanoseconds": 458000000
        }
    },
    {
        "id": "1044uSIl4FkaFe5zZuf2",
        "ref": "SAV047",
        "name": "Savon gommant en pot 450g CAROTTE (48)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/W3cRTBj/SAV047.jpg",
        "price": 900,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 557000000
        }
    },
    {
        "id": "3qRB1URZTxZZ8nN0c3kq",
        "ref": "PAS010",
        "name": "Passoir pliable sans manche YM-555 (144)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/p0SNjhK/PAS010.jpg",
        "price": 900,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 698000000
        }
    },
    {
        "id": "3rIQDPn2QupOr9bO4Y0Q",
        "ref": "ACR026",
        "name": "Accroche papier hygienique carte YM-339 (120)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/L0mG8Fd/ACR026.jpg",
        "price": 850,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 100000000
        }
    },
    {
        "id": "HI6vP01AYPY2ySXbH4Cq",
        "ref": "DEC012",
        "name": "Decoration singe G24-68B (48)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/LNhDbTt/DEC012.jpg",
        "price": 300,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 122000000
        }
    },
    {
        "id": "MKNy5YRIq4MLTbCqumVD",
        "ref": "CHA060",
        "name": "Chauffe A Eau MARADO G13-F34 (16pc)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/tY9YzmP/CHA060.jpg",
        "price": 4500,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 125000000
        }
    },
    {
        "id": "MswnN0kx87bxQu4Wkaq8",
        "ref": "COU002",
        "name": "Couteau Cuisine 3pc_MH736(2)-240PC",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/6PDH2qj/COU002.jpg",
        "price": 750,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 96000000
        }
    },
    {
        "id": "OjoeV81q6kL9z7T2jrDf",
        "ref": "COU029",
        "name": "Couteau PROESIONAL Noir N\"7 YM-390 12/Pqt",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/bJkNGqX/COU029.jpg",
        "price": 8000,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 697000000
        }
    },
    {
        "id": "QAk8yWHLqff4DU1MDWDA",
        "ref": "FER007",
        "name": "Fer a repasser IRON YM-355 MB-1103 (20)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/0J2F248/FER007.jpg",
        "price": 7500,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 557000000
        }
    },
    {
        "id": "X6w2mpxaVw2aD4Bm7GFS",
        "ref": "SIZ004",
        "name": "Siceau ongle carte p.m RM106-B (12)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/5n79W24/SIZ004.jpg",
        "price": 250,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 772000000
        }
    },
    {
        "id": "XdZzeIzCudi767OYes0C",
        "ref": "LP001",
        "name": "Lip Stick BON BON (12)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/Lk87xCD/LP001.jpg",
        "price": 1250,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 701000000
        }
    },
    {
        "id": "YM7hYKRADCifDtDgbm7Z",
        "ref": "EDT020",
        "name": "EDT MALIZIA VETYVER 50ML (12)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/cr10BDG/EDT020.jpg",
        "price": 2000,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 123000000
        }
    },
    {
        "id": "aptgQBSHvmR6fXc0jsmn",
        "ref": "CIN003",
        "name": "Cintre Habit En Bois 3pc YM-144 (40pc)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/8jT1YwN/CIN003.jpg",
        "price": 1350,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 104000000
        }
    },
    {
        "id": "c4OUsNfyAdyhhn8vc8kA",
        "ref": "FL014",
        "name": "Fleur Artificiel p.m E32-D105",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/C0RRwT1/FL014.jpg",
        "price": 550,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 572000000
        }
    },
    {
        "id": "ekXRm186YS1SpTKxeTdz",
        "ref": "PIN007",
        "name": "Pince Cuisine G.M   PR-18(62)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/N777N1K/PIN007.jpg",
        "price": 700,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 559000000
        }
    },
    {
        "id": "h3nWv7dcpFSGWkQAm03x",
        "ref": "GAN007",
        "name": "Gaine De Sport HOT-SHAPERS G13-F35 (100pc)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/nsTp8gP/GAN007.jpg",
        "price": 2500,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 128000000
        }
    },
    {
        "id": "l23K1LORIgllNZxm3BT6",
        "ref": "COU028",
        "name": "Couteau PROFESIONAL N\"7 12/Pqt YM-386",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/smJpb3t/COU028.jpg",
        "price": 9000,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 559000000
        }
    },
    {
        "id": "qiB6En0jb7lrP5ur4UuW",
        "ref": "CHA030",
        "name": "Chausette MIANSG 10pcs/pqt F56-E120",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/pXDvVxZ/CHA030.jpg",
        "price": 350,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 250000000
        }
    },
    {
        "id": "vpMEHzz8XnsbE8MP1S8R",
        "ref": "BOU003",
        "name": "Boutteile Plastic 2pc YM-183 (100pc)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/L1GkYpn/BOU003.jpg",
        "price": 650,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 426000000
        }
    },
    {
        "id": "wYnTcRQj0JoWmiGrRApu",
        "ref": "SPR002",
        "name": "Spray PHARMADERM antibacterien 70ML (72)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/JRDT4MR/SPR002.jpg",
        "price": 290,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 701000000
        }
    },
    {
        "id": "z7vuBXyWQr5gQxBor8Hh",
        "ref": "BOI016",
        "name": "Boite de sucre deco pain SC151/03",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/G36H3Kn/BOI016.jpg",
        "price": 850,
        "createdAt": {
            "_seconds": 1713700246,
            "_nanoseconds": 101000000
        }
    },
    {
        "id": "YwPZUZmNDIVwTnxBUqhF",
        "ref": "BL022",
        "name": "Blender Manuerl Cord P.M YM-414 (60pc)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/P9CLsbd/BL022.jpg",
        "price": 1800,
        "createdAt": {
            "_seconds": 1713700245,
            "_nanoseconds": 736000000
        }
    },
    {
        "id": "m9nJac1xRiNVU9boguJH",
        "ref": "BIB009",
        "name": "Biberon plastic dBb 270ml G07-F24 , C08-B24 (72)",
        "category": "divers",
        "quantity": 100000,
        "image": "https://i.ibb.co/Yd7jGKF/BIB009.jpg",
        "price": 1650,
        "createdAt": {
            "_seconds": 1713700245,
            "_nanoseconds": 739000000
        }
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
