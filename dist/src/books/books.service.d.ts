import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBooksQueryDto } from './dto/list-books.dto';
import { Sequelize } from 'sequelize-typescript';
export declare class BooksService {
    private readonly bookModel;
    private readonly sequelize;
    constructor(bookModel: typeof Book, sequelize: Sequelize);
    create(dto: CreateBookDto): Promise<Book>;
    private buildQuery;
    findAll(query: ListBooksQueryDto): Promise<{
        data: Book[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    exportCsv(query: ListBooksQueryDto): Promise<string>;
    findOne(id: string): Promise<Book>;
    update(id: string, dto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
}
