import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.createUser(signupDto);

    // Return a success response or JWT token, if needed
    return { message: 'User registered successfully', user };
  }
  
  @Get('users')
  async getAllUsers(@Response() response: any) {
    const users = await this.authService.getAllUsers();
    const totalCount = users.length; // You can modify this to get the actual count
    response.header('X-Total-Count', totalCount.toString()); // Set the X-Total-Count header
    return response.json(users)
  }
}