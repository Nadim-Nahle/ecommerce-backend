import { Controller, Get, Post, Body,UseFilters } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAllProducts() {
        return this.productsService.getAllProducts();
    };
      @Post('add')
      create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
      }

}
