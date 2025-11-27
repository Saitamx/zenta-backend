import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'Admin', description: 'Nombre completo del usuario' })
	@IsNotEmpty()
	name!: string;

	@ApiProperty({ example: 'admin@example.com', description: 'Correo electrónico único' })
	@IsEmail()
	email!: string;

	@ApiProperty({ example: '123456', minLength: 6, description: 'Contraseña (mínimo 6 caracteres)' })
	@MinLength(6)
	password!: string;
}


