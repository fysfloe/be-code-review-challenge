import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from '../../entity/company.entity';
import { CompanyRepository } from '../company.repository';

@Injectable()
export class MySQLCompanyRepository
  extends Repository<Company>
  implements CompanyRepository
{
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async getTopRecommended(limit: number): Promise<Company[]> {
    const topCompanies = await this.query(`SELECT
            c.id,
            c.name,
            c.slug,
            c.city,
            c.country,
            c.industry,
            ROUND(AVG((ra.culture + ra.management + ra.workLifeBalance + ra.careerDevelopment) / 4), 2) AS score
        FROM company c
        INNER JOIN review r ON
            r.companyId = c.id
        INNER JOIN rating ra ON
            ra.reviewId = r.id
        GROUP BY c.id`);

    topCompanies.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }

      if (a.score === b.score) {
        return 0;
      }

      return -1;
    });

    return topCompanies;
  }

  async recalculateCompanyScore(companyId: number): Promise<void> {
    const result = await this.query(
      `SELECT ROUND(AVG((ra.culture + ra.management + ra.workLifeBalance + ra.careerDevelopment) / 4), 2) AS score
        FROM company c
        INNER JOIN review r ON r.companyId = c.id
        INNER JOIN rating ra ON ra.reviewId = r.id
        WHERE c.id = ?;`,
      [companyId],
    );

    this.query(`UPDATE company SET score = ? WHERE id = ?;`, [
      result[0].score,
      companyId,
    ]);
  }
}
