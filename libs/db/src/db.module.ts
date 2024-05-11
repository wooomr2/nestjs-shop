import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const typeOrmPostgresqlConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_DATABASE'),
  synchronize: true,
  autoLoadEntities: true,
  logging: ['query', 'error'],
  namingStrategy: new SnakeNamingStrategy(),
})

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => typeOrmPostgresqlConfig(config),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
