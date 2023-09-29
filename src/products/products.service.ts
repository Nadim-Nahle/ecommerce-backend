import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProductsService {

  async getAllProducts() {

    const productsRef = admin.firestore().collection('products');
    const snapshot = await productsRef.get();

    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  }

}
