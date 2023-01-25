import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Status, Ticket } from '.';
import { User } from '../../user/entities/user.entity';

@Table({
	tableName: 'basket',
	createdAt: false,
	updatedAt: false,
	paranoid: true,
})
export class Basket extends Model<Basket> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@ForeignKey(() => Ticket)
	@Column({ type: DataType.INTEGER })
	ticketId: number;

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	statusId: number;
}
