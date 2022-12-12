import { Review } from '../entity/review.entity';
import { EntitySchema } from 'typeorm';

export const ReviewSchema = new EntitySchema<Review>({
  name: 'Review',
  target: Review,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
    },
    pro: {
      type: 'text',
      nullable: true,
    },
    contra: {
      type: 'text',
      nullable: true,
    },
    suggestions: {
      type: 'text',
      nullable: true,
    },
    user: {
      type: String,
      nullable: true,
    },
  },
  relations: {
    company: {
      type: 'many-to-one',
      target: 'Company',
    },
  },
});
