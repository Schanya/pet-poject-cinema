import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Schedule } from 'src/core/schedule/domain/schedule.entity';
import { Schema } from 'src/core/schema/domain/schema.entity';

interface HallCreationAttrs {
	name: string;
}

@Table({ tableName: 'halls', paranoid: true })
export class Hall extends Model<Hall, HallCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@HasMany(() => Schema)
	schemas: Schema[];

	@HasMany(() => Schedule)
	schedule: Schedule[];
}
