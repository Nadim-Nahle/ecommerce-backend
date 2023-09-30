import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.createUser(signupDto);

    // Return a success response or JWT token, if needed
    return { message: 'User registered successfully', user };
  }
}