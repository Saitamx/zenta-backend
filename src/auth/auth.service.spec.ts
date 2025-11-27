import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
	let service: AuthService;
	const usersService = {
		findOneByEmail: jest.fn(),
		create: jest.fn(),
	};
	const jwtService = {
		signAsync: jest.fn().mockResolvedValue('token'),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UsersService, useValue: usersService },
				{ provide: JwtService, useValue: jwtService },
			],
		}).compile();

		service = moduleRef.get(AuthService);
		jest.clearAllMocks();
	});

	it('registers new user', async () => {
		usersService.findOneByEmail.mockResolvedValue(null);
		usersService.create.mockResolvedValue({ id: '1', name: 'N', email: 'e@e.com' });
		await expect(
			service.register({ name: 'N', email: 'e@e.com', password: '123456' }),
		).resolves.toEqual({ id: '1', name: 'N', email: 'e@e.com' });
	});

	it('logins valid user', async () => {
		const hash = await bcrypt.hash('123456', 1);
		usersService.findOneByEmail.mockResolvedValue({
			id: '1',
			name: 'N',
			email: 'e@e.com',
			passwordHash: hash,
		});
		const result = await service.login({ email: 'e@e.com', password: '123456' });
		expect(result.accessToken).toBe('token');
	});
});


