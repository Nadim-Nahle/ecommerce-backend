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
      const data = doc.data();
      const modifiedProduct = {
        id: doc.id,
        pNumber: data.pNumber,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        image: data.image,
      };
      products.push(modifiedProduct);
    });

    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { pNumber, image, name, description, quantity } = createProductDto;
    const productsRef = admin.firestore().collection('products');

    // Add the product to Firestore
    const productData = { pNumber, name, description, image, quantity };
    const result = await productsRef.add(productData);

    return { id: result.id, ...productData };
  }

}
