import { Controller, Get, Post, Body, Response, Put,Param, NotFoundException, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getAllProducts(@Response() response: any) {
    const products = await this.productsService.getAllProducts();
    const totalCount = products.length; // You can modify this to get the actual count
    response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header

    return response.json(products)
  };

  @Get('category')
  async getAllCategories(@Response() response: any) {
    const categories = await this.productsService.getAllCategories();
    const totalCount = categories.length; // You can modify this to get the actual count
    response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header

    return response.json(categories)
  };

  @Post('add')
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

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    return product;
  }
}
