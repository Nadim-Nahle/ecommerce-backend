import { Controller, Get, Post, Body, Response, Put, Param, NotFoundException, ValidationPipe, UsePipes, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('category')
  async getAllCategories(@Response() response: any) {
    const categories = await this.productsService.getAllCategories();
    const totalCount = categories.length; // You can modify this to get the actual count
    response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header

    return response.json(categories)
  };

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updatedProductData: Partial<Product>,
    @Response() response: any
  ): Promise<any> {
    const updatedProduct: any = await this.productsService.updateProduct(id, updatedProductData);

    return response.json(updatedProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Response() response: any): Promise<any> {
    try {
      await this.productsService.deleteProduct(id);
      return response.status(204).send(); // Product successfully deleted
    } catch (error) {
      if (error.message === `Product with ID ${id} not found`) {
        return response.status(404).json({ message: `Product with ID ${id} not found` });
      } else {
        return response.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  @Get()
  async filterProducts(
    @Query('q') filter: string,
    @Response() response: any,
  ) {
    try {
      if (!filter) {

        const products = await this.productsService.getAllProducts();
        const totalCount = products.length; // You can modify this to get the actual count
        response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header
        return response.json(products)
      }

      const value = filter;

      const filteredProducts = await this.productsService.filterProductsByField(value);

      const totalCount = filteredProducts.length; // You can modify this to get the actual count
      response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header

      return response.json(filteredProducts);
    } catch (error) {
      // Handle any errors that may occur during filtering
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // @Get()
  // async getAllProducts(@Response() response: any) {
  //   const products = await this.productsService.getAllProducts();
  //   const totalCount = products.length; // You can modify this to get the actual count
  //   response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header

  //   return response.json(products)
  // };

}
