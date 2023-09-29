import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateProductDto } from './create-product.dto';

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

  async createProduct(createProductDto: CreateProductDto) {
    const { id, image, name, quantity } = createProductDto;
    const productsRef = admin.firestore().collection('products');

    // Add the product to Firestore
    const productData = { id, image, name, quantity };
    const result = await productsRef.add(productData);

    return { id: result.id, ...productData };
  }

}
