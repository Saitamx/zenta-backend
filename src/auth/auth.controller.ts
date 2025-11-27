import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Registrar usuario' })
	@ApiCreatedResponse({ description: 'Usuario registrado' })
	@ApiBody({
		type: CreateUserDto,
		examples: {
			default: {
				summary: 'Ejemplo',
				value: { name: 'Admin', email: 'admin@example.com', password: '123456' },
			},
		},
	})
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login y obtención de JWT' })
	@ApiOkResponse({ description: 'Token JWT y datos del usuario' })
	@ApiBody({
		type: LoginDto,
		examples: {
			default: {
				summary: 'Ejemplo',
				value: { email: 'admin@example.com', password: '123456' },
			},
		},
	})
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}
}


