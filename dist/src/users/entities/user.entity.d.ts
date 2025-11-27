import { Model } from 'sequelize-typescript';
export interface UserCreationAttributes {
    email: string;
    name: string;
    passwordHash: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
}
