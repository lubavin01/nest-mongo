import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { userStub, userWithIdStub } from '../stubs/user.stub';

import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbConnection();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getUsers', () => {
    beforeEach(async () => {
      await dbConnection.collection('Users').insertOne(userWithIdStub());
    });

    afterEach(async () => {
      await dbConnection.collection('Users').deleteMany({});
    });

    it('gets all users', async () => {
      const response = await request(httpServer).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userWithIdStub()]);
    });

    it('gets user by id', async () => {
      const response = await request(httpServer).get(
        `/users/${userWithIdStub().userId}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(userWithIdStub());
    });
  });

  describe('create user', () => {
    afterEach(async () => {
      await dbConnection.collection('Users').deleteMany({});
    });

    it('creates a user sucessfully', async () => {
      const createRequest: CreateUserDto = userStub();

      const response = await request(httpServer)
        .post('/users')
        .send(createRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userStub());

      const user = await dbConnection
        .collection('Users')
        .findOne({ email: createRequest.email });

      expect(user).toMatchObject(createRequest);
    });
  });

  describe.only('update user', () => {
    beforeEach(async () => {
      await dbConnection.collection('Users').insertOne(userWithIdStub());
    });

    afterEach(async () => {
      await dbConnection.collection('Users').deleteMany({});
    });

    it('updates', async () => {
      const updateRequest: UpdateUserDto = {
        age: 28,
      };
      const userId = userWithIdStub().userId;

      const response = await request(httpServer)
        .patch(`/users/${userId}`)
        .send(updateRequest);

      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ ...userWithIdStub(), age: 28 });

      const user = await dbConnection.collection('Users').findOne({ userId });
      expect(user).toMatchObject({ ...userWithIdStub(), age: 28 });
    });
  });
});
