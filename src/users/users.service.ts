import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private readonly userModel: typeof User) {}

	async create(dto: CreateUserDto): Promise<User> {
		const passwordHash = await bcrypt.hash(dto.password, 10);
		return this.userModel.create({ name: dto.name, email: dto.email, passwordHash });
	}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll({ attributes: { exclude: ['passwordHash'] } });
	}

	async findOneById(id: string): Promise<User> {
		const user = await this.userModel.findByPk(id, { attributes: { exclude: ['passwordHash'] } });
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ where: { email } });
	}

	async update(id: string, dto: UpdateUserDto): Promise<User> {
		const user = await this.userModel.findByPk(id);
		if (!user) throw new NotFoundException('User not found');
		if (dto.password) {
			user.passwordHash = await bcrypt.hash(dto.password, 10);
		}
		if (dto.name) user.name = dto.name;
		if (dto.email) user.email = dto.email;
		await user.save();
		return this.findOneById(user.id);
	}

	async remove(id: string): Promise<void> {
		const user = await this.userModel.findByPk(id);
		if (!user) throw new NotFoundException('User not found');
		await user.destroy();
	}
}


