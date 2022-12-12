import { ResultSetHeader } from 'mysql2';
import { MigrationInterface, QueryRunner } from 'typeorm';
import seedData from './seed.data';

export class SeedData1669275479904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { companies } = seedData;

    companies.map(async (company) => {
      const result: ResultSetHeader = await queryRunner.query(
        `INSERT INTO company (name, slug, city, country, industry, score) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          company.name,
          company.slug,
          company.city,
          company.country,
          company.industry,
          this.calculateCompanyScore(company.reviews),
        ],
      );
      const companyId = result.insertId;

      company.reviews.map(async (review) => {
        const result = await queryRunner.query(
          `INSERT INTO review (companyId, title, pro, contra, suggestions, user) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            companyId,
            review.title,
            review.pro,
            review.contra,
            review.suggestions,
            review.user,
          ],
        );

        const reviewid = result.insertId;

        await queryRunner.query(
          `INSERT INTO rating (reviewId, culture, management, workLifeBalance, careerDevelopment) VALUES (?, ?, ?, ?, ?)`,
          [
            reviewid,
            review.rating.culture,
            review.rating.management,
            review.rating.work_life_balance,
            review.rating.career_development,
          ],
        );
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE rating`);
    await queryRunner.query(`TRUNCATE TABLE review`);
    await queryRunner.query(`TRUNCATE TABLE company`);
  }

  private calculateCompanyScore(reviews: any[]): string {
    const numberOfReviews = reviews.length;
    if (numberOfReviews === 0) {
      return '0.0';
    }

    let companyScore = 0.0;
    reviews.map((review: any) => {
      companyScore +=
        (review.rating.culture +
          review.rating.management +
          review.rating.work_life_balance +
          review.rating.career_development) /
        4;
    });

    companyScore = companyScore / numberOfReviews;

    return companyScore.toFixed(2);
  }
}
