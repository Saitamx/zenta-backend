import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { Publisher } from './entities/publisher.entity';

@Module({
	imports: [SequelizeModule.forFeature([Book, Author, Publisher])],
	controllers: [BooksController],
	providers: [BooksService],
})
export class BooksModule {}


