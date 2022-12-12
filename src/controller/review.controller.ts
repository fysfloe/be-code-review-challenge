import { Body, Controller, Inject, Param, Put } from '@nestjs/common';
import { Review } from '../entity/review.entity';
import { InvalidArgumentException } from '../exception/invalid-argument-exception';
import { CompanyRepository } from '../repository/company.repository';
import { MySQLCompanyRepository } from '../repository/MySql/mysql.company.repository';
import { MySQLRatingRepository } from '../repository/MySql/mysql.rating.repository';
import { MySQLReviewRepository } from '../repository/MySql/mysql.review.repository';
import { RatingRepository } from '../repository/rating.repository';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewService } from '../service/review.service';

@Controller('/company/:companyId/review')
export class ReviewController {
  private reviewService: ReviewService;

  constructor(
    @Inject(MySQLCompanyRepository) companyRepository: CompanyRepository,
    @Inject(MySQLReviewRepository) reviewRepository: ReviewRepository,
    @Inject(MySQLRatingRepository) ratingRepository: RatingRepository,
  ) {
    this.reviewService = new ReviewService(
      reviewRepository,
      ratingRepository,
      companyRepository,
    );
  }

  @Put()
  async createReview(@Param() params, @Body() requestData): Promise<number> {
    const { companyId } = params;

    const data = {
      ...requestData,
      companyId,
    };

    const { rating } = data;

    try {
      if (!rating) {
        throw new Error('"rating" is missing');
      }

      if (!rating.culture) {
        throw new InvalidArgumentException('"rating.culture" is missing');
      }
      if (!rating.management) {
        throw new InvalidArgumentException('"rating.management" is missing');
      }
      if (!rating.work_life_balance) {
        throw new InvalidArgumentException(
          '"rating.work_life_balance" is missing',
        );
      }
      if (!rating.career_development) {
        throw new InvalidArgumentException(
          '"rating.career_development" is missing',
        );
      }

      return await this.reviewService.saveReview(Review.fromArray(data));
    } catch (error: any) {
      return error.message;
    }
  }
}
