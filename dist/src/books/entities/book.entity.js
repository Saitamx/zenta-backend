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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const author_entity_1 = require("./author.entity");
const publisher_entity_1 = require("./publisher.entity");
let Book = class Book extends sequelize_typescript_1.Model {
};
exports.Book = Book;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => author_entity_1.Author),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: true }),
    __metadata("design:type", String)
], Book.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => publisher_entity_1.Publisher),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: true }),
    __metadata("design:type", String)
], Book.prototype, "publisherId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Book.prototype, "publishedYear", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Book.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], Book.prototype, "available", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => author_entity_1.Author),
    __metadata("design:type", author_entity_1.Author)
], Book.prototype, "authorRef", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => publisher_entity_1.Publisher),
    __metadata("design:type", publisher_entity_1.Publisher)
], Book.prototype, "publisherRef", void 0);
exports.Book = Book = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'books',
        timestamps: true,
        paranoid: true,
        indexes: [
            { fields: ['author'] },
            { fields: ['createdAt'] },
            { fields: ['author', 'publishedYear'] },
        ],
    })
], Book);
//# sourceMappingURL=book.entity.js.map