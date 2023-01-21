import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Hall } from '../hall/hall.entity';

interface SchemaCreationAttrs {
	place: number;
	row: number;
	hallId: number;
}

@Table({ tableName: 'schemas' })
export class Schema extends Model<Schema, SchemaCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.INTEGER, allowNull: false })
	place: number;

	@Column({ type: DataType.INTEGER, allowNull: false })
	row: number;

	@ForeignKey(() => Hall)
	@Column({ type: DataType.INTEGER })
	hallId: number;
}
