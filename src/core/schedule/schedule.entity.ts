import {
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Timestamp } from 'typeorm';
import { Hall } from '../hall/hall.entity';
import { Movie } from '../movie/movie.entity';
import { Ticket } from '../ticket/ticket.entity';

interface ScheduleCreationAttrs {
	date: Date;
	movieId: number;
	hallId: number;
}

@Table({ tableName: 'schedule', paranoid: true })
export class Schedule extends Model<Schedule, ScheduleCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.DATE, allowNull: false, unique: true })
	date: Date;

	@ForeignKey(() => Movie)
	@Column({ type: DataType.INTEGER })
	movieId: number;

	@ForeignKey(() => Hall)
	@Column({ type: DataType.INTEGER })
	hallId: number;

	@HasMany(() => Ticket)
	tickets: Ticket[];
}
