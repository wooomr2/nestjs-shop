import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAceessStrategy } from './strategies/jwt-access.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.stratage'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, JwtAceessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
