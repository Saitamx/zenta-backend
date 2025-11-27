import { Table, Column, Model, DataType, Index, Unique, HasMany } from 'sequelize-typescript';
import { Book } from './book.entity';

export interface AuthorCreationAttributes {
  name: string;
}

@Table({
  tableName: 'authors',
  timestamps: true,
  paranoid: true,
  indexes: [{ fields: ['name'] }],
})
export class Author extends Model<Author, AuthorCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @Index
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Book)
  books!: Book[];
}


