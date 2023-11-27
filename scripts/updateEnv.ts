// src/scripts/update-env.ts

const fs = require('fs');
const path = require('path');

const [, , environmentArg] = process.argv;
const validEnvironments = ['qa', 'prod'];

if (!validEnvironments.includes(environmentArg)) {
    console.error(`Invalid environment argument. Please use either 'qa' or 'prod'.`);
    process.exit(1);
  }
  
const environmentsPath = path.join(__dirname, '../src/environments');

const sourceFile = path.join(environmentsPath, `${environmentArg}.ts`);
const destinationFile = path.join(environmentsPath, 'env.ts');

fs.copyFileSync(sourceFile, destinationFile);

console.log(`Environment updated to ${environmentArg}`);