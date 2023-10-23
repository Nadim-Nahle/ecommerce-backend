import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateOrderDTO } from './create-order.dto';

@Controller('orders')
export class OrdersController {
    @Post()
    @UsePipes(new ValidationPipe())
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    try {
      const { phone_number, products } = createOrderDTO;

      // Initialize the Firestore collection for orders
      const ordersCollection = admin.firestore().collection('orders');

      // Create a new order document
      const newOrderRef = await ordersCollection.add({ phone_number });

      // Initialize the Firestore sub-collection for order items
      const orderItemsCollection = newOrderRef.collection('order_items');

      const orderDetails = [];

      // Add each product to the order and calculate the total price
      let totalPrice = 0;
      for (const product of products) {
        // Assuming product has a name and price
        const { product_name, product_price, quantity } = product;

        // Add the product to the order_items collection
        const newOrderItemRef = await orderItemsCollection.add({
          product_name,
          product_price,
          quantity
        });

        orderDetails.push({ product_name, product_price, quantity });
        totalPrice += (product_price * quantity);
      }

      // Update the total price of the order
      await newOrderRef.update({
        total_price: totalPrice,
      });

      // Respond with the created order's data
      const newOrder = (await newOrderRef.get()).data();
      return {
        phone_number: newOrder.phone_number,
        orderDetails,
        total_price: totalPrice.toFixed(2),
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create the order');
    }
  }
}

