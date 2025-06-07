import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController (Integration)', () => {
  let app: INestApplication;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    clear: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    // Reset mocks before each test for isolation
    jest.clearAllMocks();
    mockUserRepository.clear.mockResolvedValue(undefined);
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
      };
      const user = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      expect(response.body).toMatchObject({
        email: createUserDto.email,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        createdAt: expect.any(Date),
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw a conflict exception if email is already taken', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
      };
      const existingUser = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(existingUser);

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(409);

      expect(response.body.message).toBe('Email is already taken');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test2@example.com',
      };
      const user = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);
      mockUserRepository.find.mockResolvedValue([user]);

      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        email: createUserDto.email,
      });

      expect(mockUserRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no users exist', async () => {
      mockUserRepository.find.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });
});
