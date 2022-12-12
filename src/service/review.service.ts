import { Inject, Injectable } from '@nestjs/common';
import { Review } from '../entity/review.entity';
import { CompanyRepository } from '../repository/company.repository';
import { MySQLCompanyRepository } from '../repository/MySql/mysql.company.repository';
import { MySQLRatingRepository } from '../repository/MySql/mysql.rating.repository';
import { MySQLReviewRepository } from '../repository/MySql/mysql.review.repository';
import { RatingRepository } from '../repository/rating.repository';
import { ReviewRepository } from '../repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(MySQLReviewRepository)
    private reviewRepository: ReviewRepository,
    @Inject(MySQLRatingRepository)
    private ratingRepository: RatingRepository,
    @Inject(MySQLCompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async saveReview(review: Review): Promise<number> {
    const reviewId = await this.reviewRepository.insertReview(
      review.companyId,
      review.title,
      review.pro,
      review.contra,
      review.suggestions,
      review.user,
    );

    await this.ratingRepository.insertRating(
      reviewId,
      review.rating.culture,
      review.rating.management,
      review.rating.workLifeBalance,
      review.rating.careerDevelopment,
    );

    this.companyRepository.recalculateCompanyScore(review.companyId);

    return reviewId;
  }
}
