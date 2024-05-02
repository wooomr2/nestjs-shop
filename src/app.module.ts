import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { JwtAccessGuard } from './common/guards/jwt-access.guard'
import { ConfigsModule } from './configs/configs.module'
import { UsersModule } from './users/users.module'
import { RolesGuard } from './common/guards/roles.guard'

@Module({
  imports: [ConfigsModule, AuthModule, UsersModule],
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
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
