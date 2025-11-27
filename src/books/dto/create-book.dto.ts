import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
	@ApiProperty({ example: 'Clean Code', description: 'Título del libro' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(200)
	title!: string;

	@ApiProperty({ example: 'Robert C. Martin', description: 'Autor del libro' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(150)
	author!: string;

	@ApiPropertyOptional({ example: 2008, description: 'Año de publicación' })
	@IsOptional()
	@IsInt()
	@Min(0)
	publishedYear?: number;

	@ApiPropertyOptional({ example: '9780132350884', description: 'Código ISBN' })
	@IsOptional()
	@IsString()
	@MaxLength(50)
	isbn?: string;

	@ApiPropertyOptional({ example: 'Libro sobre buenas prácticas de programación.' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ example: 'https://covers.openlibrary.org/b/id/9251996-L.jpg' })
	@IsOptional()
	@IsUrl()
	imageUrl?: string;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	available?: boolean;
}


