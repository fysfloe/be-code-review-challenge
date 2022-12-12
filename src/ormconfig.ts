import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { CompanySchema } from './schema/company.schema';
import { ReviewSchema } from './schema/review.schema';
import { RatingSchema } from './schema/rating.schema';

config();

const configService = new ConfigService();

export const databaseConfiguration: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [CompanySchema, ReviewSchema, RatingSchema],
  migrations: [__dirname + '/migration/**/*.ts'],
};

export default new DataSource(databaseConfiguration);
