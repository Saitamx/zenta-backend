import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

describe('BooksService', () => {
	let service: BooksService;
	const mockBookModel = {
		create: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				BooksService,
				{ provide: getModelToken(Book), useValue: mockBookModel },
			],
		}).compile();

		service = moduleRef.get(BooksService);
		jest.clearAllMocks();
	});

	it('should create a book', async () => {
		const dto = { title: 'T', author: 'A' };
		mockBookModel.create.mockResolvedValue(dto);
		const result = await service.create(dto as any);
		expect(result).toEqual(dto);
		expect(mockBookModel.create).toHaveBeenCalledWith(dto);
	});

	it('should list books', async () => {
		mockBookModel.findAll.mockResolvedValue([]);
		const result = await service.findAll();
		expect(result).toEqual([]);
	});

	it('should find one', async () => {
		const book = { id: '1' };
		mockBookModel.findByPk.mockResolvedValue(book);
		const result = await service.findOne('1');
		expect(result).toEqual(book);
	});
});


