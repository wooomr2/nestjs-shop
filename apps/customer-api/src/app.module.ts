import { HttpExceptionFilter } from '@libs/common/filters'
import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAccessGuard } from './auth/guards'
import { CategoriesModule } from './categories/categories.module'
import { ConfigsModule } from './configs/configs.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { ReviewsModule } from './reviews/reviews.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [ConfigsModule, AuthModule, UsersModule, CategoriesModule, ReviewsModule, ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
