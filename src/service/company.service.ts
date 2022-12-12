import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';
import { MySQLCompanyRepository } from '../repository/MySql/mysql.company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(MySQLCompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  getTopRecommended(limit: number): any {
    return this.companyRepository.getTopRecommended(limit);
  }
}
