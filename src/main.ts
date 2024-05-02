import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.use(helmet())

  const configService = app.get(ConfigService)
  await app.listen(configService.getOrThrow('PORT'))
}
bootstrap()
