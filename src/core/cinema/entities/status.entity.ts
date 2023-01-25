import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Basket } from '.';

interface StatusCreationAttrs {
	name: string;
}

@Table({ tableName: 'statuses', paranoid: true })
export class Status extends Model<Status, StatusCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@HasMany(() => Basket)
	baskets: Basket[];
}
