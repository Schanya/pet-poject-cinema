import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';

import { User } from '../../user/domain/user.entity';
import { Movie } from 'src/core/movie/domain/movie.entity';

interface RoomCreationAttrs {
	movieId: number;
	userId: number;
}

@Table({ tableName: 'room', paranoid: true })
export class Room extends Model<Room, RoomCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	numberOfUsers: number;

	@ForeignKey(() => Movie)
	@Column({ type: DataType.INTEGER })
	movieId: number;

	@BelongsToMany(() => User, 'users_rooms', 'user_id', 'room_id')
	users: User[];
}
