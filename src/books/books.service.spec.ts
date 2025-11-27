import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { Sequelize } from 'sequelize-typescript';
import { Author } from './entities/author.entity';
import { Publisher } from './entities/publisher.entity';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
	let service: BooksService;

	const mockBookModel = {
		create: jest.fn(),
		findAndCountAll: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
	};

	const mockSequelize = {
		transaction: jest.fn((cb: (tx: unknown) => unknown | Promise<unknown>) => cb({})),
	} as Partial<Sequelize> as Sequelize;

	beforeEach(async () => {
		// reset static helpers
		(Author as any).findOrCreate = jest.fn();
		(Publisher as any).findOrCreate = jest.fn();

		const moduleRef = await Test.createTestingModule({
			providers: [
				BooksService,
				{ provide: getModelToken(Book), useValue: mockBookModel },
				{ provide: Sequelize, useValue: mockSequelize },
			],
		}).compile();

		service = moduleRef.get(BooksService);
		jest.clearAllMocks();
	});

	it('creates a book normalizing author and publisher', async () => {
		(Author as any).findOrCreate = jest
			.fn()
			.mockResolvedValue([{ id: 'author-1', name: 'A' }]);
		(Publisher as any).findOrCreate = jest
			.fn()
			.mockResolvedValue([{ id: 'pub-1', name: 'P' }]);
		const dto: any = { title: 'T', author: 'A', publisher: 'P' };
		const created = { id: 'book-1', ...dto };
		mockBookModel.create.mockResolvedValue(created);

		const result = await service.create(dto);

		expect(result).toBe(created);
		expect((Author as any).findOrCreate).toHaveBeenCalled();
		expect((Publisher as any).findOrCreate).toHaveBeenCalled();
		expect(mockBookModel.create).toHaveBeenCalledTimes(1);
		const payload = mockBookModel.create.mock.calls[0][0];
		expect(payload).toMatchObject({
			title: 'T',
			author: 'A',
			authorId: 'author-1',
			publisherId: 'pub-1',
		});
	});

	it('returns paginated list from findAll', async () => {
		mockBookModel.findAndCountAll.mockResolvedValue({
			rows: [{ id: '1', title: 'T' }],
			count: 1,
		});

		const result = await service.findAll({
			page: 2,
			pageSize: 5,
			search: 'Clean',
			sort: 'createdAt:desc',
		} as any);

		expect(mockBookModel.findAndCountAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual({
			data: [{ id: '1', title: 'T' }],
			total: 1,
			page: 2,
			pageSize: 5,
		});
	});

	it('builds CSV export', async () => {
		const date = new Date();
		mockBookModel.findAll.mockResolvedValue([
			{
				id: '1',
				title: 'T',
				author: 'A',
				publishedYear: 2020,
				isbn: '123',
				description: 'D',
				imageUrl: 'http://img',
				available: true,
				createdAt: date,
			},
		]);

		const csv = await service.exportCsv({} as any);

		const lines = csv.split('\n');
		expect(lines[0]).toContain('title');
		expect(lines[1]).toContain('T');
		expect(lines[1]).toContain('123');
	});

	it('throws when book not found', async () => {
		mockBookModel.findByPk.mockResolvedValue(null);
		await expect(service.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
	});
});

