import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateOrderDTO } from './create-order.dto';
import { Storage } from '@google-cloud/storage';

const PDFDocument = require('pdfkit');
const fs = require('fs');
var publicUrl;
// Replace with your Google Cloud Storage bucket name and PDF file path
const bucketName = 'leprince_pdf';
const pdfFilePath = '/tmp/order.pdf';

const accountSid = 'ACbd28c015da2c8a0bce32fa78ccb2875a';
const authToken = 'f32425eb589c91ae5953fc2d7fc48d67';
const client = require('twilio')(accountSid, authToken);

const storage = new Storage();

async function uploadPDF(orderNumber) {
  await storage.bucket(bucketName).upload(pdfFilePath, {
    destination: `${orderNumber}.pdf`,
    gzip: true,
    metadata: {
      cacheControl: 'no-cache',
    },
  });

  console.log(`${pdfFilePath} uploaded to ${bucketName}.`);
}

async function getPDFPublicURL() {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds (adjust as needed)

  const [files] = await storage.bucket(bucketName).getFiles({ prefix: pdfFilePath });
  if (files.length > 0) {
    const pdfFile = files[0];
    publicUrl = pdfFile.publicUrl();
    console.log(`Public URL: ${publicUrl}`);
  } else {
    console.log('PDF file not found.');
  }
}

const createPDF = async (message) => {
  const pdfDoc = new PDFDocument();
  const pdfStream = fs.createWriteStream('/tmp/order.pdf'); // Create a write stream to save the PDF
  pdfDoc.pipe(pdfStream);

  pdfDoc.fontSize(16).text('Order Details:', { align: 'center' });
  pdfDoc.text(message);

  // Add order details to the PDF

  pdfDoc.end(); // End the PDF document

  await new Promise((resolve) => pdfStream.on('finish', resolve));

  return pdfStream;
};

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
      const productPromises = products.map(async (product) => {
        const productQuery = await admin.firestore().collection('products')
          .where('ref', '==', product.product_ref) // Use your unique identifier
          .limit(1)
          .get();
  
        if (productQuery.empty) {
          throw new Error(`Product not found: ${product.product_ref}`);
        }
  
        const productDoc = productQuery.docs[0];
        const currentQuantity = productDoc.data().quantity;
        const newQuantity = currentQuantity - product.quantity;
  
        if (newQuantity < 0) {
          throw new Error(`Not enough quantity available for product: ${product.product_ref}`);
        }
  
        // Update the quantity for this product
        await productDoc.ref.update({ quantity: newQuantity });
      });
      
      await Promise.all(productPromises);
      const productsList = newOrder.products.map(product => `Name: ${product.product_name},\nRef: ${product.product_ref},\nQuantity: ${product.quantity}`).join('\n\n');
      const message = `Name: ${newOrder.phone_number}\n\nProducts:\n${productsList}\n\nOrder Number: ${newOrder.order_number}\n `;
      const pdfStream = await createPDF(message);
      await uploadPDF(newOrder.order_number).catch(console.error);
      await getPDFPublicURL().catch(console.error);
      await client.messages
        .create({
          body: message,
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+24107069719',
          mediaUrl: [`https://storage.googleapis.com/leprince_pdf/${newOrder.order_number}.pdf`]
        })
        .then((message) => console.log(message.sid));

      await client.messages
        .create({
          body: message,
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+9613942350',
          mediaUrl: [`https://storage.googleapis.com/leprince_pdf/${newOrder.order_number}.pdf`]
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
