import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListBooksQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  search?: string = '';

  // CSV de pares field:dir, e.g., "createdAt:desc,title:asc"
  @IsOptional()
  @IsString()
  @Matches(/^(\w+:(asc|desc))(,\w+:(asc|desc))*$/i, { message: 'Invalid sort format' })
  sort?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : undefined))
  available?: boolean;
}


