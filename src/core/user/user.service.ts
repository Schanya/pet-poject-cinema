import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { RoleService } from '../role/role.service';

import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService,
	) {}

	public async findBy(options: any): Promise<User> {
		return this.userRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(
		userDto: UserDto,
		transaction?: Transaction,
	): Promise<User> {
		const user = await this.userRepository.create(userDto, { transaction });

		const role = await this.roleService.findBy({ name: 'USER' });

		user.$set('roles', [role.id], { transaction });
		user.roles = [role];

		return user;
	}
}
