import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SnippetsService } from './snippets.service';
import { Snippet } from './snippet.entity';

describe('SnippetsService', () => {
  let service: SnippetsService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(snippet => Promise.resolve({ id: 1, ...snippet })),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(true),
      delete: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnippetsService,
        {
          provide: getRepositoryToken(Snippet),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a snippet', async () => {
    const dto = { title: 'Test Snippet', code: 'console.log("Hello")' };
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalled();
  });


});