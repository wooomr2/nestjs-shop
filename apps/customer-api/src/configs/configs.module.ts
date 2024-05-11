import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { validate } from './env.validation'
import { typeOrmConfig } from './typeorm.config'

const nodeEnv = process.env.NODE_ENV || 'development'
console.log('=============  LOAD ENV : ' + nodeEnv + '  =============')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: [`.env.${nodeEnv}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigsModule {}
