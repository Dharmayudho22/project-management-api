import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import { AppModule } from '../src/app.module';

describe('Project Management E2E', () => {
  let app: INestApplication;
  let token: string;
  let projectId: number;
  let taskId: number;

  const email = `e2e_${Date.now()}@test.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register user', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password: '123456',
      })
      .expect(201);
  });

  it('should login and return JWT token', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: '123456',
      })
      .expect(201);

    const body = response.body as { access_token: string };
    token = body.access_token;

    expect(token).toBeDefined();
  });

  it('should reject access to protected route without token', async () => {
    await request(app.getHttpServer()).get('/projects').expect(401);
  });

  it('should create project with token', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'E2E Project' })
      .expect(201);

    const body = response.body as { id: number };
    projectId = body.id;

    expect(projectId).toBeDefined();
  });

  it('should create task under project', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        projectId,
        title: 'E2E Task',
      })
      .expect(201);

    const body = response.body as { id: number };
    taskId = body.id;

    expect(taskId).toBeDefined();
  });

  it('should update task', async () => {
    const response: Response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task Title',
      })
      .expect(200);

    const body = response.body as { title: string };
    expect(body.title).toBe('Updated Task Title');
  });

  it('should get tasks by project', async () => {
    const response: Response = await request(app.getHttpServer())
      .get(`/tasks/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const body = response.body as Array<{ id: number }>;
    expect(Array.isArray(body)).toBe(true);
  });

  it('should delete task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
