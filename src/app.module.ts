import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthValidationMiddleware } from './auth-validation/auth-validation.middleware';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule, OrdersModule],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthValidationMiddleware).forRoutes('*'); // Apply AuthValidationMiddleware to all routes
  }
}
