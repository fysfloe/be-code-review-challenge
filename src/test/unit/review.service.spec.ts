import { Company } from '../../entity/company.entity';
import { Review } from '../../entity/review.entity';
import { CompanyRepository } from '../../repository/company.repository';
import { RatingRepository } from '../../repository/rating.repository';
import { ReviewRepository } from '../../repository/review.repository';
import { ReviewService } from '../../service/review.service';

describe('Test the review service', () => {
  let reviewService: ReviewService;
  let insertReviewMethod, insertRatingMethod, recalculateCompanyScoreMethod;

  beforeEach(() => {
    const reviewRepository: ReviewRepository = {
      insertReview: (review: Review): Promise<number> => {
        return new Promise((resolutionFunc) => {
          resolutionFunc(1);
        });
      },
    };

    const ratingRepository: RatingRepository = {
      insertRating: (
        reviewId,
        culture,
        management,
        workLifeBalance,
        careerDevelopment,
      ): Promise<number> => {
        return new Promise((resolutionFunc) => {
          resolutionFunc(1);
        });
      },
    };

    const companyRepository: CompanyRepository = {
      recalculateCompanyScore: (companyId): Promise<number> => {
        return new Promise((resolutionFunc) => {
          resolutionFunc(4);
        });
      },
      getTopRecommended: (limit: number): Promise<Company[]> => {
        return new Promise((resolutionFunc) => {
          resolutionFunc([]);
        });
      },
    };

    insertReviewMethod = jest.spyOn(reviewRepository, 'insertReview');
    insertRatingMethod = jest.spyOn(ratingRepository, 'insertRating');
    recalculateCompanyScoreMethod = jest.spyOn(
      companyRepository,
      'recalculateCompanyScore',
    );
    reviewService = new ReviewService(
      reviewRepository,
      ratingRepository,
      companyRepository,
    );
  });

  it('inserts review and rating and recalculates company score', async () => {
    const reviewId = await reviewService.saveReview({
      title: 'Some job',
      id: 1,
      companyId: 1,
      rating: {
        culture: 4,
        management: 4,
        workLifeBalance: -1,
        careerDevelopment: 3,
        reviewId: null,
        id: null,
      },
    });

    expect(insertReviewMethod).toBeCalled();
    expect(insertRatingMethod).toBeCalled();
    expect(reviewId).toBe(1);
  });
});
