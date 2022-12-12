import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from '../../entity/review.entity';
import { ReviewRepository } from '../review.repository';

@Injectable()
export class MySQLReviewRepository
  extends Repository<Review>
  implements ReviewRepository
{
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async insertReview(company, title, pro, contra, suggestions, user) {
    const insertResult = await this.insert({
      company,
      title,
      pro,
      contra,
      suggestions,
      user,
    });

    return insertResult.raw.insertId;
  }
}
