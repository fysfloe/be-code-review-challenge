import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rating } from '../../entity/rating.entity';
import { RatingRepository } from '../rating.repository';

@Injectable()
export class MySQLRatingRepository
  extends Repository<Rating>
  implements RatingRepository
{
  constructor(private dataSource: DataSource) {
    super(Rating, dataSource.createEntityManager());
  }

  async insertRating(
    reviewId: number,
    culture: number,
    management: number,
    workLifeBalance: number,
    careerDevelopment: number,
  ): Promise<number> {
    const insertResult = await this.insert({
      reviewId,
      culture,
      management,
      workLifeBalance,
      careerDevelopment,
    });

    return insertResult.raw;
  }
}
