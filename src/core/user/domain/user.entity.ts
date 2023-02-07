import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';

import { Basket } from 'src/core/basket/domain/basket.entity';
import { RequestedSeat } from 'src/core/requested-seat/domain/requested-seat.entity';
import { Room } from 'src/core/room/domain/room.entity';
import { Ticket } from 'src/core/ticket/domain/ticket.entity';
import { Role } from '../../role/domain/role.entity';

interface UserCreationAttrs {
	login: string;
	password: string;
}

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@BelongsToMany(() => Room, 'users_rooms', 'user_id', 'room_id')
	rooms: Room[];

	@BelongsToMany(() => Role, 'users_roles', 'user_id', 'role_id')
	roles: Role[];

	@BelongsToMany(() => Ticket, () => Basket)
	tickets: Ticket[];

	@HasMany(() => RequestedSeat)
	requestedSeats: RequestedSeat[];
}
