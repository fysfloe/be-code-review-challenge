import { EntitySchema } from 'typeorm';
import { Company } from '../entity/company.entity';

export const CompanySchema = new EntitySchema<Company>({
  name: 'Company',
  target: Company,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    industry: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  relations: {
    reviews: {
      type: 'one-to-many',
      target: 'Review',
    },
  },
});
