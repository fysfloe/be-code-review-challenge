import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Test the review controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('PUT review', () => {
    it('saves a review in the database and updates company score', () => {
      return request(app.getHttpServer())
        .put('/company/1/review')
        .send({
          title: 'My review My review My review',
          user: 'somebody23@internet.com',
          pro: 'Nice company to work for',
          contra: 'Low salary',
          suggestions: 'Increase salaries',
          rating: {
            culture: 3,
            management: 4,
            work_life_balance: 5,
            career_development: 2,
          },
        })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
