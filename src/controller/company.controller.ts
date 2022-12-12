import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Company } from '../entity/company.entity';
import { CompanyRepository } from '../repository/company.repository';
import { MySQLCompanyRepository } from '../repository/MySql/mysql.company.repository';

@Controller()
export class CompanyController {
  constructor(
    @Inject(MySQLCompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  @Get('/top-recommended/:limit')
  async getTopRecommended(@Query() limit: number): Promise<Company[]> {
    return await this.companyRepository.getTopRecommended(limit);
  }
}
