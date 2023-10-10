import { Controller, Get, Post, Body, Response } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAllProducts(@Response() response: any) {
      const products = await this.productsService.getAllProducts();
      const totalCount = products.length; // You can modify this to get the actual count
      response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header
     
      return response.json(products)
    };
      @Post('add')
      create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
      }

}
