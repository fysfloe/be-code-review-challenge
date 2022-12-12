import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRatingTable1669026305602 implements MigrationInterface {
  name = 'CreateRatingTable1669026305602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reviewId\` int NOT NULL, \`culture\` smallint NOT NULL, \`management\` smallint NOT NULL, \`workLifeBalance\` smallint NOT NULL, \`careerDevelopment\` smallint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`rating\``);
  }
}
