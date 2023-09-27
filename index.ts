import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import * as admin from 'firebase-admin';

const expressServer = express();

import * as serviceAccount from './key.json'; // Adjust the filename as needed

const serviceAccountKey: admin.ServiceAccount = serviceAccount as admin.ServiceAccount;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://ecommerce-nadim.firebaseio.com',
});

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
