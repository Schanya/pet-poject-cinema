import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';

import { Basket } from 'src/core/basket/domain/basket.entity';
import { Schedule } from 'src/core/schedule/domain/schedule.entity';
import { Schema } from 'src/core/schema/domain/schema.entity';
import { User } from '../../user/domain/user.entity';

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
