import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Test the company controller', () => {
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

  describe('GET top recommended tests', () => {
    it('gets top recommended companies', () => {
      return request(app.getHttpServer())
        .get('/top-recommended/10')
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
