import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'id is required' })
    @IsString()
    ref: string;

    @IsNotEmpty(({ message: 'name is required' }))
    @IsString()
    name: string;

    @IsNotEmpty(({ message: 'image is required' }))
    @IsString()
    image: string;

    @IsNotEmpty(({ message: 'category is required' }))
    @IsString()
    category: string;

    @IsNotEmpty(({ message: 'quantity is required' }))
    @IsNumber()
    quantity: number;

    @IsNotEmpty(({ message: 'price is required' }))
    @IsNumber()
    price: number;
}