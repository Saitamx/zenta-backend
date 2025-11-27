import { Model } from 'sequelize-typescript';
import { Author } from './author.entity';
import { Publisher } from './publisher.entity';
export interface BookCreationAttributes {
    title: string;
    author: string;
    publishedYear?: number;
    isbn?: string;
    description?: string;
    imageUrl?: string;
    available?: boolean;
}
export declare class Book extends Model<Book, BookCreationAttributes> {
    id: string;
    title: string;
    authorId?: string;
    author: string;
    publisherId?: string;
    publishedYear?: number;
    isbn?: string;
    description?: string;
    imageUrl?: string;
    available: boolean;
    authorRef?: Author;
    publisherRef?: Publisher;
}
