import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';

import { User } from '../../user/domain/user.entity';

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

	@BelongsToMany(() => User, 'users_roles', 'user_id', 'role_id')
	users: User[];
}
