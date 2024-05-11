import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1', { exclude: ['/health-check'] })
  app.use(helmet())

  const configService = app.get(ConfigService)

  if (configService.get('NODE_ENV') === 'development') {
    const SWAGGER_CONFIG = {
      title: 'title',
      description: 'description',
      version: '1.0',
      tags: [],
    }

    const builder = new DocumentBuilder()
      .setTitle(SWAGGER_CONFIG.title)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .setDescription(SWAGGER_CONFIG.description)
      .setVersion(SWAGGER_CONFIG.version)
    for (const tag of SWAGGER_CONFIG.tags) {
      builder.addTag(tag)
    }
    const options = builder.build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('swagger', app, document)
  }

  await app.listen(configService.getOrThrow('PORT'))
}
bootstrap()
