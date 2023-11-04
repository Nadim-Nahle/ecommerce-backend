const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

const fs = require('fs');
const productsFile = '../assets/products.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();

var cosmetics = [

    {
        "link": "https://i.ibb.co/MMr2yGb/BDB001.jpg"
    },
    {
        "link": "https://i.ibb.co/zH5c87F/BDB011.jpg"
    },
    {
        "link": "https://i.ibb.co/dMsvWS8/CHA009.jpg"
    },
    {
        "link": "https://i.ibb.co/rsXX3Ng/CR002.jpg"
    },
    {
        "link": "https://i.ibb.co/5Mwm8Rh/CR005.jpg"
    },
    {
        "link": "https://i.ibb.co/kmt4w73/CR006.jpg"
    },
    {
        "link": "https://i.ibb.co/NVkKyLN/CRE001.jpg"
    },
    {
        "link": "https://i.ibb.co/VxFMPy0/CRE002.jpg"
    },
    {
        "link": "https://i.ibb.co/ZBxmDBB/CRE009.jpg"
    },
    {
        "link": "https://i.ibb.co/Dr3RRx2/CRE018.jpg"
    },
    {
        "link": "https://i.ibb.co/xS6zjT3/CRE010.jpg"
    },
    {
        "link": "https://i.ibb.co/CwnzPvH/CRE022.jpg"
    },
    {
        "link": "https://i.ibb.co/dMrXbSX/CRE026.jpg"
    },
    {
        "link": "https://i.ibb.co/N6gw2HD/CRE030.jpg"
    },
    {
        "link": "https://i.ibb.co/xGB5CT8/CRE035.jpg"
    },
    {
        "link": "https://i.ibb.co/DbJ46Wn/DEF004.jpg"
    },
    {
        "link": "https://i.ibb.co/GHmJ2DV/DEF005.jpg"
    },
    {
        "link": "https://i.ibb.co/25xvXxm/DEF007.jpg"
    },
    {
        "link": "https://i.ibb.co/HKzRZRK/DEM001.jpg"
    },
    {
        "link": "https://i.ibb.co/9VgSvnr/DEO021.jpg"
    },
    {
        "link": "https://i.ibb.co/F7QSLy4/DOD002.jpg"
    },
    {
        "link": "https://i.ibb.co/nwBwqwz/DOD008.jpg"
    },
    {
        "link": "https://i.ibb.co/zrc6zVw/DS-70.jpg"
    },
    {
        "link": "https://i.ibb.co/Pxf6XQt/DS-102.jpg"
    },
    {
        "link": "https://i.ibb.co/cQJKwq7/DS-103.jpg"
    },
    {
        "link": "https://i.ibb.co/Q7WPqyz/DS-105.jpg"
    },
    {
        "link": "https://i.ibb.co/vkT17hG/ED005.jpg"
    },
    {
        "link": "https://i.ibb.co/0V48K5z/DS-106.jpg"
    },
    {
        "link": "https://i.ibb.co/cCGcprb/EDC006.jpg"
    },
    {
        "link": "https://i.ibb.co/F7X7RS0/EDC007.jpg"
    },
    {
        "link": "https://i.ibb.co/7GW3C3x/EDC009.jpg"
    },
    {
        "link": "https://i.ibb.co/wYnQFZf/EDC010.jpg"
    },
    {
        "link": "https://i.ibb.co/nRx5YWy/EDT001.jpg"
    },
    {
        "link": "https://i.ibb.co/hWGk1WQ/EDC016.jpg"
    },
    {
        "link": "https://i.ibb.co/rGzVQmq/EDT002.jpg"
    },
    {
        "link": "https://i.ibb.co/9cx78zT/EDT003.jpg"
    },
    {
        "link": "https://i.ibb.co/cgRZPrr/EDT004.jpg"
    },
    {
        "link": "https://i.ibb.co/3SQhCn8/EDT006.jpg"
    },
    {
        "link": "https://i.ibb.co/c3hTB8n/EDT007.jpg"
    },
    {
        "link": "https://i.ibb.co/b2CZ2sB/GDO001.jpg"
    },
    {
        "link": "https://i.ibb.co/chYTMMY/G025.jpg"
    },
    {
        "link": "https://i.ibb.co/xg45qbc/GDO005.jpg"
    },
    {
        "link": "https://i.ibb.co/Xz98vc7/GDO007.jpg"
    },
    {
        "link": "https://i.ibb.co/mS77mFm/GDO008.jpg"
    },
    {
        "link": "https://i.ibb.co/56NQbNv/GDO09.jpg"
    },
    {
        "link": "https://i.ibb.co/M79Q81r/GDO010.jpg"
    },
    {
        "link": "https://i.ibb.co/Gdp5sS7/GDO011.jpg"
    },
    {
        "link": "https://i.ibb.co/KyHxZJm/GDO014.jpg"
    },
    {
        "link": "https://i.ibb.co/yy5PQkh/GDO018.jpg"
    },
    {
        "link": "https://i.ibb.co/YpXD65F/GDO019.jpg"
    },
    {
        "link": "https://i.ibb.co/NmBQHPP/GDO020.jpg"
    },
    {
        "link": "https://i.ibb.co/NV6pcJG/GDO022.jpg"
    },
    {
        "link": "https://i.ibb.co/pfQWBrZ/GEL004.jpg"
    },
    {
        "link": "https://i.ibb.co/gy71Cz2/GEL005.jpg"
    },
    {
        "link": "https://i.ibb.co/Snk4dXV/GEL011.jpg"
    },
    {
        "link": "https://i.ibb.co/tJWHC9S/GEL013.jpg"
    },
    {
        "link": "https://i.ibb.co/dLDFhMM/GEL015.jpg"
    },
    {
        "link": "https://i.ibb.co/3Wj6hnD/GEL020.jpg"
    },
    {
        "link": "https://i.ibb.co/3BJMGry/GEL027.jpg"
    },
    {
        "link": "https://i.ibb.co/wN7RbVJ/HUI001.jpg"
    },
    {
        "link": "https://i.ibb.co/9wdKN8H/GEL028.jpg"
    },
    {
        "link": "https://i.ibb.co/9TygJFV/HUI003.jpg"
    },
    {
        "link": "https://i.ibb.co/23KKfs5/HUI004.jpg"
    },
    {
        "link": "https://i.ibb.co/n0sMvZ6/HUI005.jpg"
    },
    {
        "link": "https://i.ibb.co/2YgHVfv/HUI010.jpg"
    },
    {
        "link": "https://i.ibb.co/zm47Hbt/LAI-001.jpg"
    },
    {
        "link": "https://i.ibb.co/bzP64Q7/LAI-002.jpg"
    },
    {
        "link": "https://i.ibb.co/7Qd00nV/LAI-004.jpg"
    },
    {
        "link": "https://i.ibb.co/mBZYyGm/LAI-005.jpg"
    },
    {
        "link": "https://i.ibb.co/kK6xZXG/LAI-008.jpg"
    },
    {
        "link": "https://i.ibb.co/tcxjTZb/LAI-009.jpg"
    },
    {
        "link": "https://i.ibb.co/N16tyTF/LAI-011.jpg"
    },
    {
        "link": "https://i.ibb.co/WPxpf1B/LAI-012.jpg"
    },
    {
        "link": "https://i.ibb.co/yqf0B7z/LAI-013.jpg"
    },
    {
        "link": "https://i.ibb.co/whfHxnm/LAI-014.jpg"
    },
    {
        "link": "https://i.ibb.co/qNvNVXb/LAI-017.jpg"
    },
    {
        "link": "https://i.ibb.co/gmN9gsP/LAI-018.jpg"
    },
    {
        "link": "https://i.ibb.co/YbhLJLQ/LAI024.jpg"
    },
    {
        "link": "https://i.ibb.co/SymhZsF/LAI028.jpg"
    },
    {
        "link": "https://i.ibb.co/rk8xxQg/LAI036.jpg"
    },
    {
        "link": "https://i.ibb.co/sFBBKgn/LAI039.jpg"
    },
    {
        "link": "https://i.ibb.co/hWdNg0M/LAI043.jpg"
    },
    {
        "link": "https://i.ibb.co/FWH9Mp6/LAI044.jpg"
    },
    {
        "link": "https://i.ibb.co/tD9DRtf/LAIT-009.jpg"
    },
    {
        "link": "https://i.ibb.co/prj7MW6/LIP002.jpg"
    },
    {
        "link": "https://i.ibb.co/b18kgQN/LIP004.jpg"
    },
    {
        "link": "https://i.ibb.co/KLX4vYc/LIP007.jpg"
    },
    {
        "link": "https://i.ibb.co/w6bxdSN/LIP010.jpg"
    },
    {
        "link": "https://i.ibb.co/G2Ls2Dk/LIP011.jpg"
    },
    {
        "link": "https://i.ibb.co/ftGfm6p/LIP012.jpg"
    },
    {
        "link": "https://i.ibb.co/X39VNTp/LOT001.jpg"
    },
    {
        "link": "https://i.ibb.co/9Y3sdPD/MAS001.jpg"
    },
    {
        "link": "https://i.ibb.co/CbWWnN4/MSK001.jpg"
    },
    {
        "link": "https://i.ibb.co/nftkLcG/MSK002.jpg"
    },
    {
        "link": "https://i.ibb.co/JBdB8G9/MSK003.jpg"
    },
    {
        "link": "https://i.ibb.co/XXdxRNn/ODC018.jpg"
    },
    {
        "link": "https://i.ibb.co/fdKGqd8/PAR017.jpg"
    },
    {
        "link": "https://i.ibb.co/MD8XHR0/PAR020.jpg"
    },
    {
        "link": "https://i.ibb.co/gTJKrzd/PAR026.jpg"
    },
    {
        "link": "https://i.ibb.co/qMV3Syd/PAR028.jpg"
    },
    {
        "link": "https://i.ibb.co/YZtxtyG/PAR031.jpg"
    },
    {
        "link": "https://i.ibb.co/Rp2mz2k/PAR034.jpg"
    },
    {
        "link": "https://i.ibb.co/J338hsn/POM001.jpg"
    },
    {
        "link": "https://i.ibb.co/bW6RD0H/POM002.jpg"
    },
    {
        "link": "https://i.ibb.co/wYP4RP4/POM003.jpg"
    },
    {
        "link": "https://i.ibb.co/9Zv2n46/POM006.jpg"
    },
    {
        "link": "https://i.ibb.co/Vvw0Hjg/POM007.jpg"
    },
    {
        "link": "https://i.ibb.co/PDdhZFf/POM008.jpg"
    },
    {
        "link": "https://i.ibb.co/37Bm9S1/POM010.jpg"
    },
    {
        "link": "https://i.ibb.co/LhNh2w1/SA023.jpg"
    },
    {
        "link": "https://i.ibb.co/ggp6kT9/SAV-001.jpg"
    },
    {
        "link": "https://i.ibb.co/RTyR4w8/SAV011.jpg"
    },
    {
        "link": "https://i.ibb.co/yszbTY3/SAV11.jpg"
    },
    {
        "link": "https://i.ibb.co/GMX4Ytv/SAV012.jpg"
    },
    {
        "link": "https://i.ibb.co/2qsc4Wg/SAV12.jpg"
    },
    {
        "link": "https://i.ibb.co/4Wc8tfV/SAV15.jpg"
    },
    {
        "link": "https://i.ibb.co/gMchsD5/SAV017.jpg"
    },
    {
        "link": "https://i.ibb.co/LgLj4N9/SAV027.jpg"
    },
    {
        "link": "https://i.ibb.co/GcH2d0q/SAV030.jpg"
    },
    {
        "link": "https://i.ibb.co/7SvtbjW/SAV031.jpg"
    },
    {
        "link": "https://i.ibb.co/pvbDpYz/SAV034.jpg"
    },
    {
        "link": "https://i.ibb.co/SsCcK6Q/SAV036.jpg"
    },
    {
        "link": "https://i.ibb.co/1T7CGNx/SAV037.jpg"
    },
    {
        "link": "https://i.ibb.co/DffPhW2/SAV040.jpg"
    },
    {
        "link": "https://i.ibb.co/9tPM86s/SAV042.jpg"
    },
    {
        "link": "https://i.ibb.co/7GDN6S3/SHA002.jpg"
    },
    {
        "link": "https://i.ibb.co/YPmjNN0/SHA005.jpg"
    },
    {
        "link": "https://i.ibb.co/yRx3jns/SHA006.jpg"
    },
    {
        "link": "https://i.ibb.co/4d558qN/SHA007.jpg"
    },
    {
        "link": "https://i.ibb.co/1X0cBR2/SHA008.jpg"
    },
    {
        "link": "https://i.ibb.co/C6hZYwF/SPA001.jpg"
    },
    {
        "link": "https://i.ibb.co/fY8SXYN/SPL001.jpg"
    },
    {
        "link": "https://i.ibb.co/t8CP3DM/SPR003.jpg"
    },
    {
        "link": "https://i.ibb.co/3MR3n0d/SPR004.jpg"
    },
    {
        "link": "https://i.ibb.co/0VK0WhK/SRM005.jpg"
    },
    {
        "link": "https://i.ibb.co/vQmfQmy/TAL001.jpg"
    },
    {
        "link": "https://i.ibb.co/LgwSd90/TAL011.jpg"
    },
    {
        "link": "https://i.ibb.co/WVJZcpr/TALC002.jpg"
    },
    {
        "link": "https://i.ibb.co/Mkfc5S9/TALC003.jpg"
    },
    {
        "link": "https://i.ibb.co/X4P38xk/TALC005.jpg"
    },
    {
        "link": "https://i.ibb.co/cNJ1wZ5/VR003.jpg"
    },
    {
        "link": "https://i.ibb.co/X7p1CGg/VR004.jpg"
    },
    {
        "link": "https://i.ibb.co/QQcDGmg/BAU005.jpg"
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
                    // Create a new document in the "products" collection in Firestore
                    const productData = {
                        ref: item.ref,
                        name: item.name,
                        quantity: 100000,
                        category: "cosmetique",
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
