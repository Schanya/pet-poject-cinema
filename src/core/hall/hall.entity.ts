import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface HallCreationAttrs {
	name: string;
}

@Table({ tableName: 'halls' })
export class Hall extends Model<Hall, HallCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;
}
