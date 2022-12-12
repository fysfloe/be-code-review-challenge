import { EntitySchema } from 'typeorm';
import { Rating } from '../entity/rating.entity';

export const RatingSchema = new EntitySchema<Rating>({
  name: 'Rating',
  target: Rating,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    reviewId: {
      type: Number,
    },
    culture: {
      type: 'smallint',
    },
    management: {
      type: 'smallint',
    },
    workLifeBalance: {
      type: 'smallint',
    },
    careerDevelopment: {
      type: 'smallint',
    },
  },
});
