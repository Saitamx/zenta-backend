import { Model } from 'sequelize-typescript';
import { Book } from './book.entity';
export interface AuthorCreationAttributes {
    name: string;
}
export declare class Author extends Model<Author, AuthorCreationAttributes> {
    id: string;
    name: string;
    books: Book[];
}
