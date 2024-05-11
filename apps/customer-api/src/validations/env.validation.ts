import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator'

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.DEVELOPMENT

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000

  // Database
  @IsString()
  DB_HOST: string

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number

  @IsString()
  DB_USERNAME: string

  @IsString()
  DB_PASSWORD: string

  @IsString()
  DB_DATABASE: string

  // JWT
  @IsString()
  ACCESS_TOKEN_SECRET: string

  @IsString()
  ACCESS_TOKEN_EXPIRE: string

  @IsString()
  REFRESH_TOKEN_SECRET: string

  @IsString()
  REFRESH_TOKEN_EXPIRE: string
}

export function envValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVariables, config, { enableImplicitConversion: true })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
