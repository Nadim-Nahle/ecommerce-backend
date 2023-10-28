import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateOrderDTO } from './create-order.dto';

const accountSid = 'ACbd28c015da2c8a0bce32fa78ccb2875a';
const authToken = 'f32425eb589c91ae5953fc2d7fc48d67';
const client = require('twilio')(accountSid, authToken);

@Controller('orders')
export class OrdersController {
  @Post()
  @UsePipes(new ValidationPipe())
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    try {
      const { phone_number, products } = createOrderDTO;

      const orderCounterDoc = await admin.firestore().doc('order_counters/order').get();
      const orderNumber = orderCounterDoc.data().value;

      // Increment the order number
      const newOrderNumber = orderNumber + 1;

      // Update the order counter document with the new order number
      await orderCounterDoc.ref.update({ value: newOrderNumber });

      // Initialize the Firestore collection for orders
      const ordersCollection = admin.firestore().collection('orders');

      // Create a new order document with the order details included
      const newOrderData = {
        order_number: newOrderNumber,
        phone_number,
        products,
        // Calculate the total price and add it to the order
        total_price: products.reduce(
          (total, product) => total + product.product_price * product.quantity,
          0
        ),
      };

      const newOrderRef = await ordersCollection.add(newOrderData);

      // Respond with the created order's data
      const newOrder = (await newOrderRef.get()).data();
      await client.messages
        .create({
          body: `phone number:${newOrder.phone_number}, ${JSON.stringify(newOrder.products)}`,
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+9613942350',
        })
        .then((message) => console.log(message.sid));
      return {
        phone_number: newOrder.phone_number,
        orderDetails: newOrder.products,
        total_price: newOrder.total_price.toFixed(2),
        order_number: newOrderNumber,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create the order');
    }
  }
}
