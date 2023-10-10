import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.interface';

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

  async updateProduct(id: string, updatedProductData: Partial<Product>): Promise<void> {
    const productRef = admin.firestore().collection('products').doc(id);;

    try {
      await productRef.update(updatedProductData);
    } catch (error) {
      // Handle errors, such as product not found or Firestore update error
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    const productRef = admin.firestore().collection('products').doc(id);

    try {
      const productSnapshot = await productRef.get();

      if (productSnapshot.exists) {
        const productData = productSnapshot.data() as Product;
        return { id: productSnapshot.id, ...productData };
      }

      return null; // Product not found
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

}
