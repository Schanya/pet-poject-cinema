import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Schedule } from 'src/core/schedule/domain/schedule.entity';

interface MovieCreationAttrs {
	name: string;
	discroption: string;
	url: string;
}

@Table({ tableName: 'movies', paranoid: true })
export class Movie extends Model<Movie, MovieCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@Column({ type: DataType.STRING })
	discription: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	duration: number;

	@Column({ type: DataType.STRING, allowNull: false })
	url: string;

	@HasMany(() => Schedule)
	schedule: Schedule[];
}
