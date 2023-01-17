import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { Role } from '../role/role.entity';
import { UserToRole } from '../user-role.ts/user-role.entity';

interface UserCreationAttrs {
	login: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@BelongsToMany(() => Role, () => UserToRole)
	roles: Role[];
}
