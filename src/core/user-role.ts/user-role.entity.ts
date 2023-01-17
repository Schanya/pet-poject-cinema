import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UserToRole extends Model<UserToRole> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;
}
