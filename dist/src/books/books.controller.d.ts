import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBooksQueryDto } from './dto/list-books.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(dto: CreateBookDto): Promise<import("./entities/book.entity").Book>;
    findAll(query: ListBooksQueryDto): Promise<{
        data: import("./entities/book.entity").Book[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    exportCsv(query: ListBooksQueryDto): Promise<string>;
    findOne(id: string): Promise<import("./entities/book.entity").Book>;
    update(id: string, dto: UpdateBookDto): Promise<import("./entities/book.entity").Book>;
    remove(id: string): Promise<void>;
}
