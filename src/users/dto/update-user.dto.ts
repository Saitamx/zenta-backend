import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiPropertyOptional({ example: '123456', description: 'Nueva contraseña (mínimo 6 caracteres)' })
	@IsOptional()
	@IsString()
	@MinLength(6)
	password?: string;
}


