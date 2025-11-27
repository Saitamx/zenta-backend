import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { HealthModule } from './health/health.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		SequelizeModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: 'postgres',
				host: configService.get<string>('DATABASE_HOST', 'localhost'),
				port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
				username: configService.get<string>('DATABASE_USER', 'postgres'),
				password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
				database: configService.get<string>('DATABASE_NAME', 'zenta_cmpc'),
				models: [User, Book],
				autoLoadModels: true,
				synchronize: true,
				// Ensure new columns are added automatically during development
				sync: { alter: true },
				logging: false,
				retry: { max: 5 },
			}),
		}),
		UsersModule,
		AuthModule,
		BooksModule,
		HealthModule,
	],
})
export class AppModule {}


