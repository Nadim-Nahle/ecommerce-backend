import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'id is required' })
    @IsString()
    id: string;

    @IsNotEmpty(({ message: 'name is required' }))
    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsNotEmpty(({ message: 'quantity is required' }))
    @IsNumber()
    quantity: number;
}