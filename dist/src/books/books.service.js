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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const book_entity_1 = require("./entities/book.entity");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const author_entity_1 = require("./entities/author.entity");
const publisher_entity_1 = require("./entities/publisher.entity");
let BooksService = class BooksService {
    constructor(bookModel, sequelize) {
        this.bookModel = bookModel;
        this.sequelize = sequelize;
    }
    async create(dto) {
        return this.sequelize.transaction(async (tx) => {
            let authorId = undefined;
            let publisherId = undefined;
            if (dto.author) {
                const [a] = await author_entity_1.Author.findOrCreate({
                    where: { name: dto.author },
                    defaults: { name: dto.author },
                    transaction: tx,
                });
                authorId = a.id;
            }
            if (dto['publisher']) {
                const [p] = await publisher_entity_1.Publisher.findOrCreate({
                    where: { name: dto.publisher },
                    defaults: { name: dto.publisher },
                    transaction: tx,
                });
                publisherId = p.id;
            }
            return this.bookModel.create({ ...dto, authorId, publisherId }, { transaction: tx });
        });
    }
    buildQuery(query) {
        var _a, _b, _c;
        const page = (_a = query.page) !== null && _a !== void 0 ? _a : 1;
        const pageSize = (_b = query.pageSize) !== null && _b !== void 0 ? _b : 10;
        const where = {};
        if (query.search) {
            const q = `%${query.search}%`;
            where[sequelize_2.Op.or] = [
                { title: { [sequelize_2.Op.iLike]: q } },
                { author: { [sequelize_2.Op.iLike]: q } },
                { isbn: { [sequelize_2.Op.iLike]: q } },
            ];
        }
        if (query.author) {
            where.author = { [sequelize_2.Op.iLike]: `%${query.author}%` };
        }
        if (query.publisher) {
            where.publisher = { [sequelize_2.Op.iLike]: `%${query.publisher}%` };
        }
        if (typeof query.available === 'boolean') {
            where.available = query.available;
        }
        const order = ((_c = query.sort) === null || _c === void 0 ? void 0 : _c.split(',').map((pair) => pair.split(':')).filter((x) => x.length === 2)) || [['createdAt', 'DESC']];
        return { page, pageSize, where, order };
    }
    async findAll(query) {
        const { page, pageSize, where, order } = this.buildQuery(query);
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const { rows, count } = await this.bookModel.findAndCountAll({
            where,
            order: order,
            offset,
            limit,
        });
        return { data: rows, total: count, page, pageSize };
    }
    async exportCsv(query) {
        const { where, order } = this.buildQuery(query);
        const rows = await this.bookModel.findAll({
            where,
            order: order,
        });
        const headers = ['id', 'title', 'author', 'publishedYear', 'isbn', 'description', 'imageUrl', 'available', 'createdAt'];
        const escapeCsv = (val) => {
            if (val === null || val === undefined)
                return '';
            const s = String(val);
            if (/[",\n]/.test(s))
                return `"${s.replace(/"/g, '""')}"`;
            return s;
        };
        const lines = [
            headers.join(','),
            ...rows.map((b) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return [
                    b.id,
                    b.title,
                    b.author,
                    (_a = b.publishedYear) !== null && _a !== void 0 ? _a : '',
                    (_b = b.isbn) !== null && _b !== void 0 ? _b : '',
                    (_c = b.description) !== null && _c !== void 0 ? _c : '',
                    (_d = b.imageUrl) !== null && _d !== void 0 ? _d : '',
                    (_e = b.available) !== null && _e !== void 0 ? _e : true,
                    (_h = (_g = (_f = b.createdAt) === null || _f === void 0 ? void 0 : _f.toISOString) === null || _g === void 0 ? void 0 : _g.call(_f)) !== null && _h !== void 0 ? _h : '',
                ].map(escapeCsv).join(',');
            }),
        ];
        return lines.join('\n');
    }
    async findOne(id) {
        const book = await this.bookModel.findByPk(id);
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async update(id, dto) {
        return this.sequelize.transaction(async (tx) => {
            const book = await this.findOne(id);
            let payload = { ...dto };
            if (dto.author) {
                const [a] = await author_entity_1.Author.findOrCreate({
                    where: { name: dto.author },
                    defaults: { name: dto.author },
                    transaction: tx,
                });
                payload.authorId = a.id;
            }
            if (dto.publisher) {
                const [p] = await publisher_entity_1.Publisher.findOrCreate({
                    where: { name: dto.publisher },
                    defaults: { name: dto.publisher },
                    transaction: tx,
                });
                payload.publisherId = p.id;
            }
            await book.update(payload, { transaction: tx });
            return book;
        });
    }
    async remove(id) {
        return this.sequelize.transaction(async (tx) => {
            const book = await this.findOne(id);
            await book.destroy({ transaction: tx });
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(book_entity_1.Book)),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize])
], BooksService);
//# sourceMappingURL=books.service.js.map