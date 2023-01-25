import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { User } from 'src/core/user/entities';

import { Schedule, Schema } from '.';

interface RequestedSeatCreationAttrs {
	schemaId: number;
	scheduleId: number;
	userId: number;
}

@Table({ tableName: 'requsted_seats', paranoid: true })
export class RequestedSeat extends Model<RequestedSeatCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => Schema)
	@Column({ type: DataType.INTEGER })
	schemaId: number;

	@ForeignKey(() => Schedule)
	@Column({ type: DataType.INTEGER })
	scheduleId: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;
}
