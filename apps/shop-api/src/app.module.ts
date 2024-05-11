import { HttpExceptionFilter } from '@libs/common/filters'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { DbModule } from 'libs/db/src/db.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAccessGuard } from './auth/guards'
import { CategoriesModule } from './categories/categories.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { ReviewsModule } from './reviews/reviews.module'
import { UsersModule } from './users/users.module'
import { envValidation } from './validations/env.validation'

const nodeEnv = process.env.NODE_ENV || 'development'
console.log('=============  LOAD ENV : ' + nodeEnv + '  =============')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      envFilePath: [`.env.${nodeEnv}`],
    }),
    DbModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ReviewsModule,
    ProductsModule,
    OrdersModule,
  ],
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
