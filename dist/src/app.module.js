"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const books_module_1 = require("./books/books.module");
const health_module_1 = require("./health/health.module");
const user_entity_1 = require("./users/entities/user.entity");
const book_entity_1 = require("./books/entities/book.entity");
const author_entity_1 = require("./books/entities/author.entity");
const publisher_entity_1 = require("./books/entities/publisher.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const sslMode = configService.get('PGSSLMODE') || '';
                    const sslRequired = sslMode.toLowerCase() === 'require';
                    return {
                        dialect: 'postgres',
                        host: configService.get('DATABASE_HOST', 'localhost'),
                        port: parseInt(configService.get('DATABASE_PORT', '5432'), 10),
                        username: configService.get('DATABASE_USER', 'postgres'),
                        password: configService.get('DATABASE_PASSWORD', 'postgres'),
                        database: configService.get('DATABASE_NAME', 'zenta_cmpc'),
                        models: [user_entity_1.User, book_entity_1.Book, author_entity_1.Author, publisher_entity_1.Publisher],
                        autoLoadModels: true,
                        synchronize: true,
                        sync: { alter: true },
                        logging: false,
                        retry: { max: 5 },
                        dialectOptions: sslRequired
                            ? {
                                ssl: {
                                    require: true,
                                    rejectUnauthorized: false,
                                },
                            }
                            : undefined,
                    };
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            books_module_1.BooksModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map