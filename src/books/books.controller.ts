import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Header } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListBooksQueryDto } from './dto/list-books.dto';

@ApiTags('books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {}

	@Post()
	@ApiOperation({ summary: 'Crear libro' })
	@ApiBody({
		type: CreateBookDto,
		examples: {
			default: {
				summary: 'Ejemplo',
				value: {
					title: 'Clean Code',
					author: 'Robert C. Martin',
					publishedYear: 2008,
					isbn: '9780132350884',
					description: 'Libro sobre buenas prácticas de programación.',
				},
			},
		},
	})
	create(@Body() dto: CreateBookDto) {
		return this.booksService.create(dto);
	}

	@Get()
	@ApiOperation({ summary: 'Listar libros' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, example: 10 })
	@ApiQuery({ name: 'search', required: false, example: 'Clean' })
	@ApiQuery({ name: 'sort', required: false, example: 'createdAt:desc,title:asc' })
	findAll(@Query() query: ListBooksQueryDto) {
		return this.booksService.findAll(query);
	}

	@Get('export')
	@ApiOperation({ summary: 'Exportar libros como CSV' })
	@ApiQuery({ name: 'search', required: false, example: 'Clean' })
	@ApiQuery({ name: 'sort', required: false, example: 'createdAt:desc,title:asc' })
	@Header('Content-Type', 'text/csv; charset=utf-8')
	@Header('Content-Disposition', 'attachment; filename="books.csv"')
	async exportCsv(@Query() query: ListBooksQueryDto): Promise<string> {
		return this.booksService.exportCsv(query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener libro por ID' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	findOne(@Param('id') id: string) {
		return this.booksService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar libro' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	@ApiBody({
		type: UpdateBookDto,
		examples: {
			default: {
				summary: 'Ejemplo',
				value: {
					title: 'Clean Code (2nd ed.)',
					description: 'Edición actualizada.',
				},
			},
		},
	})
	update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
		return this.booksService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar libro' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	remove(@Param('id') id: string) {
		return this.booksService.remove(id);
	}
}


