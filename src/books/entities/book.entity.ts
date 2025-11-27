import { Table, Column, Model, DataType, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

@Table({
	tableName: 'books',
	timestamps: true,
	paranoid: true,
	indexes: [
		{ fields: ['author'] },
		{ fields: ['createdAt'] },
		{ fields: ['author', 'publishedYear'] },
	],
})
export class Book extends Model<Book, BookCreationAttributes> {
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
	})
	id!: string;

	@Index
	@Column({
		type: DataType.STRING(200),
		allowNull: false,
	})
	title!: string;

	@ForeignKey(() => Author)
	@Column({ type: DataType.UUID, allowNull: true })
	authorId?: string;

	@Column({
		type: DataType.STRING(150),
		allowNull: false,
	})
	author!: string;

	@ForeignKey(() => Publisher)
	@Column({ type: DataType.UUID, allowNull: true })
	publisherId?: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	publishedYear?: number;

	@Index
	@Column({
		type: DataType.STRING(50),
		allowNull: true,
	})
	isbn?: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	description?: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	imageUrl?: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	})
	available!: boolean;

	@BelongsTo(() => Author)
	authorRef?: Author;

	@BelongsTo(() => Publisher)
	publisherRef?: Publisher;
}


