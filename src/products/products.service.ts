import { ConflictException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.interface';
import { FieldValue } from '@google-cloud/firestore';

@Injectable()
export class ProductsService {

  async getAllProducts(): Promise<Product[]> {
    const productsRef = admin.firestore().collection('products');
  
    try {
      const querySnapshot = await productsRef.get();
      const products: Product[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const modifiedProduct = {
          id: doc.id,
          ref: data.ref,
          name: data.name,
          category: data.category,
          quantity: data.quantity,
          image: data.image,
          price: data.price,
          createdAt: data.createdAt
        };
        products.push(modifiedProduct);
      });
  
      // Sort products based on createdAt field in descending order
      products.sort((a, b) => {
        const createdAtA = a.createdAt?._seconds || 0;
        const createdAtB = b.createdAt?._seconds || 0;
        return createdAtB - createdAtA;
      });
  
      return products;
    } catch (error) {
      throw new Error(`Error getting all products: ${error.message}`);
    }
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
    const { ref, image, name, quantity, price, category } = createProductDto;
    const productsRef = admin.firestore().collection('products');

    // Check for the uniqueness of ref in a Firestore transaction
    const querySnapshot = await productsRef.where('ref', '==', ref).get();

    if (!querySnapshot.empty) {
      if (!querySnapshot.empty) {
        // ref is not unique, throw a ConflictException
        throw new ConflictException('ref must be unique');
      }
    }

    // If ref is unique, add the product to Firestore
    const productData = {
      ref, name, image, quantity, price, category,
      createdAt: FieldValue.serverTimestamp(), // Add timestamp
      updatedAt: FieldValue.serverTimestamp(),
    };
    const result = await productsRef.add(productData);

    return { id: result.id, ...productData };
  }

  async updateProduct(id: string, updatedProductData: Partial<Product>): Promise<void> {
  const productRef = admin.firestore().collection('products').doc(id);

  try {
    const productSnapshot = await productRef.get();

    if (!productSnapshot.exists) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Update the existing document
    await productRef.update(updatedProductData);
  } catch (error) {
    // Handle errors, such as Firestore update error
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

  async deleteProduct(id: string): Promise<void> {
    const productRef = admin.firestore().collection('products').doc(id);

    try {
      const snapshot = await productRef.get();

      if (!snapshot.exists) {
        // Handle the case where the product with the given ID doesn't exist
        throw new Error(`Product with ID ${id} not found`);
      }

      await productRef.delete();
    } catch (error) {
      // Handle errors, such as Firestore delete error
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async filterProductsByField(filterValue: string): Promise<Product[]> {
    const productsRef = admin.firestore().collection('products');

    try {
        // Fetch all documents and perform client-side filtering
        const allProductsSnapshot = await productsRef.get();
        const filteredProducts: Product[] = [];

        const normalizedFilterValue = filterValue.toLowerCase(); // Convert filterValue to lowercase

        allProductsSnapshot.forEach((doc) => {
            const data = doc.data();
            const ref = data.ref.toLowerCase(); // Convert ref to lowercase

            // Check if the normalized 'ref' field contains the normalized filterValue
            if (ref.includes(normalizedFilterValue)) {
                const modifiedProduct = {
                    id: doc.id,
                    ref: data.ref,
                    name: data.name,
                    category: data.category,
                    quantity: data.quantity,
                    image: data.image,
                    price: data.price,
                    createdAt: data.createdAt
                };
                filteredProducts.push(modifiedProduct);
            }
        });

        return filteredProducts;
    } catch (error) {
        throw new Error(`Error filtering products by value: ${error.message}`);
    }
}
}
