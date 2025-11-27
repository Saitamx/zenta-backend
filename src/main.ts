import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpGlobalExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		// Allow all origins (the browser will send its own Origin header)
		// This simplifies deployment when frontend is hosted on a different domain (e.g. Vercel).
		origin: true,
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});
	app.setGlobalPrefix('api');
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.useGlobalFilters(new HttpGlobalExceptionFilter());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
	const config = new DocumentBuilder()
		.setTitle('Zenta CMPC Service')
		.setDescription('API REST para autenticación y CRUD de libros')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
	const port = process.env.PORT || 3000;
	await app.listen(port as number);
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${port}`);
	console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
