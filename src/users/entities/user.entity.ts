import { Table, Column, Model, DataType, Index, Unique } from 'sequelize-typescript';
export interface UserCreationAttributes {
	email: string;
	name: string;
	passwordHash: string;
}

@Table({
	tableName: 'users',
	timestamps: true,
})
export class User extends Model<User, UserCreationAttributes> {
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
	email!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	passwordHash!: string;
}


