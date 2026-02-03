import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

interface RegisterResponse {
  userId: number;
}

interface LoginResponse {
  access_token: string;
}

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'e2e@test.com',
        password: '123456',
      });

    expect(response.status).toBe(201);

    const body = response.body as RegisterResponse;
    expect(body.userId).toBeDefined();
  });

  it('should login and return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'e2e@test.com',
        password: '123456',
      });

    expect(response.status).toBe(201);

    const body = response.body as LoginResponse;
    expect(body.access_token).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
