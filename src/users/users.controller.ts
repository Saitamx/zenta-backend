import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiOperation({ summary: 'Listar usuarios' })
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	@ApiOperation({ summary: 'Obtener usuario por ID' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	findOne(@Param('id') id: string) {
		return this.usersService.findOneById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar usuario' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	@ApiBody({
		type: UpdateUserDto,
		examples: {
			default: {
				summary: 'Ejemplo',
				value: { name: 'Nuevo Nombre', password: 'nuevaPass123' },
			},
		},
	})
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar usuario' })
	@ApiParam({ name: 'id', example: 'uuid-v4' })
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}

	// Registration is in auth controller; keeping create here disabled for cohesion.
	@Post('noop')
	noopCreate(@Body() _dto: CreateUserDto) {
		return { message: 'Use /auth/register to create users' };
	}
}


