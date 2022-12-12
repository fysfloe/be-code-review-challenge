import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { ReviewController } from './controller/review.controller';
import { CompanyService } from './service/company.service';
import { ReviewService } from './service/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from './schema/company.schema';
import { ReviewSchema } from './schema/review.schema';
import { MySQLCompanyRepository } from './repository/MySql/mysql.company.repository';
import { MySQLRatingRepository } from './repository/MySql/mysql.rating.repository';
import { MySQLReviewRepository } from './repository/MySql/mysql.review.repository';
import { databaseConfiguration } from './ormconfig';
import { RatingSchema } from './schema/rating.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
    TypeOrmModule.forFeature([CompanySchema, ReviewSchema, RatingSchema]),
  ],
  controllers: [ReviewController, CompanyController],
  providers: [
    ReviewService,
    CompanyService,
    MySQLCompanyRepository,
    MySQLRatingRepository,
    MySQLReviewRepository,
  ],
})
export class AppModule {}
