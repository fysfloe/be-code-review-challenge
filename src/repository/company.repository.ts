import { Company } from '../entity/company.entity';

export interface CompanyRepository {
  getTopRecommended(limit: number): Promise<Company[]>;

  recalculateCompanyScore(companyId: number): void;
}
