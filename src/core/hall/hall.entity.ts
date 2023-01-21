import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Schedule } from '../schedule/schedule.entity';
import { Schema } from '../schema/schema.entity';

interface HallCreationAttrs {
	name: string;
}

@Table({ tableName: 'halls' })
export class Hall extends Model<Hall, HallCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@HasMany(() => Schema)
	schemas: Schema[];

	@HasMany(() => Schedule)
	schedule: Schedule[];
}
