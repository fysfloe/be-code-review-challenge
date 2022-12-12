import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviewTable1668948794909 implements MigrationInterface {
  name = 'CreateReviewTable1668948794909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`pro\` text NULL, \`contra\` text NULL, \`suggestions\` text NULL, \`user\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_eaebd923ff5f1d66882a6504e03\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_eaebd923ff5f1d66882a6504e03\``,
    );
    await queryRunner.query(`DROP TABLE \`review\``);
  }
}
