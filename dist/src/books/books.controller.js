"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const list_books_dto_1 = require("./dto/list-books.dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    create(dto) {
        return this.booksService.create(dto);
    }
    findAll(query) {
        return this.booksService.findAll(query);
    }
    async exportCsv(query) {
        return this.booksService.exportCsv(query);
    }
    findOne(id) {
        return this.booksService.findOne(id);
    }
    update(id, dto) {
        return this.booksService.update(id, dto);
    }
    remove(id) {
        return this.booksService.remove(id);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear libro' }),
    (0, swagger_1.ApiBody)({
        type: create_book_dto_1.CreateBookDto,
        examples: {
            default: {
                summary: 'Ejemplo',
                value: {
                    title: 'Clean Code',
                    author: 'Robert C. Martin',
                    publishedYear: 2008,
                    isbn: '9780132350884',
                    description: 'Libro sobre buenas prácticas de programación.',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar libros' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'Clean' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, example: 'createdAt:desc,title:asc' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_books_dto_1.ListBooksQueryDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Exportar libros como CSV' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, example: 'Clean' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, example: 'createdAt:desc,title:asc' }),
    (0, common_1.Header)('Content-Type', 'text/csv; charset=utf-8'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename="books.csv"'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_books_dto_1.ListBooksQueryDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "exportCsv", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener libro por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'uuid-v4' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar libro' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'uuid-v4' }),
    (0, swagger_1.ApiBody)({
        type: update_book_dto_1.UpdateBookDto,
        examples: {
            default: {
                summary: 'Ejemplo',
                value: {
                    title: 'Clean Code (2nd ed.)',
                    description: 'Edición actualizada.',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar libro' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'uuid-v4' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map