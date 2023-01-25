import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { UserToRole } from './user-role.entity';
import { User } from './user.entity';

interface RoleCreationAttrs {
	name: string;
}

@Table({ tableName: 'roles', paranoid: true })
export class Role extends Model<Role, RoleCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	name: string;

	@BelongsToMany(() => User, () => UserToRole)
	users: User[];
}
