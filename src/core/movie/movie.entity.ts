import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MovieCreationAttrs {
	name: string;
	discroption: string;
}

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie, MovieCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@Column({ type: DataType.STRING })
	discription: string;
}
