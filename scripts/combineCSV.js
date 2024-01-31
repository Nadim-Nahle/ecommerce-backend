const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const productsFile = '../assets/new-1.json';
let count =0;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
  storageBucket: 'ecommerce-nadim.appspot.com'
});

const db = admin.firestore();

var cosmetics = [
  {
    "link": "https://i.ibb.co/Gt9Ry3d/ASS061.jpg"
  },
  {
    "link": "https://i.ibb.co/rfrj7Fq/ASS071.jpg"
  },
  {
    "link": "https://i.ibb.co/jRW3gZG/ASS082.jpg"
  },
  {
    "link": "https://i.ibb.co/fqWTk1j/ASS088.jpg"
  },
  {
    "link": "https://i.ibb.co/Bq2sHk6/ASS089.jpg"
  },
  {
    "link": "https://i.ibb.co/hmRvhcF/ASS090.jpg"
  },
  {
    "link": "https://i.ibb.co/SPZvSDr/ASS125.jpg"
  },
  {
    "link": "https://i.ibb.co/tMDyQtg/ASS126.jpg"
  },
  {
    "link": "https://i.ibb.co/2cy4rxL/ASS130.jpg"
  },
  {
    "link": "https://i.ibb.co/nP50HZf/ASS132.jpg"
  },
  {
    "link": "https://i.ibb.co/Y8vK69L/AT002.jpg"
  },
  {
    "link": "https://i.ibb.co/Jxzf6sf/BAB029.jpg"
  },
  {
    "link": "https://i.ibb.co/ZNrtgVT/BAB035.jpg"
  },
  {
    "link": "https://i.ibb.co/8YyMxVW/BAB036.jpg"
  },
  {
    "link": "https://i.ibb.co/0jtmtL6/BAG001.jpg"
  },
  {
    "link": "https://i.ibb.co/dkzD0dv/BAG003.jpg"
  },
  {
    "link": "https://i.ibb.co/GHGhSGg/BAS002.jpg"
  },
  {
    "link": "https://i.ibb.co/fG70XWF/BAS004.jpg"
  },
  {
    "link": "https://i.ibb.co/2FpHQqL/BAU006.jpg"
  },
  {
    "link": "https://i.ibb.co/s3RXdfs/BL015.jpg"
  },
  {
    "link": "https://i.ibb.co/mtFv78F/BL016.jpg"
  },
  {
    "link": "https://i.ibb.co/r3rrYLC/BL019.jpg"
  },
  {
    "link": "https://i.ibb.co/ZX65CNr/BOI012.jpg"
  },
  {
    "link": "https://i.ibb.co/Bgtfhj6/BOI017.jpg"
  },
  {
    "link": "https://i.ibb.co/mh18BtY/BOI018.jpg"
  },
  {
    "link": "https://i.ibb.co/TghR029/BOJ001.jpg"
  },
  {
    "link": "https://i.ibb.co/gDjfttt/BOJ005.jpg"
  },
  {
    "link": "https://i.ibb.co/K0hxMBk/BOJ008.jpg"
  },
  {
    "link": "https://i.ibb.co/YpMq1Yv/BOJ009.jpg"
  },
  {
    "link": "https://i.ibb.co/PttWn9t/BOL022.jpg"
  },
  {
    "link": "https://i.ibb.co/2M0sspS/BRS020.jpg"
  },
  {
    "link": "https://i.ibb.co/DD34bq2/BRS021.jpg"
  },
  {
    "link": "https://i.ibb.co/1qfWdW9/CHA013.jpg"
  },
  {
    "link": "https://i.ibb.co/x3NTgYP/CHA035.jpg"
  },
  {
    "link": "https://i.ibb.co/g3LHTJS/CHA059.jpg"
  },
  {
    "link": "https://i.ibb.co/0mng8JW/CHP002.jpg"
  },
  {
    "link": "https://i.ibb.co/1dPs3LM/COT009.jpg"
  },
  {
    "link": "https://i.ibb.co/L9Q3Nfm/COU006.jpg"
  },
  {
    "link": "https://i.ibb.co/26SyL26/COU007.jpg"
  },
  {
    "link": "https://i.ibb.co/7n2T636/COU015.jpg"
  },
  {
    "link": "https://i.ibb.co/M7pZ4Mv/COU016.jpg"
  },
  {
    "link": "https://i.ibb.co/DzBY5Cg/COU017.jpg"
  },
  {
    "link": "https://i.ibb.co/9V01FVd/COU023.jpg"
  },
  {
    "link": "https://i.ibb.co/hYt8LsW/COU024.jpg"
  },
  {
    "link": "https://i.ibb.co/Jd4kfCQ/COU025.jpg"
  },
  {
    "link": "https://i.ibb.co/mqScgK7/COV002.jpg"
  },
  {
    "link": "https://i.ibb.co/Qc3hmtg/CP003.jpg"
  },
  {
    "link": "https://i.ibb.co/kMwZLVw/CR003.jpg"
  },
  {
    "link": "https://i.ibb.co/YyBKCQ8/CR004.jpg"
  },
  {
    "link": "https://i.ibb.co/gWtB4C5/CRA003.jpg"
  },
  {
    "link": "https://i.ibb.co/zmLFBMT/CUI025.jpg"
  },
  {
    "link": "https://i.ibb.co/WnR4PRH/CUI026.jpg"
  },
  {
    "link": "https://i.ibb.co/KrV33mn/CUV007.jpg"
  },
  {
    "link": "https://i.ibb.co/HY1xMWn/CUV008.jpg"
  },
  {
    "link": "https://i.ibb.co/pJ0vwmK/DEC010.jpg"
  },
  {
    "link": "https://i.ibb.co/G95CPNZ/DEN021.jpg"
  },
  {
    "link": "https://i.ibb.co/5xKf4v2/DEP002.jpg"
  },
  {
    "link": "https://i.ibb.co/Zh2vbSD/DET001.jpg"
  },
  {
    "link": "https://i.ibb.co/pW5H1qJ/DET003.jpg"
  },
  {
    "link": "https://i.ibb.co/y8rfqDP/EG012.jpg"
  },
  {
    "link": "https://i.ibb.co/QYWHZZZ/ENS003.jpg"
  },
  {
    "link": "https://i.ibb.co/f9Twxr0/ENT001.jpg"
  },
  {
    "link": "https://i.ibb.co/1GJjqXp/EP007.jpg"
  },
  {
    "link": "https://i.ibb.co/wJz25m7/ETA011.jpg"
  },
  {
    "link": "https://i.ibb.co/DRzC8FZ/ETA014.jpg"
  },
  {
    "link": "https://i.ibb.co/42RHy9p/FER005.jpg"
  },
  {
    "link": "https://i.ibb.co/k8V0vzf/FIL002.jpg"
  },
  {
    "link": "https://i.ibb.co/GFXkpvv/FL010.jpg"
  },
  {
    "link": "https://i.ibb.co/9Hsm7mm/FL020.jpg"
  },
  {
    "link": "https://i.ibb.co/NTCVQp0/FON001.jpg"
  },
  {
    "link": "https://i.ibb.co/x6NYDt1/FON004.jpg"
  },
  {
    "link": "https://i.ibb.co/RvL8Kvw/FOU004.jpg"
  },
  {
    "link": "https://i.ibb.co/ZGp1xSW/FOU005.jpg"
  },
  {
    "link": "https://i.ibb.co/RvL8Kvw/FOU004.jpg"
  },
  {
    "link": "https://i.ibb.co/QMQ0TWM/FOU014.jpg"
  },
  {
    "link": "https://i.ibb.co/KrxcMNY/FOU015.jpg"
  },
  {
    "link": "https://i.ibb.co/hC7GHNg/FOU017.jpg"
  },
  {
    "link": "https://i.ibb.co/DgjF35w/FRI003.jpg"
  },
  {
    "link": "https://i.ibb.co/Y7VCc8m/FRI004.jpg"
  },
  {
    "link": "https://i.ibb.co/MPS8TWg/FRI006.jpg"
  },
  {
    "link": "https://i.ibb.co/S7HntLg/GEL032.jpg"
  },
  {
    "link": "https://i.ibb.co/TK5CN7V/LIP003.jpg"
  },
  {
    "link": "https://i.ibb.co/fSxPgcd/LOU007.jpg"
  },
  {
    "link": "https://i.ibb.co/z5L5zbR/LOU008.jpg"
  },
  {
    "link": "https://i.ibb.co/jyJmYd8/LOU009.jpg"
  },
  {
    "link": "https://i.ibb.co/1qQzxR3/LOU010.jpg"
  },
  {
    "link": "https://i.ibb.co/JQBJJL0/MAC006.jpg"
  },
  {
    "link": "https://i.ibb.co/T89HXG2/MCH001.jpg"
  },
  {
    "link": "https://i.ibb.co/wN9QLxP/MOU007.jpg"
  },
  {
    "link": "https://i.ibb.co/F5JB7M8/MOU014.jpg"
  },
  {
    "link": "https://i.ibb.co/D4MytHY/MOU015.jpg"
  },
  {
    "link": "https://i.ibb.co/mvQD3rV/MOU017.jpg"
  },
  {
    "link": "https://i.ibb.co/k2TZmJb/MOU018.jpg"
  },
  {
    "link": "https://i.ibb.co/BVnMkJ2/MUG030.jpg"
  },
  {
    "link": "https://i.ibb.co/qWmk3Nb/ONG001.jpg"
  },
  {
    "link": "https://i.ibb.co/ygzPQfM/ONG003.jpg"
  },
  {
    "link": "https://i.ibb.co/zV30sRd/PA002.jpg"
  },
  {
    "link": "https://i.ibb.co/wgV8Dwk/PAN018.jpg"
  },
  {
    "link": "https://i.ibb.co/kJ2LcK3/PAN027.jpg"
  },
  {
    "link": "https://i.ibb.co/pxZZRRN/PAR005.jpg"
  },
  {
    "link": "https://i.ibb.co/LxK093g/PAR029.jpg"
  },
  {
    "link": "https://i.ibb.co/sy41sC7/PAR033.jpg"
  },
  {
    "link": "https://i.ibb.co/Cbtkqmk/PEL007.jpg"
  },
  {
    "link": "https://i.ibb.co/9GgTSqk/PIN003.jpg"
  },
  {
    "link": "https://i.ibb.co/vcX2yPf/PL014.jpg"
  },
  {
    "link": "https://i.ibb.co/jwWNfDG/PLA007.jpg"
  },
  {
    "link": "https://i.ibb.co/4NyzhWL/PLA008.jpg"
  },
  {
    "link": "https://i.ibb.co/4ZfcKbC/PLA011.jpg"
  },
  {
    "link": "https://i.ibb.co/bW4L8nM/POR002.jpg"
  },
  {
    "link": "https://i.ibb.co/zQpysMZ/POR012.jpg"
  },
  {
    "link": "https://i.ibb.co/nw5s936/POT002.jpg"
  },
  {
    "link": "https://i.ibb.co/MP4k9cC/PR004.jpg"
  },
  {
    "link": "https://i.ibb.co/Q6dzkr8/PRT001.jpg"
  },
  {
    "link": "https://i.ibb.co/mCLGjrQ/RAZ003.jpg"
  },
  {
    "link": "https://i.ibb.co/g6zJFzd/RID034.jpg"
  },
  {
    "link": "https://i.ibb.co/4pWMvYy/RID035.jpg"
  },
  {
    "link": "https://i.ibb.co/qgQtN4D/RID038.jpg"
  },
  {
    "link": "https://i.ibb.co/XCMF5vq/RID039.jpg"
  },
  {
    "link": "https://i.ibb.co/5sBGX79/RID040.jpg"
  },
  {
    "link": "https://i.ibb.co/fxP37qk/RID041.jpg"
  },
  {
    "link": "https://i.ibb.co/0nB2Psy/RID042.jpg"
  },
  {
    "link": "https://i.ibb.co/YhjXBsF/ROB001.jpg"
  },
  {
    "link": "https://i.ibb.co/LnhSNVL/SAC001.jpg"
  },
  {
    "link": "https://i.ibb.co/WpWqVjK/SAC004.jpg"
  },
  {
    "link": "https://i.ibb.co/rMyB8cB/SAC011.jpg"
  },
  {
    "link": "https://i.ibb.co/0MfZjjd/SAC013.jpg"
  },
  {
    "link": "https://i.ibb.co/SNFLhpq/SAC014.jpg"
  },
  {
    "link": "https://i.ibb.co/Fs9qZQ0/SAC018.jpg"
  },
  {
    "link": "https://i.ibb.co/q9fJSbq/SAC019.jpg"
  },
  {
    "link": "https://i.ibb.co/93VvQB6/SAC020.jpg"
  },
  {
    "link": "https://i.ibb.co/mGsw72s/SAC021.jpg"
  },
  {
    "link": "https://i.ibb.co/3zvfK3c/SAC022.jpg"
  },
  {
    "link": "https://i.ibb.co/k2S43sS/SAC023.jpg"
  },
  {
    "link": "https://i.ibb.co/gmGkVCb/SCO003.jpg"
  },
  {
    "link": "https://i.ibb.co/3MDL9wQ/SCO004.jpg"
  },
  {
    "link": "https://i.ibb.co/SxbN4yx/SEA008.jpg"
  },
  {
    "link": "https://i.ibb.co/KWn3mP6/SEA010.jpg"
  },
  {
    "link": "https://i.ibb.co/qYMMGfM/SEA011.jpg"
  },
  {
    "link": "https://i.ibb.co/ZHDHTK3/SET002.jpg"
  },
  {
    "link": "https://i.ibb.co/4Rv54zM/SET004.jpg"
  },
  {
    "link": "https://i.ibb.co/RzGDx09/SET006.jpg"
  },
  {
    "link": "https://i.ibb.co/Vq444F3/SIZ003.jpg"
  },
  {
    "link": "https://i.ibb.co/RBPwsJM/STA001.jpg"
  },
  {
    "link": "https://i.ibb.co/MCJ3G4Z/STK004.jpg"
  },
  {
    "link": "https://i.ibb.co/5T76tSX/STK005.jpg"
  },
  {
    "link": "https://i.ibb.co/ZW86gVv/STO002.jpg"
  },
  {
    "link": "https://i.ibb.co/FKNhwRV/SVL001.jpg"
  },
  {
    "link": "https://i.ibb.co/KsF9Vnd/TAB021.jpg"
  },
  {
    "link": "https://i.ibb.co/n3HFV3V/TAB022.jpg"
  },
  {
    "link": "https://i.ibb.co/FBbtbtk/TAB026.jpg"
  },
  {
    "link": "https://i.ibb.co/gJK6fKk/TOR002.jpg"
  },
  {
    "link": "https://i.ibb.co/Srt8CJv/TP008.jpg"
  },
  {
    "link": "https://i.ibb.co/wrwCyx4/TP010.jpg"
  },
  {
    "link": "https://i.ibb.co/D4HS9NC/TRI014.jpg"
  },
  {
    "link": "https://i.ibb.co/xYXhwGC/TRI015.jpg"
  },
  {
    "link": "https://i.ibb.co/HCYygKY/TU001.jpg"
  },
  {
    "link": "https://i.ibb.co/9bRKJy3/VAS034.jpg"
  },
  {
    "link": "https://i.ibb.co/7ny4yxp/VEI007.jpg"
  },
  {
    "link": "https://i.ibb.co/52pNkL0/ACR016.jpg"
  },
  {
    "link": "https://i.ibb.co/pQ632sk/ALB001.jpg"
  },
  {
    "link": "https://i.ibb.co/ZG27KwD/AMP002.jpg"
  },
  {
    "link": "https://i.ibb.co/jT6F476/AMP004.jpg"
  },
  {
    "link": "https://i.ibb.co/9yT54hF/AMP006.jpg"
  },
  {
    "link": "https://i.ibb.co/nQ2DsT1/AMP008.jpg"
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
                  category: "divers",
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
