import { Model } from 'sequelize-typescript';
import { Book } from './book.entity';
export interface PublisherCreationAttributes {
    name: string;
}
export declare class Publisher extends Model<Publisher, PublisherCreationAttributes> {
    id: string;
    name: string;
    books: Book[];
}
