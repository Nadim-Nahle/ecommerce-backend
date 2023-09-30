import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ProductsModule],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService
  ],
})
export class AppModule {}
