import { createDocument } from '@libs/swagger'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1', { exclude: ['/health-check'] })
  app.use(helmet())

  const configService = app.get(ConfigService)

  if (configService.get('NODE_ENV') === 'development') {
    createDocument(app)
  }

  await app.listen(configService.getOrThrow('PORT'))
}
bootstrap()
