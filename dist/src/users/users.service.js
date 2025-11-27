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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(dto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        return this.userModel.create({ name: dto.name, email: dto.email, passwordHash });
    }
    async findAll() {
        return this.userModel.findAll({ attributes: { exclude: ['passwordHash'] } });
    }
    async findOneById(id) {
        const user = await this.userModel.findByPk(id, { attributes: { exclude: ['passwordHash'] } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findOneByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
    async update(id, dto) {
        const user = await this.userModel.findByPk(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (dto.password) {
            user.passwordHash = await bcrypt.hash(dto.password, 10);
        }
        if (dto.name)
            user.name = dto.name;
        if (dto.email)
            user.email = dto.email;
        await user.save();
        return this.findOneById(user.id);
    }
    async remove(id) {
        const user = await this.userModel.findByPk(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await user.destroy();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map