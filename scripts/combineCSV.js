const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const productsFile = '../assets/products-plastic.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();

var cosmetics = [
  {
    "link": "https://i.ibb.co/wMbvjPJ/ACR002.jpg"
  },
  {
    "link": "https://i.ibb.co/C6gbDqq/ACR004.jpg"
  },
  {
    "link": "https://i.ibb.co/92LpWLv/ACR005.jpg"
  },
  {
    "link": "https://i.ibb.co/QkmHk28/ACR006.jpg"
  },
  {
    "link": "https://i.ibb.co/TRtj86n/ACR007.jpg"
  },
  {
    "link": "https://i.ibb.co/XsgF3KV/ACR008.jpg"
  },
  {
    "link": "https://i.ibb.co/VWsXHCY/ACR009.jpg"
  },
  {
    "link": "https://i.ibb.co/7tvNRHs/ACR010.jpg"
  },
  {
    "link": "https://i.ibb.co/Brjhvn3/ACR018.jpg"
  },
  {
    "link": "https://i.ibb.co/7v5yJD9/ACR019.jpg"
  },
  {
    "link": "https://i.ibb.co/zrnq67G/ACR020.jpg"
  },
  {
    "link": "https://i.ibb.co/Chwx78B/ACR021.jpg"
  },
  {
    "link": "https://i.ibb.co/CQ0SDR7/ALU001.jpg"
  },
  {
    "link": "https://i.ibb.co/4FmGg7V/ALU002.jpg"
  },
  {
    "link": "https://i.ibb.co/QnR1C5F/ASR017.jpg"
  },
  {
    "link": "https://i.ibb.co/fqC369Z/ASS097.jpg"
  },
  {
    "link": "https://i.ibb.co/tZTLjdx/ASS106.jpg"
  },
  {
    "link": "https://i.ibb.co/B2RJDFQ/ASS121.jpg"
  },
  {
    "link": "https://i.ibb.co/mCrk9Lt/BAG002.jpg"
  },
  {
    "link": "https://i.ibb.co/h94WkfY/BAL003.jpg"
  },
  {
    "link": "https://i.ibb.co/9gD6nm1/BAL008.jpg"
  },
  {
    "link": "https://i.ibb.co/TwMYSTb/BAT001.jpg"
  },
  {
    "link": "https://i.ibb.co/0QgvX20/BL003.jpg"
  },
  {
    "link": "https://i.ibb.co/Zd29Z0Y/BL007.jpg"
  },
  {
    "link": "https://i.ibb.co/QcxHdcr/BL009.jpg"
  },
  {
    "link": "https://i.ibb.co/jHvsfQP/BL011.jpg"
  },
  {
    "link": "https://i.ibb.co/WFP3wy8/BL012.jpg"
  },
  {
    "link": "https://i.ibb.co/j5n7qsQ/BL014.jpg"
  },
  {
    "link": "https://i.ibb.co/vqzcSqg/BO002.jpg"
  },
  {
    "link": "https://i.ibb.co/ssMCTbr/BOI003.jpg"
  },
  {
    "link": "https://i.ibb.co/VMQD3Rz/BOI020.jpg"
  },
  {
    "link": "https://i.ibb.co/SN5tHXS/BOI021.jpg"
  },
  {
    "link": "https://i.ibb.co/Z1nWxL3/BOJ007.jpg"
  },
  {
    "link": "https://i.ibb.co/N2qzYKD/BOL008.jpg"
  },
  {
    "link": "https://i.ibb.co/y5YKzqR/BRS011.jpg"
  },
  {
    "link": "https://i.ibb.co/fNV2jT3/BRS014.jpg"
  },
  {
    "link": "https://i.ibb.co/RNr18Sv/BRS018.jpg"
  },
  {
    "link": "https://i.ibb.co/60j4Skn/CAR015.jpg"
  },
  {
    "link": "https://i.ibb.co/hLD1L0H/CAR017.jpg"
  },
  {
    "link": "https://i.ibb.co/y5v0zjB/CAR018.jpg"
  },
  {
    "link": "https://i.ibb.co/chMnRRQ/CAS001.jpg"
  },
  {
    "link": "https://i.ibb.co/M2yFyF7/CEN002.jpg"
  },
  {
    "link": "https://i.ibb.co/0hQ6Pgt/CEN003.jpg"
  },
  {
    "link": "https://i.ibb.co/10p4L5q/CHA028.jpg"
  },
  {
    "link": "https://i.ibb.co/ryWjjfz/CHA029.jpg"
  },
  {
    "link": "https://i.ibb.co/VBX5PnW/CHA031.jpg"
  },
  {
    "link": "https://i.ibb.co/G540Hxv/CHA032.jpg"
  },
  {
    "link": "https://i.ibb.co/JQQCzQ7/CHA033.jpg"
  },
  {
    "link": "https://i.ibb.co/bzTFNNF/CHE003.jpg"
  },
  {
    "link": "https://i.ibb.co/hRsb9q1/CHE004.jpg"
  },
  {
    "link": "https://i.ibb.co/2jTTqph/CHE005.jpg"
  },
  {
    "link": "https://i.ibb.co/P5tMVdv/CHI001.jpg"
  },
  {
    "link": "https://i.ibb.co/8xtprtq/COI016.jpg"
  },
  {
    "link": "https://i.ibb.co/NCbhV3k/COR002.jpg"
  },
  {
    "link": "https://i.ibb.co/Stt020T/COS001.jpg"
  },
  {
    "link": "https://i.ibb.co/ykpCnFG/COS005.jpg"
  },
  {
    "link": "https://i.ibb.co/JtLDxcK/COS009.jpg"
  },
  {
    "link": "https://i.ibb.co/XSsv4PR/COT008.jpg"
  },
  {
    "link": "https://i.ibb.co/6rZjtp6/COU008.jpg"
  },
  {
    "link": "https://i.ibb.co/7QsFdq8/COU012.jpg"
  },
  {
    "link": "https://i.ibb.co/phPC23L/COU013.jpg"
  },
  {
    "link": "https://i.ibb.co/3hpGv6x/COU014.jpg"
  },
  {
    "link": "https://i.ibb.co/VWtHXjt/COU018.jpg"
  },
  {
    "link": "https://i.ibb.co/hXzj1f3/COU020.jpg"
  },
  {
    "link": "https://i.ibb.co/YZdSKpv/VER077.jpg"
  },
  {
    "link": "https://i.ibb.co/QmhCDS4/COU021.jpg"
  },
  {
    "link": "https://i.ibb.co/99nVtLV/CP001.jpg"
  },
  {
    "link": "https://i.ibb.co/MfCY2Sf/CR007.jpg"
  },
  {
    "link": "https://i.ibb.co/dg9JWRy/CUB001.jpg"
  },
  {
    "link": "https://i.ibb.co/zmrypLS/CUI001.jpg"
  },
  {
    "link": "https://i.ibb.co/V2VDgts/CUI006.jpg"
  },
  {
    "link": "https://i.ibb.co/cFx04y9/CUI007.jpg"
  },
  {
    "link": "https://i.ibb.co/Ry53FW7/CUI008.jpg"
  },
  {
    "link": "https://i.ibb.co/WBjychB/CUI009.jpg"
  },
  {
    "link": "https://i.ibb.co/1TJtgxs/CUI010.jpg"
  },
  {
    "link": "https://i.ibb.co/0fCyzVH/CUI013.jpg"
  },
  {
    "link": "https://i.ibb.co/7QNkcXj/CUI014.jpg"
  },
  {
    "link": "https://i.ibb.co/QCnyxxb/CUI015.jpg"
  },
  {
    "link": "https://i.ibb.co/KzsyZ0z/CUI017.jpg"
  },
  {
    "link": "https://i.ibb.co/ZG5skfm/CUI019.jpg"
  },
  {
    "link": "https://i.ibb.co/h2fmd6S/CUI020.jpg"
  },
  {
    "link": "https://i.ibb.co/6gvdjnY/CUI021.jpg"
  },
  {
    "link": "https://i.ibb.co/tCyrXMC/CUI022.jpg"
  },
  {
    "link": "https://i.ibb.co/JRjRgDV/CUI024.jpg"
  },
  {
    "link": "https://i.ibb.co/jv3YfF1/CUI25.jpg"
  },
  {
    "link": "https://i.ibb.co/tpxLt2s/CUV001.jpg"
  },
  {
    "link": "https://i.ibb.co/NVpbt6k/DEB002.jpg"
  },
  {
    "link": "https://i.ibb.co/j5zPMPz/DEC009.jpg"
  },
  {
    "link": "https://i.ibb.co/bvzpSvZ/DEC013.jpg"
  },
  {
    "link": "https://i.ibb.co/dGLT9xt/DEC014.jpg"
  },
  {
    "link": "https://i.ibb.co/sCdKHGR/DES006.jpg"
  },
  {
    "link": "https://i.ibb.co/Gck8vKz/DES008.jpg"
  },
  {
    "link": "https://i.ibb.co/C9w7PPZ/DES009.jpg"
  },
  {
    "link": "https://i.ibb.co/CPvkJjC/DES010.jpg"
  },
  {
    "link": "https://i.ibb.co/q0R91DD/DET002.jpg"
  },
  {
    "link": "https://i.ibb.co/bvNFmFr/DS-74.jpg"
  },
  {
    "link": "https://i.ibb.co/ZVmp1Gs/DS-140.jpg"
  },
  {
    "link": "https://i.ibb.co/QjGHrwv/DS-180.jpg"
  },
  {
    "link": "https://i.ibb.co/CWtZ6HQ/DS-196.jpg"
  },
  {
    "link": "https://i.ibb.co/615BV7c/DS-240.jpg"
  },
  {
    "link": "https://i.ibb.co/2yP38jP/DZ001.jpg"
  },
  {
    "link": "https://i.ibb.co/3B9hV5b/EG009.jpg"
  },
  {
    "link": "https://i.ibb.co/jRHg93k/EG010.jpg"
  },
  {
    "link": "https://i.ibb.co/q0RKMzk/ENS005.jpg"
  },
  {
    "link": "https://i.ibb.co/sK84njR/ENS007.jpg"
  },
  {
    "link": "https://i.ibb.co/C5F85qW/EP009.jpg"
  },
  {
    "link": "https://i.ibb.co/BKG3vBN/EP012.jpg"
  },
  {
    "link": "https://i.ibb.co/zGMxNSs/EPL003.jpg"
  },
  {
    "link": "https://i.ibb.co/WsJGJbz/FER001.jpg"
  },
  {
    "link": "https://i.ibb.co/sKW3r0G/FER005.jpg"
  },
  {
    "link": "https://i.ibb.co/jfY07Bq/FER006.jpg"
  },
  {
    "link": "https://i.ibb.co/t4L4pVq/FL010.jpg"
  },
  {
    "link": "https://i.ibb.co/kBbsGRg/FLM001.jpg"
  },
  {
    "link": "https://i.ibb.co/QHwNm93/FOU04.jpg"
  },
  {
    "link": "https://i.ibb.co/xfYc3zj/FOU05.jpg"
  },
  {
    "link": "https://i.ibb.co/9h78dp3/FOU010.jpg"
  },
  {
    "link": "https://i.ibb.co/fGryW0X/FOU011.jpg"
  },
  {
    "link": "https://i.ibb.co/TTmzhp5/FOU013.jpg"
  },
  {
    "link": "https://i.ibb.co/1bb4mkM/FOU014.jpg"
  },
  {
    "link": "https://i.ibb.co/GMMZ7T3/FOU015.jpg"
  },
  {
    "link": "https://i.ibb.co/SNLJfDT/FRI003.jpg"
  },
  {
    "link": "https://i.ibb.co/Phwz3b9/FRI004.jpg"
  },
  {
    "link": "https://i.ibb.co/HNgpr4g/FRI006.jpg"
  },
  {
    "link": "https://i.ibb.co/jhm2sT4/GAN002.jpg"
  },
  {
    "link": "https://i.ibb.co/0KTVZsc/GAN005.jpg"
  },
  {
    "link": "https://i.ibb.co/wgT16GZ/GOB003.jpg"
  },
  {
    "link": "https://i.ibb.co/Y3ZGxV0/GOB004.jpg"
  },
  {
    "link": "https://i.ibb.co/qYQwC6g/GOB005.jpg"
  },
  {
    "link": "https://i.ibb.co/dgYXnPW/GRA006.jpg"
  },
  {
    "link": "https://i.ibb.co/jMrbp93/GRA007.jpg"
  },
  {
    "link": "https://i.ibb.co/Ln02Hy3/GRA008.jpg"
  },
  {
    "link": "https://i.ibb.co/pzj3cGB/LAV003.jpg"
  },
  {
    "link": "https://i.ibb.co/r3CJxVM/LOU002.jpg"
  },
  {
    "link": "https://i.ibb.co/GH8vVYD/LOU003.jpg"
  },
  {
    "link": "https://i.ibb.co/RTP7F15/LOU004.jpg"
  },
  {
    "link": "https://i.ibb.co/2jqRvKk/LOU005.jpg"
  },
  {
    "link": "https://i.ibb.co/rm565x3/LOU006.jpg"
  },
  {
    "link": "https://i.ibb.co/YfBq3Pk/MAC001.jpg"
  },
  {
    "link": "https://i.ibb.co/ZXWTDBp/MAC005.jpg"
  },
  {
    "link": "https://i.ibb.co/qRLnP6f/MAR014.jpg"
  },
  {
    "link": "https://i.ibb.co/xjNqL71/MAR020.jpg"
  },
  {
    "link": "https://i.ibb.co/g4Q4pqQ/MAR021.jpg"
  },
  {
    "link": "https://i.ibb.co/VqtqQSN/MAR022.jpg"
  },
  {
    "link": "https://i.ibb.co/tmd7RBX/MAR024.jpg"
  },
  {
    "link": "https://i.ibb.co/mvkgdWb/MAR025.jpg"
  },
  {
    "link": "https://i.ibb.co/VV5Fz6n/MAR027.jpg"
  },
  {
    "link": "https://i.ibb.co/hLDPbXL/MON005.jpg"
  },
  {
    "link": "https://i.ibb.co/KybXfVy/MOR002.jpg"
  },
  {
    "link": "https://i.ibb.co/R4Ydjp2/MOU003.jpg"
  },
  {
    "link": "https://i.ibb.co/wsHVqCG/MOU010.jpg"
  },
  {
    "link": "https://i.ibb.co/drsXfr5/OUV003.jpg"
  },
  {
    "link": "https://i.ibb.co/nwWzgr9/OUV004.jpg"
  },
  {
    "link": "https://i.ibb.co/k6ktmNR/OUV005.jpg"
  },
  {
    "link": "https://i.ibb.co/MBH7yxX/PAN011.jpg"
  },
  {
    "link": "https://i.ibb.co/0FMF4F5/PAN023.jpg"
  },
  {
    "link": "https://i.ibb.co/2NFnmMd/PAS005.jpg"
  },
  {
    "link": "https://i.ibb.co/D8qYjQ3/PEL004.jpg"
  },
  {
    "link": "https://i.ibb.co/FYbCMXH/PEL008.jpg"
  },
  {
    "link": "https://i.ibb.co/TWRVQ8P/PIN010.jpg"
  },
  {
    "link": "https://i.ibb.co/rxWQysR/PO005.jpg"
  },
  {
    "link": "https://i.ibb.co/tB64DDB/POE004.jpg"
  },
  {
    "link": "https://i.ibb.co/rGvWN75/POE005.jpg"
  },
  {
    "link": "https://i.ibb.co/vB5Zjtf/POE006.jpg"
  },
  {
    "link": "https://i.ibb.co/7jyWKpR/POT002.jpg"
  },
  {
    "link": "https://i.ibb.co/Qkrd5WL/POT003.jpg"
  },
  {
    "link": "https://i.ibb.co/kMYzRsf/POT004.jpg"
  },
  {
    "link": "https://i.ibb.co/9Yjthbn/POT005.jpg"
  },
  {
    "link": "https://i.ibb.co/frwGYSn/PR001.jpg"
  },
  {
    "link": "https://i.ibb.co/F8YdNZK/PR002.jpg"
  },
  {
    "link": "https://i.ibb.co/YtvFmjz/PRD007.jpg"
  },
  {
    "link": "https://i.ibb.co/60DqTbL/PRD008.jpg"
  },
  {
    "link": "https://i.ibb.co/wWT4vHP/RAP002.jpg"
  },
  {
    "link": "https://i.ibb.co/PMSfc21/ROL001.jpg"
  },
  {
    "link": "https://i.ibb.co/6PH8mgd/ROU007.jpg"
  },
  {
    "link": "https://i.ibb.co/jkw2Qr0/SAC012.jpg"
  },
  {
    "link": "https://i.ibb.co/VtLYBd2/SEA016.jpg"
  },
  {
    "link": "https://i.ibb.co/99DKbZb/SEC003.jpg"
  },
  {
    "link": "https://i.ibb.co/Jz56Lhv/SET011.jpg"
  },
  {
    "link": "https://i.ibb.co/BqJB7ww/SIZ002.jpg"
  },
  {
    "link": "https://i.ibb.co/XFLC6Kt/SIZ005.jpg"
  },
  {
    "link": "https://i.ibb.co/5k3R535/SVL001.jpg"
  },
  {
    "link": "https://i.ibb.co/WxmQbyf/T20.jpg"
  },
  {
    "link": "https://i.ibb.co/qFM2pRt/TAB015.jpg"
  },
  {
    "link": "https://i.ibb.co/S6vs1QK/TAP032.jpg"
  },
  {
    "link": "https://i.ibb.co/WDBH9vH/TEN005.jpg"
  },
  {
    "link": "https://i.ibb.co/BNxynDS/TEN006.jpg"
  },
  {
    "link": "https://i.ibb.co/YQYvGZT/TER006.jpg"
  },
  {
    "link": "https://i.ibb.co/fqcC9kX/TER007.jpg"
  },
  {
    "link": "https://i.ibb.co/SVH4dpS/TOR001.jpg"
  },
  {
    "link": "https://i.ibb.co/k8P0t7w/VAS027.jpg"
  },
  {
    "link": "https://i.ibb.co/cXkDQXv/VER025.jpg"
  },
  {
    "link": "https://i.ibb.co/vx2pY6w/VER028.jpg"
  },
  {
    "link": "https://i.ibb.co/zQvv7n0/VER055.jpg"
  },
  {
    "link": "https://i.ibb.co/vq0ndPj/VER073.jpg"
  },
  {
    "link": "https://i.ibb.co/HGYp8DF/VER074.jpg"
  },
  {
    "link": "https://i.ibb.co/grrhnqc/VER075.jpg"
  },
  {
    "link": "https://i.ibb.co/TT4Y8p8/20231115-172724.jpg"
  },
  {
    "link": "https://i.ibb.co/XJdnj8b/20231115-172811.jpg"
  },
  {
    "link": "https://i.ibb.co/hdG06w9/20231115-172836.jpg"
  },
  {
    "link": "https://i.ibb.co/xHHg1RX/BAS010.jpg"
  },
  {
    "link": "https://i.ibb.co/zZfbTr5/BAS011.jpg"
  },
  {
    "link": "https://i.ibb.co/hZgbXcK/BAS013.jpg"
  },
  {
    "link": "https://i.ibb.co/SrKF1cb/BOI007.jpg"
  },
  {
    "link": "https://i.ibb.co/djDNzPT/Bol021.jpg"
  },
  {
    "link": "https://i.ibb.co/Cm4PRN4/Bou011.jpg"
  },
  {
    "link": "https://i.ibb.co/6ZyzbG9/Pas006.jpg"
  },
  {
    "link": "https://i.ibb.co/L6HLcmL/Pel009.jpg"
  },
  {
    "link": "https://i.ibb.co/DwkYbyN/Pot006.jpg"
  },
  {
    "link": "https://i.ibb.co/qx3KdLQ/Sea.jpg"
  },
  {
    "link": "https://i.ibb.co/JjcwVZB/Sea017.jpg"
  },
  {
    "link": "https://i.ibb.co/0KvpB6m/Sea021.jpg"
  },
  {
    "link": "https://i.ibb.co/Hr75Gj9/Sea022.jpg"
  },
  {
    "link": "https://i.ibb.co/948kcKF/Sea023.jpg"
  },
  {
    "link": "https://i.ibb.co/TrMJ185/Sea024.jpg"
  },
  {
    "link": "https://i.ibb.co/CwXdvcy/Sea025.jpg"
  },
  {
    "link": "https://i.ibb.co/YBdpF65/Sea026.jpg"
  },
  {
    "link": "https://i.ibb.co/fMJQ70b/Sea027.jpg"
  },
  {
    "link": "https://i.ibb.co/Fz2JTyP/Sea028.jpg"
  },
  {
    "link": "https://i.ibb.co/LSwbnxN/Sea029.jpg"
  },
  {
    "link": "https://i.ibb.co/py7kLX3/Tap035.jpg"
  },
  {
    "link": "https://i.ibb.co/7pdsv4V/Tap036.jpg"
  },
  {
    "link": "https://i.ibb.co/9yXS6yH/Tap037.jpg"
  },
  {
    "link": "https://i.ibb.co/fxW8dGh/Tap038.jpg"
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

        if (item.ref === extractedValue) {
          // Check if a document with the same reference already exists
          db.collection('products')
            .where('ref', '==', item.ref)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.empty) {
                // Create a new document in the "products" collection in Firestore
                const productData = {
                  ref: item.ref,
                  name: item.name,
                  quantity: 100000,
                  category: "divers",
                  image: cosmetic.link,
                  price: 10
                };

                db.collection('products')
                  .add(productData)
                  .then((docRef) => {
                    console.log('Document written with ID:', docRef.id);
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
