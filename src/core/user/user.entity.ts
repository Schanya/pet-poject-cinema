import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { Basket } from '../basket/basket.entity';
import { Role } from '../role/role.entity';
import { Ticket } from '../ticket/ticket.entity';
import { UserToRole } from '../user-role/user-role.entity';

interface UserCreationAttrs {
	login: string;
	password: string;
}

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@BelongsToMany(() => Role, () => UserToRole)
	roles: Role[];

	@BelongsToMany(() => Ticket, () => Basket)
	tickets: Ticket[];
}
