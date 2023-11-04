// update-user-role.dto.ts
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  role: string;
}