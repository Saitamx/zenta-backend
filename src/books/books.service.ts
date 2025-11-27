import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBooksQueryDto } from './dto/list-books.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Author } from './entities/author.entity';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class BooksService {
	constructor(@InjectModel(Book) private readonly bookModel: typeof Book, private readonly sequelize: Sequelize) {}

	async create(dto: CreateBookDto) {
		return this.sequelize.transaction(async (tx) => {
			// ensure normalized refs
			let authorId: string | undefined = undefined;
			let publisherId: string | undefined = undefined;
			if (dto.author) {
				const [a] = await Author.findOrCreate({
					where: { name: dto.author },
					defaults: { name: dto.author },
					transaction: tx,
				});
				authorId = a.id;
			}
			if (dto['publisher']) {
				const [p] = await Publisher.findOrCreate({
					where: { name: (dto as any).publisher },
					defaults: { name: (dto as any).publisher },
					transaction: tx,
				});
				publisherId = p.id;
			}
			return this.bookModel.create({ ...dto, authorId, publisherId }, { transaction: tx });
		});
	}

	private buildQuery(query: ListBooksQueryDto) {
		const page = query.page ?? 1;
		const pageSize = query.pageSize ?? 10;

		// Use loose typing here to allow symbol keys like Op.or
		const where: any = {};
		if (query.search) {
			const q = `%${query.search}%`;
			where[Op.or] = [
				{ title: { [Op.iLike]: q } },
				{ author: { [Op.iLike]: q } },
				{ isbn: { [Op.iLike]: q } },
			];
		}
		if (query.author) {
			where.author = { [Op.iLike]: `%${query.author}%` };
		}
		if (query.publisher) {
			where.publisher = { [Op.iLike]: `%${query.publisher}%` };
		}
		if (typeof query.available === 'boolean') {
			where.available = query.available;
		}

		const order =
			query.sort
				?.split(',')
				.map((pair) => pair.split(':'))
				.filter((x) => x.length === 2) || [['createdAt', 'DESC']];

		return { page, pageSize, where, order };
	}

	async findAll(query: ListBooksQueryDto) {
		const { page, pageSize, where, order } = this.buildQuery(query);
		const offset = (page - 1) * pageSize;
		const limit = pageSize;

		const { rows, count } = await this.bookModel.findAndCountAll({
			where,
			order: order as any,
			offset,
			limit,
		});

		return { data: rows, total: count, page, pageSize };
	}

	async exportCsv(query: ListBooksQueryDto): Promise<string> {
		const { where, order } = this.buildQuery(query);
		const rows = await this.bookModel.findAll({
			where,
			order: order as any,
		});
		const headers = ['id', 'title', 'author', 'publishedYear', 'isbn', 'description', 'imageUrl', 'available', 'createdAt'];
		const escapeCsv = (val: unknown): string => {
			if (val === null || val === undefined) return '';
			const s = String(val);
			if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
			return s;
		};
		const lines = [
			headers.join(','),
			...rows.map((b) =>
				[
					b.id,
					b.title,
					b.author,
					b.publishedYear ?? '',
					b.isbn ?? '',
					b.description ?? '',
					(b as any).imageUrl ?? '',
					(b as any).available ?? true,
					b.createdAt?.toISOString?.() ?? '',
				].map(escapeCsv).join(','),
			),
		];
		return lines.join('\n');
	}

	async findOne(id: string) {
		const book = await this.bookModel.findByPk(id);
		if (!book) throw new NotFoundException('Book not found');
		return book;
	}

	async update(id: string, dto: UpdateBookDto) {
		return this.sequelize.transaction(async (tx) => {
			const book = await this.findOne(id);
			let payload: any = { ...dto };
			if (dto.author) {
				const [a] = await Author.findOrCreate({
					where: { name: dto.author },
					defaults: { name: dto.author },
					transaction: tx,
				});
				payload.authorId = a.id;
			}
			if ((dto as any).publisher) {
				const [p] = await Publisher.findOrCreate({
					where: { name: (dto as any).publisher },
					defaults: { name: (dto as any).publisher },
					transaction: tx,
				});
				payload.publisherId = p.id;
			}
			await book.update(payload, { transaction: tx });
			return book;
		});
	}

	async remove(id: string) {
		return this.sequelize.transaction(async (tx) => {
			const book = await this.findOne(id);
			await book.destroy({ transaction: tx });
		});
	}
}


