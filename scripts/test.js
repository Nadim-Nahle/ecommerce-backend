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
      "id": "DGokVNNaKa129ZlJqyxC",
      "ref": "ASS125",
      "name": "Asiette  flerie 10.5\" YM-505 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/SPZvSDr/ASS125.jpg",
      "price": 850,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 76000000
      }
  },
  {
      "id": "DgYJRjjeG4DJmCZ4yGmt",
      "ref": "ASS071",
      "name": "Assiette blanc 12\" CK-67(20)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/rfrj7Fq/ASS071.jpg",
      "price": 1250,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 46000000
      }
  },
  {
      "id": "EX0iCvAg7xxyd5Z5nTPO",
      "ref": "TOR002",
      "name": "Torche rechargabe carte C38-B107",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/gJK6fKk/TOR002.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 38000000
      }
  },
  {
      "id": "FWkIfOKa9c3r5nf3UHl1",
      "ref": "TAB022",
      "name": "Table DODO P.M blanc",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/n3HFV3V/TAB022.jpg",
      "price": 3750,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 126000000
      }
  },
  {
      "id": "Gq2R4wJRnUtPrfj0XZex",
      "ref": "ASS082",
      "name": "Assiette ceramic creuse 10.5\" CK-202 (30)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/jRW3gZG/ASS082.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 50000000
      }
  },
  {
      "id": "UEwNzvuHkm6ZbARQKdou",
      "ref": "AT002",
      "name": "Attache Rideau Rond F36-E80 (100pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Y8vK69L/AT002.jpg",
      "price": 900,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 34000000
      }
  },
  {
      "id": "Zxbf6gWjkpsDB9S1gCK5",
      "ref": "ASS132",
      "name": "Assiette Blanc Aligne 10.25' CK-196 (36pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/nP50HZf/ASS132.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 38000000
      }
  },
  {
      "id": "b7xyGXBexspB5tO3I4Es",
      "ref": "BAG001",
      "name": "Bage a glasse 24 trous C05-B12",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/0jtmtL6/BAG001.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 21000000
      }
  },
  {
      "id": "bsnKlLRu8AlnK6RBnWQm",
      "ref": "ASS089",
      "name": "Assiette blanc 10.5\" CK-192 (25)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Bq2sHk6/ASS089.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 40000000
      }
  },
  {
      "id": "e70NISNdHdwpxbgIyajt",
      "ref": "ASS130",
      "name": "Assiette Melamine Creuse Gris 9'' YM-536 (180pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/2cy4rxL/ASS130.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 31000000
      }
  },
  {
      "id": "emoQ523Ih90DpLFnY9zN",
      "ref": "STK004",
      "name": "Stickers de prix 4M  YM-72-73-74-75",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/MCJ3G4Z/STK004.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 111000000
      }
  },
  {
      "id": "pJZSL3RHE1bCfeX3ZU7z",
      "ref": "ASS126",
      "name": "Asiette 10.5\" YM-509 (30)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/tMDyQtg/ASS126.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615606,
          "_nanoseconds": 24000000
      }
  },
  {
      "id": "00hEqzrdfuldKLfGVOFe",
      "ref": "CHA035",
      "name": "Chaise Bebe Panda",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/x3NTgYP/CHA035.jpg",
      "price": 2200,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 406000000
      }
  },
  {
      "id": "0K8AEbsCbPTbaVrBBvDh",
      "ref": "AMP008",
      "name": "Ampoule PHILIPS 18W",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/nQ2DsT1/AMP008.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 610000000
      }
  },
  {
      "id": "0Ki6CdOrL1ck78MYMhXt",
      "ref": "ONG003",
      "name": "Carte Ongle Mellange Couleur E13-D41",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ygzPQfM/ONG003.jpg",
      "price": 900,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 387000000
      }
  },
  {
      "id": "0wvuev9hkmOL1fU1BihA",
      "ref": "MOU014",
      "name": "Moule Gateau 12 Troux YM-411  KW264 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/F5JB7M8/MOU014.jpg",
      "price": 1950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 619000000
      }
  },
  {
      "id": "1cK6VY4oAlgWwrIcbr2z",
      "ref": "AMP006",
      "name": "Ampoule & torche chargable",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/9yT54hF/AMP006.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 603000000
      }
  },
  {
      "id": "1cU9kWEriTkBiT2TuQfa",
      "ref": "RAZ003",
      "name": "Paquet Razoir Wetell 5pc F44-E88 (20pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mCLGjrQ/RAZ003.jpg",
      "price": 400,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 596000000
      }
  },
  {
      "id": "3xWbmgF7Ha0ezIf3lMGX",
      "ref": "TU001",
      "name": "tuyau gaz 1.2m C45-B128",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/HCYygKY/TU001.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 596000000
      }
  },
  {
      "id": "421FDwJ6GIKyM9ABvtmD",
      "ref": "MUG030",
      "name": "MUG Noir YM-421(48)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/BVnMkJ2/MUG030.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 325000000
      }
  },
  {
      "id": "4jBQpIc9fYE2FJwwKrX2",
      "ref": "BL016",
      "name": "Blender MAXBQSCH YM-360 MB-1003 (30)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mtFv78F/BL016.jpg",
      "price": 7500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 606000000
      }
  },
  {
      "id": "52cQUSIbmAqlphBhb4yn",
      "ref": "COU017",
      "name": "Couteau professionel D04-C20",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/DzBY5Cg/COU017.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 493000000
      }
  },
  {
      "id": "62JS3XSOpUyEa4e8BZ9t",
      "ref": "BOJ005",
      "name": "Boujie piles B48-A150",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/gDjfttt/BOJ005.jpg",
      "price": 900,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 606000000
      }
  },
  {
      "id": "6X5X4Mx6JGgGd2pQdajD",
      "ref": "TP010",
      "name": "Tapis Boutton 60*90cm mix Couleur F30-E72 (40pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/wrwCyx4/TP010.jpg",
      "price": 3750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 617000000
      }
  },
  {
      "id": "70ao2od8GCuznVmpMsDJ",
      "ref": "ACR016",
      "name": "Acroche deco WELCOME B34-A100 (48)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/52pNkL0/ACR016.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 606000000
      }
  },
  {
      "id": "8c8x1peWas5u1LoS9jBM",
      "ref": "BOJ008",
      "name": "Bougie deco CQC 226-2 (72)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/K0hxMBk/BOJ008.jpg",
      "price": 250,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 602000000
      }
  },
  {
      "id": "8n9s39G9QjXDpBPYQfAZ",
      "ref": "CUV007",
      "name": "Cuvette en plastique 35",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/KrV33mn/CUV007.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 614000000
      }
  },
  {
      "id": "9Eb3DxWwzfdLlZT0h853",
      "ref": "FOU017",
      "name": "Fourchette p.m 6pcs/pqt YM-385 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/hC7GHNg/FOU017.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "9M6l2M2VQio4LUzuPCXE",
      "ref": "ALB001",
      "name": "Album photo 10*15cm AT30-H4+AT29-H4 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/pQ632sk/ALB001.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 597000000
      }
  },
  {
      "id": "9MjEFexWvdaque183flq",
      "ref": "BL019",
      "name": "Blender Manuel Multi-purpose YM-330 (32pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/r3rrYLC/BL019.jpg",
      "price": 4000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 602000000
      }
  },
  {
      "id": "9jfsStHmPrlD2uxLLVv2",
      "ref": "BOL022",
      "name": "Bolle fleurie 9'' YM-513 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/PttWn9t/BOL022.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 602000000
      }
  },
  {
      "id": "AmkLD5oRdBGMiJtCBM0k",
      "ref": "ASS088",
      "name": "Assiette blanc 10.5\" CK-200 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/fqWTk1j/ASS088.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "C2IW1QdBf9sjIqxSxkVG",
      "ref": "BOJ001",
      "name": "Bougie Parfume P.M PR15(46)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/TghR029/BOJ001.jpg",
      "price": 300,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 609000000
      }
  },
  {
      "id": "CREDpYAlUZKW0ma8Wbor",
      "ref": "EP007",
      "name": "Eponge bravo Couleur 3 pc",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/1GJjqXp/EP007.jpg",
      "price": 250,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 600000000
      }
  },
  {
      "id": "D8QfVlWsCJpcMWmsxz7Q",
      "ref": "POR002",
      "name": "Port Essuie tout Plastic  3C E20-D64 (96)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/bW4L8nM/POR002.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 602000000
      }
  },
  {
      "id": "DUPRU6imf5qMJsHKyZrF",
      "ref": "COV002",
      "name": "Couverture chaise VIP blanc CK-362 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mqScgK7/COV002.jpg",
      "price": 2250,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 607000000
      }
  },
  {
      "id": "Dz6KrasunJTeivTU0074",
      "ref": "DET001",
      "name": "Detendeur gaz C45-B129",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Zh2vbSD/DET001.jpg",
      "price": 1200,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 601000000
      }
  },
  {
      "id": "E1h3MH6ePlSOiCfZXjWt",
      "ref": "MOU015",
      "name": "Moule gateau rond  SNONO YM-407(50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/D4MytHY/MOU015.jpg",
      "price": 2500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 610000000
      }
  },
  {
      "id": "EQymBH5mvPG86j38Yq2f",
      "ref": "CUV008",
      "name": "Cuvette en plastique 30",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/HY1xMWn/CUV008.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 610000000
      }
  },
  {
      "id": "EVJLYGFh0VTIrBK8KNIj",
      "ref": "COU016",
      "name": "Couteau G.M DERMANY DESIGN D04-C19",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/M7pZ4Mv/COU016.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 386000000
      }
  },
  {
      "id": "Fbw25lDpsHtfYsJhv23n",
      "ref": "FL020",
      "name": "Sachet Fleur 150G mix Couleur YM-621 (120pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/9Hsm7mm/FL020.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 603000000
      }
  },
  {
      "id": "HvyIdDaiJj4SLlOCgUu8",
      "ref": "CHP002",
      "name": "Chapeau homme C10-B27",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/0mng8JW/CHP002.jpg",
      "price": 450,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 411000000
      }
  },
  {
      "id": "I8tqWvBL7f2ehItsCmjY",
      "ref": "DEC010",
      "name": "Decortation gazelle & porte mouchoire LSCM-3106 (24)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/pJ0vwmK/DEC010.jpg",
      "price": 375,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 608000000
      }
  },
  {
      "id": "IKmlz6rtTZMOSxhoQY4z",
      "ref": "ASS061",
      "name": "Assiette blanc 10.5\" CK-66 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Gt9Ry3d/ASS061.jpg",
      "price": 800,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "IqVXsf25zlrhlBXYsUBu",
      "ref": "BAS004",
      "name": "Bassine  confortex 30L",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/fG70XWF/BAS004.jpg",
      "price": 2400,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 609000000
      }
  },
  {
      "id": "JTimQBA5ClecOvHfIqjv",
      "ref": "BL015",
      "name": "Blender MAXBQSCH YM-353 MB-807 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/s3RXdfs/BL015.jpg",
      "price": 9500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 609000000
      }
  },
  {
      "id": "JaRF0Ekh2827gfTTSN7w",
      "ref": "COT009",
      "name": "Cotton Tige rond p.m F21-E01 (360pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/1dPs3LM/COT009.jpg",
      "price": 150,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 359000000
      }
  },
  {
      "id": "JfB8IhIUyJabnDc7wPR4",
      "ref": "SAC014",
      "name": "Sachet supermarche 30*40  JD101 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/SNFLhpq/SAC014.jpg",
      "price": 1250,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 467000000
      }
  },
  {
      "id": "K3DTErrkBj5tlc3BWL7J",
      "ref": "BAU006",
      "name": "Baume de nerf tiger joe 130 jaune (120)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/2FpHQqL/BAU006.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 604000000
      }
  },
  {
      "id": "KwSawBs2fv9tawJlie3u",
      "ref": "BRS021",
      "name": "Bross Toilette Rond YM-169 (120pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/DD34bq2/BRS021.jpg",
      "price": 850,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 475000000
      }
  },
  {
      "id": "L1CcjMl2QbYE3QcWt6XD",
      "ref": "CR004",
      "name": "Creame Gold Skin Correcteur escargot  38g",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/YyBKCQ8/CR004.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 422000000
      }
  },
  {
      "id": "L86uIM87crQaArffVByW",
      "ref": "BAB036",
      "name": "Babouche Crox Homme 40-44 CXS YM-640 (100pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/8YyMxVW/BAB036.jpg",
      "price": 1900,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 609000000
      }
  },
  {
      "id": "LjfmyIUbvnZmVdArQSXl",
      "ref": "CUI025",
      "name": "Cuillere plastic jetable pqt 100pcs (30)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/zmLFBMT/CUI025.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 369000000
      }
  },
  {
      "id": "MftSAGrD1A5HgiyBaXF7",
      "ref": "CHA013",
      "name": "Chaussette courte C42-B119",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/1qfWdW9/CHA013.jpg",
      "price": 325,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "PQHNIoukRWDrrFDlfrgZ",
      "ref": "FON001",
      "name": "Fondation pqt avec miroir B29-A89",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/NTCVQp0/FON001.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 602000000
      }
  },
  {
      "id": "QMePSR2Xl7gjAxjI8FCh",
      "ref": "AMP002",
      "name": "Empoule mur rond B32-A95",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZG27KwD/AMP002.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "QfUczlvTW9ZRp6eikdXT",
      "ref": "FIL002",
      "name": "Filter  eau Robine E17-D50 (240)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/k8V0vzf/FIL002.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 608000000
      }
  },
  {
      "id": "Qgm8o7x6RuYF5QBya80H",
      "ref": "PIN003",
      "name": "Pince Nurriture PR-18(63)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/9GgTSqk/PIN003.jpg",
      "price": 700,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 601000000
      }
  },
  {
      "id": "QihhdsWFsX6fxcnqwpYb",
      "ref": "POR012",
      "name": "Porte monnaie femme p.m LW-0807-03",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/zQpysMZ/POR012.jpg",
      "price": 150,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 596000000
      }
  },
  {
      "id": "R06nEtHqEIOp6JhCATPC",
      "ref": "BRS020",
      "name": "Bross Toilette Carre ym-168(120pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/2M0sspS/BRS020.jpg",
      "price": 850,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 397000000
      }
  },
  {
      "id": "Sn2NuPMYdaG9TvnFYDlR",
      "ref": "PAN018",
      "name": "Panier deco en fer B07-A20",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/wgV8Dwk/PAN018.jpg",
      "price": 3750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 489000000
      }
  },
  {
      "id": "T1O91awjz65qqnCLdNF5",
      "ref": "PAN027",
      "name": "Panier a Pince Plastic YM-318 (200pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/kJ2LcK3/PAN027.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 331000000
      }
  },
  {
      "id": "TPSculR8SOqGX9GuCFSo",
      "ref": "COU015",
      "name": "Couteau 521-99  6pcs D04-C15",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/7n2T636/COU015.jpg",
      "price": 2500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 404000000
      }
  },
  {
      "id": "UNnAn48UlV7hXjFsLcZq",
      "ref": "PRT001",
      "name": "Porte CD XS-12 (72)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Q6dzkr8/PRT001.jpg",
      "price": 250,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "UVZGK7etb0dkgmdccx0z",
      "ref": "PAR029",
      "name": "Parfum emballage sac 100ML C34-B94-95-96",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/LxK093g/PAR029.jpg",
      "price": 2400,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "VU7qiIgvBSxKXh61IKZA",
      "ref": "AMP004",
      "name": "Ampoule rechargable C38-B109 (120)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/jT6F476/AMP004.jpg",
      "price": 1600,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 606000000
      }
  },
  {
      "id": "XdjsBTzgo5F4MaASyrwW",
      "ref": "TRI014",
      "name": "Tringle double 210m CH-105 (8)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/D4HS9NC/TRI014.jpg",
      "price": 10000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "Z924Z0teZtXx3uUVgSXx",
      "ref": "ENT001",
      "name": "Entonnoir de Seau_MH704(36)-192pc",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/f9Twxr0/ENT001.jpg",
      "price": 300,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 600000000
      }
  },
  {
      "id": "ZCq5xJ1KLL5ljjwcApYL",
      "ref": "BAS002",
      "name": "Bassine 20L confortex",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/GHGhSGg/BAS002.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "ZjJ5CVxtngd7tRjup2SU",
      "ref": "COU024",
      "name": "Couteau 6pcs/pqt YM-381 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/hYt8LsW/COU024.jpg",
      "price": 1950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 379000000
      }
  },
  {
      "id": "d39OM5swEneNWe15HZxP",
      "ref": "VAS034",
      "name": "Vase Casable Noir YM-662 (30pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/9bRKJy3/VAS034.jpg",
      "price": 1800,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 604000000
      }
  },
  {
      "id": "dYorIDp1uJ2B8Y06WP2O",
      "ref": "TP008",
      "name": "tapie sol couleur en laine P.M 40*60cm CK-343 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Srt8CJv/TP008.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 603000000
      }
  },
  {
      "id": "fAqVLztdQHkclu3BsjUK",
      "ref": "BAB035",
      "name": "Babouche Homme 40-44 E YMC YM-639 (100pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZNrtgVT/BAB035.jpg",
      "price": 1200,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 491000000
      }
  },
  {
      "id": "fIzE60JokuArywUUguXx",
      "ref": "ENS003",
      "name": "Ensemlbe toilette tapis 3 pcs B06-A18 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/QYWHZZZ/ENS003.jpg",
      "price": 4500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 603000000
      }
  },
  {
      "id": "hDUvm3E3gi9q77molygV",
      "ref": "ETA014",
      "name": "Etageur Cuisine Plastic 4etage YM-564 (16pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/DRzC8FZ/ETA014.jpg",
      "price": 6500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 608000000
      }
  },
  {
      "id": "hFxrG60OEdQGcYgwNAbr",
      "ref": "MOU018",
      "name": "Moule a gateau 12troux YM-410 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/k2TZmJb/MOU018.jpg",
      "price": 1850,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 335000000
      }
  },
  {
      "id": "hU2g4TE3StCh0TQkVbyG",
      "ref": "VEI007",
      "name": "Veilleuse bureau chargable  Led YM-469 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/7ny4yxp/VEI007.jpg",
      "price": 3500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 601000000
      }
  },
  {
      "id": "hdXUsFoedtA04SAp3o95",
      "ref": "BOJ009",
      "name": "Bougie deco carre 256B-C (72)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/YpMq1Yv/BOJ009.jpg",
      "price": 350,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "i3yaeOe6ZCeMyZjmMnyD",
      "ref": "EG012",
      "name": "Egoutoire Plastic 45*50cm YM-285 (24pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/y8rfqDP/EG012.jpg",
      "price": 2800,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 608000000
      }
  },
  {
      "id": "itzQVfBVep5ntT7d5f9O",
      "ref": "BOI012",
      "name": "Boite gateau C05-B14 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZX65CNr/BOI012.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 604000000
      }
  },
  {
      "id": "jhV9ODb3M1PL7WQrBjSz",
      "ref": "MOU007",
      "name": "Moule a gateau 12 troux C36-B105",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/wN9QLxP/MOU007.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 486000000
      }
  },
  {
      "id": "jwQkSMWpFNgigbmdxeug",
      "ref": "BOI018",
      "name": "Boite a rangement transparent 10L CK-375 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mh18BtY/BOI018.jpg",
      "price": 2100,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 601000000
      }
  },
  {
      "id": "laIKSrAnAkT9Ke1pepBr",
      "ref": "TRI015",
      "name": "Tringle rideau 3M SINGLE CP-15 (12)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/xYXhwGC/TRI015.jpg",
      "price": 7000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 606000000
      }
  },
  {
      "id": "laLdwqCH0N2iRvlALhsB",
      "ref": "BOI017",
      "name": "Boite a Rangement Toilette E20-D65 (150)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Bgtfhj6/BOI017.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 604000000
      }
  },
  {
      "id": "mDmxi6lkfZW0PwGZTdRM",
      "ref": "PAR005",
      "name": "Parfum POISED 100ml  PR-27(95)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/pxZZRRN/PAR005.jpg",
      "price": 2200,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "mRakz641rmhcdo2llFiM",
      "ref": "MOU017",
      "name": "Moule a gateau YM-408 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mvQD3rV/MOU017.jpg",
      "price": 2500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 450000000
      }
  },
  {
      "id": "od5d5jZlwobY6xXXlgWb",
      "ref": "MCH001",
      "name": "Mouchoir Style 180mouchoires*3plis (10)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/T89HXG2/MCH001.jpg",
      "price": 9750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 601000000
      }
  },
  {
      "id": "p5ei48srPfzzkUeks1GI",
      "ref": "COU023",
      "name": "Couteau Profesional Manche Dure Noir F46-E94  (12pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/9V01FVd/COU023.jpg",
      "price": 10000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 398000000
      }
  },
  {
      "id": "pP8vcqRJ0rPE3WQVnBfI",
      "ref": "BAB029",
      "name": "Baby Liss p.m Make Time F45-E92 (120pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Jxzf6sf/BAB029.jpg",
      "price": 1650,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 607000000
      }
  },
  {
      "id": "qzbFCPrDZcUXOxLQftiB",
      "ref": "PLA011",
      "name": "Plateau Rond Dessin Coffee M.M YM-271 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/4ZfcKbC/PLA011.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 614000000
      }
  },
  {
      "id": "rKEviMqc6D95qKdaiRRa",
      "ref": "CHA059",
      "name": "Sachet Chausette BB 3 pair YM-571(400pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/g3LHTJS/CHA059.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 605000000
      }
  },
  {
      "id": "rTZdGtIym5x2Re8fEaEf",
      "ref": "DET003",
      "name": "PERSIL 9KG (4)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/pW5H1qJ/DET003.jpg",
      "price": 7000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "rlfm7phi8ZMGxvqzcFoZ",
      "ref": "ETA011",
      "name": "Etageur Cuisine Rectangle  4etage YM-300(16pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/wJz25m7/ETA011.jpg",
      "price": 5000,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 598000000
      }
  },
  {
      "id": "rmAsRUpX6EtXNcQmrHjT",
      "ref": "COU006",
      "name": "paquet Couteaux 6pc   PR-43(138)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/L9Q3Nfm/COU006.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 399000000
      }
  },
  {
      "id": "s5HT2s7ON0GNhxeRTFIh",
      "ref": "PR004",
      "name": "Press Citron en Fer F46-E96",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/MP4k9cC/PR004.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 609000000
      }
  },
  {
      "id": "scJEah9G1VyQvzyE4qQK",
      "ref": "PA002",
      "name": "Parapluie p.m YM-502 (80)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/zV30sRd/PA002.jpg",
      "price": 3500,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 599000000
      }
  },
  {
      "id": "sliFcW7HLFN9z1Hu8mxs",
      "ref": "PLA007",
      "name": "Plateau OVALE Mix Dessin pm YM-240(120)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/jwWNfDG/PLA007.jpg",
      "price": 800,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 484000000
      }
  },
  {
      "id": "uAqNKoqBeNIN8DnIcWLS",
      "ref": "ASS090",
      "name": "Assiette blanc alligne 10.5\" CK-208 (36)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/hmRvhcF/ASS090.jpg",
      "price": 800,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 603000000
      }
  },
  {
      "id": "w9tly7up4buILu7TBlcH",
      "ref": "PL014",
      "name": "Plateau 35 plastique",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/vcX2yPf/PL014.jpg",
      "price": 600,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 449000000
      }
  },
  {
      "id": "xkaSpRo3tQTnSj1Ae9c3",
      "ref": "BAG003",
      "name": "Bag A Glass + couverture 24troux YM-182 (168pc )",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/dkzD0dv/BAG003.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 611000000
      }
  },
  {
      "id": "yj2hctGLFTh3JFjsSN1L",
      "ref": "PLA008",
      "name": "Plateau Rond Dore YM-274(80)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/4NyzhWL/PLA008.jpg",
      "price": 900,
      "createdAt": {
          "_seconds": 1706615605,
          "_nanoseconds": 489000000
      }
  },
  {
      "id": "0FlqmceMS0BpUQPBOPdY",
      "ref": "PAR033",
      "name": "Parfum Tube 35ml 6 smel E34-D107 (20)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/sy41sC7/PAR033.jpg",
      "price": 12500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 902000000
      }
  },
  {
      "id": "1xvz3bHg3SHBRY0M2S2A",
      "ref": "CP003",
      "name": "Coupe ongle G.M (24)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Qc3hmtg/CP003.jpg",
      "price": 4500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 855000000
      }
  },
  {
      "id": "3DtLOMsKtHRhLDDOIfaD",
      "ref": "MAC006",
      "name": "Machine Massage 5in 1 Visage E17-D52 ou F45-E89 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/JQBJJL0/MAC006.jpg",
      "price": 2750,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 909000000
      }
  },
  {
      "id": "3Sw4LBA7O53jOJRRryRx",
      "ref": "SAC018",
      "name": "Sachet poubelle 40L 30pc/Roll CP-10 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Fs9qZQ0/SAC018.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 899000000
      }
  },
  {
      "id": "5F0D3swcrNbH719OWDXU",
      "ref": "SAC013",
      "name": "Sachet plastic sandwich C07-B21",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/0MfZjjd/SAC013.jpg",
      "price": 850,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 825000000
      }
  },
  {
      "id": "5NfJED0WApwTIZ6O2Hp4",
      "ref": "SAC020",
      "name": "Sachet poubelle 80L 20pc/Roll CP-12 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/93VvQB6/SAC020.jpg",
      "price": 1150,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 910000000
      }
  },
  {
      "id": "6qYwkwbWHY0pwNEvjAcj",
      "ref": "SET004",
      "name": "Set de table alligne B33-A98",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/4Rv54zM/SET004.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 861000000
      }
  },
  {
      "id": "71SJ5RmRfCTGScB4YlgR",
      "ref": "RID041",
      "name": "Rideau porte fil F53-E117 (200pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/fxP37qk/RID041.jpg",
      "price": 1400,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "86XkXaI9QKltCcRMIZLT",
      "ref": "ROB001",
      "name": "Robe cuisine B19-A70",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/YhjXBsF/ROB001.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 862000000
      }
  },
  {
      "id": "94ik4CvTFhG6B7I7DAOz",
      "ref": "LOU008",
      "name": "Louche a soupe YM-396 (320)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/z5L5zbR/LOU008.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 908000000
      }
  },
  {
      "id": "9m7GPWV7a27sOjGJD0Tn",
      "ref": "TAB026",
      "name": "Table a decouper 26-36cm YM-405 (30)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/FBbtbtk/TAB026.jpg",
      "price": 2000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 817000000
      }
  },
  {
      "id": "BXAcc5tW35uVuTZJCS9y",
      "ref": "SAC011",
      "name": "Sac homme B31-A94",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/rMyB8cB/SAC011.jpg",
      "price": 950,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "C6JeWPDtCf9Npvq8EgkC",
      "ref": "RID034",
      "name": "Rideau voillage CK-348",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/g6zJFzd/RID034.jpg",
      "price": 5500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "CHWo0lgrA3NTWQM6ybBq",
      "ref": "RID040",
      "name": "Rideau 140*240Cm CP-22 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/5sBGX79/RID040.jpg",
      "price": 5500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 900000000
      }
  },
  {
      "id": "D9TwawL24hjo9cQlTZGg",
      "ref": "COU007",
      "name": "Couverture Pouf Jaune Noir  PR-38(121) - 200pc",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/26SyL26/COU007.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 904000000
      }
  },
  {
      "id": "EjNMRBj5iVCZWF8eukVE",
      "ref": "LOU010",
      "name": "Louche Cuillere p.m YM-398 (320)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/1qQzxR3/LOU010.jpg",
      "price": 850,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 908000000
      }
  },
  {
      "id": "FwU0f5dVYIJJS1yAMG7x",
      "ref": "SAC004",
      "name": "Sac Femme Brillant PR26(91)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/WpWqVjK/SAC004.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 905000000
      }
  },
  {
      "id": "GfHLMK670RqlyXZRUtLR",
      "ref": "STA001",
      "name": "Stand Mouchoir en fer PR-23(81)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/RBPwsJM/STA001.jpg",
      "price": 300,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 719000000
      }
  },
  {
      "id": "JbifEMTpMDuaFONQYYuQ",
      "ref": "SAC001",
      "name": "Sachet Poubelle 120L C01-B02 OU F40-E84 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/LnhSNVL/SAC001.jpg",
      "price": 600,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 857000000
      }
  },
  {
      "id": "KuzIwHcPgxLg3kmGCxjl",
      "ref": "STO002",
      "name": "Stop Rats F48-E100 (100pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZW86gVv/STO002.jpg",
      "price": 300,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 715000000
      }
  },
  {
      "id": "LqfWCpJ9kJHdauAIcBP9",
      "ref": "GEL032",
      "name": "Gel intimo MILMIL 500ML 2C (12)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/S7HntLg/GEL032.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 712000000
      }
  },
  {
      "id": "NGFrakKFuyAxFE17YaFZ",
      "ref": "CRA003",
      "name": "Crayon beaute marron C33-B88",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/gWtB4C5/CRA003.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 914000000
      }
  },
  {
      "id": "OPg5Z3zPWFXP8V4vnaF9",
      "ref": "LOU009",
      "name": "Louche cuillere g.m YM-397 (320)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/jyJmYd8/LOU009.jpg",
      "price": 1000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 912000000
      }
  },
  {
      "id": "OgyDycku9MzdhmFEbv2z",
      "ref": "DEN021",
      "name": "Dentifrice BENIFIT 75ML total fresh (24)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/G95CPNZ/DEN021.jpg",
      "price": 800,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 859000000
      }
  },
  {
      "id": "P9Wt1aQ5FSHBJ4HvTKlN",
      "ref": "COU025",
      "name": "Couteau a cuisine PROFESIONAL 9\" pqt de 12 YM-391 (240)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Jd4kfCQ/COU025.jpg",
      "price": 9000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 915000000
      }
  },
  {
      "id": "PIjCJegSwjNmA5dUgtTG",
      "ref": "SIZ003",
      "name": "Ensemble coiffeur 5pcs C35-B98",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Vq444F3/SIZ003.jpg",
      "price": 1150,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 863000000
      }
  },
  {
      "id": "PcidG05NCtPeVNaNVLjl",
      "ref": "RID039",
      "name": "Rideau 140*240Cm CP-21 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/XCMF5vq/RID039.jpg",
      "price": 5500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "S315jKJBy5VkhjXHcf3O",
      "ref": "SAC021",
      "name": "Sachet poubelle 170L 10pc/Roll CP-13 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/mGsw72s/SAC021.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 906000000
      }
  },
  {
      "id": "SBzreS7nejOKPFIurwb6",
      "ref": "SAC022",
      "name": "Sachet poubelle 220L 10pc/Rolll CP-14 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/3zvfK3c/SAC022.jpg",
      "price": 1650,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "SXJLs3aFLfP1M7JtZKmU",
      "ref": "SCO003",
      "name": "Scotch 4.5cm*100 YM-37 (72)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/gmGkVCb/SCO003.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 860000000
      }
  },
  {
      "id": "TlH2AF8WFtWaNGGK7EHG",
      "ref": "SET006",
      "name": "Set De Table Tissue  Rond 3C E06-D16",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/RzGDx09/SET006.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 899000000
      }
  },
  {
      "id": "UCfeoq0UPhC2djdKZsTU",
      "ref": "SET002",
      "name": "Set de table mix couleur B33-A96",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZHDHTK3/SET002.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 871000000
      }
  },
  {
      "id": "UihbtCuAQYUxdIW9Ytlv",
      "ref": "LOU007",
      "name": "Ensemble louches en bois F05-E18 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/fSxPgcd/LOU007.jpg",
      "price": 1150,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 912000000
      }
  },
  {
      "id": "X68BiEjLBpLfHLV6yTOx",
      "ref": "RID042",
      "name": "Rideau de Douche 1.8*1.8cm YM-430 (100pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/0nB2Psy/RID042.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 988000000
      }
  },
  {
      "id": "ZCRDqHfRPHma0RFwUnp9",
      "ref": "SAC023",
      "name": "Sac bebe BABY F08-E23 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/k2S43sS/SAC023.jpg",
      "price": 6000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 720000000
      }
  },
  {
      "id": "Za7NvfCmIk912YQjX2bM",
      "ref": "SAC019",
      "name": "Sachet poubelle 60L 15pc/Roll CP-11 (120)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/q9fJSbq/SAC019.jpg",
      "price": 550,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 898000000
      }
  },
  {
      "id": "bmV4O3X7GtkzzbdivMDG",
      "ref": "CR003",
      "name": "Creame Gold skin Correcteur argan 38g",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/kMwZLVw/CR003.jpg",
      "price": 500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 815000000
      }
  },
  {
      "id": "eQi11zVfO9FhLpDZGuxz",
      "ref": "SCO004",
      "name": "Scotch 4.5cm*200m YM-38 (72)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/3MDL9wQ/SCO004.jpg",
      "price": 1500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 905000000
      }
  },
  {
      "id": "hdFcGUvOPxD3XiLUTjbj",
      "ref": "ONG001",
      "name": "Carte Ongle mix Couleur 24 sachet E13-D39 (120)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/qWmk3Nb/ONG001.jpg",
      "price": 2500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 907000000
      }
  },
  {
      "id": "ikakGiUy2QRTXoR7JFuw",
      "ref": "PEL007",
      "name": "balais + pelle long main avec manche CP-16 (60)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/Cbtkqmk/PEL007.jpg",
      "price": 1900,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 915000000
      }
  },
  {
      "id": "j3KH1mZoG6AJ5733CHzK",
      "ref": "SEA011",
      "name": "Seau poubelle 100L",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/qYMMGfM/SEA011.jpg",
      "price": 8000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 798000000
      }
  },
  {
      "id": "jjkMaGGuQNGCLctqbUw9",
      "ref": "LIP003",
      "name": "Lip Gloss Liquid Huda Beauty_MH703(3)-pqt de 12pc",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/TK5CN7V/LIP003.jpg",
      "price": 480,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 910000000
      }
  },
  {
      "id": "lXCgqK1Pb5ICcD26eAyR",
      "ref": "CUI026",
      "name": "Cuillere 6pcs/pqt YM-382 (100)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/WnR4PRH/CUI026.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 911000000
      }
  },
  {
      "id": "mcFNuwZJ8MWi2Sr4gwqY",
      "ref": "RID038",
      "name": "Rideau feuille d'arbre 140*240cm CP-20 (50)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/qgQtN4D/RID038.jpg",
      "price": 5500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 910000000
      }
  },
  {
      "id": "scXphq4Z2Evn9WunGYoz",
      "ref": "TAB021",
      "name": "Table RIVA 3C",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/KsF9Vnd/TAB021.jpg",
      "price": 24000,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 819000000
      }
  },
  {
      "id": "tP3OY85Xb1GclV5zSmZK",
      "ref": "STK005",
      "name": "Stickers Mur 70*70cm 2 couleur YM-105 (120pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/5T76tSX/STK005.jpg",
      "price": 1100,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 813000000
      }
  },
  {
      "id": "wAXWPVq9smXx2Pm27isS",
      "ref": "SEA010",
      "name": "Seau poubelle 40L",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/KWn3mP6/SEA010.jpg",
      "price": 4500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 815000000
      }
  },
  {
      "id": "xFOuSKnI41ODiFyxzRYK",
      "ref": "RID035",
      "name": "Rideau voillage CK-347",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/4pWMvYy/RID035.jpg",
      "price": 5500,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 911000000
      }
  },
  {
      "id": "yDef0v5fn6vvwr6Ee0Nm",
      "ref": "SET002",
      "name": "Set de table mix couleur B33-A96",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/ZHDHTK3/SET002.jpg",
      "price": 650,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 872000000
      }
  },
  {
      "id": "yUQ17wJ7UfnJLUlOwZCF",
      "ref": "SEA008",
      "name": "Seau plastic noir 7L",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/SxbN4yx/SEA008.jpg",
      "price": 600,
      "createdAt": {
          "_seconds": 1706615604,
          "_nanoseconds": 862000000
      }
  },
  {
      "id": "eUzxnFu11iKugYQ01XvC",
      "ref": "DEP002",
      "name": "Depousiereuse P.M F07-E20 ou G01-F03 (200pc)",
      "category": "divers",
      "quantity": 100000,
      "image": "https://i.ibb.co/5xKf4v2/DEP002.jpg",
      "price": 750,
      "createdAt": {
          "_seconds": 1706615569,
          "_nanoseconds": 287000000
      }
  }]

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
