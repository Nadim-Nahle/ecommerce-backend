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
        ref: data.ref,
        name: data.name,
        description: data.description,
        category: data.category,
        quantity: data.quantity,
        image: data.image,
        price: data.price,
      };
      products.push(modifiedProduct);
    });

    return products;
  }
  async getAllCategories() {

    const productsRef = admin.firestore().collection('categories');
    const snapshot = await productsRef.get();

    const categories = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const modifiedCategory = {
        id: doc.id,
        name: data.name,
      };
      categories.push(modifiedCategory);
    });

    return categories;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { ref, image, name, description, quantity, price, category } = createProductDto;
    const productsRef = admin.firestore().collection('products');

    // Check for the uniqueness of ref in a Firestore transaction
    const querySnapshot = await productsRef.where('ref', '==', ref).get();

    if (!querySnapshot.empty) {
        // ref is not unique, return an error response
        return {
            error: 'ref must be unique',
            status: 400,
        };
    }

    // If ref is unique, add the product to Firestore
    const productData = { ref, name, description, image, quantity, price, category };
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
