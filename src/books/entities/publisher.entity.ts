import { Table, Column, Model, DataType, Index, Unique, HasMany } from 'sequelize-typescript';
import { Book } from './book.entity';

export interface PublisherCreationAttributes {
  name: string;
}

@Table({
  tableName: 'publishers',
  timestamps: true,
  paranoid: true,
  indexes: [{ fields: ['name'] }],
})
export class Publisher extends Model<Publisher, PublisherCreationAttributes> {
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


