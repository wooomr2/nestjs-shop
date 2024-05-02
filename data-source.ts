import { config } from 'dotenv'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

const nodeEnv = process.env.NODE_ENV || 'development'
config({ path: join(__dirname, './', `.env.${nodeEnv}`) })
console.log('============= MIGRATION ENV : ' + nodeEnv + '  =============')

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['**/!(base).entity.{js,ts}'],
  migrations: ['migrations/*{.ts,.js}'],
  logging: ['query', 'error'],
  synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()
export default dataSource
