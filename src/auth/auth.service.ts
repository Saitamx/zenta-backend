import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async register(dto: CreateUserDto) {
		const existing = await this.usersService.findOneByEmail(dto.email);
		if (existing) {
			throw new UnauthorizedException('Email already registered');
		}
		const user = await this.usersService.create(dto);
		return { id: user.id, name: user.name, email: user.email };
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) return null;
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) return null;
		return user;
	}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto.email, dto.password);
		if (!user) throw new UnauthorizedException('Invalid credentials');
		const payload = { sub: user.id, email: user.email };
		const accessToken = await this.jwtService.signAsync(payload);
		return {
			accessToken,
			user: { id: user.id, name: user.name, email: user.email },
		};
	}
}


