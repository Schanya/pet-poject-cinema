import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';

import { Schedule } from '../schedule/schedule.entity';
import { Schema } from '../schema/schema.entity';

interface TicketCreationAttrs {
	schemaId: number;
	scheduleId: number;
}

@Table({ tableName: 'tickets' })
export class Ticket extends Model<Ticket, TicketCreationAttrs> {
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
}
