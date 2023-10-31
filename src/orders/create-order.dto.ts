import { IsString, IsNumber, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty({ message: 'phone_number is required' })
  phone_number: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[];
  
}

export class ProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  product_name: string;

  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  product_ref: string;

  @IsNumber()
  @IsNotEmpty({ message: 'price is required' })
  product_price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;
}