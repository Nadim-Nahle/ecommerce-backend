import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'id is required' })
    @IsString()
    pNumber: string;

    @IsNotEmpty(({ message: 'name is required' }))
    @IsString()
    name: string;

    @IsNotEmpty(({ message: 'image is required' }))
    @IsString()
    image: string;

    @IsNotEmpty(({ message: 'description is required' }))
    @IsString()
    description: string;

    @IsNotEmpty(({ message: 'quantity is required' }))
    @IsNumber()
    quantity: number;

    @IsNotEmpty(({ message: 'price is required' }))
    @IsNumber()
    price: number;
}