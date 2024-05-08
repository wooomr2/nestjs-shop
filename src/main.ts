import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { createDocument } from './swagger/create-document'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.use(helmet())

  const configService = app.get(ConfigService)

  if (configService.get('NODE_ENV') === 'development') {
    createDocument(app)
  }

  await app.listen(configService.getOrThrow('PORT'))
}
bootstrap()
