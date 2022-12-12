import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanyTable1668886543985 implements MigrationInterface {
  name = 'CreateCompanyTable1668886543985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`industry\` varchar(255) NOT NULL, \`score\` decimal(5,2) DEFAULT '0.00' NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`company\``);
  }
}
