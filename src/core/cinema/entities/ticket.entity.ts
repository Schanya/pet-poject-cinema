import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

import { Basket, Schedule, Schema } from '.';

interface TicketCreationAttrs {
	schemaId: number;
	scheduleId: number;
}

@Table({ tableName: 'tickets', paranoid: true })
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

	@BelongsToMany(() => User, () => Basket)
	users: User[];
}
